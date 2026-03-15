---
title: "OpenAI Agent SDK Basics Guide"
date: "2025-09-04"
template: "post"
draft: false
path: "/cheatsheet/25-09-04/"
description: "While langchain and langgraph were previously popular tools for building agents, the OpenAI Agent SDK has recently gained significant traction. Compared to langgraph, the OpenAI Agent SDK has fewer external dependencies, is less complex to use, and stays close to standard Python syntax..."
category: "Cheat Sheet"
thumbnail: "openai"
---

> This post summarizes the key concepts and usage examples from the OpenAI Agent SDK documentation.

While langchain and langgraph were previously popular tools for building agents, the OpenAI Agent SDK has recently gained significant traction. Compared to langgraph, the OpenAI Agent SDK has fewer external dependencies, is less complex to use, and stays close to standard Python syntax. For these reasons, I plan to build future agent-related projects using the OpenAI Agent SDK, which motivated me to compile the core concepts below.

The core design principles of the OpenAI Agent SDK are "lightweight" and "Python-First." This helps developers build agent systems intuitively using minimal core components and familiar Python language features, without needing to learn complex new abstractions. Let's dive into the detailed concepts and usage examples below to get acquainted with the OpenAI Agent SDK.

### 1. Quick Start

Let's start by looking at a basic usage example. You don't need to fully understand each term just yet.

First, define the agents. (Examples are taken from the OpenAI Agent SDK docs.)

```python
from agents import Agent

agent = Agent(
    name="Math Tutor",
    instructions="You provide help with math problems. Explain your reasoning at each step and include examples",
)

history_tutor_agent = Agent(
    name="History Tutor",
    handoff_description="Specialist agent for historical questions",
    instructions="You provide assistance with historical queries. Explain important events and context clearly.",
)

math_tutor_agent = Agent(
    name="Math Tutor",
    handoff_description="Specialist agent for math questions",
    instructions="You provide help with math problems. Explain your reasoning at each step and include examples",
)

```

Define the central triage_agent and set up its handoffs.

```python
triage_agent = Agent(
    name="Triage Agent",
    instructions="You determine which agent to use based on the user's homework question",
    handoffs=[history_tutor_agent, math_tutor_agent]
)
```

Run the workflow (i.e., the central triage_agent) using Runner.run.

```python
from agents import Runner

async def main():
    result = await Runner.run(triage_agent, "What is the capital of France?")
    print(result.final_output)
```

If you want to add validation for inputs and outputs, try adding a guardrail.

```python
from agents import GuardrailFunctionOutput, Agent, Runner
from pydantic import BaseModel


class HomeworkOutput(BaseModel):
    is_homework: bool
    reasoning: str

guardrail_agent = Agent(
    name="Guardrail check",
    instructions="Check if the user is asking about homework.",
    output_type=HomeworkOutput,
)

async def homework_guardrail(ctx, agent, input_data):
    result = await Runner.run(guardrail_agent, input_data, context=ctx.context)
    final_output = result.final_output_as(HomeworkOutput)
    return GuardrailFunctionOutput(
        output_info=final_output,
        tripwire_triggered=not final_output.is_homework,
    )

triage_agent = Agent(
    name="Triage Agent",
    instructions="You determine which agent to use based on the user's homework question",
    handoffs=[history_tutor_agent, math_tutor_agent],
    input_guardrails=[
        InputGuardrail(guardrail_function=homework_guardrail),
    ],
)
```

### 2. Basic Concepts

This section introduces the most fundamental elements you need to know to use the OpenAI Agent SDK.

##### Agents

An Agent is the most essential component, representing an LLM configured with instructions and tools.

- **name**: A required string that identifies the agent. Used as an identifier in logging, debugging, tracing, etc.
- **instructions**: A system prompt that defines the agent's persona, goals, constraints, and more.
- **model**: The LLM model to use.

