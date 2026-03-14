---
title: "Comprehensive Guide to Temporal"
date: "2025-06-13"
template: "post"
draft: false
path: "/cheatsheet/25-06-13/"
description: "AI tasks such as AI-based image generation can take anywhere from minutes to hours to complete, making them extremely difficult to handle within a typical web request-response cycle. Until now, the common approach has been to combine Redis and Celery with the FastAPI framework for asynchronous task processing."
category: "Cheat Sheet"
thumbnail: "temporal"
---

> This post was initially drafted using Gemini Deep Research, then personally reviewed and refined to correct any awkward parts.

AI tasks such as AI-based image generation can take anywhere from minutes to hours to complete, making them extremely difficult to handle within a typical web request-response cycle. Until now, the common approach has been to combine Redis and Celery with the FastAPI framework for asynchronous task processing. While this approach works well for simple background tasks, it has limitations when it comes to complex AI workflows that consist of multiple steps, maintain state, and require reliable recovery upon failure.

As an alternative, we can use Temporal.io. Temporal provides an environment where developers can focus solely on business logic as if system failures didn't exist. It's worth noting how Temporal contributes to keeping complex AI workflows -- such as model training and data preprocessing -- resilient and reliable.

As the complexity of AI tasks increases, there is a growing need for sophisticated workflow orchestration tools that go beyond simple task queues. AI tasks like AI image generation can consist of multiple steps, each of which may succeed or fail, and state must be preserved as information is passed to the next step. These characteristics are better suited to **Temporal, which provides a stateful workflow paradigm**, rather than **Celery's "fire-and-forget" approach**.

This post aims to clearly understand Temporal's core concepts, learn basic examples using the Python SDK, and explore the concrete steps for migrating from an existing FastAPI, Redis, and Celery stack to Temporal.

### 1. Introduction

In a nutshell, Temporal can be described as "a platform that guarantees Durable Execution." Temporal is a distributed system that focuses on defining and managing the entire execution flow of an application -- the "workflow." Its core value is that developers are freed from the chronic problems of distributed systems such as service failures, API call failures, and network instability. Temporal takes responsibility for the troublesome reliability management on behalf of the developer.

**Temporal workflows automatically and permanently record the state of every executed step.** When a failure occurs, **the workflow resumes execution precisely from the point where it was interrupted.** This fundamentally eliminates the loss of task progress and the need for complex manual recovery procedures.

These characteristics fundamentally distinguish Temporal from simple task queue systems like Celery and Redis. While Celery/Redis focus on asynchronously delivering individual tasks, Temporal functions as a complete platform that reliably orchestrates entire processes that remember state, run for extended periods, and contain complex logic.

The key benefits you can expect when adopting Temporal are as follows:

- **Durability**: All state information and execution history of workflows are safely preserved in the Temporal cluster. Even if workers or the Temporal service experience failures, workflow state is never lost.
- **Reliability**: Automatic retries at the activity level, various timeout settings, and sophisticated error handling capabilities maximize code execution reliability.
- **Visibility**: The exact status and progress of all running, completed, or failed workflows can be tracked in detail through the Temporal Web UI or API, dramatically improving debugging and operations.
- **Scalability**: Worker processes can be horizontally scaled as needed to efficiently handle large volumes of work.

Temporal's "visibility" feature truly shines for complex, long-running processes like AI tasks. Previously, when problems occurred, you had to analyze extensive logs. Temporal's event history records every step of workflow execution in detail, allowing you to accurately reproduce and analyze the state and decision-making process at any given point. This dramatically reduces problem resolution time and is a core factor in significantly improving system stability and maintainability.

### 2. Basic Concepts

To effectively use the Temporal system, you need to understand several key concepts.

##### 2.1. Workflow

- Definition: Code that defines the entire business logic of an application, written in general programming languages such as Java, Go, Python, etc.
- **Workflow Definition vs. Workflow Execution**: A 'Workflow Definition' is the blueprint, and each actual running instance based on that blueprint is a 'Workflow Execution.' One definition can create numerous executions.
- **Deterministic Execution**: The most important constraint on workflow code is that it must be 'deterministic.' This means that given the same input, it must always produce the same result. Thanks to this principle, Temporal can reliably recover workflow status upon failure. Non-deterministic operations like `math.random()` or external API calls must be separated into 'Activities.'

##### 2.2. Activity

