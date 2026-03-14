---
title: "Hyperparameter Tuning with Ray Tune"
date: "2022-04-07"
template: "post"
draft: false
path: "/cheatsheet/22-04-07/"
description: "Notes on frequently used features from the Ray Tune documentation. This post is continuously updated as I study further, with hands-on code examples added along the way. Ray has three core elements: Task, Object, and Actor."
category: "Cheat Sheet"
thumbnail: "ray"
---

> Notes on frequently used features from the Ray Tune documentation. This post is continuously updated as I study further, with hands-on code examples added along the way.

### Ray Core

Ray has three core elements: Task, Object, and Actor.

##### Task: Remote function

- A function that runs in a separate process from the caller.
- A regular function is called a stateless task, while a method inside a class is called a stateful task.
- It runs asynchronously with respect to the caller.
- You can create a task using the `@ray.remote` decorator and invoke it via the `.remote()` method.
- It returns an object ref, which can be retrieved using `ray.get`.

```python
@ray.remote
def remote_func():
    return 1

obj_ref = remote_func.remote()
assert ray.get(obj_ref) == 1
```

##### Object

- Objects created by Ray are called **remote objects**.
- A remote object can be referenced by a unique ID called an **object ref**.
- An object ref is returned either by `put` or by a remote function (task) call.
- As mentioned above, you can use the `get` method to retrieve the result of a remote object from its object ref.

```python
y = 1
object_ref = ray.put(y)
```

##### Actor: Remote class

- You can create an actor using the `@ray.remote` decorator, and method calls on this class become stateful tasks.
- Methods of different actors are called in parallel, while methods of the same actor are called sequentially.
- The same actor shares state. This can be confirmed in the example below.

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

Here are the key features of Ray Tune.

- [Trainables](https://docs.ray.io/en/latest/tune/key-concepts.html#trainables): A function or class passed to `tune.run` to perform tuning
- [Hyperparameters](https://docs.ray.io/en/latest/tune/key-concepts.html#hyperparameters): A hyperparameter dictionary passed to `tune.run` via the `config` parameter
  - [Search spaces](https://docs.ray.io/en/latest/tune/key-concepts.html#search-spaces): Hyperparameter search spaces and sampling methods (e.g., uniform, normal, ...)
- [tune.run and Trials](https://docs.ray.io/en/latest/tune/key-concepts.html#tune-run-and-trials): Performs hyperparameter tuning. Each experiment is wrapped as a `Trial` object and executed independently
- [Search Algorithms](https://docs.ray.io/en/latest/tune/key-concepts.html#search-algorithms): Well-known search algorithms such as Nevergrad and HyperOpt are integrated internally
- [Trial Schedulers](https://docs.ray.io/en/latest/tune/key-concepts.html#trial-schedulers): Provides features like early termination, pausing trials, and altering hyperparameters of a running trial
- [Analysis](https://docs.ray.io/en/latest/tune/key-concepts.html#analysis): An ExperimentAnalysis object returned by `tune.run`, used for analyzing training results

Overall, you define a Trainable and Hyperparameters, then pass them to `tune.run`. Independent Trial processes are then executed on the available resources. The Search Algorithm can be configured via the `search_alg` parameter. Here is a rough code outline of this process:

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

Tune automatically operates in parallel, utilizing all cores/GPUs. If you want to limit the number of cores, call `ray.init(num_cpus=<int>, num_gpus=<int>)` before running `tune.run`.

##### MNIST classification with PyTorch

Below is the hyperparameter search code excerpted from the MNIST classification example on the official Tune page. The full code can be found [here](https://docs.ray.io/en/latest/tune/getting-started.html). Since this function runs in a separate **Ray Actor**, it needs to send the performance results back to Tune in the main process. Therefore, `tune.report` is used to send results to Tune.

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

Passing the function to execute along with experiment options to `tune.run` returns an [ExperimentAnalysis](https://docs.ray.io/en/latest/tune/api_docs/analysis.html#tune-analysis-docs) object. You can review experiment results through ExperimentAnalysis and easily load the best-trained model as shown in the code below.

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

ASHA is an algorithm that terminates less promising experiments and allocates more time and resources to more promising ones. ASHA is implemented as a Trial Scheduler in Tune, and more details can be found in the [TrialScheduler docs](https://docs.ray.io/en/latest/tune/api_docs/schedulers.html#tune-schedulers). Visualizing results using Jupyter notebooks or TensorBoard is also recommended.

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
