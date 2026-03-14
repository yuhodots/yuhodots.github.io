---
title: "Anthropic's Agent Design Best Practices"
date: "2025-09-06"
template: "post"
draft: False
path: "/deeplearning/25-09-06/"
description: "This post is a translated and summarized version of Anthropic's engineering blog posts Building effective agents and Multi-agent research system. I translated them for personal study purposes and refined the content after initial translation using Gemini 2.5 Pro."
category: "Deep Learning"
---

> This post is a translated and summarized version of Anthropic's engineering blog posts "[Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)" and "[Multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)." I translated them for personal study purposes and refined the content after initial translation using Gemini 2.5 Pro. These posts are essential reading for anyone studying agents, so I highly recommend checking them out. Visualizations for each LLM workflow and agent can be found in the [original post](https://www.anthropic.com/engineering/building-effective-agents).

### Agentic System?

An agentic system goes beyond simply calling a Large Language Model (LLM) -- it uses the LLM as a core reasoning engine to autonomously achieve complex, multi-step goals. The key characteristics that distinguish agentic systems from conventional model usage are **autonomy**, **goal-orientation**, and the ability to interact with the external world through predefined **tools**.

An agent operates within a defined loop. It first evaluates the given goal and formulates a series of action plans to achieve it. Then, following the plan, it executes actions such as invoking tools and observes the results. Based on this new information, the agent revises existing plans or creates new ones. Through this iterative process, it can effectively handle complex tasks that would be difficult to solve with a single, static prompt.

This shift represents a fundamental transition in the programming paradigm. While traditional LLM calls were similar to function calls -- providing input and receiving output -- agentic systems are akin to delegating a high-level goal. Developers no longer write detailed instructions specifying "**how**" to do something, but instead specify "**what**" needs to be achieved.

##### Workflows vs. Agents

"Agent" can be defined in various ways. Some define agents as fully autonomous systems that use diverse tools to perform complex tasks and operate independently over extended periods. Others use the term to refer to more prescriptive implementations that follow predefined workflows. At Anthropic, all these variations are classified as **agentic systems**, but an important architectural distinction is drawn between **workflows** and **agents**:

*  **Workflows** are systems where LLMs and tools are orchestrated through predetermined code paths (code flows).
*  **Agents**, on the other hand, are systems where the LLM dynamically decides how to perform tasks, which tools to use, and proactively controls the entire process.

##### When Should You Use an 'Agent'?

The types of problems where agentic systems are particularly advantageous share the following characteristics:

- **Tasks with unpredictable execution paths**: Suitable when the exact steps needed to solve a problem cannot be fully defined or hard-coded in advance. Examples include debugging entirely new software bugs or conducting open-ended research with no predetermined answer.
- **Tasks requiring interaction with external environments**: Essential for tasks that need access to real-time information (web search, database queries) or require changing the state of external systems (sending emails, updating CRM).
- **Long-running, multi-step processes**: Effective for handling tasks with long dependency chains where the output of one step serves as input for the next.
- **Tasks requiring dynamic adaptation**: When the system must react to new information and modify its strategy mid-course, the agent's autonomous plan revision capability becomes crucial.

##### 1. Building block: The augmented LLM

The augmented LLM is the most fundamental building block of any agentic system. It is a form where **an LLM like Claude is combined with a set of external tools**. The mechanism works as follows: the LLM receives not only the user's query but also a list of available tools and their descriptions as part of the prompt. The model uses its reasoning capabilities to determine when and how to invoke specific tools to fulfill the user's request.

##### 2. Workflow: Prompt chaining

Prompt chaining is the simplest workflow, with a structure where **the output of one LLM call is programmatically used as the input for the next LLM call**. This creates a linear, sequential task flow. It is ideal for tasks that can be decomposed into a fixed series of transformation steps, such as "translate this text, then summarize the translated content."

##### 3. Workflow: Routing

Routing is an evolution of prompt chaining that introduces conditional logic. **An initial LLM call acts as a 'router' that analyzes the input and decides which of several possible next steps or tools to invoke**. A representative example is a customer support system that analyzes the initial query and routes it to billing tools, technical support tools, or general FAQ tools.