- Definition: An individual unit of work executed within a workflow, performing the actual "work" of business logic.
- Role: Used for executing code that has the potential to fail or is non-deterministic, such as interacting with external systems (API calls, DB access) or computationally intensive tasks (AI model inference). To avoid the workflow's deterministic constraint, all such operations must be implemented as activities.
- Automatic Retries and Timeouts: Various retry policies and timeouts can be configured for activities to automatically respond to transient errors and control execution time.

##### 2.3. Worker Process

- Definition: A process that hosts developer-written workflow and activity definitions, fetches work from the Temporal cluster's task queue, and actually executes it.
- Role: Communicates with the Temporal cluster and continuously polls the designated task queue to perform work. The Temporal service doesn't execute code -- the worker executes code within the developer's infrastructure, allowing direct control over data and security.

##### 2.4. Task Queue

- Definition: A lightweight, dynamic queue that delivers workflow and activity tasks to specific worker groups capable of handling them.
- Role: Handles task distribution, load balancing, and routing specific tasks to specific worker groups. They are dynamically created as needed without a separate registration process.

##### 2.5. Temporal Cluster

- Definition: The backend service that provides core Temporal system functionality, including persistent storage and management of workflow execution state, task scheduling, and more.
- Hosting Options: You can install the open-source Temporal server yourself (self-hosted) or use Temporal Cloud (SaaS), a fully managed service.

##### 2.6. Namespace

- Definition: A unit for logically isolating and grouping workflow executions. Useful for separating development/staging/production environments or independently managing workflows from different teams.

The 'Deterministic Execution' requirement for workflows is the foundation of Temporal's powerful fault tolerance. **All non-deterministic operations must be separated into 'Activities.'** When an activity executes and returns a result, this result is recorded in the event history. **When a workflow is re-executed, instead of actually calling the activity again, it retrieves and uses the result recorded in the event history**, thus maintaining determinism.

Task queues go beyond simple task distribution and serve as the foundation for implementing sophisticated orchestration strategies such as **routing specific tasks only to workers with specific capabilities (e.g., GPUs)**. For example, tasks that require GPUs, like AI image generation, can be assigned to workers polling the `gpu-task-queue`, while general tasks go to workers polling the `cpu-task-queue`.

### 3. Workflow

A workflow is the core coordination unit of application logic, guaranteeing durable and reliable execution while clearly expressing complex business processes in code.

##### 3.1. Workflow Definition

A Workflow Definition is code that describes the workflow's logic. This code must be deterministic -- it must always produce the same result for the same input and event sequence. This is a key requirement for accurately restoring previous state when a workflow is interrupted and resumed (replayed).

##### 3.2. Workflow Execution

A Workflow Execution is an instance where workflow definition code is actually running. It is characterized by **durable, reliable, and scalable** execution.

- Isolation and Scalability: Each workflow execution runs independently, and millions of concurrent workflow executions can be managed.
- Durability: Workflow executions have no time limit. Whether execution takes seconds or years, Temporal guarantees that the workflow completes exactly once.
- Reliability: Even when failures occur, the Temporal platform preserves state and resumes execution from the last checkpoint, enabling perfect recovery.
- Replays: The mechanism by which workflows resume progress. It re-executes the code and verifies consistency with past events -- a core feature that makes workflows resumable and reliable.
- Status: A Workflow Execution can be in either `Open` (running) or `Closed` (completed, failed, etc.) state.
- Workflow Execution Chain: A series of workflow executions sharing the same workflow ID, connected by Retries, Cron Jobs, etc.

##### 3.3. Dynamic Handler

A Dynamic Handler is an advanced feature that can process incoming requests dynamically at runtime without pre-registering a specific workflow type.

##### 3.4. Schedule

Temporal's Schedule provides instructions for starting workflow executions at specific times, offering a more flexible approach than traditional Cron Jobs. A Schedule is defined by an **Action** and a **Spec**.

- **Action**: Defines which workflow to run with what parameters and settings.
- **Spec**: Defines when the Action should be performed. It can use simple intervals like "every 30 minutes" or calendar-based expressions similar to cron expressions.

##### 3.5. Cron Job

A Cron Job is a recurring execution created by providing a cron schedule when starting a workflow. However, Temporal strongly recommends using Schedules instead of Cron Jobs. Schedules provide more configuration options and far more powerful features, such as dynamically updating running schedules.

### 4. Activity

Activities encapsulate business logic that has the potential to fail and can be automatically retried when problems occur. This includes all operations that must be performed outside the workflow's deterministic context, such as external service calls and DB transactions.

