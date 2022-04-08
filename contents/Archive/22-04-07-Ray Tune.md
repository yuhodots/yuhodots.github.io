---
title: "Hyperparameter Tuning with Ray Tune"
date: "2022-04-07"
template: "post"
draft: false
path: "/cheatsheet/22-04-07/"
description: "Ray Tune 도큐먼트를 읽고 자주 사용할 만한 기능들을 기록합니다. 공부를 진행하면서 내용을 계속해서 업데이트하고 있으며, 이 과정에서 직접 사용해본 코드 예시 또한 추가하고 있습니다. Ray에는 크게 Task, Object, Actor라는 세 가지 요소가 존재합니다."
category: "Cheat Sheet"
thumbnail: "ray"
---

> Ray Tune 도큐먼트를 읽고 자주 사용할 만한 기능들을 기록합니다. 공부를 진행하면서 내용을 계속해서 업데이트하고 있으며, 이 과정에서 직접 사용해본 코드 예시 또한 추가하고 있습니다.

### Ray Core

Ray에는 크게 Task, Object, Actor라는 세 가지 요소가 존재합니다. 

##### Task: Remote function

- 호출자와 다른 프로세스에서 실행되는 함수입니다. 
- 일반적인 function은 stateless task, class 내의 method는 stateful task라고 말합니다.
- 호출자와 비동기적으로 실행됩니다.
- `@ray.remote` 데커레이터를 통해 task를 만들 수 있으며 `.remote()` 메소드를 통해 호출 가능합니다.
- Object ref 값을 리턴하는데 이 값은 `ray.get`을 통해 반환 받을 수 있습니다.

```python
@ray.remote
def remote_func():
    return 1

obj_ref = remote_func.remote()
assert ray.get(obj_ref) == 1
```

##### Object

- Ray가 만드는 객체를 **remote object**라고 합니다. 
- Remote object는 **object ref**라는 unique ID에 의해 참조될 수 있습니다.
- Object ref는 `put`에 의해 반환되거나 remote function(task) call에 의해 반환됩니다.
- 위에서 언급했듯이 `get` method를 사용하여 obejct ref로 부터 remote object의 결과를 불러올 수 있습니다. 

```python
y = 1
object_ref = ray.put(y)
```

##### Actor: Remote class

- `@ray.remote` 데커레이터를 통해 actor를 만들 수 있으며 이 클래스의 메서드 호출은 stateful task가 됩니다
- 서로 다른 actor의 method는 병렬적으로 호출되며, 동일한 actor의 method는 순차적으로 호출됩니다.
- 동일한 actor는 state를 공유합니다. 이는 아래 예시에서 확인할 수 있습니다. 

```python
@ray.remote
class Counter(object):
    def __init__(self):
        self.value = 0

    def increment(self):
        self.value += 1
        return self.value
```

```python
counters = [Counter.remote() for _ in range(10)]

results = ray.get([c.increment.remote() for c in counters])
print(results)  # prints [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

results = ray.get([counters[0].increment.remote() for _ in range(5)])
print(results)  # prints [2, 3, 4, 5, 6]
```

### Key Components

Ray Tune의 주요 기능들입니다.