##### 4. Workflow: Parallelization

Parallelization is a workflow designed to increase speed and processing scope. **A single query is decomposed into multiple independent sub-queries that are executed simultaneously through separate LLM calls**. For example, when investigating a broad topic like "What are the main arguments for and against nuclear energy?", the search can be performed in parallel by splitting it into "arguments for," "arguments against," "economic impact," "environmental impact," etc.

##### 5. Workflow: Orchestrator-workers

In the Orchestrator-workers pattern, **a central 'orchestrator' agent analyzes a complex task, decomposes it into smaller, specialized sub-tasks, and delegates each sub-task to dedicated 'worker' agents**. Workers perform their tasks in parallel with their own independent contexts and specialized tools, then report results back to the orchestrator. **The orchestrator synthesizes these results to produce a final, coherent answer.**

##### 6. Workflow: Evaluator-optimizer

The Evaluator-optimizer workflow **introduces a feedback loop for iterative improvement**. When one agent (the 'worker' or 'generator') produces an output such as code or an email draft, a second agent (the 'evaluator' or 'critic') assesses this output against defined criteria or rubrics and provides feedback. The worker then generates an improved version based on this feedback.

##### 7. Agents

A true "agent" is defined as a system that dynamically combines the building blocks and workflows described above. Rather than being confined to a single workflow, an agent autonomously selects and executes the appropriate workflow (or combination of workflows) to achieve high-level goals over extended periods.

### Agents in practice

##### A. Customer support

A customer support agent may be equipped with tools for knowledge base access, CRM customer history lookup, and creating and updating support tickets. This agent can leverage a **Routing** workflow. When it receives a customer inquiry, it first searches the knowledge base. If no suitable answer is found, it analyzes the inquiry keywords and invokes a tool to create a support ticket assigned to the appropriate representative.

##### B. Coding agents

A coding agent may be given tools for file reading/writing, code execution in a sandbox environment, and access to linters or static analysis tools. This agent can use an **Evaluator-optimizer** workflow. When a user requests "refactor this function to be more efficient," the agent writes a new version of the code ('worker') and runs performance tests ('evaluator'). If the new version is not faster, the agent analyzes the test results, tries a different approach, and repeats this process until the performance target is met.

### Prompt engineering your tools

The interface between agents and tools is just as important as the interface between humans and computers. A tool's effectiveness is determined not only by its functionality but also by how clearly its purpose and usage are explained to the agent within the prompt. Anthropic offers the following practical heuristics:

- **Provide explicit guidelines**: Give the agent clear instructions on how to select tools. For example, you can include directives like "prefer specialized tools over general ones when available" or "always start with the web search tool when broad external exploration is needed."
- **Encourage exploration**: At the start of a task, instruct the agent to review all available tools to formulate a better initial plan.
- **Align user intent with tool usage**: Prompts should frame tool usage within the context of solving the user's problem, rather than simply listing tools as a function catalog.
- **Use Claude as a prompt engineer**: The model itself can be leveraged to improve tool-related prompts. You can provide specific prompts and failure cases to the model, then ask it to diagnose why the agent failed and suggest improvements to tool descriptions or usage instructions.

### Benefits of a multi-agent system

Multi-agent architectures offer several distinct advantages over single-agent systems, as clearly demonstrated in Anthropic's research agent system.

- **Open-ended problem solving**: Multi-agent systems excel at research tasks where the path to the answer is not known in advance. The orchestrator can dynamically spawn new agents to investigate interesting leads discovered by other agents.
- **Flexibility and adaptability**: The system can adjust its approach based on intermediate results and explore unexpected connections, operating similarly to how a human researcher modifies research direction as information is discovered.
- **Compression**: This is a core advantage of multi-agent systems. Each worker agent performs deep exploration within its own context window, then "compresses" the most important information and delivers it to the orchestrator as a concise summary. This allows the entire system to process and synthesize far more information than a single model's context limit would permit.
- **Separation of Concerns**: Each sub-agent can have its own unique prompts, tools, and instructions, serving as a specialized expert. This reduces the risk of a single agent becoming confused by conflicting instructions and improves the overall system's robustness.
- **Performance scaling**: For certain types of tasks, especially those requiring broad, parallel investigation, multi-agent systems become a key method for scaling performance to levels unachievable by a single model's intelligence alone.
- **Increased token usage (a proxy for effort)**: According to Anthropic's analysis, 80% of the performance variance in complex browsing tasks could be explained by token usage alone. Multi-agent systems provide a structured method for effectively and parallelly investing more computational effort (i.e., more tokens) in a problem, leading to higher quality results.