```python
# A simple agent can be created with just a name and instructions.
from agents import Agent

math_tutor_agent = Agent(
    name="Math Tutor",
    instructions="You provide help with math problems. Explain your reasoning at each step and include examples.",
    model="gpt-4o" # Explicitly specify the model to use
)
```

There are also additional features:

- The `output_type` parameter allows the agent to generate structured data, such as Pydantic models or dataclasses, rather than plain text.
- You can also pass a function instead of a string to the `instructions` parameter. Use this approach when you want to dynamically generate the system prompt based on the current context so the agent can respond appropriately to the situation.
- The `clone()` method lets you easily create a new agent by duplicating an existing one with slight modifications.

##### Runner

The Runner class is the component that manages the execution flow of agents -- essentially the engine that brings defined agents to life. The '**Agent loop**' that automatically runs when you call `Runner.run()` is the core operating mechanism of the OpenAI Agent SDK, and it works as follows:

1. The Runner calls the LLM with the message history so far.
2. The LLM returns a response, which may include tool calls or handoff requests.
3. If there are tool calls, the Runner executes the tools, adds the results to the message history, and returns to step 1.
4. The loop terminates when a "final output" is generated.

There are two conditions under which the loop terminates:

- If `output_type` is set, the loop terminates when the LLM generates a **response matching the structured type**.
- If `output_type` is not set (plain text), the **first LLM response that doesn't contain tool calls or handoffs** is treated as the final output and the loop terminates.

The Runner provides `Runner.run()` for async applications and `Runner.run_sync()` for sync applications.

```python
# The Runner automatically handles the agent loop until a final output is produced.
from agents import Runner

# Assuming math_tutor_agent defined above.
user_query = "What is the Pythagorean theorem?"

# Async execution
result = await Runner.run(math_tutor_agent, user_query)

print(result.final_output)
```

This abstraction of the agent loop is a core value of the OpenAI Agent SDK. Instead of developers building this loop themselves, they simply configure the agent with the necessary tools and output types, and the Runner handles the rest of the complex process.

It is also possible to stream responses token by token rather than waiting for the entire response. The `Runner.run_streamed()` method returns an async generator that produces various types of events during the agent loop, such as text deltas, tool call information, and final outputs.

```python
# Streaming provides real-time feedback to the user.
# Below is a conceptual example based on a common streaming pattern.

async for event in Runner.run_streamed(agent, "Tell me a long story."):
    if event.type == 'text_delta':
        print(event.delta, end="", flush=True)
    elif event.type == 'final_output':
        print("\n--- Story Complete ---")
```

Here is a summary:

- `runner.run()`: Async execution
- `runner.run_sync()`: Sync execution
- `runner.run_streamed()`: Async execution + streaming support

##### RunResult

The result of a Runner call is not a simple string, but a `RunResult` object containing rich information.

- You can get the agent's final response via **`result.final_output`**.
- The **`result.final_output_as(YourPydanticModel)` method** allows you to safely parse and validate structured data.

The RunResult object contains not just the final output, but all intermediate tool calls and the LLM's reasoning process from execution, making it useful for debugging and logging.

Additionally, using `RunResultBase.to_input_list()` makes it easy to feed past conversations into the next turn's input.

```python
messages = []
messages.append({"role": "user", "content": "Remember the number 7814."})
response = runner.run(messages)
messages = runner.to_input_list(response)

messages.append({"role": "user", "content": "Multiply the last number by 103.8"})
response = runner.run(messages)
print(response)  # Remembers the previous number and performs the calculation
```

### 3. Tools & Context

This section covers how to give agents the ability to interact with the outside world and access the information they need.

##### Tools

Tools enable agents to go beyond simple text generation and take meaningful actions such as web searches, database access, and external API calls.

The most basic way to create a tool is to use the `@function_tool` decorator on a Python function. The OpenAI Agent SDK automatically performs the following, so it's important to write good type hints and docstrings:

- Generates a JSON schema from type hints
- Parses the function's docstring to use as the tool description
- Validates inputs using Pydantic

