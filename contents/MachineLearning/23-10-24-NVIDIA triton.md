---
title: "NVIDIA Triton Inference Server"
date: "2023-10-24"
template: "post"
draft: false
path: "/MLOps/23-10-24/"
description: "NVIDIA Triton Inference Server 사용을 위한 기본 개념들과 샘플 코드를 기록합니다. Triton은 NVIDIA가 직접 만든 모델 추론용 서버입니다. Triton 내부에서는 추론 최적화 및 GPU 활용률을 높일 수 있는 여러 기능들을 제공하고 있으며, 모델을 model repository에 저장하면 간단히 추론 API도 만들 수 있습니다."
category: "MLOps"
---

> NVIDIA Triton Inference Server 사용을 위한 기본 개념들과 샘플 코드를 기록합니다. 

NVIDIA Triton은 NVIDIA가 직접 만든 모델 inference용 서버입니다. Triton 내부에서는 추론 최적화 및 GPU 활용률을 높일 수 있는 여러 기능들을 제공하고 있으며, 학습된 모델을 model repository에 저장하기만 하면 간단히 inference API를 만들 수도 있습니다.

아직 작성중인 포스팅입니다.

### Model Repository

- Model repository란
- Model repository 기본 구성 요소, directory 구조 살펴보기

### Model Configuration

- Model configuration 설정 방법

### Model Management

### Metrics

### Protocol

- HTTP/REST and gRPC

### Example Codes

아래의 순서대로 코드를 기록하기

1. Model Training & JIT Export
2. Create model repository
3. Run Triton server
4. Install Triton client
5. Test inference (request)

### References

좋은 깃헙 예제들을 발견하여 아래에 공유합니다.

- https://github.com/Curt-Park/triton-inference-server-practice
- https://github.com/fegler/triton_server_example
- https://github.com/triton-inference-server/tutorials

공부를 위한 문서들을 아래에 공유합니다.

- https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/getting_started/quickstart.html
- https://developer.nvidia.com/blog/nvidia-serves-deep-learning-inference/

더 쉬운 사용을 위한 wrapper 오픈소스도 존재하네요!

- https://blog.rtzr.ai/tritony-tiny-configuration-for-triton-inference-server/
