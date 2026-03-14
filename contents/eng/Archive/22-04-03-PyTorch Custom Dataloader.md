---
title: "PyTorch Custom Dataloader"
date: "2022-04-03"
template: "post"
draft: false
path: "/cheatsheet/22-04-03/"
description: "toch.utils.data 공식 문서를 읽고 pytoch dataloder 사용법을 기록합니다. torch.utils.data.DataLoader class constructor arguments는 다음과 같습니다. PyTorch에서 지원하는 dataset의 타입은 두 가지가 있습니다. Map-style datasets과 Iterable-style datasets 입니다."
category: "Cheat Sheet"

---

> Notes on PyTorch dataloader usage after reading the official torch.utils.data documentation.

### Dataloader

The [torch.utils.data.DataLoader](https://pytorch.org/docs/stable/data.html#torch.utils.data.DataLoader) class constructor arguments are as follows:

```python
DataLoader(dataset, batch_size=1, shuffle=False, sampler=None,
           batch_sampler=None, num_workers=0, collate_fn=None,
           pin_memory=False, drop_last=False, timeout=0,
           worker_init_fn=None, *, prefetch_factor=2,
           persistent_workers=False)
```

### Dataset

PyTorch supports two types of datasets.

##### Map-style datasets

- Uses Python's `__getitem__()` and `__len__()` functionality
- Maps data samples from indices/keys
- Reads data using the `dataset[idx]` approach

##### Iterable-style datasets

- Uses Python's `__iter__()` functionality
- Useful when random reads are costly and difficult, or when batch size varies depending on the fetched data
- Reads data using the `iter(dataset)` approach
- For more details, refer to [IterableDataset](https://pytorch.org/docs/stable/data.html#torch.utils.data.IterableDataset)

### Sampler

The data loading order for iterable-style datasets can be fully controlled through a user-defined iterable. On the other hand, the order of indices/keys used for data loading in map-style datasets can be specified using the [torch.utils.data.Sampler](https://pytorch.org/docs/stable/data.html#torch.utils.data.Sampler) class.

- A Sampler represents an iterable object over dataset indices.
- Even without defining a separate Sampler, the `shuffle` argument in the DataLoader class constructor automatically creates either a sequential (when shuffle is False) or shuffled (when shuffle is True) sampler. In this case, set `batch_size` and `drop_last` appropriately for your purpose.
- When defining a custom Sampler that yields a list of batch indices each time, define the Sampler and pass it to the `batch_sampler` argument of the DataLoader constructor.

### Example 1.

Let's look at the simplest example with BatchSampler. This is a Sampler used in mini-batch SGD, and the code below is a cleaned-up version of the [PyTorch source code](https://pytorch.org/docs/stable/_modules/torch/utils/data/sampler.html#BatchSampler).

The batch size is determined through `batch_size`, and `drop_last` determines whether to discard the remaining portion at the very end of the dataset.

```python
class BatchSampler(Sampler):
    def __init__(self, sampler, batch_size, drop_last):
        self.sampler = sampler
        self.batch_size = batch_size
        self.drop_last = drop_last

    def __iter__(self):
        batch = []
        for idx in self.sampler:
            batch.append(idx)
            if len(batch) == self.batch_size:
                yield batch
                batch = []
        if len(batch) > 0 and not self.drop_last:
            yield batch

    def __len__(self):
        if self.drop_last:
            return len(self.sampler) // self.batch_size
        else:
            return (len(self.sampler) + self.batch_size - 1) // self.batch_size
```

### Example 2.

In a personal project I was working on, I encountered a situation where I needed to concatenate two different datasets, so I wrote the following code.

I created a map-style dataset called ConcatDataset that takes two datasets as input and outputs image data through `__getitem__`. The `__getitem__` method takes an indices tuple of the form (dataset index, image index) as input. Therefore, you just need to specify the index ordering method in a custom sampler class later.

```python
class ConcatDataset(torch.utils.data.DataLoader):
    def __init__(self, first_dataset, second_dataset):
        self.datasets = [first_dataset, second_dataset]

    def __len__(self):
        return sum([dataset.__len__() for dataset in self.datasets])

    def __getitem__(self, indicies):
        dataset_idx = indicies[0]
        data_idx = indicies[1]
        return self.datasets[dataset_idx].__getitem__(data_idx)
```

I then created a ConcatSampler class for index selection. I needed a dataloader with a batch size of 84 for the first dataset and 42 for the second dataset, totaling 126, so I wrote the code as follows:

```python
class ConcatSampler():
    def __init__(self, samplers, first_batch_size=84, second_batch_size=42):
        self.samplers = samplers
        self.batch_sizes = [first_batch_size, second_batch_size]
        self.total_batch_size = first_batch_size + second_batch_size

        # Select larger number as n_batches
        if len(samplers[0]) // first_batch_size > len(samplers[1]) // second_batch_size:
            self.n_batches = len(samplers[0]) // first_batch_size
        else:
            self.n_batches = len(samplers[1]) // second_batch_size

    def __iter__(self):
        for i in range(self.n_batches):
            batch = []
            for dataset_idx in [0, 1]:
                for idx in self.samplers[dataset_idx]:
                    batch.append((dataset_idx, idx))
                    if len(batch) == self.batch_sizes[0] and dataset_idx == 0:
                        break
                    if len(batch) == self.total_batch_size and dataset_idx == 1:
                        break
            yield batch

    def __len__(self):
        return self.n_batches
```

For actual use, create a ConcatSampler and ConcatDataset, then pass them as DataLoader constructor arguments. When data is loaded using train_loader, 84 data samples are loaded from the first dataset and 42 data samples from the second dataset.

```python
sampler = ConcatSampler([torch.utils.data.sampler.RandomSampler(dataset) for dataset in [first_dataset, second_dataset]])
dataset = ConcatDataset(first_dataset, second_dataset)
train_loader = torch.utils.data.DataLoader(dataset, batch_sampler=sampler, num_workers=8, pin_memory=True)
```

### References

- https://pytorch.org/docs/stable/data.html#torch.utils.data.DataLoader
