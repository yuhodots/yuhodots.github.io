---
title: "Comprehensive Guide to Temporal"
date: "2025-06-13"
template: "post"
draft: false
path: "/cheatsheet/25-06-13/"
description: "AI 기반 이미지 생성과 같은 AI 작업은 완료까지 수 분에서 수 시간이 걸릴 수 있어, 일반적인 웹 요청-응답 주기 내에 처리하기가 매우 어렵습니다. 지금까지는 FastAPI 프레임워크에 Redis와 Celery를 조합하여 비동기 작업을 처리하는 것이 일반적이었습니다."
category: "Cheat Sheet"
thumbnail: "temporal"
---

> 본 글은 gemini deep research를 사용하여 1차 정리한 뒤에, 해당 내용을 직접 훑으며 어색한 부분을 2차 가공한 결과물입니다.

AI 기반 이미지 생성과 같은 AI 작업은 완료까지 수 분에서 수 시간이 걸릴 수 있어, 일반적인 웹 요청-응답 주기 내에 처리하기가 매우 어렵습니다. 지금까지는 FastAPI 프레임워크에 Redis와 Celery를 조합하여 비동기 작업을 처리하는 것이 일반적이었습니다. 이 방식은 간단한 백그라운드 작업에는 효과적이지만, 여러 단계로 구성되고 상태를 유지하며, 실패 시 안정적인 복구가 필수적인 복잡한 AI 워크플로에서는 한계점이 존재합니다.

이에 대한 대안으로 우리는 Temporal.io를 사용해볼 수 있습니다. Temporal은 개발자가 시스템 장애가 존재하지 않는 것처럼 비즈니스 로직에만 집중할 수 있는 환경을 제공합니다. 특히 모델 학습이나 데이터 전처리처럼 복잡한 AI 워크플로를 탄력 있고 신뢰성 있게 유지하는 데 Temporal이 어떻게 기여하는지 주목할 필요가 있습니다.

AI 작업의 복잡성이 증가함에 따라, 단순한 작업 큐를 넘어선 정교한 워크플로 오케스트레이션 도구의 필요성이 커지고 있습니다. AI 이미지 생성과 같은 AI 작업은 여러 단계로 구성될 수 있고, 각 단계는 성공 또는 실패할 수 있으며, 상태를 보존하며 다음 단계로 정보를 전달해야 합니다. 이러한 특성은 **'실행 후 잊어버리는(fire-and-forget)' 방식의 Celery**보다는, **상태 저장형(stateful) 워크플로 패러다임을 제공하는 Temporal에 더 부합**합니다.

이 글은 Temporal의 핵심 개념을 명확히 이해하고, Python SDK를 사용한 기본 예제를 익히며, 기존의 FastAPI, Redis, Celery 스택을 Temporal로 전환하는 구체적인 방법을 확인하는 것을 목표로 합니다.

### 1. Introduction

Temporal을 한 마디로 표현하자면 "Durable Execution(견고한 실행)을 보장하는 플랫폼"이라고 할 수 있습니다. Temporal은 애플리케이션의 전체 실행 흐름, 즉 "워크플로"를 정의하고 관리하는 데 초점을 맞춘 분산 시스템입니다. 핵심 가치는 개발자가 서비스 장애, API 호출 실패, 네트워크 불안정 등 분산 시스템의 고질적인 문제로부터 자유로워진다는 점입니다. 골치 아픈 신뢰성 관리를 개발자 대신 Temporal 플랫폼이 책임지는 것입니다.

**Temporal 워크플로는 실행되는 모든 단계의 상태를 자동으로 영구 기록**합니다. 장애가 발생하면, **워크플로는 중단되었던 지점에서부터 정확하게 실행을 재개**합니다. 이는 작업 진행 상황의 손실이나 복잡한 수동 복구 절차의 필요성을 원천적으로 제거합니다.

이러한 특징은 Temporal을 Celery와 Redis 같은 단순 작업 큐 시스템과 근본적으로 구별합니다. Celery/Redis가 개별 작업을 비동기적으로 전달하는 데 중점을 둔다면, Temporal은 상태를 기억하고, 장기간 실행되며, 복잡한 로직을 포함하는 전체 프로세스를 안정적으로 조율하는 하나의 완성된 플랫폼으로 기능합니다.

Temporal 도입 시 기대할 수 있는 주요 이점은 다음과 같습니다.

