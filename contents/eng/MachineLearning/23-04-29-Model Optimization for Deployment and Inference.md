---
title: "Deep Learning Model Serving"
date: "2023-04-29"
template: "post"
draft: false
path: "/Operations/23-04-29/"
description: "Brief notes on libraries and frameworks for AI model deployment. ONNX: Open Neural Network Exchange. A neural network model format developed by Facebook and Microsoft to make AI models built with different frameworks interoperable. TensorFlow, PyTorch, ..."
category: "Operations"
thumbnail: "Operations"
---

> Brief notes on libraries and frameworks for AI model deployment.

### Neural Network Exchange

##### ONNX: Open Neural Network Exchange

- A neural network model format developed by Facebook and Microsoft to make AI models built with different frameworks interoperable
- Models from various frameworks including TensorFlow, PyTorch, SciKit-Learn, Keras, Chainer, MXNet, MATLAB, and SparkML can be exported or converted to the standard ONNX format
- Torch to ONNX code source: [Microsoft - Convert PyTorch trained model to ONNX](https://learn.microsoft.com/ko-kr/windows/ai/windows-ml/tutorials/pytorch-convert-model)

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

- Static graph representation: Defines a static computational graph first, then operates by flowing data through the fixed graph. Since the same graph is used repeatedly, it has the advantage of easy graph optimization
- Dynamic graph representation: The computational graph is defined by flowing data through it. A new computational graph is built at every iteration. Conditional and loop statements can be used directly, making the code cleaner and debugging easier

##### TensorRT

- A model optimization engine that optimizes trained deep learning models to improve inference speed on NVIDIA GPUs by several to tens of times
- Automatically applies network compression, network optimization, and GPU optimization techniques to target deep learning models for optimal inference performance on the NVIDIA platform
- Technologies applied include *Quantization & Precision Calibration* that reduces precision from FP32, *Graph Optimization* based on Layer Fusion and Tensor Fusion approaches, as well as *Kernel Auto-tuning, Dynamic Tensor Memory & Multi-stream execution*
- When using ONNX and TensorRT together, models built with different frameworks can be made interoperable while enabling fast inference. In practice, it is common to develop models in TensorFlow or PyTorch, convert the format to ONNX, and compile with TensorRT

##### TorchScript

- TorchScript is an intermediate representation (IR) of PyTorch models that can be run in high-performance environments such as C++ (i.e., PyTorch's graph representation)
- Eager mode: Normal python runtime mode used during training
- Script mode: A mode converted for fast inference and deployment. Optimization is possible because it does not run through the python interpreter at runtime
- PyTorch JIT: A compiler optimized for PyTorch programs
- TorchScript conversion method 1. JIT Trace: Identifies the model structure by flowing a (dummy) input through the model

```python
dummy_input = torch.rand(1, 3, 224, 224)
script_module = torch.jit.trace(model, dummy_input)
```

- TorchScript conversion method 2. JIT Script: Directly converts code to TorchScript

```python
instance = MyModule(args)
script_module = torch.jit.script(instance)
```

### GPU Programming

##### Triton

- Is using only TensorRT and TorchScript enough?: Not everything can be expressed with static graphs alone
- Triton: A language and compiler created by OpenAI. Optimizes I/O-optimized CUDA code
- For related content, see [Kim Taehoon's 2023 Deview presentation](https://www.youtube.com/watch?v=Se62pRpk9A0). More content to be added after further study

### Reference

- [NVIDIA TensorRT – Inference 최적화 및 가속화를 위한 NVIDIA의 Toolkit](https://developer.nvidia.com/ko-kr/blog/nvidia-tensorrt-inference-최적화-및-가속화를-위한-nvidia의-toolkit/)
- [PyTorch JIT and TorchScript](https://towardsdatascience.com/pytorch-jit-and-torchscript-c2a77bac0fff)
- [파이토치 한국 사용자 모임 - TORCHSCRIPT 소개](https://tutorials.pytorch.kr/beginner/Intro_to_TorchScript_tutorial.html)