```python
# The @function_tool decorator instantly converts a Python function into a tool.
from agents import function_tool

@function_tool
def get_weather(city: str) -> str:
    """Returns the current weather for a specified city."""
    # In a real application, this would call a weather API.
    return f"The weather in {city} is sunny and 25°C."
```

```python
agent = Agent(
    name="Weather Assistant",
    instructions="You are a helper that provides weather information.",
    tools=[get_weather]
)
```

There are also additional features:

- Hosted Tools such as `WebSearchTool`, `CodeInterpreterTool`, and `FileSearchTool` run directly on OpenAI's servers. They can be used immediately without any setup.
- The **`agent.as_tool()`** method allows you to use an agent as a tool.
- The **`tool_choice`** parameter lets you force the agent to always use a specific tool ("**required**"), never use one ("**none**"), or only use a designated tool ("get_weather").

##### Context: Local Context

Context is a dependency-injection tool. It is an object passed to `Runner.run()`, and it gets propagated to all agents, tools, handoffs, etc. It serves as a space to store dependencies and state information needed for agent execution. Any Python object can be provided as Context.

```python
@dataclass
class UserContext:
    name: str
    uid: str
    is_pro_user: bool

    async def fetch_purchases() -> list[Purchase]:
        return ...

agent = Agent[UserContext](
    ...,
)
```

Local context is represented through the `RunContextWrapper` class and its `context` attribute. Here's how it works:

1. Create a Python object. The common pattern is to use a dataclass or Pydantic object.
2. Pass that object to the various run methods (e.g., `Runner.run(..., context=whatever)`).
3. All tool calls, lifecycle hooks, etc. receive a wrapper object of type `RunContextWrapper[T]`, where `T` is the type of the context object you created. Access the actual object via `wrapper.context`.

Within a given agent execution, all agents, tool functions, and lifecycle hooks must use the same type of context. Let's understand this through an example.

```python
import asyncio
from dataclasses import dataclass

from agents import Agent, RunContextWrapper, Runner, function_tool

@dataclass
class UserInfo:
    name: str
    uid: int

@function_tool
async def fetch_user_age(wrapper: RunContextWrapper[UserInfo]) -> str:
    """Fetch the age of the user. Call this function to get user's age information."""
    return f"The user {wrapper.context.name} is 47 years old"

async def main():
    user_info = UserInfo(name="John", uid=123)

    agent = Agent[UserInfo](
        name="Assistant",
        tools=[fetch_user_age],
    )

    result = await Runner.run(
        starting_agent=agent,
        input="What is the age of the user?",
        context=user_info,
    )

    print(result.final_output)
    # The user John is 47 years old.

if __name__ == "__main__":
    asyncio.run(main())
```

##### Context: Agent/LLM context

When the LLM is called, the only data the model can see comes from the conversation history. In other words, for the LLM to use new data, that data must be provided in a way that becomes part of the conversation history. Here are the methods:

1. Add it to the Agent's `instructions` as a system prompt. The system prompt can be a fixed string or a dynamic function that takes context and returns a string.
2. Include it in the `input` (input message) when calling `Runner.run`.
3. Expose it through various tools. This allows the LLM to request data when it needs it.

### 4. Advanced Topics

This section covers how to build complex multi-agent systems and ensure they operate safely and reliably.

##### Session

Since LLMs are inherently stateless, previous conversation history must be passed along each time to maintain conversational context. While you can use `.to_input_list()`, sessions offer another approach.

Sessions are the OpenAI Agent SDK's built-in solution for automatically managing conversation history across multiple `Runner.run()` calls. This frees developers from the tedious and error-prone process of manual state management.

The Runner retrieves previous history from the session before execution and saves the new interaction back to the session after execution. You can simply create a Session object like `SQLiteSession` or `SQLAlchemySession` and pass it to the Runner.