- **내구성 (Durability)**: 워크플로의 모든 상태 정보와 실행 기록이 Temporal 클러스터에 안전하게 보존됩니다. Worker나 Temporal 서비스에 장애가 발생해도 워크플로의 상태는 유실되지 않습니다.
- **신뢰성 (Reliability)**: 액티비티 수준의 자동 재시도, 다양한 타임아웃 설정, 정교한 오류 처리 기능을 통해 코드 실행의 신뢰성을 극대화합니다.
- **가시성 (Visibility)**: 실행 중이거나 완료, 실패한 모든 워크플로의 정확한 상태와 진행 상황을 Temporal Web UI나 API를 통해 상세하게 파악할 수 있어 디버깅과 운영을 획기적으로 개선합니다.
- **확장성 (Scalability)**: Worker process를 필요에 따라 수평적으로 확장하여 대량의 작업을 효율적으로 처리할 수 있습니다.

Temporal의 "가시성" 기능은 AI 작업처럼 복잡하고 오래 실행되는 프로세스에서 진가를 발휘합니다. 기존에는 문제가 발생하면 방대한 로그를 분석해야 했지만, Temporal의 이벤트 히스토리는 워크플로 실행의 모든 단계를 상세히 기록하므로, 특정 시점의 상태와 결정 과정을 정확하게 재현하고 분석할 수 있습니다. 이는 문제 해결 시간을 획기적으로 단축시켜 시스템의 안정성과 유지보수성을 크게 향상시키는 핵심 요소입니다.

### 2. Basic Concepts

Temporal 시스템을 효과적으로 활용하려면 몇 가지 핵심 개념을 이해해야 합니다.

##### 2.1. Workflow

- 정의: 애플리케이션의 비즈니스 로직 전체를 정의하는 코드로, Java, Go, Python 등 일반 프로그래밍 언어로 작성됩니다.
- **Workflow Definition vs. Workflow Execution**: 'Workflow Definition'는 청사진이고, 이 청사진을 바탕으로 실제 실행되는 각각의 인스턴스가 'Workflow Execution'입니다. 하나의 definition로 수많은 execution을 만들 수 있습니다.
- **Deterministic Execution**: Workflow 코드의 가장 중요한 제약 조건은 반드시 '결정론적'이어야 한다는 것입니다. 동일한 입력이 주어지면 항상 동일한 결과를 내야 함을 의미합니다. 이 원칙 덕분에 Temporal은 장애 발생 시 Workflow status를 안정적으로 복구할 수 있습니다. `math.random()`이나 외부 API 호출처럼 비결정적인 작업은 반드시 'Activity'로 분리해야 합니다.

##### 2.2. Activity

- 정의: Workflow 내에서 실행되는 개별 작업 단위로, 실제 비즈니스 로직의 "일(work)"을 수행합니다.
- 역할: 외부 시스템과의 상호작용(API 호출, DB 접근), 계산 집약적인 작업(AI 모델 추론) 등 실패 가능성이 있거나 비결정적인 코드를 실행하는 데 사용됩니다. Workflow의 결정론적 제약을 피하기 위해 이러한 작업들은 모두 activity로 구현해야 합니다.
- 자동 재시도 및 타임아웃: 액티비티에 다양한 재시도 정책과 타임아웃을 설정하여 일시적인 오류에 자동으로 대응하고 실행 시간을 제어할 수 있습니다.

##### 2.3. Worker Process

- 정의: 개발자가 작성한 workflow와 activity definition을 호스팅하고, Temporal cluster의 task queue에서 작업을 가져와 실제로 실행하는 프로세스입니다.
- 역할: Temporal cluster와 통신하며, 자신이 처리하도록 지정된 task queue를 지속적으로 폴링하여 작업을 수행합니다. Temporal service가 코드를 실행하는 것이 아니라, worker가 개발자의 인프라 내에서 코드를 실행하므로 데이터와 보안을 직접 제어할 수 있습니다.

##### 2.4. Task Queue

- 정의: Workflow 및 activity 작업을 해당 작업을 처리할 수 있는 특정 worker 그룹에게 전달하는 경량 동적 큐입니다.
- 역할: 작업 분배, 로드 밸런싱, 특정 작업을 특정 worker 그룹에 라우팅하는 역할을 합니다. 별도의 등록 절차 없이 필요에 따라 동적으로 생성됩니다.