- [Trainables](https://docs.ray.io/en/latest/tune/key-concepts.html#trainables): `tune.run`에 전달하여 튜닝을 수행할 function 혹은 class
- [Hyperparameters](https://docs.ray.io/en/latest/tune/key-concepts.html#hyperparameters): `tune.run`에 `config` 파라미터로 전달할 하이퍼파라미터 dictionary
  - [Search spaces](https://docs.ray.io/en/latest/tune/key-concepts.html#search-spaces): 하이퍼파라미터 search space와 sampling methods (e.g. uniform, normal, ...)
- [tune.run and Trials](https://docs.ray.io/en/latest/tune/key-concepts.html#tune-run-and-trials): 하이퍼파라미터 튜닝 수행. 각 실험은 `Trial` object의 형태로 감싸져 독립적으로 수행
- [Search Algorithms](https://docs.ray.io/en/latest/tune/key-concepts.html#search-algorithms): Nevergrad, HyperOpt와 같은 유명한 search algorithm이 내부적으로 통합되어 있음
- [Trial Schedulers](https://docs.ray.io/en/latest/tune/key-concepts.html#trial-schedulers): Early terminate, Pause trials, Alter hyperparameters of a running trial 등의 기능 수행
- [Analysis](https://docs.ray.io/en/latest/tune/key-concepts.html#analysis): `tune.run`이 리턴하는 ExperimentAnalysis object로, 학습 결과 분석을 위해 사용

전체적으로는 Trainable와 Hyperparameter를 정의하여 이를 `tune.run`에 전달하면, 활용 가능한 리소스에서 각각 독립적인 Trial process가 실행됩니다. 이때 Search Algorithm은 `search_alg` 파라미터를 통해 설정할 수 있습니다. 이 과정을 대략적인 코드로 표현하면 아래와 같습니다.

```python
SearchSpace = tune.uniform(0, 1)
Hyperparameter = { "a": SearchSpace }
SearchAlgorithm = ConcurrencyLimiter(BayesOptSearch(random_search_steps=4), max_concurrent=2)
TrialScheduler = HyperBandScheduler(metric="score", mode="max")

Analysis = tune.run(Trainable, 
                    config=Hyperparameter, 
                    search_alg=SearchAlgorithm, 
                    scheduler=TrialScheduler)
```

### Examples

Tune은 자동적으로 모든 cores/GPU를 활용해 병렬적으로 작동합니다. core 수를 제한하고 싶은 경우에는 `tune.run`을 실행하기 전에 `ray.init(num_cpus=<int>, num_gpus=<int>)`를 호출하면 됩니다.

##### MNIST classification with PyTorch

Tune 공식 페이지에 나와있는 MNIST classification 예시 중에서 hyper-parameter search 코드만 발췌하였습니다. 자세한 코드는 [이곳](https://docs.ray.io/en/latest/tune/getting-started.html)에서 참고하실 수 있습니다. 이 함수는 별도의 **Ray Actor에서 실행**되기 때문에 성능 결과를 main process에 있는 Tune으로 다시 보내줘야 합니다. 따라서 `tune.report`을 사용하여 Tune으로 결과를 보냅니다. 

```python
def train_mnist(config):
    mnist_transforms = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.1307, ), (0.3081, ))])
    train_loader = DataLoader(datasets.MNIST("~/data", train=True, download=True, transform=mnist_transforms), batch_size=64, shuffle=True)
    test_loader = DataLoader(datasets.MNIST("~/data", train=False, transform=mnist_transforms), batch_size=64, shuffle=True)

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = ConvNet()
    model.to(device)

    optimizer = optim.SGD(model.parameters(), lr=config["lr"], momentum=config["momentum"])
    for i in range(10):
        train(model, optimizer, train_loader)
        acc = test(model, test_loader)
        tune.report(mean_accuracy=acc)	# Send the current training result back to Tune
```

`tune.run`에 실행할 함수와 실험 옵션을 전달하면 `tune.run`은 [ExperimentAnalysis](https://docs.ray.io/en/latest/tune/api_docs/analysis.html#tune-analysis-docs) object를 반환합니다. ExperimentAnalysis를 통해 실험 결과를 확인할 수 있고, 아래의 코드처럼 가장 잘 훈련된 모델을 간단하게 불러올 수도 있습니다.

```python
search_space = {
    "lr": tune.sample_from(lambda spec: 10**(-10 * np.random.rand())),
    "momentum": tune.uniform(0.1, 0.9)
}

analysis = tune.run(train_mnist, config=search_space)
```

```python
dfs = analysis.trial_dataframes
[d.mean_accuracy.plot() for d in dfs.values()]

df = analysis.results_df
logdir = analysis.get_best_logdir("mean_accuracy", mode="max")
state_dict = torch.load(os.path.join(logdir, "model.pth"))

model = ConvNet()
model.load_state_dict(state_dict)
```

##### Early Stopping with ASHA[^2]

ASHA는 덜 유망한 실험을 종료하고 더 유망한 실험에 더 많은 시간과 자원을 할당하는 알고리즘입니다. ASHA는 Tune에서 Trial Scheduler로 구현되어 있으며 자세한 내용은 [TrialScheduler docs](https://docs.ray.io/en/latest/tune/api_docs/schedulers.html#tune-schedulers)에서 확인할 수 있습니다. 결과를 Jupyter notebook 혹은 tensorboard를 활용해 시각화하면 더욱 좋습니다.

```python
analysis = tune.run(
    train_mnist,
    num_samples=20,
    scheduler=ASHAScheduler(metric="mean_accuracy", mode="max"),
    config=search_space)

dfs = analysis.trial_dataframes
```

### References

- Liaw, Richard, et al. "Tune: A research platform for distributed model selection and training." *arXiv preprint arXiv:1807.05118* (2018).
- Li, Liam, et al. "Massively parallel hyperparameter tuning." (2018).
- [Tune: Scalable Hyperparameter Tuning](https://docs.ray.io/en/latest/tune/index.html#tune-scalable-hyperparameter-tuning)
- [Ray Core Walkthrough](https://docs.ray.io/en/latest/ray-core/walkthrough.html#)
