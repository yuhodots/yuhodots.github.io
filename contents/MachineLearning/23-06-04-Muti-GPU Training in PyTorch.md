---
title: "Multi-GPU Training in PyTorch"
date: "23-06-04"
template: "post"
draft: true
path: "/deeplearning/23-06-04/"
description: "Pytorch에서 multu-gpu training 하는 법을 정리합니다. 대충 정리할 예정이라서 open 하지 않고 draft 상태로 둘 예정입니다."
category: "Deep Learning"
thumbnail: "deeplearning"
---

> Pytorch에서 multu-gpu training 하는 법을 정리합니다. 대충 정리할 예정이라서 open 하지 않고 draft 상태로 둘 예정입니다.

### Overview

https://pytorch-lightning.readthedocs.io/en/0.9.0/multi_gpu.html

- Data Parallel: multiple-gpus, 1 machine(i.e., node)
- DistributedDataParallel: multiple-gpus across many machines (python script based)
- DistributedDataParallel Spawn: multiple-gpus across many machines (mp.spawn based, same results with ddp)
- DistributedDataParallel 2: DP in a machine, DDP across machines

### Data Parallel (DP)

- `DataParallel`는 single-process multi-thread parallelism을 수행하기에 (python GIL 때문에) DDP보다 느리고, not recommended
- 
- $k$ GPU에 batch를 split. 즉, 32 batch와 GPU 2개를 가지고 있다면 각 GPU가 16개씩 프로세싱하고, root node가 결과를 aggregate

### Distributed Data Parallel (DDP)

- `DistributedDataParallel`는 multi-process parallelism을 수행
- Node 수와 각각의 GPU 수를 곱한 것을 world size라 하며, process id는 rank라 함 (local rank, global rank 존재)
- **Gradient**가 aggregated and averaged

1. Each GPU across each node gets its own process.
2. Each GPU gets visibility into a subset of the overall dataset. It will only ever see that subset.
3. Each process inits the model.
   - Make sure to set the random seed so that each model initializes with the same weights.
4. Each process performs a full forward and backward pass in parallel.
5. The gradients are synced and averaged across all processes.
6. Each process updates its optimizer.

- 잘 정리된 글 있으니 읽어보기: https://hongl.tistory.com/293

##### Distributed Data Parallel2 (Lightning)

- In certain cases, it’s advantageous to use all batches on the same machine instead of a subset. For instance, you might want to compute a NCE loss where it pays to have more negative samples. 
- In this case, we can use DDP2 which behaves like DP in a machine and DDP across nodes. DDP2 does the following:

1. Copies a subset of the data to each node.
2. Inits a model on each node.
3. Runs a forward and backward pass using DP.
4. Syncs gradients across nodes.
5. Applies the optimizer updates.

- Single node인 경우에는 DP와 DDP2가 차이가 없음
- 근데 사용하는 사람 거의 없어서 1.9에서 deprecated되었음: https://github.com/Lightning-AI/lightning/issues/12584

### Contrastive Learning with DDP

- 해당 이슈 쭉 정독하면 됨: https://github.com/Lightning-AI/lightning/discussions/14390