##### 2.5. Temporal Cluster

- 정의: Workflow 실행 상태의 지속적 저장 및 관리, 작업 스케줄링 등 Temporal 시스템의 핵심 기능을 제공하는 백엔드 서비스입니다.
- 호스팅 옵션: 오픈 소스 Temporal 서버를 직접 설치(self-hosted)하거나, 완전 관리형 서비스인 Temporal Cloud(SaaS)를 사용할 수 있습니다.

##### 2.6. Namespace

- 정의: 워크플로 실행을 논리적으로 격리하고 그룹화하는 단위입니다. 개발/스테이징/프로덕션 환경을 분리하거나, 서로 다른 팀의 워크플로를 독립적으로 관리하는 데 유용합니다.

Workflow의 'Deterministic Execution' 요구사항은 Temporal의 강력한 내결함성의 기반입니다. **모든 비결정적 작업은 반드시 'Activity'로 분리**해야 합니다. Activity가 실행되고 결과가 반환되면, 이 결과는 event history에 기록됩니다. 이후 **workflow가 재실행될 때는 실제 activity를 다시 호출하는 대신, event history리에 기록된 결과를 가져와 사용**함으로써 결정론을 유지합니다.

Task queue는 단순한 작업 분배를 넘어, **특정 능력(예: GPU)을 가진 worker에게만 특정 작업을 라우팅**하는 등 정교한 오케스트레이션 전략을 구현하는 기반이 됩니다. 예를 들어, AI 이미지 생성처럼 GPU가 필수적인 작업은 `gpu-task-queue`를 폴링하는 worker에게, 일반 작업은 `cpu-task-queue`를 폴링하는 worker에게 할당할 수 있습니다.

### 3. Workflow

Workflow는 애플리케이션 로직의 핵심을 이루는 조정 단위로, 내구성과 신뢰성을 갖춘 실행을 보장하며 복잡한 비즈니스 프로세스를 코드로 명확하게 표현합니다.

##### 3.1. Workflow Definition

Workflow Definition는 workflow의 로직을 기술하는 코드입니다. 이 코드는 반드시 결정론적(deterministic)이어야 합니다. 즉, 동일한 입력과 이벤트 순서에 대해 항상 동일한 결과를 내야 합니다. 이는 workflow가 중단되었다가 재개될 때(리플레이), 이전 상태를 정확히 복원하기 위한 핵심 요구사항입니다.

##### 3.2. Workflow Execution

Workflow Execution은 workflow definition 코드가 실제로 실행되는 인스턴스입니다. 이는 **내구성이 있고(durable), 신뢰할 수 있으며(reliable), 확장 가능한(scalable)** 실행을 특징으로 합니다.

- 격리 및 확장성: 각 workflow execution은 독립적으로 실행되며, 수백만 개의 동시 workflow execution을 관리할 수 있습니다.
- 내구성: Workflow execution에는 시간제한이 없습니다. 실행에 수 초가 걸리든 수년이 걸리든, Temporal은 workflow가 반드시 한 번 완료되도록 보장합니다.
- 신뢰성: 장애 발생 시에도 Temporal 플랫폼이 상태를 보존하고 마지막 지점부터 실행을 재개하므로 완벽한 복구가 가능합니다.
- 리플레이 (Replays): Workflow가 진행 상황을 재개하는 메커니즘입니다. 코드를 다시 실행하며 과거의 이벤트와 일치하는지 검증하는 과정으로, workflow를 재개 가능하고 신뢰성 있게 만드는 핵심 기능입니다.
- 상태 (Status): Workflow execution은 `Open`(실행 중) 또는 `Closed`(완료, 실패 등) 상태일 수 있습니다.
- Workflow Execution Chain: 동일한 workflow ID를 공유하는 일련의 workflow execution들로, Retries나 Cron Job 등에 의해 연결됩니다.

##### 3.3. Dynamic Handler

Dynamic Handler는 특정 workflow 타입을 미리 등록하지 않고도, 런타임에 동적으로 들어오는 요청을 처리할 수 있는 고급 기능입니다.

##### 3.4. Schedule

Temporal의 Schedule 특정 시간에 workflow execution을 시작하기 위한 지침으로, 기존의 Cron Job보다 더 유연한 접근 방식을 제공합니다. Schedule은 **Action**과 **Spec**으로 정의됩니다.