The "compression" advantage in particular offers a direct and elegant solution to the fundamental LLM constraint of a finite context window. A single LLM has a clear limit on the amount of information it can process at once. Complex research tasks require synthesizing information from dozens or hundreds of sources, far exceeding this limit. Multi-agent systems solve this problem through parallelization.

For example, 10 agents each fully digest 5 documents within their own context windows. Each agent intelligently "compresses" the core content of their 5 documents into a summary report. The orchestrator then only needs to read these 10 summary reports, which comfortably fit within its context window. This architecture transforms the LLM from a tool that analyzes a single "page" of information into a system that can effectively read and synthesize an entire "library."

### Architecture overview for Research

Anthropic's research agent is a concrete implementation of the **Orchestrator-workers** pattern. Its execution flow is as follows:

1. **Query submission**: The user submits a complex research query to the system.
2. **Decomposition and strategy formulation**: The leading 'orchestrator' agent analyzes the query, decomposes it into 3-5 parallelizable sub-tasks, and formulates a research strategy.
3. **Delegation**: The orchestrator spawns multiple specialized 'worker' sub-agents, providing each with clear objectives, required output formats, and necessary tool sets such as web search.
4. **Parallel execution**: Worker agents perform their tasks simultaneously, independently using tools to gather and analyze information.
5. **Synthesis**: Each worker returns structured research results to the orchestrator.
6. **Final report writing**: The orchestrator synthesizes all inputs received from workers, resolves any conflicting information, and ultimately produces a comprehensive answer for the user.

### Effective evaluation of agents

Evaluating and deploying stateful, non-deterministic agentic systems to production environments entails unique and significant challenges distinct from traditional software. First, there are engineering challenges to address. Because agents maintain state over extended periods, minor errors that occur early on can accumulate over time, eventually leading to complete task failure. Robust **error handling and recovery mechanisms** are therefore essential. Additionally, the non-determinism that allows different execution paths for the same prompt and input makes it extremely difficult to reproduce failures and identify root causes using traditional debugging approaches. This demands a shift toward **logging, observability, and statistical evaluation**. Finally, deploying updates to agent systems that are already running is highly complex, as individual agents may be at different points in a multi-step process.

These characteristics also impact evaluation strategies. For example, when evaluating a coding agent that modifies a codebase over multiple turns, assessing the quality of the final output -- the **final state** -- is more meaningful and reliable than scoring the quality of each intermediate step. Additionally, production agents may participate in conversations spanning hundreds of turns, requiring sophisticated context management strategies (summarization, vector DB retrieval, etc.) that preserve important information without exceeding context window limits. These engineering challenges suggest that agentic AI is not simply an extension of machine learning but the beginning of a new software engineering discipline, requiring a new kind of tool stack that might be called 'AgentOps' or 'AIOps.'

### Appendix: Handoff vs. Tool

Additionally, someone with extensive experience using the OpenAI Agent SDK shared advice that was personally very helpful in understanding handoffs and tools, which I've recorded below.

- A handoff completely transfers control of a specific task to another agent. It copies and pastes all previous LLM/user conversation history to the other agent, which changes the system prompt and available tools accordingly.
  - If you want to filter and pass only specific conversations, you can use input filters and options to pass only partial context.
- Agent as tool is used when an agent wants to delegate only a specific task to a sub-agent and receive the result back to continue working with it. Therefore, only very specific conversation context is shared with the sub-agent, and control remains with the central agent.
- For these reasons, handoffs are used less often than you might expect when building agents, and agent as tool tends to be used much more frequently.

### References

- https://www.anthropic.com/engineering/building-effective-agents
- https://www.anthropic.com/engineering/multi-agent-research-system
