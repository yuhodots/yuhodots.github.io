---
title: "Deep Learning Model Serving"
date: "2023-04-29"
template: "post"
draft: false
path: "/mlops/23-04-29/"
description: "AI 모델 배포를 위한 라이브러리와 프레임워크들에 대해 간단히 기록합니다. ONNX: Open Neural Network Exchange. 서로 다른 프레임워크로 만들어진 AI 모델을 서로 호환 가능하도록 Facebook과 Microsoft가 개발한 신경망 모델 포맷. TensorFlow, PyTorch, ..."
category: "MLOps"
thumbnail: "mlops"
---

> AI 모델 배포를 위한 라이브러리와 프레임워크들에 대해 간단히 기록합니다.

### Neural Network Exchange

##### ONNX: Open Neural Network Exchange

- 서로 다른 프레임워크로 만들어진 AI 모델을 서로 호환 가능하도록 Facebook과 Microsoft가 개발한 신경망 모델 포맷
- TensorFlow, PyTorch, SciKit-Learn, Keras, Chainer, MXNet, MATLAB, SparkML 등의 여러 프레임워크 모델을 표준 ONNX 형식으로 내보내거나 변환 가능
- Torch to ONNX 코드 출처: [Microsoft - PyTorch 학습 모델을 ONNX로 변환](https://learn.microsoft.com/ko-kr/windows/ai/windows-ml/tutorials/pytorch-convert-model)

```python
import torch.onnx 

#Function to Convert to ONNX 
def Convert_ONNX(model): 
    # set the model to inference mode 
    model.eval() 

    # Let's create a dummy input tensor  
    dummy_input = torch.randn(1, input_size, requires_grad=True)  

    # Export the model   
    torch.onnx.export(
         model,    # model being run 
         dummy_input,    # model input (or a tuple for multiple inputs) 
         "ImageClassifier.onnx",    # where to save the model  
         export_params=True,    # store the trained parameter weights inside the model file 
         opset_version=10,    # the ONNX version to export the model to 
         do_constant_folding=True,    # whether to execute constant folding for optimization 
         input_names = ['modelInput'],    # the model's input names 
         output_names = ['modelOutput'],    # the model's output names 
         dynamic_axes={'modelInput' : {0 : 'batch_size'},    # variable length axes 
                       'modelOutput' : {0 : 'batch_size'}}) 

if __name__ == "__main__": 
    model = Network() 
    path = "myFirstModel.pth" 
    model.load_state_dict(torch.load(path)) 
    Convert_ONNX(model) 
```

### Neural Network Optimization

##### Static Graph vs. Dynamic Graph

- 정적 그래프(Static graph) 표현: 정적인 computational graph를 먼저 정의하고, 고정된 그래프에 데이터를 흘려주는 방식으로 동작. 동일한 그래프를 반복적으로 사용하므로 그래프에 대한 최적화가 쉽다는 장점
- 동적 그래프(Dynamic graph) 표현: 데이터를 흘려보냄으로써 computational graph 정의됨. 즉, 매 iteration 마다 새로운 computational graph 구축. 조건문 반복문 등을 그대로 사용할 수 있으며 코드가 깔끔해지고 디버깅이 쉬워짐

##### TensorRT

- 학습된 Deep Learning 모델을 최적화하여 NVIDIA GPU 상에서의 Inference 속도를 수배에서 수십배까지 개선해주는 모델 최적화 엔진
- NVIDIA platform에서 최적의 inference 성능을 낼 수 있도록 network compression, network optimization 그리고 GPU 최적화 기술들을 대상 딥러닝 모델에 자동으로 적용
- FP32에서 precision을 낮추는 *Quantization & Precision Calibration*, Layer Fusion 방식과 Tensor Fusion 방식 기반의 *Graph Optimization*, 그리고 *Kernel Auto-tuning, Dynamic Tensor Memory & Multi-stream execution* 등의 기술 적용됨
- ONNX와 TensorRT 함께 사용시에, 여러 서로 다른 프레임워크로 만들어진 모델을 호환 가능하게 만들면서도 빠른 추론이 가능. 실제로 TensorFlow나 Pytorch로 모델 개발하고, ONNX로 포멧 바꾸고, TensorRT로 컴파일하는 형태 일반적임

##### TorchScript

- TorchScript는 C++와 같은 고성능 환경에서 실행될 수 있는 PyTorch 모델의 중간 표현(IR)임 (i.e., PyTorch의 그래프 표현)
- Eager mode: normal python runtime mode로 학습 단계에서 사용
- Script mode: 빠른 추론 및 배포를 위해 변환한 mode. 런타임 과정에서 python interpreter로 실행되지 않아 최적화 가능
- PyTorch JIT: PyTorch 프로그램에 최적화된 컴파일러
- TorchScript 변환 방식 1. JIT Trace: (dummy) input을 모델에 흘려보내 모델 구조를 파악하는 방식

```python
dummy_input = torch.rand(1, 3, 224, 224)
script_module = torch.jit.trace(model, dummy_input)
```

- TorchScript 변환 방식 2. JIT Script: 코드를 직접 TorchScript로 변환하는 방식

```python
instance = MyModule(args)
script_module = torch.jit.script(instance)
```

### GPU Programming

##### Triton

- TensorRT, TorchScript만 사용하면 되는가?: Static graph만으로 모든 걸 알 순 없음
- Triton: OpenAI가 만든 언어 및 컴파일러. I/O 최적화된 CUDA 코드를 최적화
- 관련 내용은 [김태훈 님의 2023 Deview 발표 영상](https://www.youtube.com/watch?v=Se62pRpk9A0)에서 확인. 더 공부하여 내용 추가하기

### Reference

- [NVIDIA TensorRT – Inference 최적화 및 가속화를 위한 NVIDIA의 Toolkit](https://developer.nvidia.com/ko-kr/blog/nvidia-tensorrt-inference-최적화-및-가속화를-위한-nvidia의-toolkit/)
- [PyTorch JIT and TorchScript](https://towardsdatascience.com/pytorch-jit-and-torchscript-c2a77bac0fff)
- [파이토치 한국 사용자 모임 - TORCHSCRIPT 소개](https://tutorials.pytorch.kr/beginner/Intro_to_TorchScript_tutorial.html)