- **Action**: 어떤 workflow를 어떤 매개변수와 설정으로 실행할지 정의합니다.
- **Spec**: Action이 언제 수행되어야 하는지를 정의합니다. "매 30분마다"와 같은 단순 간격(Intervals)이나, 크론 표현식과 유사한 달력 기반 표현식(Calendars)을 사용할 수 있습니다.

##### 3.5. Cron Job

Cron Job은 workflow 시작 시 cron schedule을 제공하여 생성되는 반복 실행입니다. 하지만 Temporal은 Cron Job 대신 Schedule 사용을 강력히 권장합니다. Schedule은 더 많은 구성 옵션과 실행 중인 schedule을 동적으로 업데이트하는 등 훨씬 강력한 기능을 제공하기 때문입니다.

### 4. Activity

Activity는 실패 가능성이 있는 비즈니스 로직을 캡슐화하며, 문제가 발생했을 때 자동으로 재시도될 수 있도록 합니다. 이는 외부 서비스 호출, DB 트랜잭션 등 워크플로의 결정론적 컨텍스트 외부에서 수행되어야 하는 모든 작업을 포함합니다.

##### 4.1. Activity Definition

Activity Definition는 activity의 로직을 기술하는 코드입니다.

- **멱등성(Idempotency)**: Temporal은 activity가 멱등성을 갖도록 강력히 권장합니다. 멱등성이란 작업을 여러 번 수행해도 한 번 수행한 것과 동일한 결과를 내는 성질입니다. activity는 재시도될 수 있으므로, 멱등성이 보장되지 않으면 중복 결제 같은 심각한 부작용을 일으킬 수 있습니다.
- **제약 조건 없음**: Activity 코드는 일반 함수처럼 비결정적인 작업이나 외부 I/O를 자유롭게 수행할 수 있습니다.
- **Heartbeat**: 장기 실행 activity가 자신이 여전히 살아있음을 Temporal 서비스에 알리는 신호입니다. 하트비트를 보내야만 실행 중에 취소 요청을 받을 수 있습니다.

##### 4.2. Activity Execution

Activity Execution은 activity가 시작되어 완료(또는 실패)될 때까지의 과정입니다.

- **실패 처리**: Activity execution이 실패하면, 오류 정보가 workflow로 반환되어 후속 조치를 결정할 수 있습니다.
- **실행 보장**: Temporal은 activity가 최소 한 번 실행되거나 시간 초과됨을 보장합니다. Worker가 다운되더라도 태스크는 유실되지 않고 재시도됩니다.
- **취소**: Workflow는 실행 중인 activity에 취소 요청을 보낼 수 있으며, activity는 이를 감지하고 실행을 중단하거나 무시할 수 있습니다.
- **비동기 액티비티 완료**: Activity 즉시 완료되지 않고, 나중에 외부 시스템(예: 사람의 승인)에 의해 완료될 수 있도록 하는 기능입니다.

##### 4.3. Local Activity

Local Activity는 workflow와 동일한 worker process 내에서 실행되는 특별한 activity로, 지연 시간이 매우 짧은 작업을 위한 성능 최적화 기능입니다.

- **장점**: Temporal 서비스와의 통신 오버헤드가 없어 지연 시간이 매우 낮습니다.
- **단점**: 실행 시간이 짧게 제한되며(기본 10초), 전역 속도 제한이나 라우팅 같은 고급 기능이 제공되지 않습니다.

매우 높은 처리량이 필요한 특별한 경우가 아니라면 일반 activity 사용을 강력히 권장합니다. Local activity는 제약 사항을 충분히 이해하고 신중하게 사용해야 합니다.

### 5. Worker

Worker는 task queue를 폴링하여 workflow와 activity 로직을 실제로 실행하고, 그 결과를 Temporal 서비스에 보고하는 독립적인 프로세스입니다.

##### 5.1. Tasks

Temporal에서 task는 worker가 수행해야 할 작업 단위입니다.

- **Workflow Task**: Workflow의 다음 단계를 결정하기 위한 task입니다. worker는 workflow 코드를 실행하여 다음에 수행할 커맨드를 결정합니다.
- **Activity Task**: 실제 비즈니스 로직(예: 외부 API 호출)을 수행하기 위한 task입니다.

##### 5.2. Tasks Queues