##### 4.1. Activity Definition

An Activity Definition is code that describes the activity's logic.

- **Idempotency**: Temporal strongly recommends that activities be idempotent. Idempotency means that performing an operation multiple times produces the same result as performing it once. Since activities can be retried, lack of idempotency can cause serious side effects like duplicate payments.
- **No Constraints**: Activity code can freely perform non-deterministic operations or external I/O like a regular function.
- **Heartbeat**: A signal that long-running activities send to the Temporal service to indicate they are still alive. A heartbeat must be sent to receive cancellation requests during execution.

##### 4.2. Activity Execution

An Activity Execution is the process from when an activity starts to when it completes (or fails).

- **Failure Handling**: If an activity execution fails, error information is returned to the workflow for determining subsequent actions.
- **Execution Guarantee**: Temporal guarantees that an activity is executed at least once or times out. Even if a worker goes down, tasks are not lost and will be retried.
- **Cancellation**: Workflows can send cancellation requests to running activities, and activities can detect and either stop execution or ignore the request.
- **Async Activity Completion**: A feature that allows activities to not complete immediately, but to be completed later by an external system (e.g., human approval).

##### 4.3. Local Activity

A Local Activity is a special activity that runs within the same worker process as the workflow, serving as a performance optimization for tasks requiring very low latency.

- **Advantages**: Very low latency due to no communication overhead with the Temporal service.
- **Disadvantages**: Execution time is limited to a short duration (default 10 seconds), and advanced features like global rate limiting or routing are not provided.

Unless very high throughput is needed for a special case, using regular activities is strongly recommended. Local activities should be used carefully with a thorough understanding of their constraints.

### 5. Worker

A worker is an independent process that polls task queues, actually executes workflow and activity logic, and reports results to the Temporal service.

##### 5.1. Tasks

In Temporal, a task is a unit of work that a worker must perform.

- **Workflow Task**: A task for determining the next step of a workflow. The worker executes workflow code to decide what commands to perform next.
- **Activity Task**: A task for performing actual business logic (e.g., external API calls).

##### 5.2. Tasks Queues

A Task Queue is a dynamic queue from which workers poll tasks to process.

- **How It Works**: Workers poll for tasks from the task queue via synchronous RPC. This enables natural load balancing, task routing, and server-side rate control. Even if a worker goes down, tasks remain safely in the queue for other workers to process.
- **Worker Registration Matching**: All workers polling a specific task queue must register the same code to handle all workflows and activities that will be dispatched to that queue.

##### 5.3. Task Routing and Worker Session

Task Routing is the process of sending specific activity tasks to specific workers or worker groups.

- **Routing to Specific Environments**: Tasks requiring specific hardware, like AI model inference that needs GPUs, can be sent only to workers on GPU-equipped machines.
- **Data Locality**: After downloading large files, related processing can be run on the same host for efficiency.
- **Worker Session**: Some SDKs provide a session API that ensures a related series of activities run on the same worker.

##### 5.4. Sticky Execution

Sticky Execution is a technique that optimizes performance by dispatching subsequent workflow tasks to the same worker whenever possible. The worker caches the state of previously executed workflows in memory, reducing the cost of re-reading the entire event history each time. If the worker goes down, tasks are dispatched to another available worker to ensure stability.

### 6. Use Case

Let's walk through the steps of using Temporal in a Python environment with an AI image generation workflow example.

- **Development Environment Setup:**

  - Install Temporal Python SDK: `pip install temporalio` (or `uv add temporalio`)

  - Run a local Temporal server (Docker recommended):

    ```bash
    docker run --rm -p 7233:7233 --name temporal-dev temporalio/auto-setup:latest
    ```

  - Example project structure:

    ```
    my_temporal_ai_project/
    ├── workflows.py       # Workflow definitions
    ├── activities.py      # Activity definitions
    ├── run_worker.py      # Worker execution script
    ├── run_workflow.py    # Workflow start script
    ```

- **Defining a Workflow in Python:**

  - Use the `@workflow.defn` and `@workflow.run` decorators.

    ```python
    # workflows.py
    from datetime import timedelta
    from temporalio import workflow

    # Import activity module deterministically
    with workflow.unsafe.imports_passed_through():
        from activities import generate_image_activity, notify_user_activity

    @workflow.defn
    class AIImageGenerationWorkflow:
        @workflow.run
        async def run(self, prompt: str, user_id: str) -> str:
            workflow.logger.info(f"Workflow started for prompt '{prompt}'.")

            # Execute AI image generation activity (with long timeout)
            image_url = await workflow.execute_activity(
                generate_image_activity,
                prompt,
                start_to_close_timeout=timedelta(minutes=30),
            )

            # Execute user notification activity
            await workflow.execute_activity(
                notify_user_activity,
                f"User {user_id}, your image is ready: {image_url}",
                start_to_close_timeout=timedelta(seconds=60),
            )

            return f"Workflow complete. Image URL: {image_url}"
    ```