```python
# Sessions automatically maintain and retrieve conversation history across executions.
from agents import Agent, Runner, SQLiteSession

assistant = Agent(name="Assistant", instructions="You are a helpful assistant.")
# Create a session linked to a unique conversation ID
session = SQLiteSession("user_conversation_42")

# First turn
await Runner.run(assistant, "My name is Alex.", session=session)

# Second turn - the agent remembers the name.
result = await Runner.run(assistant, "What is my name?", session=session)
print(result.final_output) # Expected output: "Your name is Alex."
```

##### Handsoff

Handoff is a mechanism where one agent delegates a specific task to another, more specialized agent. It is a key pattern for building modular multi-agent systems.

A handoff is represented to the parent agent as a **special kind of tool**. When the LLM decides to call this tool, the SDK intercepts it and transfers control and conversation history to the target agent.

You can define potential handoffs that an agent can perform using the `handoffs` list in the Agent constructor.

```python
# triage_agent configures handoffs to specialized agents.
history_tutor_agent = Agent(name="History Tutor", instructions="...")
math_tutor_agent = Agent(name="Math Tutor", instructions="...")

triage_agent = Agent(
    name="Triage Agent",
    instructions="You determine which agent to use based on the user's homework question.",
    handoffs=[history_tutor_agent, math_tutor_agent]
)

# The Runner automatically handles the handoff based on the LLM's decision.
result = await Runner.run(triage_agent, "Who was Julius Caesar?")
# The result is generated by history_tutor_agent.
```

The `handoff()` utility function enables advanced customization such as `on_handoff` callbacks (fetching data before transfer) and `input_filter` (cleaning up history passed to the next agent).

```python
from agents import Agent, handoff, RunContextWrapper

def on_handoff(ctx: RunContextWrapper[None]):
    print("Handoff called")

agent = Agent(name="My agent")

handoff_obj = handoff(
    agent=agent,
    on_handoff=on_handoff,
    tool_name_override="custom_handoff_tool",
    tool_description_override="Custom description",
)
```

When a handoff occurs, it's as if a new agent takes over the conversation and can see the entire previous conversation history. If you want to modify this behavior, you can set an `input_filter`. An input filter is a function that receives the existing input as `HandoffInputData` and must return a new `HandoffInputData`.

Commonly used patterns (e.g., removing all tool calls from conversation history) are already implemented in `agents.extensions.handoff_filters`.

```python
from agents import Agent, handoff
from agents.extensions import handoff_filters

agent = Agent(name="FAQ agent")

handoff_obj = handoff(
    agent=agent,
    input_filter=handoff_filters.remove_all_tools,
)
```

##### Guardrails

Guardrails are functions that perform validation on the agent's inputs and outputs, running in parallel with the agent's main logic.

The "**Tripwire**" mechanism: When a guardrail's condition is met (e.g., harmful content detected), the "Tripwire" activates, immediately raising an exception and halting execution.

- `@input_guardrail`: Runs before the first agent executes, validating the initial user input.
- `@output_guardrail`: Runs after the last agent executes, validating the final response before sending it to the user.

```python
# Guardrails provide a powerful way to validate inputs and outputs.
from agents import Agent, input_guardrail, GuardrailFunctionOutput, Runner
from agents.exceptions import InputGuardrailTripwireTriggered

@input_guardrail
async def profanity_check_guardrail(ctx, agent, input_data) -> GuardrailFunctionOutput:
    is_inappropriate = "badword" in str(input_data).lower()
    return GuardrailFunctionOutput(
        output_info={"reason": "Profanity detected"},
        tripwire_triggered=is_inappropriate,
    )

safe_agent = Agent(
    name="Safe Agent",
    instructions="You are a helpful and friendly assistant.",
    input_guardrails=[profanity_check_guardrail]
)

try:
    await Runner.run(safe_agent, "This is a badword query.")
except InputGuardrailTripwireTriggered as e:
    print(f"Guardrail tripped! Reason: {e.output_info}")
```

### 5. Utilities

This section covers practical tools and techniques for building and maintaining agentic systems.

##### Tracing

