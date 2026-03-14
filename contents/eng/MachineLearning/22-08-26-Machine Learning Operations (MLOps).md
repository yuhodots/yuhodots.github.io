---
title: "Machine Learning Operations (MLOps)"
date: "2022-08-26"
template: "post"
draft: false
path: "/Operations/22-08-26/"
description: "This post organizes usage of MLOps tools with a focus on commands. Most content references official documentation, and any additional sources are mentioned in the text or added to references. Currently covers Docker, Kubernetes, MLflow, Kubeflow, and content is continuously updated as study progresses."
category: "Operations"
thumbnail: "Operations"
---

> This post organizes usage of MLOps tools with a focus on commands. Most content references official documentation, and any additional sources are mentioned in the text or added to references. Content is continuously updated as study progresses.

### GitHub Actions

- Official docs: [Workflow syntax for GitHub Actions](https://docs.github.com/ko/actions/using-workflows/workflow-syntax-for-github-actions)
- Workflows: Composed of one or more Jobs, and can be triggered by events or schedules
- Events: Activities that can trigger a workflow run
- Jobs: Multiple steps within a workflow that exist on the same runner. Multiple jobs can have dependencies and can also run in parallel
- Actions: individual tasks that you can combine to create jobs and customize your workflow
- Runners: Instances where workflows are executed. Typically GitHub-hosted runners are used, but self-hosted runners are also possible

##### Workflow

- `on:workflow_dispath`: Creates a "run workflow" button in the Actions tab for manual triggering
- `ssh-private-key`: Register a private key in the repository's secrets where actions are applied, and register the public key in the deploy keys of the target repository to enable SSH private connection between them

1. Create Workflows: Use GitHub's workflow templates or directly create the `.github/workflows` folder
2. Create a `.yml` file and write the content
   - `name`:  The name of the workflow as it will appear in the "Actions" tab of the GitHub
   - `run-name`: The name for workflow runs generated from the workflow, which will appear in the list of workflow runs on your repository's "Actions" tab
   - `on`: Trigger for this workflow. Refers to events; can use multiple events when written as an array
   - `jobs`: Groups together all the jobs that run in the workflow. Multiple jobs run in parallel by default
   - `jobs/${job_name}/runs-on`: Specifies the OS to use
   - `jobs/${job_name}/steps/uses`: Specifies which pre-built action to use when one is available
   - `jobs/${job_name}/steps/run`: Specifies the command to execute within the runner
3. Other features: Sharing workflows across organizations, storing secret keys, dependency caching, artifact storage, etc. are also available--refer to the official documentation

### Git Hooks

- Official docs: [Customizing Git - Git Hooks](https://git-scm.com/book/ko/v2/Git맞춤-Git-Hooks)
- GitHub Actions execute tasks on the remote based on triggers, but locally you can also automatically run specific scripts for specific actions through git hooks. Additionally, a module called **husky** exists that makes applying Git Hooks easier
- Simply write scripts at the path `.git/hooks/{hook_name}`
- Commit workflow hooks
  - `pre-commit`: The first hook called when committing; invoked before the commit message is written
  - `prepare-commit-msg`: Runs after Git generates the commit message but before the editor is launched. Useful when you want to programmatically modify the commit message before human editing
  - `commit-msg`: A hook that receives the path to a temporary file containing the commit message as an argument. If this script returns a non-zero value, the commit is aborted. This hook allows you to validate the project state or commit message before the commit is finalized
  - `post-commit`: Runs after the commit is completed. It receives no arguments, but commit hash information can be retrieved using `git log -1 HEAD`. Generally used to notify someone or another program about the commit

- Other hooks such as `pre-rebase`, `post-rewrite`, `post-merge`, `pre-push`, and server hooks like `pre-receive`, `post-receive`, `update` also exist

##### Husky

- Official docs: [Husky](https://typicode.github.io/husky/#/)

1. `npm install --save-dev husky`: Install
2. `npx husky install`: Enable Git hooks
3. `npm pkg set scripts.prepare="husky install"`: Modify package.json for handling git hooks automatically
4. `npx husky add .husky/pre-commit "{do_something}"`: Create Git hooks
5. `git add .husky/pre-commit`

##### pre-commit

- Official docs: https://pre-commit.com
- Available pre-commit hooks can be found [here](https://pre-commit.com/hooks.html)

1. `brew install pre-commit`: Install
2. `pre-commit sample-config > .pre-commit-config.yaml`: Create a config file
3. `pre-commit run`: Manually run pre-commit
4. **`pre-commit install`**: Register in git hooks so that pre-commit runs automatically on commit

### Docker

##### Fast start for a beginner

- Follow the commands below to verify operation

1. `sudo usermod -aG docker $USER`: Add user account to docker group to use without sudo
2. `docker pull ubuntu:latest`: Pull the latest version of the ubuntu image
3. `docker images`: Check images
4. `docker run -it ubuntu:latest bash`: Run a container with the Bash shell option
5. `docker ps -a`: Check containers (including exited containers)
6. `docker restart ${container_id}`: Restart a container
7. `docker attach ${container_id}`: Attach to a container
8. Install packages or programs in the container, then exit
9. `docker commit ${container_id} ${new_image_name}`: Build an image from the container

##### Commands

- `docker pull [OPTIONS] NAME[:TAG|@DIGEST]`: Download an image from Docker Hub
  - ex. `docker pull centos:latest`

- `docker push [OPTIONS] NAME[:TAG]`: Upload an image to Docker Hub
- `docker create [OPTIONS] IMAGE [COMMAND] [ARG...]`: Create a new container from an image
- `docker stop [OPTIONS] CONTAINER [CONTAINER...]`: Stop a running container (*memory release*)
- `docker start [OPTIONS] CONTAINER [CONTAINER...]`: Start a stopped container
- `docker run [OPTIONS] IMAGE [COMMAND] [ARG...]`: Download an image, create a container, then start it. See [here](https://docs.docker.com/engine/reference/commandline/run/#options) for options
  - ex. `docker run -it centos:latest bash`: Use the it option for shell execution

- `docker build [OPTIONS] PATH | URL | -`: Build an image from a Dockerfile
  - `docker build -t ${new_image_name} .`: Build an image named ${new_image_name} from the Dockerfile in the current directory

- `docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]`: Build an image from a container
- `docker rename CONTAINER NEW_NAME`: Rename a container
- `docker pause CONTAINER [CONTAINER...]`: Pause a running container. Puts the container process on hold without stopping it (*keep memory*). See [here](https://www.gistshare.com/2018/11/kill-stop-and-pause-docker-commands.html#summary) for differences between kill, stop, and pause
- `docker unpause CONTAINER [CONTAINER...]`: Unpause a paused container
- `docker exec [OPTIONS] CONTAINER COMMAND [ARG...]`: Execute a command in a running container
- `docker rm [OPTIONS] CONTAINER [CONTAINER...]`: Delete a container
- ` docker ps [OPTIONS]`: List containers
  - `-a, --all`: Since containers remain even after being terminated, the -a option shows exited containers as well
- `docker logs [OPTIONS] CONTAINER`: View container logs
- `docker stats [OPTIONS] [CONTAINER...]`: Check container resource usage
- `docker images [OPTIONS] [REPOSITORY[:TAG]]`: List images
- `docker rmi [OPTIONS] IMAGE [IMAGE...]`: Delete an image

##### Run options

- `docker run --volume, -v`: Mount a directory inside the container to a directory on the local machine
- `docker run -m 512m ${image}`: Limit memory to 512m
- `docker run -m 512m --memory-reservation=256m ${image}`: Activated (reserved) when memory is low
- `docker run --cpuset-cpus="0,1" ${image}`: Use the 1st and 2nd CPUs
- `docker run --cpus=0.2 ${image}`: Use only 20% of CPU
- `docker run --cpus=2 --cpu-shares=2000 ${image}`: Set CPU allocation priority. Default is 1024

##### Dockerfile

Enables managing image creation in a single file

- `FROM [--platform=<platform>] <image>[:<tag>] [AS <name>]`: Specify the base image. At least one must be specified
- `RUN <command>` or `RUN ["executable", "param1", "param2"]` (exec form): Execute a command directly. On Linux, it internally runs the command after `/bin/sh -c`
- `WORKDIR /path/to/workdir`: Set the default directory for work
- `VOLUME ["/data"]`: Set a mount point for an external filesystem to the container
- `COPY [--chown=<user>:<group>] <src>... <dest>`: Copy files or directories into the image
- `ADD [--chown=<user>:<group>] <src>... <dest>`: Copy files or directories into the image. URLs can also be used as input
- `EXPOSE <port> [<port>/<protocol>...]`: Set the port the container will listen on at runtime
- `ENV <key>=<value> ...`: Specify environment variables for use in the container
- `CMD ["executable","param1","param2"]`: The default command executed when the container runs. See [here](https://docs.docker.com/engine/reference/builder/#cmd) for shell form
- `LABEL <key>=<value> <key>=<value> <key>=<value> ...`: Add metadata to the image. Metadata makes it easy to identify information about the image
- **`RUN --mount=type=ssh ...`**: Mount SSH keys for cloning private repos or downloading private packages. For more details, see this [Stack Overflow answer](https://stackoverflow.com/questions/55929417/how-to-securely-git-clone-pip-install-a-private-repository-into-my-docker-image) (Other approaches: [link1](https://medium.com/@erika_dike/installing-package-from-a-private-repo-in-your-docker-container-f45b1a4954a2), [link2](https://vsupalov.com/build-docker-image-clone-private-repo-ssh-key/))

For Dockerfile optimization, there are well-written articles available at these links: [link1](https://thearchivelog.dev/article/optimize-docker-image/), [link2](https://mateon.tistory.com/68)

### Docker Compose

##### Compose file

A file for managing multi-container applications, allowing you to manage options needed for container execution, execution order, dependencies, etc. in a single file. Below is an example `docker-compose.yml` file

```yaml
version: "3.9"
services:
  web:
    build: .
    ports:
      - "8000:5000"
    volumes:
      - .:/code
      - logvolume01:/var/log
    links:
      - redis
  redis:
    image: redis
volumes:
  logvolume01: {}
```

- `version`: The compose file format version written on the first line. Writing just 3 uses the latest version among version 3. See [here](첫 줄에 적는) for details
- `services`: Defines the containers to run. The example above has two services: web and redis
- `build`: The directory path where docker build command is executed
- `ports`: Ports to use (HOST:CONTAINER)
- `volumes`: Mount to a directory on the local machine
- `links`: Defines network links to other service containers (SERVICE:ALIAS or SERVICE). From compose file version 3 onwards, services within the same network can communicate without using links
- `image`: The image to be used by the service

##### Commands

- `docker-compose up [options] [--scale SERVICE=NUM...] [SERVICE...]`: Run services according to the `docker-compose.yml` file
  - Creating a development container as a compose file makes it very convenient when working across different servers
  - `docker-compose up -d`: Run containers in the background
- `docker-compose down [options]`: Delete containers and images created by docker-compose up
- `docker-compose start [SERVICE...]`: Start stopped services
- `docker-compose stop [options] [SERVICE...]`: Stop services
- `docker-compose ps`: Check the status of currently running services

##### Examples for ML Training Container

```
version: '3.8'

services:
  trainer:
    image: <your_image_name>:latest
    build:
      context: .
      dockerfile: Dockerfile
      ssh:
      	default: <path_to_your_ssh_key>	# for private repository
    container_name: yuhodots	# for identifying user
    environment:
      - ENV_FILE_LOCATION=~/.env	# dotenv file
    runtime: nvidia
    deploy:
      resources:
        reservations:
          devices:
          - driver: nvidia
            count: all
            capabilities: [gpu]
    volumes:
      - ${HOME}/.aws/credentials:/root/.aws/credentials:ro	# aws connection
      - <local_data_dir>:<container_data_dir>	# data mount
      - <local_code_dir>:<container_code_dir>	# code mount
    command: /bin/zsh
    stdin_open: true
    tty: true
```

- `stdin_open`: When true, equivalent to docker run's -i (interactive)
- `tty`: When true, equivalent to docker run's -t

### FastAPI

##### Run Options

```
uvicorn main:app --reload --host 0.0.0.0 --port 5000
```

- `main`: Refers to the main.py file
- `app`: `app=FastAPI()` inside the main.py file
- `--reload`: Restart on code changes after saving
- `--host`: Use 0.0.0.0 to allow all access
- `--port`: Port configuration

##### Code API

- Router: The `APIRouter` class is used to group path operations. In the example below, inference requests can be made through /base/inference, and all requests in the base.py file are grouped under /base

```python
# main.py
from fastapi import FastAPI
from base import router
app = FastAPI(title="API server!", version="0.1.0")
app.include_router(router, prefix='/base', tags=["Base"])
```

```python
# base.py
from fastapi import APIRouter
router = APIRouter()

@router.post("/inference"):
  ...
```

- Middleware: In the example below, the dispatch function can be applied to all incoming requests
  - Advanced middleware: https://fastapi.tiangolo.com/advanced/middleware/

```python
@app.middleware("http"):
async def dispatch(request: Request, call_next: Callable) -> Response:
	...
```

- Documentation can be generated using tools like redocly and swagger

### MLflow

Four main features of MLflow

- Tracking: Provides functionality to record and query all artifacts related to ML experiments
  - `log_metric`,` log_param`, `log_artifacts` , `mlflow ui`

- Project: Provides packaging functionality for reproducibility
  - `mlflow run [local_repository or remote_repository]`

- Models: Provides functionality to manage model deployment and inference across various platforms (key concept: ***flavors***)
- Model Registry: Provides a central model store for collaborative lifecycle management

##### MLflow Tracking

A feature for recording metrics, artifacts, tags, notes, and parameter information, similar to Tensorboard or wandb charts

- `mlflow.set_tracking_uri()`: Connect to a tracking URI. Can also connect using the MLFLOW\_TRACKING\_URI environment variable; http/https URIs can be used when the tracking server is hosted remotely
- Experiments can be grouped and managed using `mlflow.create_experiment()` or the MLFLOW\_EXPERIMENT\_NAME environment variable
- `mlflow.start_run()` returns a single active run. It is automatically called when a logging function is used. Naturally, `mlflow.end_run()` also exists
- Record parameters, metrics, tags, and artifacts using `mlflow.log_param()`, `mlflow.log_metric()`, `mlflow.set_tag()`, `mlflow.log_artifact()`, etc.
- For Scikit-learn, Gluon, PyTorch, Fastai, etc., **`mlflow.autolog()`** exists to automatically handle logging without explicitly specifying log functions
- For setting up a separate tracking server using MLflow, refer to [this page](https://mlflow.org/docs/latest/tracking.html#mlflow-tracking-servers)

##### MLflow Projects

An MLflow Project is a convention for organizing and describing your code so that other engineers can run it. In brief, the process is as follows:

1. Specify information about **Name**, **Entry point**, and **Environment** properties in the `MLProject` file. Entry points refer to the commands to be executed within the project and their parameter information, and environments refer to execution environments like conda or virtualenv
2. Run the project using the `mlflow run` CLI command or the `mlflow.projects.run()` Python API

`MLproject` file example (reference: [ml-system-in-actions](https://github.com/shibuiwilliam/ml-system-in-actions))

```
name: cifar10_initial

docker_env:
  image: shibui/ml-system-in-actions:training_pattern_cifar10_0.0.1
  volumes: ["$(pwd)/data:/opt/data", "/tmp/ml-system-in-actions/chapter2_training/cifar10/mlruns:/tmp/mlruns"]

entry_points:
  train:
    parameters:
      upstream: {type: string, default: ""}
      downstream: {type: string, default: /opt/data/model/}
      epochs: {type: int, default: 1}
			...
    command: |
      python -m src.train \
        --upstream {upstream} \
        --downstream {downstream} \
        --epochs {epochs} \
				...
```

The method for running MLflow projects on Kubernetes is as follows:

1. Specify the Docker environment in the `MLproject` file
2. Create a backend configuration JSON. Fill in `kube-context`, `repository-uri`, `kube-job-template-path` information. See [here](https://mlflow.org/docs/latest/projects.html#execution-guide) for details
3. Obtain credentials for Docker or Kubernetes resource access if needed, then run the project using the MLflow CLI or Python API

##### MLflow Models

A feature for packaging ML models for use in various downstream tools. The concept of "flavor" appears here, referring to what downstream tool is being used.

Assuming a project folder called `my_model` that you want to deploy: first prepare the relevant model and environment files within the project folder, write the `MLmodel` file, and deploy the model using the `mlflow models serve -m my_model` command.

`MLmodel` file example (reference: [mlflow docs](https://mlflow.org/docs/latest/models.html#id19)). This example consists of two flavors: sklearn and python.

```
time_created: 2018-05-25T17:28:53.35

flavors:
  sklearn:
    sklearn_version: 0.19.1
    pickled_model: model.pkl
  python_function:
    loader_module: mlflow.sklearn
```

In addition to `flavors`, the `MLmodel` file can contain fields such as `time_created`, `run_id`, `signature`, `input_example`, `databricks_runtime`, and `mlflow_version`.

- Signature: Describes the model's input and output. Can be logged using features from the `mlflow.models.signature` module

```
signature:
    inputs: '[{"name": "images", "dtype": "uint8", "shape": [-1, 28, 28, 1]}]'
    outputs: '[{"shape": [-1, 10], "dtype": "float32"}]'
```

- Input example: A valid model input example

```
# each input has shape (4, 4)
input_example = np.array([
   [[  0,   0,   0,   0],
    [  0, 134,  25,  56],
    [253, 242, 195,   6],
    [  0,  93,  82,  82]],
   [[  0,  23,  46,   0],
    [ 33,  13,  36, 166],
    [ 76,  75,   0, 255],
    [ 33,  44,  11,  82]]
], dtype=np.uint8)
mlflow.keras.log_model(..., input_example=input_example)
```

Built-in model flavors can be found [here](https://mlflow.org/docs/latest/models.html#built-in-model-flavors) and are defined as modules such as `mlflow.pyfunc`, `mlflow.tensorflow`, `mlflow.pytorch`, etc.

Built-In Deployment Tools can be broadly categorized into four types. See [here](https://mlflow.org/docs/latest/models.html#built-in-deployment-tools) for details.

- Deploy locally
- Deploy on Microsoft Azure ML
- Deploy on Amazon SageMaker
- Export model as an Apache Spark UDF

##### MLflow Model Registry

Can be divided into UI workflow and API workflow. The general usage of the API workflow is as follows:

- Add an MLflow model to the model registry: `log_model()`, `mlflow.register_model()`
- Fetch a model from the model registry: `load_model()`
- Serve a model from the model registry: `mlflow models serve -m ...`
- Modify model information
  - Add and edit model description: `update_model_version()`
  - Rename a model: `rename_registered_model()`
  - Change model stage: `transition_model_version_stage()`
- Search models: `list_registered_models()`, `search_model_versions()`
- Delete a model: `delete_model_version()`

### Design Patterns

Summarizing key points of each design pattern in one line, referencing [this repository](https://github.com/mercari/ml-system-design-pattern).

##### Training patterns

- Pipeline training pattern: A pattern that divides each task into individual resources and builds them separately. Has the advantage of increasing independence of each task but the disadvantage of increased management complexity
  - Can be rapidly prototyped using MLflow
- Batch training pattern: A pattern that periodically performs model training to keep the model up to date
  - Uses scheduling systems like cron
- Antipattern 1. Only-me pattern: A state where a model developed in a personal environment cannot be reproduced by others
- Antipattern 2. Too many pipes pattern: Naturally, complex pipelines are very difficult to manage

##### Serving patterns

- Web single pattern: The simplest pattern where a single model synchronously performs inference using a single inference server
  - Can be rapidly prototyped by creating a web single pattern using the trained model with ONNX, FastAPI, Uvicorn, Gunicorn, and wrapping it in Docker
- Synchronous pattern: A pattern where multiple tasks within a service depend on the model's inference results (must be executed in order)
  - The inference model is configured with ONNX, TensorFlow Serving, etc., and requests/responses are exchanged via REST API, gRPC, etc.
- Asynchronous pattern: When inference takes a long time, providing asynchronous waiting messages to users allows inference to be performed without blocking user interaction
  - Set up a queue (Apache Kafka) or cache (Rabbit MQ, Redis Cache) server between the request server and the inference server, with the inference server continuously polling the queue/cache to perform inference when pending tasks exist
- Batch pattern: A pattern used when you want to consolidate and run inference on large volumes of data (hourly, monthly data)
  - Uses scheduling systems like cron. Kubernetes has a tool called CronJobs for this purpose
- Prep-pred pattern: A pattern that separates preprocessing and inference into different containers to improve maintainability when they require significantly different resources
  - Build separate servers for data acquisition, preprocessing, and inference, with a proxy server in front that handles requests and responses via gRPC (or REST API)
- Microservice vertical pattern: A pattern used when a system consists of multiple inference engines with clear dependencies and a defined execution order
  - Set up a proxy server in front that handles requests and responses via gRPC (or REST API)
- Microservice horizontal pattern: A pattern that runs multiple independent inferences in parallel
- Prediction cache pattern: A pattern that improves speed by using cache for identical requests
  - Uses Redis
- Data cache pattern: A pattern aimed at caching data and preprocessed data for very fast data retrieval
- Serving template pattern: A pattern that standardizes parts unrelated to training or the model (OS, network, security, log collection) as development rules when creating multiple similar inference engines
  - Templates can be written using the Python template engine jinja2
- Antipattern 1. Online bigsize pattern: Services must operate within maximum allowed time--for web services, responding within N seconds; for batch processing, completing all records within N hours overnight
- Antipattern 2. All-in-one pattern: If all models in the system run on a single server, fault response becomes difficult

##### Operation patterns

- Model-in-image pattern: A pattern that includes model files in the inference server image. Can align server image and model versions, but the number of server images grows with the number of trained models
  - Docker images are stored on DockerHub, and resources to use are defined in Kubernetes Manifest YAML files
- Model-load pattern: A pattern for cases where the inference model version is updated more frequently than the server image, or when multiple inference models need to run on the same server image, where model files are not included in the image but downloaded from external sources
  - Model files are stored in AWS S3 or GCP Storage, and downloaded during container initialization using Kubernetes' init container feature
- Prediction log pattern: A pattern that stores client event logs, proxy server latency logs, inference server logs, etc. in log storage to improve services
  - Uses queue or Kubernetes' Fluentd sidecar feature for log collection
- Prediction monitoring pattern: A pattern for notifying operators when trends become abnormal while monitoring logs. Simply add a monitoring system that watches the log storage from the Prediction log pattern
- Parameter-based serving pattern: A pattern for rule-based control of inference results
  - Set variables for rule-based control as environment variables for each inference engine
- Condition-based-serving pattern: A pattern that creates models suitable for each group and distributes requests on a rule basis. Can select appropriate inference models to respond based on request region or time of day
  - The inference system is built on a Kubernetes cluster, and conditional branching is controlled with Istio. Istio's VirtualService has a built-in feature for controlling request routing based on request headers
- Antipattern 1. No logging pattern: Without logs, the system cannot be improved
- Antipattern 2. Nobody knows pattern: When the person operating the system leaves after system construction. If nobody knows exactly how the system works, operation and improvement become impossible

##### QA patterns

- Loading test pattern: Measures the response speed of the inference server
  - Uses vegeta attack
- Prediction circuit break pattern: A pattern that intentionally drops some requests to prevent server shutdown when server access increases but immediate scale-out is not possible
  - Istio's traffic management features already include a circuit breaker. Uses vegeta attack for load testing
- Shadow AB-testing pattern: A pattern for verifying that a new inference model works without issues in the production environment. The proxy server sends requests to both the current model and the new inference model, but actual responses are received only from the current model
  - Uses Istio's VirtualService for traffic mirroring
- Online AB-testing pattern: A pattern that routes a portion of requests through the new inference engine to check user response
  - Uses Istio's VirtualService for traffic splitting
- Antipattern 1. Offline-only pattern: A pattern that validates models only with test sets. The criteria for evaluating models should always be real service data, not test data

### References

- [Docker docs - Reference documentation](https://docs.docker.com/reference/)
- [MLflow documentation](https://mlflow.org/docs/latest/index.html)
- https://github.com/mercari/ml-system-design-pattern
- https://mercari.github.io/ml-system-design-pattern/README_ko.html
