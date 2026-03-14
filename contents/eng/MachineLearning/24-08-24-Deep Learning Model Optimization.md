---
title: "Deep Learning Model Optimization"
date: "2024-08-24"
template: "post"
draft: false
path: "/deeplearning/24-08-24/"
description: "A summary of methods for deep learning model optimization. This is a work-in-progress post with content being added continuously. PCA: Given a mean-normalized matrix X, perform eigenvalue decomposition on the covariance matrix to obtain eigenvalues and eigenvectors, then represent data by keeping directions with large eigenvalues (i.e., directions of high variance)"
category: "Deep Learning"
---

> A summary of methods for deep learning model optimization. This is a work-in-progress post with content being added continuously.

### Dimension Reduction

- PCA: Given a mean-normalized matrix $X$, perform eigenvalue decomposition on the covariance matrix $X^\top X$ to obtain eigenvalues and eigenvectors, then represent the data by keeping the directions with large eigenvalues (i.e., directions of high variance)
- Linear projection: Add a projection layer to reduce the model's feature dimension and fine-tune
- Matryoshka representation learning: A method that allows slicing feature embeddings to any desired dimension directly at deployment. For more details, refer to the [previous post](https://yuhodots.github.io/deeplearning/24-07-11/)

### Quantization

A technique used to reduce the size of deep learning models and speed up inference by representing model weights or activation values with lower-precision numbers. Float32 can be converted to Float16, Float8, BFloat16, etc. The difference between BFloat and Float can be referenced from [this video](https://www.youtube.com/watch?v=7q1Gh1KOlzw&t=32s) (in summary, Float16 has higher precision but may cause float overflow, while BFloat is the opposite)

- Post-Training Quantization (PTQ): A method of quantizing an already trained model. After training, the weights and activations are converted to lower-precision formats. It is convenient since no additional training is required, but performance degradation may occur
  - Weight quantization: Converting the trained model's weights to 8-bit integers
  - Activation quantization: Converting activation values to integers

- Quantization-Aware Training (QAT): A method of training the model while accounting for the effects of quantization. By using quantized weights and activation values during training, performance degradation is minimized. It can maintain higher accuracy than PTQ, but the training process is more complex and time-consuming

  - Fake quantization: During training, values are processed as if quantized, but computations are actually performed in higher precision

  - In-training-loop quantization: During model training, quantized values are periodically used to compute the loss, yielding results similar to those of an actually quantized model


- Dynamic Quantization: A method that quantizes activation values in real time. Each time the model runs, activation values are converted to lower-precision formats for computation. Suitable for models running on resources like CPUs, and since quantization is applied only at runtime, performance loss is minimal

  - Dynamic range quantization: The range of activation values is dynamically computed during execution to apply the optimal quantization range

  - Runtime precision adjustment: Precision is dynamically adjusted during computation to optimize performance


- Static Quantization: A method that quantizes all model elements (weights and activation values) to a fixed precision beforehand. Quantization is completed before the model runs

  - Fixed-range quantization: All activations and weights are quantized within a predefined range.

  - Range learning: The data distribution is analyzed before quantization to learn the optimal range.


- Integer Quantization / Binarization and Ternarization / Mixed-Precision Quantization: Methods that convert weights and activation values to integers, 1-bit (or 2-bit), or apply per-layer quantization respectively
- Quantization with Clustering: A method that clusters weights by grouping similar values and uses a representative value for each group for quantization. Used when the weight range is wide or memory usage must be minimized

### Knowledge Distillation

A technique that transfers knowledge from a complex, large model (Teacher model) to a smaller model (Student model), enabling the smaller model to achieve comparable performance

- Vanilla Knowledge Distillation: The most basic knowledge distillation method. Both soft targets and hard targets are trained simultaneously, and the loss function is a weighted sum of two losses ([Distilling the Knowledge in a Neural Network](https://arxiv.org/abs/1503.02531))
- Self-Distillation: When the teacher model and student model share the same network architecture. The student model is trained using the outputs from the model's depth or multiple layers ([Born Again Neural Networks](https://arxiv.org/abs/1805.04770))
- Hint-based Distillation: A method that trains the student model using the intermediate layer outputs of the teacher model as hints ([FitNets: Hints for Thin Deep Nets](https://arxiv.org/abs/1412.6550))
- Attention Transfer: A method where the student model learns the attention maps of the teacher model ([Paying More Attention to Attention](https://arxiv.org/abs/1612.03928))
- Relational Knowledge Distillation: ([Relational Knowledge Distillation](https://arxiv.org/abs/1904.05068))

### Efficient Attentions

- Flash Attention: Conventional attention computation uses High Bandwidth Memory (HBM), which has large memory capacity but slow IO speed. Flash Attention improves speed by minimizing HBM IO through tiling and recomputation techniques, performing most computations via SRAM
- Grouped Query Attention (GQA): Instead of having N separate key, query, and value heads like Multi-Head Attention (MHA), multiple queries are grouped together and a single representative query head is created for each group to compute attention. This reduces the number of query heads compared to MHA, lowering computational cost while maintaining performance

### Model Exporting

- Dynamic graph: The computation graph is created at runtime (primarily PyTorch). This makes code concise and debugging easy, with the advantage of facilitating model structure changes and experiments. However, since the graph is recreated each time it runs, performance may suffer for repetitive computations
- Static graph: The computation graph is defined and optimized in advance (early versions of TensorFlow). Since the graph is fixed in advance, faster execution is possible through optimization, and additional performance improvements can be achieved through optimizing compilers. However, flexibility during development may be limited since the graph must be recreated to change the model structure, and debugging is more difficult
- Static graphs can perform optimizations in advance, removing unnecessary computations and efficiently rearranging them to improve performance. In particular, models converted to ONNX, TorchScript, TensorRT, etc. are designed to more efficiently utilize hardware accelerators like GPUs and TPUs. Various optimization techniques are applied, including:

  - Layer fusion: Combining multiple layers into a single operation to reduce memory bandwidth and shorten execution time

  - Precision calibration: Converting FP32 (32-bit floating point) models to FP16 (16-bit floating point) or INT8 (8-bit integer) to speed up computation and reduce memory usage

  - Operator optimization: Applying optimizations to execute specific operators more efficiently

  - Automatic kernel selection: Automatically selecting the best-performing kernel from various options to perform computations

### Model Serving

- NVIDIA Triton Server: A high-performance inference server used for deploying and operating AI models. It supports running various deep learning models across different frameworks and efficiently utilizes GPU and CPU resources to enable high-performance inference

### GPU Programming

- What is a GPU kernel?: A function executed on the GPU, typically running simultaneously across thousands of threads. In GPU programming, kernels are the core unit for performing computational tasks in parallel
- OpenAI Triton: A high-performance GPU programming framework that enables easy writing and optimization of GPU kernels through Python, supporting deep learning researchers in writing custom kernels efficiently. It allows writing efficient GPU kernels without directly using CUDA. However, performance may be lower than direct CUDA optimization, and there may be limitations when very fine-grained control is needed
- NVIDIA CUTLASS: A C++ library based on CUDA that enables writing optimized kernels for deep learning and HPC (High Performance Computing) tasks such as high-performance matrix operations (GEMM). It is complex to use since it is based on C++ and CUDA and requires deep understanding of GPU hardware, but it provides extreme optimization for specific operations (e.g., matrix multiplication) and can maximize performance