- **Defining Activities in Python:**

  - Use the `@activity.defn` decorator.

    ```python
    # activities.py
    import asyncio
    from temporalio import activity

    @activity.defn
    async def generate_image_activity(prompt: str) -> str:
        activity.logger.info(f"Generating image for prompt: '{prompt}'")
        # Actual AI model call logic would go here.
        # This example simulates a long-running task with a 30-second wait.
        await asyncio.sleep(30)
        return f"https://example.com/images/{prompt.replace(' ', '_')}.png"

    @activity.defn
    async def notify_user_activity(message: str) -> None:
        activity.logger.info(f"Sending notification: {message}")
        # Actual user notification logic (email, websocket, etc.)
        await asyncio.sleep(1)
        activity.logger.info("Notification sent.")
    ```

- **Creating and Running a Worker:**

  - Create a `Worker` object and register the `task_queue` to poll and the `workflows` and `activities` to handle.

    ```python
    # run_worker.py
    import asyncio
    from temporalio.client import Client
    from temporalio.worker import Worker

    from workflows import AIImageGenerationWorkflow
    from activities import generate_image_activity, notify_user_activity

    async def main():
        client = await Client.connect("localhost:7233")
        worker = Worker(
            client,
            task_queue="ai-image-generation-task-queue",
            workflows=[AIImageGenerationWorkflow],
            activities=[generate_image_activity, notify_user_activity],
        )
        print("Starting worker...")
        await worker.run()

    if __name__ == "__main__":
        asyncio.run(main())
    ```

- **Starting a Workflow Execution from a Python Client:**

  - Call `client.execute_workflow()` from a separate script to start a workflow execution.

    ```python
    # run_workflow.py
    import asyncio
    import uuid
    from temporalio.client import Client
    from workflows import AIImageGenerationWorkflow

    async def main():
        client = await Client.connect("localhost:7233")
        prompt_text = "a dragon flying in the night sky"
        workflow_id = f"ai-image-workflow-{uuid.uuid4()}"

        print(f"Starting workflow '{workflow_id}' with prompt: '{prompt_text}'")

        # Start the workflow execution and wait until it completes.
        result = await client.execute_workflow(
            AIImageGenerationWorkflow.run,
            prompt_text,
            "user_alpha_7",
            id=workflow_id,
            task_queue="ai-image-generation-task-queue",
        )
        print(f"Workflow '{workflow_id}' completed. Result: {result}")

    if __name__ == "__main__":
        asyncio.run(main())
    ```

  - **How to Run**: Run the worker (`python run_worker.py`) and the workflow start script (`python run_workflow.py`) in separate terminals.

The Workflow ID is more than just an identifier -- it is a key element that enables dynamic interactions such as querying, signaling, and canceling running processes.

### 7. Celery vs. Temporal

Let's look at the process of migrating an existing FastAPI, Redis, and Celery stack to Temporal.

- **Existing Architecture (FastAPI + Redis + Celery):**

  - Flow: When FastAPI receives a request, it creates a Celery task and sends it to Redis. A Celery worker processes the task and stores the result in a DB or Redis.
  - Roles: FastAPI (API server), Celery (async task execution), Redis (message broker).

- **Limitations of the Celery/Redis Stack:**

  - Difficulty in state management: Celery tasks are stateless, so maintaining the intermediate state of complex tasks requires developers to implement state persistence logic themselves.
  - Complexity of orchestration: Managing dependencies between tasks, conditional branching, and compensation transactions requires significant additional code.
  - Limited visibility and debugging: It is difficult to get an at-a-glance view of the current state of the entire process, and tracing failure causes is complex.
  - Instability for long-running tasks: For tasks spanning hours, reliably resuming from the interruption point after a worker restart or deployment is nearly impossible.

