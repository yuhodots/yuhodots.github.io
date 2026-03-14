---
title: "PyTorch Custom Dataloader"
date: "2022-04-03"
template: "post"
draft: false
path: "/cheatsheet/22-04-03/"
description: "toch.utils.data 공식 문서를 읽고 pytoch dataloder 사용법을 기록합니다. torch.utils.data.DataLoader class constructor arguments는 다음과 같습니다. PyTorch에서 지원하는 dataset의 타입은 두 가지가 있습니다. Map-style datasets과 Iterable-style datasets 입니다."
category: "Cheat Sheet"

---

> toch.utils.data 공식 문서를 읽고 pytoch dataloder 사용법을 기록합니다.

### Dataloader

[torch.utils.data.DataLoader](https://pytorch.org/docs/stable/data.html#torch.utils.data.DataLoader) class constructor arguments는 다음과 같습니다.

```python
DataLoader(dataset, batch_size=1, shuffle=False, sampler=None,
           batch_sampler=None, num_workers=0, collate_fn=None,
           pin_memory=False, drop_last=False, timeout=0,
           worker_init_fn=None, *, prefetch_factor=2,
           persistent_workers=False)
```

### Dataset

PyTorch에서 지원하는 dataset의 타입은 두 가지가 있습니다.

##### Map-style datasets

- Python `__getitem__()`, `__len__()` 기능 사용
- indices/keys로 부터 데이터 샘플을 매핑하는 방식
- `dataset[idx]` 방식으로 데이터 읽음

##### Iterable-style datasets

- Python `__iter__()` 기능 사용
- Random read 비용이 많이 들고 힘들거나, 가져온 데이터에 따라 배치 크기가 달라지는 경우에 유용
- `iter(dataset)` 방식으로 데이터 읽음
- 자세한 내용은 [IterableDataset](https://pytorch.org/docs/stable/data.html#torch.utils.data.IterableDataset) 참고

### Sampler

Iterable-style dataset의 data loading 순서는 user-defined iterable을 통해 온전히 조작 가능합니다. 반면에, map-style dataset의 data loading에 사용되는 indices/keys의 순서는 [torch.utils.data.Sampler](https://pytorch.org/docs/stable/data.html#torch.utils.data.Sampler) class를 사용해 명시 가능합니다.

- Sampler는 dataset indices에 대한 iterable object를 나타냅니다. 
- Sampler를 따로 정의하지 않더라도 Dataloader class constructor의 `shuffle` argument에 의해서 sequential(shuffle False인 경우) 혹은 shuffled(shuffle True인 경우) sampler가 자동으로 생성됩니다. 이 경우 `batch_size`와 `drop_last`를 목적에 따라 적절히 선택합시다.
- 매번 list of batch indices를 뱉는 커스텀 Sampler를 새로 정의하는 경우에는, 해당 Sampler를 정의한 후에 Dataloader constructor의 `batch_sampler` argument에 전달하면 됩니다.

### Example 1.

가장 간단한 예시로 BatchSampler를 확인해보겠습니다. mini-batch SGD에서 사용되는 Sampler이며 아래의 코드는 [PyTorch 코드](https://pytorch.org/docs/stable/_modules/torch/utils/data/sampler.html#BatchSampler)를 보기 쉽게 정리한 것입니다.

`batch_size`를 통해 batch size를 결정하고 `drop_last`를 통해 데이터 셋 제일 마지막 나머지 부분을 버릴지 말지 결정합니다. 

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

개인적으로 작업하고 있는 내용 중에서 서로 다른 두 개의 데이터 셋을 concat 해야하는 상황이 존재하여 아래와 같이 코드를 작성해 보았습니다.

두 개의 데이터 셋을 입력으로 받아 `__getitem__`을 통해 이미지 데이터를 출력하는 ConcatDataset라는 이름의 map-style dataset을 제작하였습니다. `__getitem__ `는 (데이터셋 index, 이미지 index) 형태의 indicies tuple을 입력으로 받습니다. 따라서 추후 custom sampler class에 indicies 순서 선정 방법을 명시해주면 됩니다.

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

indicies 선택을 위한 ConcatSampler class를 제작합니다. 저는 첫 번째 데이터 셋은 84 batch size, 두 번째 데이터 셋은 42 batch size, 총 126 batch size를 갖는 데이터로더가 필요하여 아래와 같이 코드를 작성하였습니다.

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

실제 사용을 위해서 ConcatSampler와 ConcatDataset를 생성하고, 이를 DataLoader constructor argument로 전달합니다. train_loader를 사용하여 데이터를 로드했을 때, 첫 번째 데이터 셋에서는 84개의 데이터 샘플이, 두 번째 데이터 셋에서는 42개의 데이터 샘플이 로드됩니다.

```python
sampler = ConcatSampler([torch.utils.data.sampler.RandomSampler(dataset) for dataset in [first_dataset, second_dataset]])
dataset = ConcatDataset(first_dataset, second_dataset)
train_loader = torch.utils.data.DataLoader(dataset, batch_sampler=sampler, num_workers=8, pin_memory=True)
```

### References

- https://pytorch.org/docs/stable/data.html#torch.utils.data.DataLoader