Task Queue는 worker가 처리할 task를 폴링하는 동적 큐입니다.

- **작동 방식**: Worker는 동기식 RPC를 통해 task queue에서 작업을 폴링합니다. 이를 통해 자연스러운 로드 밸런싱, 태스크 라우팅, 서버 측 속도 제어가 가능해집니다. Worker가 다운되더라도 task는 queue에 안전하게 남아 다른 worker가 처리할 수 있습니다.
- **워커 등록 일치**: 특정 task queue를 폴링하는 모든 worker는 해당 queue로 전달될 모든 workflow와 activity를 처리할 수 있도록 동일한 코드를 등록해야 합니다.

##### 5.3. Task Routing and Worker Session

Task Routing은 특정 activity task를 특정 worker나 worker 그룹으로 보내는 프로세스입니다.

- **특정 환경으로 라우팅**: GPU가 장착된 머신에서만 실행되어야 하는 AI 모델 추론 activity처럼, 특정 하드웨어를 요구하는 작업을 해당 worker에게만 보낼 수 있습니다.
- **데이터 지역성 활용**: 대용량 파일을 다운로드한 후, 관련 처리 작업을 동일한 호스트에서 실행하여 효율을 높일 수 있습니다.
- **Worker Session**: 일부 SDK는 세션 API를 제공하여, 관련된 일련의 activity들이 동일한 worker에서 실행되도록 보장해줍니다.

##### 5.4. Sticky Execution

Sticky Execution은 workerflow의 후속 task들을 가급적 동일한 worker에게 전달하여 성능을 최적화하는 기법입니다. Worker는 이전에 실행했던 workflow의 상태를 메모리에 캐시하여, 매번 전체 event history를 다시 읽는 비용을 줄입니다. 만약 해당 work가 다운되면 task는 다른 가용한 worker로 전달되어 안정성을 보장합니다.

### 6. Use Case

Temporal을 Python 환경에서 사용하는 단계를 AI 이미지 생성 workflow 예시와 함께 살펴보겠습니다.

- **개발 환경 설정:**

  - Temporal Python SDK 설치: `pip install temporalio` (혹은 `uv add temporalio`)

  - 로컬 Temporal 서버 실행 (Docker 사용 권장):

    ```bash
    docker run --rm -p 7233:7233 --name temporal-dev temporalio/auto-setup:latest
    ```

  - 프로젝트 구조 예시:

    ```
    my_temporal_ai_project/
    ├── workflows.py       # 워크플로 정의
    ├── activities.py      # 액티비티 정의
    ├── run_worker.py      # 워커 실행 스크립트
    ├── run_workflow.py    # 워크플로 시작 스크립트
    ```

- **Python으로 workflow 정의하기:**

  - `@workflow.defn`과 `@workflow.run` 데커레이터를 사용합니다.

    ```python
    # workflows.py
    from datetime import timedelta
    from temporalio import workflow
    
    # 액티비티 모듈을 결정론적으로 임포트
    with workflow.unsafe.imports_passed_through():
        from activities import generate_image_activity, notify_user_activity
    
    @workflow.defn
    class AIImageGenerationWorkflow:
        @workflow.run
        async def run(self, prompt: str, user_id: str) -> str:
            workflow.logger.info(f"Workflow started for prompt '{prompt}'.")
    
            # AI 이미지 생성 액티비티 실행 (긴 타임아웃 설정)
            image_url = await workflow.execute_activity(
                generate_image_activity,
                prompt,
                start_to_close_timeout=timedelta(minutes=30),
            )
    
            # 사용자 알림 액티비티 실행
            await workflow.execute_activity(
                notify_user_activity,
                f"User {user_id}, your image is ready: {image_url}",
                start_to_close_timeout=timedelta(seconds=60),
            )
    
            return f"Workflow complete. Image URL: {image_url}"
    ```

- **Python으로 activity 정의하기:**

  - `@activity.defn` 데커레이터를 사용합니다.

    ```python
    # activities.py
    import asyncio
    from temporalio import activity
    
    @activity.defn
    async def generate_image_activity(prompt: str) -> str:
        activity.logger.info(f"Generating image for prompt: '{prompt}'")
        # 실제 AI 모델 호출 로직이 여기에 위치합니다.
        # 이 예제에서는 30초 대기를 통해 장시간 작업을 시뮬레이션합니다.
        await asyncio.sleep(30)
        return f"https://example.com/images/{prompt.replace(' ', '_')}.png"
    
    @activity.defn
    async def notify_user_activity(message: str) -> None:
        activity.logger.info(f"Sending notification: {message}")
        # 실제 사용자 알림 로직 (이메일, 웹소켓 등)
        await asyncio.sleep(1)
        activity.logger.info("Notification sent.")
    ```