- **How Temporal Addresses These Limitations:**

  - Built-in state management: The workflow itself is stateful, and this state is automatically persisted by the Temporal cluster.
  - Clear orchestration through code: Complex logic can be clearly expressed using ordinary programming constructs like `if-else`, `for`, and `try-except`.
  - Excellent visibility and sophisticated error handling: The Temporal Web UI provides detailed status and event history for all workflows, and flexible retry policies can be configured within the code.
  - Perfect support for long-running tasks: Workflows are designed to run for days or weeks without interruption, and they automatically resume from the interruption point upon failure.

- **Migration Steps and Examples:**

  - Modifying FastAPI endpoints: Instead of Celery's `.delay()` call, use `client.start_workflow()` with the Temporal client. This method returns immediately, keeping API responses fast.

    ```python
    # fast_api_app.py (partial)
    from fastapi import FastAPI, HTTPException
    from temporalio.client import Client
    from workflows import AIImageGenerationWorkflow
    import uuid

    app = FastAPI()
    temporal_client: Client | None = None

    @app.on_event("startup")
    async def startup_event():
        global temporal_client
        temporal_client = await Client.connect("localhost:7233")

    @app.post("/generate-image")
    async def trigger_ai_image_generation(prompt: str, user_id: str):
        if not temporal_client:
            raise HTTPException(status_code=503, detail="Temporal service is unavailable.")

        workflow_id = f"ai-image-workflow-{user_id}-{uuid.uuid4()}"

        # 'Start' the workflow execution and return immediately
        await temporal_client.start_workflow(
            AIImageGenerationWorkflow.run,
            prompt,
            user_id,
            id=workflow_id,
            task_queue="ai-image-generation-task-queue",
        )
        # Return the task ID so users can track the status
        return {"message": "AI image generation started.", "workflow_id": workflow_id}
    ```

    Using `start_workflow` creates a clear division of responsibilities: FastAPI focuses on fast responses, and Temporal handles long-running task processing.

  - **Celery Task Logic $\to$ Temporal Activity**: Migrate the business logic from existing Celery task functions to Temporal activity functions.

  - **Workflow Orchestration**: Define a new Temporal workflow to invoke activities in the desired order and conditions.

  - **The Changing Role of Redis**: Redis, previously used as Celery's message broker, is no longer needed, as the Temporal cluster takes over this role.

| Feature | Celery + Redis | Temporal |
| ------------------- | ------------------------------------------ | ---------------------------------------------------- |
| State Management | Manual (developer implements in Redis/DB) | **Built-in** (workflow state auto-persisted and managed) |
| Orchestration Logic | Manual/Complex (task chains, callbacks, etc.) | **Explicitly written in code** (programming logic within workflows) |
| Fault Tolerance/Retries | Configuration-based/Basic level | **Fine-grained control/Built-in** (activity/workflow level) |
| Process Visibility | Limited (requires external monitoring tools) | **Rich Web UI/API** (detailed event history) |
| Long-running (days/weeks) | Difficult/Unstable (state lost on worker restart) | **Strongly supported** (auto-resume from interruption point) |
| Development Paradigm | Stateless individual task-centric | **Stateful full workflow-centric** |
| Infrastructure Complexity | Message broker (Redis) + worker management | Temporal cluster + worker management |

Migrating to Temporal is more than simply swapping libraries -- it is a process of fundamentally redesigning the asynchronous processing approach. While an initial learning curve is required, it can significantly reduce system complexity and greatly improve stability and maintainability in the long run.

### 8. Conclusion

Temporal is a powerful alternative to existing stacks for handling complex, state-critical, long-running applications, particularly challenging tasks like AI image generation. The core benefits are dramatically improved workflow durability, reliability, and visibility. This frees developers from the burden of repetitive error handling and manual state management, allowing them to focus on creating business value.

Temporal is particularly useful in the following cases:

- When building complex processes consisting of multiple steps that may run for days or weeks.
- When strong durability and automatic recovery are needed to ensure tasks complete despite system failures.
- When you need to quickly diagnose problems by having detailed visibility into the status and history of all running processes.

Of course, adopting Temporal comes with an initial learning curve, including the constraint of writing workflow code deterministically. Infrastructure management overhead from self-hosting the Temporal cluster or costs from using Temporal Cloud must also be considered.

Finally, one of Temporal's important advantages is its native support for various programming languages. This can be a significant strategic advantage when collaborating with multiple teams or scaling to a microservices architecture in the future. In conclusion, Temporal is an innovative tool designed to solve many of the challenges in building complex distributed systems, and it will open new possibilities for developers, especially in reliably handling challenging long-running tasks.

### 9. Reference

- https://docs.temporal.io
