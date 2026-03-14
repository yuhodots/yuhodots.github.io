---
title: "Multi-GPU Training in PyTorch"
date: "2023-06-04"
template: "post"
draft: true
path: "/deeplearning/23-06-04/"
description: "A summary of multi-GPU training methods in PyTorch. This is a rough set of notes, so it will remain in draft status."
category: "Deep Learning"
thumbnail: "deeplearning"
---

> A summary of multi-GPU training methods in PyTorch. This is a rough set of notes, so it will remain in draft status.

### Overview

https://pytorch-lightning.readthedocs.io/en/0.9.0/multi_gpu.html

- Data Parallel: multiple-gpus, 1 machine(i.e., node)
- DistributedDataParallel: multiple-gpus across many machines (python script based)
- DistributedDataParallel Spawn: multiple-gpus across many machines (mp.spawn based, same results with ddp)
- DistributedDataParallel 2: DP in a machine, DDP across machines

### Data Parallel (DP)

- `DataParallel` performs single-process multi-thread parallelism, which is slower than DDP (due to Python's GIL) and is not recommended.
- The batch is split across $k$ GPUs. For example, with a batch size of 32 and 2 GPUs, each GPU processes 16 samples, and the root node aggregates the results.

### Distributed Data Parallel (DDP)

- `DistributedDataParallel` performs multi-process parallelism.
- The world size is the product of the number of nodes and GPUs per node, and each process ID is called a rank (local rank and global rank exist).
- **Gradients** are aggregated and averaged.

1. Each GPU across each node gets its own process.
2. Each GPU gets visibility into a subset of the overall dataset. It will only ever see that subset.
3. Each process inits the model.
   - Make sure to set the random seed so that each model initializes with the same weights.
4. Each process performs a full forward and backward pass in parallel.
5. The gradients are synced and averaged across all processes.
6. Each process updates its optimizer.

- A well-organized article worth reading: https://hongl.tistory.com/293

##### Distributed Data Parallel2 (Lightning)

- In certain cases, it's advantageous to use all batches on the same machine instead of a subset. For instance, you might want to compute a NCE loss where it pays to have more negative samples.
- In this case, we can use DDP2 which behaves like DP in a machine and DDP across nodes. DDP2 does the following:

1. Copies a subset of the data to each node.
2. Inits a model on each node.
3. Runs a forward and backward pass using DP.
4. Syncs gradients across nodes.
5. Applies the optimizer updates.

- For a single node, there is no difference between DP and DDP2.
- However, very few people used it, so it was deprecated in version 1.9: https://github.com/Lightning-AI/lightning/issues/12584

### Contrastive Learning with DDP

- Read through this issue for details: https://github.com/Lightning-AI/lightning/discussions/14390