- **Worker 생성 및 실행:**

  - `Worker` 객체를 생성하고, 폴링할 `task_queue`와 처리할 `workflows`, `activities`를 등록합니다.

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

- **Python 클라이언트에서 workflow execution 시작:**

  - 별도의 스크립트에서 `client.execute_workflow()`를 호출하여 workflow execution을 시작합니다.

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
    
        # 워크플로 실행을 시작하고 완료될 때까지 기다립니다.
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

  - **실행 방법**: 두 개의 터미널에서 각각 워커(`python run_worker.py`)와 workflow 시작 스크립트(`python run_workflow.py`)를 실행합니다.

Workflow ID는 단순한 식별자를 넘어, 실행 중인 프로세스를 조회, 시그널링, 취소하는 등 동적인 상호작용을 가능하게 하는 핵심 요소입니다.

### 7. Celery vs. Temporal

기존 FastAPI, Redis, Celery 스택을 Temporal로 마이그레이션하는 과정을 살펴보겠습니다.

- **기존 아키텍처 (FastAPI + Redis + Celery):**

  - 흐름: FastAPI가 요청을 받으면 Celery task를 생성해 Redis에 전달합니다. Celery worker가 작업을 처리하고 결과를 다시 DB나 Redis에 저장합니다.
  - 역할: FastAPI(API 제공), Celery(비동기 작업 실행), Redis(메시지 브로커).

- **Celery/Redis 스택의 한계:**

  - 상태 관리의 어려움: Celery task는 상태를 저장하지 않으므로(stateless), 복잡한 작업의 중간 상태를 유지하려면 개발자가 직접 상태 저장 로직을 구현해야 합니다.
  - 복잡한 오케스트레이션의 난이도: task 간 의존성 관리, 조건부 분기, 보상 트랜잭션 등을 구현하려면 상당한 추가 코드가 필요합니다.
  - 가시성 및 디버깅의 한계: 전체 프로세스의 현재 상태를 한눈에 파악하기 어렵고, 실패 시 원인 추적이 복잡합니다.
  - 장기 실행 작업의 불안정성: 수 시간에 걸친 작업은 worker 재시작이나 배포로 중단될 경우, 중단된 지점부터 안정적으로 재개하기가 거의 불가능합니다.

- **Temporal이 이러한 한계를 해결하는 방법:**

  - 내장된 상태 관리: Workflow 자체가 상태를 가지며, 이 상태는 Temporal cluster에 의해 자동으로 지속됩니다.
  - 코드로 작성하는 명확한 오케스트레이션: `if-else`, `for`, `try-except` 등 일반적인 프로그래밍 구문으로 복잡한 로직을 명확하게 표현할 수 있습니다.
  - 뛰어난 가시성과 정교한 오류 처리: Temporal Web UI는 모든 workflow의 상세한 상태와 event history를 제공하며, 유연한 재시도 정책을 코드 내에서 설정할 수 있습니다.
  - 장기 실행 작업의 완벽한 지원: Workflow는 며칠, 몇 주 동안 중단 없이 실행되도록 설계되었으며, 장애 발생 시 중단된 지점부터 자동으로 재개됩니다.

- **마이그레이션 단계 및 예시:**

  - FastAPI 엔드포인트 변경: Celery의 `.delay()` 호출 대신, Temporal 클라이언트로 `client.start_workflow()`를 호출합니다. 이 메서드는 즉시 반환되므로 API 응답이 빠릅니다.

    ```python
    # fast_api_app.py (일부)
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
    
        # 워크플로 실행을 '시작'하고 즉시 반환
        await temporal_client.start_workflow(
            AIImageGenerationWorkflow.run,
            prompt,
            user_id,
            id=workflow_id,
            task_queue="ai-image-generation-task-queue",
        )
        # 사용자에게는 작업 ID를 반환하여 상태를 추적하게 함
        return {"message": "AI image generation started.", "workflow_id": workflow_id}
    ```

    `start_workflow`를 사용하면 FastAPI는 빠른 응답에, Temporal은 장기 실행 작업 처리에 집중하는 역할 분담이 명확해집니다.

  - **Celery 작업 로직 $\to$ Temporal Activity**: 기존 Celery task 함수의 비즈니스 로직을 Temporal activity 함수로 옮깁니다.

  - **Workflow 오케스트레이션**: 새로운 Temporal workflow를 정의하여 activity들을 원하는 순서와 조건에 따라 호출합니다.

  - **Redis의 역할 변화**: Celery의 메시지 브로커로 사용되던 Redis는 더 이상 필요 없으며, Temporal cluster가 이 역할을 수행합니다.

