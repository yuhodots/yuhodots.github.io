---
title: "Deep Learning Model Optimization"
date: "2024-08-24"
template: "post"
draft: false
path: "/deeplearning/24-08-24/"
description: "딥러닝 모델 최적화를 위한 방법들에 대해 정리합니다. 작성중인 게시글이며 계속해서 내용을 추가하고 있습니다. PCA: X가 mean normalization된 행렬이라고 할 때, 공분산 행렬에 eigenvalue decomposition을 수행하여 eigenvalue와 eigenvector를 얻어낸 뒤, eigenvalue 값이 큰 방향(즉, 분산이 큰 방향)을 남겨서 데이터를 표현함"
category: "Deep Learning"
---

> 딥러닝 모델 최적화를 위한 방법들에 대해 정리합니다. 작성중인 게시글이며 계속해서 내용을 추가하고 있습니다.

### Dimension Reduction

- PCA: $X$가 mean normalization된 행렬이라고 할 때, 공분산 행렬 $X^\top X$에 eigenvalue decomposition을 수행하여 eigenvalue와 eigenvector를 얻어낸 뒤, eigenvalue 값이 큰 방향(즉, 분산이 큰 방향)을 남겨서 데이터를 표현함
- Linear projection: 모델의 feature dimension을 줄이기 위해 projection layer를 추가적으로 붙여서 fine-tuning
- Matryoshka representation learning: 배포 단계에서 바로, 원하는 dimension으로 feature embedding을 slicing 해서 사용할 수 있는 방법. 더 자세한 내용은 [이전 포스팅](https://yuhodots.github.io/deeplearning/24-07-11/) 참고

### Quantization

딥러닝 모델을 경량화하고 추론 속도를 높이기 위해 사용되는 기술로, 모델의 가중치나 activation 값을 낮은 정밀도의 수로 표현하는 기법. Float32를 Float16, Float8, BFloat16 등으로 변환할 수 있는데, BFloat와 Float 사이의 설명은 [이 영상](https://www.youtube.com/watch?v=7q1Gh1KOlzw&t=32s)에서 참고 가능 (요약하자면, Float16은 정밀도가 높으나 float overflow 발생할 수 있고, BFloat은 그 반대)

- Post-Training Quantization (PTQ): 이미 학습된 모델을 양자화하는 방법. 학습 후에 가중치와 activation를 정밀도가 낮은 형식으로 변환. 추가적인 학습 과정 없이 양자화를 적용할 수 있어 간편하지만, 성능 손실이 발생할 수 있음
  - Weight quantization: 학습된 모델의 가중치를 8비트 정수로 변환
  - Activation quantization: Activation 값을 정수로 변환

- Quantization-Aware Training (QAT): 양자화의 효과를 고려하여 모델을 학습하는 방법입. 학습 과정에서 양자화된 가중치와 activation값을 사용하여 성능 저하를 최소화. PTQ보다 더 높은 정확도를 유지할 수 있지만, 학습 과정이 복잡하고 시간이 더 오래 걸릴 수 있음

  - Fake quantization: 학습 중에 양자화된 값처럼 처리하지만, 실제로는 높은 정밀도로 계산을 수행

  - 트레이닝 루프 내 양자화: 모델 학습 중에 주기적으로 양자화된 값으로 손실을 계산하여 실제 양자화된 모델과 유사한 결과를 얻음


- Dynamic Quantization: Activation 값을 실시간으로 양자화하는 방법. 모델이 실행될 때마다 activation 값을 정밀도가 낮은 형식으로 변환하여 연산합니다. CPU와 같은 자원에서 실행되는 모델에 적합하며, 런타임 시에만 양자화를 적용하므로 성능 손실이 적음

  - 동적 범위 양자화: Activation 값의 범위를 실행 중에 동적으로 계산하여 최적의 양자화 범위를 적용

  - 런타임 정밀도 조정: 연산 시 정밀도를 동적으로 조정하여 연산 성능을 최적화


- Static Quantization: 모델의 모든 요소(가중치 및 activation 값)를 사전에 고정된 정밀도로 양자화하는 방법. 모델이 실행되기 전에 양자화를 완료

  - 고정 범위 양자화: 모든 activation과 가중치를 사전 정의된 범위 내에서 양자화합니다.

  - 범위 학습 (Range Learning): 양자화 전에 데이터의 분포를 분석하여 최적의 범위를 학습합니다.


- Integer Quantization / Binarization and Ternarization / Mixed-Precision Quantization: 가중치와 activation 값을 각각 정수, 1bit(or 2bit), 혹은 레이어별 양자화를 적용하는 방법
- Quantization with Clustering: 가중치를 클러스터링하여 비슷한 값끼리 그룹화하고, 각 그룹의 대표값을 사용해 양자화하는 방법. 가중치의 범위가 넓거나, 메모리 사용량을 극도로 줄여야 하는 경우 사용

### Knowledge Distillation

복잡하고 큰 모델(Teacher model)의 지식을 더 작은 모델(Student model)로 전달하여, 작은 모델이 비슷한 성능을 낼 수 있도록 학습시키는 기법

- Vanilla Knowledge Distillation: 가장 기본적인 knowledge distillation 방법. 소프트 타겟과 하드 타겟을 동시에 학습시키며, 로스 함수는 두 가지 손실의 가중합으로 구성 ([Distilling the Knowledge in a Neural Network](https://arxiv.org/abs/1503.02531))
- Self-Distillation: Teacher model과 student model이 동일한 네트워크 구조를 가지는 경우. 모델의 깊이 혹은 여러 레이어의 출력을 사용해 student model을 학습 ([Born Again Neural Networks](https://arxiv.org/abs/1805.04770))
- Hint-based Distillation: Teacher model의 중간 레이어 출력을 힌트로 사용하여 student model을 학습시키는 방법 ([FitNets: Hints for Thin Deep Nets](https://arxiv.org/abs/1412.6550))
- Attention Transfer: Teacher model의 attention map)을 student model이 학습하도록 하는 방법 ([Paying More Attention to Attention](https://arxiv.org/abs/1612.03928))
- Relational Knowledge Distillation: ([Relational Knowledge Distillation](https://arxiv.org/abs/1904.05068))

### Efficient Attentions

- Flash Attention: 기존 attention 연산은 High Bandwidth Memory (HBM)를 사용해서 계산을 수행하는데 이는 HBM은 메모리 값은 크지만 IO 속도가 느림. Flash attention은 Tiling과 Recomputation 방법을 통해 HBM IO를 최대한 줄이고 SRAM 통해 대부분 연산을 수행하는 방식으로 속도를 개선
- Grouped Query Attention(GQA): Multi-head attention(MHA) 처럼 여러 개의 key, query, value head를 N개씩 모두 두는 것이 아니라, 다수의 query를 그룹으로 묶어 각 그룹에 대해 하나의 대표 query head를 생성하여 attention을 계산하는 것. 즉 MHA 보다 query head의 수가 적어 연산량을 줄이면서도 성능은 유지됨

### Model Exporting

- 동적 그래프: 계산 그래프를 실행 시점(runtime)에 생성(주로 PyTorch). 따라서 코드가 간결하고 디버깅이 용이하며, 모델 구조의 변경 및 실험이 쉽다는 장점을 가짐. 하지만 실행할 때마다 그래프가 새로 생성되므로, 반복적인 연산에서는 성능이 떨어질 수 있음
- 정적 그래프: 계산 그래프를 미리 정의하고 최적화(TensorFlow 초기 버전). 그래프가 미리 고정되어 있어 최적화를 통해 더 빠른 실행이 가능하며 최적화 컴파일러를 통해 추가적인 성능 개선이 가능. 다만 모델 구조를 변경하려면 그래프를 다시 생성해야 하므로, 개발 과정에서의 유연성이 떨어질 수 있으며 디버깅이 어려움
- 정적 그래프는 사전에 최적화를 수행할 수 있기 때문에, 불필요한 연산을 제거하고 효율적으로 재배치하여 성능을 향상시킬 수 있음. 특히 ONNX, Torch Script, tensorRT 등으로로 변환된 모델은 GPU나 TPU 같은 하드웨어 가속기를 보다 효율적으로 활용할 수 있도록 설계되어 있음. 아래와 같은 다양한 최적화 기법이 적용됨

  - Layer fusion: 여러 레이어를 하나의 연산으로 결합하여 메모리 대역폭을 줄이고 실행 시간을 단축

  - Precision calibration: FP32(32-bit 부동 소수점) 모델을 FP16(16-bit 부동 소수점) 또는 INT8(8-bit 정수)로 변환하여 연산 속도를 높이고 메모리 사용 감소

  - Operator optimization: 특정 operator를 더 효율적으로 실행하기 위한 최적화 적용

  - 커널 자동 선택: 다양한 커널 중에서 가장 성능이 좋은 커널을 자동으로 선택하여 연산을 수행

### Model Serving

- NVIDIA Trition Server: 고성능 추론 서버로, AI 모델을 배포하고 운영하는 데 사용됨. 다양한 딥러닝 모델을 다양한 프레임워크에서 실행할 수 있도록 지원하며, GPU와 CPU 리소스를 효율적으로 활용해 높은 성능의 추론을 가능하게 도움

### GPU Programming

- GPU 커널이란?: GPU에서 실행되는 함수로, 일반적으로 수천 개의 스레드에서 동시에 실행됨. GPU 프로그래밍에서 커널은 계산 작업을 병렬로 수행하기 위한 핵심임
- OpenAI Triton: Python을 통해 GPU 커널을 쉽게 작성하고 최적화할 수 있게 하는 고성능 GPU 프로그래밍 프레임워크로, 딥러닝 연구자들이 커스텀 커널을 효율적으로 작성할 수 있도록 지원. 즉, CUDA를 직접 사용하지 않고도 효율적인 GPU 커널을 작성할 수 있게 해줌. CUDA를 직접 사용한 최적화보다는 성능이 낮을 수 있으며, 매우 세밀한 제어가 필요한 경우에는 한계가 있을 수 있음
- NVIDIA CUTLASS: CUDA를 기반으로 한 C++ 라이브러리로, 고성능 매트릭스 연산(GEMM)과 같은 딥러닝 및 HPC(고성능 컴퓨팅) 작업에 최적화된 커널을 작성할 수 있게 해줌. C++과 CUDA를 기반으로 하여 사용이 복잡하고 GPU 하드웨어에 대한 깊은 이해가 필요하지만, 특정 연산(e.g., 매트릭스 곱셈)에 대해 극한의 최적화를 제공하며 성능을 극대화할 수 있음