Complex agent interactions can be difficult to debug. Tracing allows you to visualize agent workflows. Tracing is enabled by default, and execution results can be viewed in the OpenAI Traces dashboard.

Advanced features like the `trace()` function for grouping multiple runs into a single trace are also supported, as shown below.

```python
from agents import Agent, Runner, trace

async def main():
    agent = Agent(name="Joke generator", instructions="Tell funny jokes.")

    with trace("Joke workflow"):
        first_result = await Runner.run(agent, "Tell me a joke")
        second_result = await Runner.run(agent, f"Rate this joke: {first_result.final_output}")
        print(f"Joke: {first_result.final_output}")
        print(f"Rating: {second_result.final_output}")
```

##### REPL utility

If you want to quickly and interactively test an agent's conversational abilities without building a UI, you can use the `run_demo_loop` utility. Running the code below starts an interactive chat session in the terminal, automatically handling conversation history and streaming the agent's output.

```python
# The REPL utility is perfect for quick, interactive testing.
import asyncio
from agents import Agent, run_demo_loop

async def main():
    agent = Agent(name="Assistant", instructions="You are a helpful assistant.")
    await run_demo_loop(agent)

if __name__ == "__main__":
    asyncio.run(main())
```

##### draw_graph

As multi-agent systems grow, it becomes harder to understand the relationships between agents, tools, and handoffs. The `draw_graph` utility uses Graphviz to generate visual diagrams of agents and their connections. After installing the required package with `pip install "openai-agents[viz]"`, you can generate graphs with simple code.

```python
import os

from agents import Agent, function_tool
from agents.mcp.server import MCPServerStdio
from agents.extensions.visualization import draw_graph

@function_tool
def get_weather(city: str) -> str:
    return f"The weather in {city} is sunny."

spanish_agent = Agent(
    name="Spanish agent",
    instructions="You only speak Spanish.",
)

english_agent = Agent(
    name="English agent",
    instructions="You only speak English",
)

current_dir = os.path.dirname(os.path.abspath(__file__))
samples_dir = os.path.join(current_dir, "sample_files")
mcp_server = MCPServerStdio(
    name="Filesystem Server, via npx",
    params={
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-filesystem", samples_dir],
    },
)

triage_agent = Agent(
    name="Triage agent",
    instructions="Handoff to the appropriate agent based on the language of the request.",
    handoffs=[spanish_agent, english_agent],
    tools=[get_weather],
    mcp_servers=[mcp_server],
)

draw_graph(triage_agent)
```

![img](../../img/25-09-04-1.png)

<center><p><i>https://openai.github.io/openai-agents-python/visualization/</i></p></center>

##### LiteLLM Integration

The `LitellmModel` class can be used to connect the SDK to over 100 other LLMs, including Anthropic and Google.

```python
# The SDK is model-agnostic through LiteLLM.
import os
from agents import Agent
from agents.extensions.models.litellm_model import LitellmModel

# Configure the LiteLLM model wrapper
claude_model = LitellmModel(
    model="claude-3-opus-20240229",
    api_key=os.environ.get("ANTHROPIC_API_KEY") # Fetch key from environment variable
)

claude_agent = Agent(
    name="Claude Assistant",
    instructions="You are a helpful assistant powered by Claude.",
    model=claude_model
)
```

### 6. Conclusion

We have covered the core features of the OpenAI Agent SDK -- from the basic concepts of `Agent` and `Runner`, to `Tools` and `Context` that extend agent capabilities, and advanced features like `Handoffs` and `Guardrails` for building complex multi-agent collaborative systems.

From hands-on experience, the greatest appeal of the OpenAI Agent SDK is that it is designed around familiar Python syntax and decorators rather than complex abstractions, and that developers can quickly prototype ideas and evolve them into real applications with a minimal learning curve. Another major advantage is that it includes practical utility functions essential during development, such as `Tracing`, `REPL`, and `draw_graph`.

If you are planning to build agentic workflows in the future, I recommend using this summary as a reference and trying out the OpenAI Agent SDK to build your agents.