| 기능                | Celery + Redis                             | Temporal                                             |
| ------------------- | ------------------------------------------ | ---------------------------------------------------- |
| 상태 관리           | 수동 (개발자가 Redis/DB에 직접 구현)       | **내장** (worfklow 상태 자동 지속 및 관리)           |
| 오케스트레이션 로직 | 수동/복잡 (작업 체인, 콜백 등 사용)        | **코드로 명시적 작성** (worfklow 내 프로그래밍 로직) |
| 내결함성/재시도     | 설정 기반/기본적 수준                      | **세분화된 제어/내장 기능** (activity/workflow 수준) |
| 프로세스 가시성     | 제한적 (외부 모니터링 도구 필요)           | **풍부한 웹 UI/API 제공** (상세한 event history)     |
| 장시간 실행 (일/주) | 어려움/불안정 (worker 재시작 시 상태 유실) | **강력하게 지원** (중단 지점부터 자동 재개)          |
| 개발 패러다임       | 상태 비저장(Stateless) 개별 작업 중심      | **상태 저장(Stateful) 전체 workflow 중심**           |
| 인프라 복잡성       | 메시지 브로커(Redis) + worker 관리         | Temporal cluster + worker 관리                       |

Temporal로의 마이그레이션은 단순히 라이브러리를 교체하는 것을 넘어, 비동기 처리 방식을 근본적으로 재설계하는 과정입니다. 초기 학습 곡선이 필요하지만, 장기적으로 시스템의 복잡성을 낮추고 안정성과 유지보수성을 크게 향상시킬 수 있습니다.

### 8. Conclusion

Temporal는 복잡하고 상태 유지가 중요하며 장시간 실행되는 애플리케이션, 특히 AI 이미지 생성과 같은 까다로운 작업을 처리하는 데 있어 기존 스택을 대체할 강력한 대안입니다. 핵심 이점은 workflow의 내구성, 신뢰성, 가시성을 획기적으로 향상시킨다는 점입니다. 이를 통해 개발자는 반복적인 오류 처리나 수동 상태 관리의 부담에서 벗어나 비즈니스 가치 창출에 집중할 수 있습니다.

Temporal을 선택하는 것이 특히 유용한 경우는 다음과 같습니다.

- 여러 단계로 구성되고, 며칠 또는 몇 주에 걸쳐 실행될 수 있는 복잡한 프로세스를 구축해야 할 때.
- 시스템 장애에도 불구하고 작업이 반드시 완료되어야 하는, 강력한 내구성과 자동 복구 기능이 필요할 때.
- 실행 중인 모든 프로세스의 상태와 이력을 상세히 파악하여 문제를 신속하게 진단해야 할 때.

물론 Temporal 도입에는 워크플로 코드를 결정론적으로 작성해야 한다는 제약 조건과 같은 초기 학습 곡선이 따릅니다. 또한, Temporal 클러스터 자체 호스팅에 따른 인프라 관리 부담이나 Temporal Cloud 사용 시의 비용도 고려해야 합니다.

마지막으로, Temporal의 중요한 장점 중 하나는 다양한 프로그래밍 언어를 네이티브로 지원한다는 점입니다. 이는 향후 여러 팀과 협업하거나 마이크로서비스 아키텍처로 확장할 때 중요한 전략적 이점이 될 수 있습니다. 결론적으로, Temporal은 복잡한 분산 시스템 구축의 여러 난제를 해결하기 위해 등장한 혁신적인 도구이며, 특히 까다로운 장기 실행 작업을 안정적으로 처리하는 데 있어 개발자들에게 새로운 가능성을 열어줄 것입니다.

### 9. Reference

- https://docs.temporal.io
