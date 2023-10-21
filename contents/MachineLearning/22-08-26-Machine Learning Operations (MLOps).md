---
title: "Machine Learning Operations (MLOps)"
date: "2022-08-26"
template: "post"
draft: false
path: "/mlops/22-08-26/"
description: "MLOps를 위한 도구들의 사용법을 명령어 위주로 정리하고 있습니다. 대부분은 공식 문서의 내용을 참고하고 있고, 그 외 내용을 참고하게 되는 경우에는 글 내용에 언급하거나 reference에 추가하고 있습니다. 현재는 Docker, Kubernetes, MLflow, Kubeflow의 내용을 다루고 있으며, 공부 진행 상황에 따라서 내용을 계속해서 추가하고 있습니다."
category: "MLOps"
thumbnail: "mlops"
---

> MLOps를 위한 도구들의 사용법을 명령어 위주로 정리하고 있습니다. 대부분은 공식 문서의 내용을 참고하고 있고, 그 외 내용을 참고하게 되는 경우에는 글 내용에 언급하거나 reference에 추가하고 있습니다. 현재는 공부 진행 상황에 따라서 내용을 계속해서 추가하는 중에 있습니다. 

### CI/CD

##### GitHub Actions

- 공식 문서: [GitHub Actions에 대한 워크플로 구문](https://docs.github.com/ko/actions/using-workflows/workflow-syntax-for-github-actions)
- Workflows: 한 개 혹은 여러 개의 Job으로 구성되고, event나 스케줄 등에 의해 트리거될 수 있음
- Events: Workflow run을 트리거할 수 있는 activity
- Jobs: Same runner에 존재하는 workflow 내의 여러 단계들. 여러 jobs이 의존성을 가질 수 있고 병렬적 실행되는 것도 가능
- Actions: individual tasks that you can combine to create jobs and customize your workflow
- Runners: Workflow가 수행될 인스턴스. 일반적으로는 GitHub에서 호스팅해주는 runner를 사용하나 self-hosted runners도 가능

1. Workflows 생성: github의 workflow template 활용하거나, `.github/workflows` 폴더 직접 생성
2. `.yml` 파일 생성하고 내용 작성
   - `name`:  The name of the workflow as it will appear in the "Actions" tab of the GitHub
   - `run-name`: The name for workflow runs generated from the workflow, which will appear in the list of workflow runs on your repository's "Actions" tab
   - `on`: Trigger for this workflow. 즉, event를 의미하며 array로 작성시 여러 event 활용 가능
   - `jobs`: Groups together all the jobs that run in the workflow. 여러 Job에 대해 기본적으로는 병렬 수행
   - `jobs/${job_name}/runs-on`: 사용할 OS를 명시
   - `jobs/${job_name}/steps/uses`: 이미 만들어진 action이 있는 경우 어떤 action을 사용할지 명시
   - `jobs/${job_name}/steps/run`: runner 내에서 수행할 커맨드를 명시
3. 그 외: 조직과 workflow 공유, secret key 저장, dependecy caching, artifact 저장 등의 기능도 수행 가능하니 공식 문서 참고하기

##### Git Hooks

- 공식 문서: [Git맞춤 - Git Hooks](https://git-scm.com/book/ko/v2/Git맞춤-Git-Hooks)
- GitHub Action은 remote에서 트리거에 따른 작업을 수행하지만, 로컬에서도 git hooks를 통해 특정 액션에 대한 특정 스크립트를 자동으로 실행할 수 있음. 또한 **husky**라는 Git Hooks를 보다 쉽게 적용할 수 있는 모듈 또한 존재함
- `.git/hooks/{hook_name}`의 경로에 스크립트를 작성하면 끝
- Commit workflow hooks
  - `pre-commit`: 커밋할 때 가장 먼저 호출되는 훅으로 커밋 메시지를 작성하기 전에 호출됨
  - `prepare-commit-msg`: Git이 커밋 메시지를 생성하고 나서 편집기를 실행하기 전에 실행됨. 사람이 커밋 메시지를 수정하기 전에 먼저 프로그램으로 손보고 싶을 때 사용
  - `commit-msg`: 커밋 메시지가 들어 있는 임시 파일의 경로를 아규먼트로 받는 훅. 그리고 이 스크립트가 0이 아닌 값을 반환하면 커밋되지 않음. 이 훅에서 최종적으로 커밋이 완료되기 전에 프로젝트 상태나 커밋 메시지를 검증 가능
  - `post-commit`: 커밋이 완료된 후에 실행되는 훅으로, 넘겨받는 아규먼트가 하나도 없지만 커밋 해시정보는 `git log -1 HEAD` 명령으로 가져올 수 있음. 일반적으로 커밋된 것을 누군가 혹은 다른 프로그램에게 알릴 때 사용

- 이 외에도 `pre-rebase`, `post-rewrite`, `post-merge`, `pre-push` 등의 hook과, server hooks인 `pre-receive`, `post-receive`, `update` 등도 존재함

##### Husky

- 공식 문서: [Husky](https://typicode.github.io/husky/#/) 

1. `npm install --save-dev husky`: Install
2. `npx husky install`: Enable Git hooks
3. `npm pkg set scripts.prepare="husky install"`: Modify package.json for handling git hooks automatically
4. `npx husky add .husky/pre-commit "{do_something}"`: Git hooks 생성
5. `git add .husky/pre-commit`

##### pre-commit

- 공식 문서: https://pre-commit.com
- 사용 가능한 pre-commit hooks 들은 [이곳](https://pre-commit.com/hooks.html)에서 확인 가능함

1. `brew install pre-commit`: Install
2. `pre-commit sample-config > .pre-commit-config.yaml`: Create a config file
3. `pre-commit run`: 수동으로 pre-commit 실행하기
4. **`pre-commit install`**: commit 할 때 자동으로 pre-commit가 실행되도록 git hook에 등록

### Docker

##### Fast start for a beginner

- 아래의 명령어 수행하면서 작동 확인하기

1. `sudo usermod -aG docker $USER`: sudo 없이 사용할 수 있도록 사용자 계정을  docker gorup에 추가
2. `docker pull ubuntu:latest`: centos 최신 버전의 이미지를 pull
3. `docker images`: 이미지 확인
4. `docker run -it ubuntu:latest bash`: Bash shell을 실행하는 옵션으로 CentOS 컨테이너 실행
5. `docker ps -a`: 컨테이너 확인 (exited 컨테이너까지 확인)
6. `docker restart ${container_id}`: 컨테이너 다시 시작
7. `docker attach ${container_id}`: 컨테이너 안으로 이동
8. 컨테이너에 패키지나 프로그램 설치 후 exit
9. `docker commit ${container_id} ${new_image_name}`: 컨테이너로 부터 이미지 빌드

##### Commands

- `docker pull [OPTIONS] NAME[:TAG|@DIGEST]`: Docker Hub로부터 이미지 다운로드
  - ex. `docker pull centos:latest`

- `docker push [OPTIONS] NAME[:TAG]`: Docker Hub로 이미지 업로드
- `docker create [OPTIONS] IMAGE [COMMAND] [ARG...]`: 이미지로부터 새 컨테이너 생성
- `docker stop [OPTIONS] CONTAINER [CONTAINER...]`: 작동중인 컨테이너를 stop. (*memory release*)
- `docker start [OPTIONS] CONTAINER [CONTAINER...]`: stop 상태의 컨테이너를 시작
- `docker run [OPTIONS] IMAGE [COMMAND] [ARG...]`: 이미지 다운로드 후, 컨테이너 생성(create) 후, 컨테이너 시작(start). 옵션은 [이곳](https://docs.docker.com/engine/reference/commandline/run/#options) 참고
  - ex. `docker run -it centos:latest bash`: Shell 실행을 위해서 it 옵션을 사용

- `docker build [OPTIONS] PATH | URL | -`: Dockerfile로부터 이미지 빌드
  - `docker build -t ${new_image_name} .`: 현재 위치의 Dockerfile로부터 ${new_image_name} 이름의 이미지 빌드

- `docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]`: 컨테이너로 부터 이미지 빌드
- `docker rename CONTAINER NEW_NAME`: 컨테이너 이름 변경
- `docker pause CONTAINER [CONTAINER...]`: 작동중인 컨테이너를 pause. 컨테이너 프로세스를 stop하지는 않고 대기 시켜놓는 것 (*keep memory*).  kill, stop과의 차이점은 [이곳](https://www.gistshare.com/2018/11/kill-stop-and-pause-docker-commands.html#summary) 참고
- `docker unpause CONTAINER [CONTAINER...]`: pause 상태의 컨테이너를 unpause
- `docker exec [OPTIONS] CONTAINER COMMAND [ARG...]`: 작동중인 컨테이너에서 명령어 실행
- `docker rm [OPTIONS] CONTAINER [CONTAINER...]`: 컨테이너 삭제
- ` docker ps [OPTIONS]`: 컨테이너 목록 확인
  - `-a, --all`: 컨테이너는 종료되어도 삭제되지 않고 남아있기 때문에, -a 옵션 사용시 exited 컨테이너까지 확인 가능
- `docker logs [OPTIONS] CONTAINER`: 컨테이너 로그 보기
- `docker stats [OPTIONS] [CONTAINER...]`: 컨테이너의 리소스 사용량 확인
- `docker images [OPTIONS] [REPOSITORY[:TAG]]`: 이미지 목록 확인
- `docker rmi [OPTIONS] IMAGE [IMAGE...]`: 이미지 삭제

##### Run options

- `docker run --volume, -v`: 컨테이너 내부 디렉토리를 로컬 컴퓨터의 디렉토리에 마운트
- `docker run -m 512m ${image}`: memory를 512m로 제한
- `docker run -m 512m --memory-reservation=256m ${image}`: 메모리 부족시 활성화(예약)
- `docker run --cpuset-cpus="0,1" ${image}`: 1, 2번째 CPU 사용
- `docker run --cpus=0.2 ${image}`: CPU의 20%만 사용
- `docker run --cpus=2 --cpu-shares=2000 ${image}`: CPU 할당 우선순위 결정. 1024가 default

##### Dockerfile

이미지 제작을 하나의 파일로 관리 가능

- `FROM [--platform=<platform>] <image>[:<tag>] [AS <name>]`: 베이스 이미지를 지정. 반드시 하나는 지정해야 함
- `RUN <command>` 혹은 `RUN ["executable", "param1", "param2"]` (exec form): 명령어를 그대로 실행. Linux에서는 내부적으로 `/bin/sh -c` 뒤에 명령어를 실행
- `WORKDIR /path/to/workdir`: 작업을 위한 기본 디렉토리 설정
- `VOLUME ["/data"]`: 컨테이너 외부 파일시스템 마운트 지점 설정
- `COPY [--chown=<user>:<group>] <src>... <dest>`: 파일이나 디렉토리를 이미지로 복사
- `ADD [--chown=<user>:<group>] <src>... <dest>`:  파일이나 디렉토리를 이미지로 복사. URL도 입력 가능
- `EXPOSE <port> [<port>/<protocol>...]`: 컨테이너가 실행 시 listen할 포트 설정
- `ENV <key>=<value> ...`: 컨테이너에서 사용할 환경변수 지정
- `CMD ["executable","param1","param2"]`: 컨테이너가 실행되었을 때 실행되는 기본 명령어. shell form 형태는 [이곳](https://docs.docker.com/engine/reference/builder/#cmd) 참고
- `LABEL <key>=<value> <key>=<value> <key>=<value> ...`: 이미지에 메타데이터 추가. 메타데이터 통해 이미지에 대한 정보 쉽게 파악 가능
- **`RUN --mount=type=ssh ...`**: private repo clone 하거나 private package 다운을 위해 ssh key mount. 더 자세한 내용은 [스택오버플로우 답변](https://stackoverflow.com/questions/55929417/how-to-securely-git-clone-pip-install-a-private-repository-into-my-docker-image) 참고 (Other approaches:  [link1](https://medium.com/@erika_dike/installing-package-from-a-private-repo-in-your-docker-container-f45b1a4954a2), [link2](https://vsupalov.com/build-docker-image-clone-private-repo-ssh-key/))

도커 파일 최적화와 관련해서는 잘 작성된 글들이 있어 링크를 공유함: [link1](https://thearchivelog.dev/article/optimize-docker-image/), [link2](https://mateon.tistory.com/68)

### Docker Compose

##### Compose file

멀티 컨테이너 어플리케이션 관리를 위한 파일로, 컨테이너 실행에 필요한 옵션이나, 실행 순서, 의존성 등의 내용을 하나의 파일로 관리 가능. 아래는 `docker-compose.yml` 파일 예시

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

- `version`: 첫 줄에 적는 compose file format 버전.  3만 적으면 버전 3 중에서 최신 버전 사용. 자세한 내용은 [이곳](첫 줄에 적는) 참고
- `services`: 실행하려는 컨테이너들을 정의. 위 예시에는 web과 redis라는 두 개의 서비스 존재
- `build`: docker build 명령 실행할 디렉터리 경로
- `ports`: 사용할 포트 (HOST:CONTAINER)
- `volumes`: 로컬 컴퓨터의 디렉토리에 마운트
- `links`: 다른 서비스 컨테이너와의 네트워크 링크를 정의 (SERVICE:ALIAS 혹은 SERVICE). 컴포즈 파일 버전 3 이후로는 links 사용하지 않더라도 한 네트워크 안에 있는 서비스끼리 통신가능
- `image`: 해당 서비스가 사용할 이미지

##### Commands

- `docker-compose up [options] [--scale SERVICE=NUM...] [SERVICE...]`: `docker-compose.yml` 파일 따라 서비스 실행
  - 개발용 dev container를 compose 파일로 만들어두면 서버를 옮겨가며 작업할 때 매우 편리함
  - `docker-compose up -d`: 컨테이너를 백그라운드로 실행
- `docker-compose down [options]`: docker-compose up 명령으로 생성한 컨테이너나 이미지를 모아서 삭제
- `docker-compose start [SERVICE...]`: stop 되어있던 서비스 시작
- `docker-compose stop [options] [SERVICE...]`: 서비스 stop
- `docker-compose ps`: 현재 실행중인 서비스 상태 확인

### FastAPI

##### Run Options

```
uvicorn main:app --reload --host 0.0.0.0 --port 5000
```

- `main`: main.py 파일 의미
- `app`: main.py 파일 안의 `app=FastAPI()`
- `--reload`: 코드 변경 시 저장 후 재시작
- `--host`: 모든 접근 허용은 0.0.0.0
- `--port`: 포트 설정

### MLflow

MLflow의 4가지 주요 기능

- Tracking: ML 실험과 관련된 모든 결과물을 기록 및 조회하기 위한 기능 제공
  - `log_metric`,` log_param`, `log_artifacts` , `mlflow ui`

- Project: 재현을 위한 패키징 기능 제공
  - `mlflow run [로컬저장소 혹은 원격저장소]`

- Models: 다양한 플랫폼에서 모델 배포 및 추론을 관리하기 위한 기능 제공 (key concept: ***flavors***)
- Model Registry: 전체 라이프사이클을 공동 관리하기 위한 central model store 제공

##### MLflow Tracking

Tensorboard나 wandb charts 처럼 metrics, artifcats, tags, notes, parameter 정보들을 기록하기 위한 기능

- `mlflow.set_tracking_uri()`: tracking URI 연결. MLFLOW\_TRACKING\_URI 환경변수를 사용해서 연결하는 것도 가능하며, tracking server를 원격으로 두는 경우에 http/https uri 사용도 가능
- `mlflow.create_experiment()` 혹은 MLFLOW\_EXPERIMENT\_NAME 환경 변수를 사용하여 실험을 특정 그룹단위로 묶어 관리 가능
- `mlflow.start_run()` 사용시 하나의 active run을 리턴. Logging function 사용시 자동으로 호출되긴 함. 당연히 `mlflow.end_run()`도 존재
- `mlflow.log_param()`, `mlflow.log_metric()`, `mlflow.set_tag()`, `mlflow.log_artifact()` 등을 통해 parameter, metric, tag, artifact 기록
- Scikit-learn, Gluon, PyTorch, Fastai 등에 대해서는 log 함수를 직접 명시하지 않아도 알아서 자동으로 logging 해주는 **`mlflow.autolog()`** 기능 존재
- MLflow를 사용하여 tracking server를 따로 구축하는 경우에는 [이곳](https://mlflow.org/docs/latest/tracking.html#mlflow-tracking-servers) 참고

##### MLflow Projects

MLflow Project는 다른 엔지니어들이 나의 코드를 돌릴 수 있도록 organizing, describing하는 convention임. 따라서 간단히 요약하면 아래의 과정이 전부임

1. `MLProject` 파일에 **Name**, **Entry point**, **Environment** properties에 대한 정보를 명시. Entry point는 프로젝트 내에서 실행될 명령어와 해당 명령의 파라미터 정보들을 의미하며, environments는 conda, virtualenv 같은 실행 환경을 의미
2. `mlflow run` CLI 명령어 혹은 `mlflow.projects.run()` 파이썬 API를 사용하여 프로젝트 실행

`MLproject` 파일 예시 ([ml-system-in-actions](https://github.com/shibuiwilliam/ml-system-in-actions) 참고)

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

Kubernetes에서 MLflow 프로젝트를 실행하는 방법은 다음과 같음

1. `MLproject` 파일에 도커 환경 명시
2. Backend configuration JSON 생성. `kube-context`, `repository-uri`, `kube-job-template-path` 정보 기입. 자세한 내용은 [이곳](https://mlflow.org/docs/latest/projects.html#execution-guide) 참고
3. 필요한 경우 도커나 쿠버네티스 리소스 접근을 위한 자격 증명을 얻고, MLflow CLI나 파이썬 API 사용하여 프로젝트 실행

##### MLflow Models

다양한 downstream tools에서 ML 모델을 사용하기 위해 패키징하는 기능. 여기에 "flavor"이라는 컨셉이 등장하는데, 이는 사용하는 downstream tool이 무엇인지를 의미함

`my_model`이라는 프로젝트 폴더가 있다고 가정하고 해당 프로젝트를 배포하고자 할 때, 먼저 프로젝트 폴더 내에 관련 모델, 환경 파일들을 구비하고, `MLmodel` 파일을 기술하고, `mlflow models serve -m my_model` 명령어를 통해 모델을 배포할 수 있음

`MLmodel` 파일 예시 ([mlflow docs](https://mlflow.org/docs/latest/models.html#id19) 참고). 해당 예시는 sklearn과 python, 2개의 flavor로 이루어짐 

```
time_created: 2018-05-25T17:28:53.35

flavors:
  sklearn:
    sklearn_version: 0.19.1
    pickled_model: model.pkl
  python_function:
    loader_module: mlflow.sklearn
```

`MLmodel` 파일의 field로는 `flavors` 뿐만 아니라, `time_created`, `run_id`, `signature`, `input_example`, `databricks_runtime`, `mlflow_version`가 존재할 수 있음

- Signature: 모델의 input, output을 기술. `mlflow.models.signature` 모듈의 기능들 사용하여 로깅 가능

```
signature:
    inputs: '[{"name": "images", "dtype": "uint8", "shape": [-1, 28, 28, 1]}]'
    outputs: '[{"shape": [-1, 10], "dtype": "float32"}]'
```

- Input example: 유효한 모델 input 예시

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

Built-in model flavors는 [이곳](https://mlflow.org/docs/latest/models.html#built-in-model-flavors)에서 확인할 수 있으며, `mlflow.pyfunc`, `mlflow.tensorflow`, `mlflow.pytorch` 등의 모듈 형태로 정의되어 있음

Built-In Deployment Tools은 크게 4가지 형태로 생각해볼 수 있음. 자세한 내용 [이곳](https://mlflow.org/docs/latest/models.html#built-in-deployment-tools) 참고

- Deploy locally
- Deploy on Microsoft Azure ML
- Deploy on Amazon SageMaker
- Export model as an Apache Spark UDF

##### MLflow Model Registry

UI workflow와 API workflow로 구분지을 수 있으며, API workflow의 대략적인 사용법은 다음과 같음

- MLflow 모델을 model registry에 추가:  `log_model()`, `mlflow.register_model()`
- Model registry로 부터 모델 fetching: `load_model()`
- Model registry로 부터 모델 serving: `mlflow models serve -m ...`
- 모델 정보 변경
  - 모델 description 추가 및 수정: `update_model_version()`
  - 모델 renaming: `rename_registered_model()`
  - 모델 stage 변경: `transition_model_version_stage()`
- 모델 탐색: `list_registered_models()`, `search_model_versions()`
- 모델 삭제: `delete_model_version()`

### Kubernetes



### Kubeflow



##### Istio



### Design Patterns

[이곳](https://github.com/mercari/ml-system-design-pattern)을 참고하여 디자인 패턴 별 핵심 내용을 한 줄씩 정리합니다. 

##### Training patterns

- Pipeline training pattern: 각 작업을 개별 자원으로 분할하여 별도로 구축하는 패턴. 각 작업의 독립성을 높일 수 있다는 장점과 관리가 복잡해진다는 단점 존재
  - MLflow 활용하면 빠르게 프로토타이핑 가능
- Batch training pattern: 모델 학습을 정기적으로 수행하여, 모델을 항상 최신 상태로 유지하는 패턴
  - cron과 같은 스케줄링 시스템 활용
- Antipattern 1. Only-me pattern: 개인 환경에서 모델을 개발하였지만 다른 사람이 해당 시스템을 재현할 수 없는 상태
- Antipattern 2. Too many pipes pattern: 당연하게도 복잡한 파이프라인은 관리하기 매우 어려움

##### Serving patterns

- Web single pattern: 하나의 모델을 하나의 추론 서버를 사용하여 동기적으로 추론하는 가장 단순한 패턴
  - 학습된 모델을 ONNX, FastAPI, Unicorn, Gunicorn를 활용한 웹 싱글 패턴으로 제작하고 Docker로 감싸 빠르게 프로토타이핑 가능
- Synchronous pattern: 서비스 내 여러 작업들이 모델의 추론 결과에 의존하는(순서대로 실행되어야 하는) 패턴
  - 추론 모델은 ONNX, TensorFlow Serving 등으로 구성 후에, REST API, gRPC 등으로 요청 및 응답을 주고 받는 형태
- Asynchronous pattern: 추론 결과가 오래 걸리는 경우에 사용자에게 비동기적으로 대기 메세지를 제공하면 조작을 멈추지 않으면서도 추론 작업을 수행할 수 있음
  - 요청 서버와 추론 서버 사이에 queue(Apache Kafka) 혹은 cache(Rabbit MQ, Redis Cache) 서버를 구축해두고, 추론 서버에서 해당 queue, cache를 지속적으로 풀링하여, 대기 중인 작업이 있으면 추론 수행
- Batch pattern: 대량의 데이터(시간 단위, 월 단위의 데이터)를 하나로 정리하여 추론하고 싶은 경우 사용하는 패턴
  - cron과 같은 스케줄링 시스템 활용. 관련하여 Kubernetes에는 CronJobs라는 도구 존재
- Prep-pred pattern: 전처리와 추론에서 필요로 하는 리소스가 크게 다른 경우에, 전처리와 추론을 서로 다른 컨테이너로 분리하여 유지 보수성을 향상시키는 패턴
  - 데이터 취득, 전처리, 추론 등의 서버를 각각 구축하고, 이 앞단에 proxy 서버를 구비하여 gRPC(혹은 REST API)를 통해 요청 및 응답을 주고 받도록 구성
- Microservice vertical pattern: 여러 개의 추론기로 구성되는 시스템에서 추론기 사이의 의존성이 명확하고, 실행 순서가 정해져 있는 경우에 사용하는 패턴
  - 앞단에 proxy 서버를 구비하여 gRPC(혹은 REST API)를 통해 요청 및 응답을 주고 받도록 구성
- Microservice horizontal pattern: 의존 관계가 없는 여러 개의 추론을 병렬로 실행하는 패턴
- Prediction cache pattern: 동일한 요청에 대해 캐시를 활용하여 속도를 향상시키는 패턴
  - Redis 활용
- Data cache pattern: 데이터, 전처리된 데이터를 캐시하고 데이터를 매우 빠르게 취득하는 것을 목적으로하는 패턴 
- Serving template pattern: 유사한 추론기를 여러 개 만들 때에, 추론기의 학습이나 모델과 관련없는 부분(OS, 네트워크, 보안, 로그 수집)을 개발상의 규칙으로 공통화하는 패턴
  - 파이썬 템플릿 엔진 jinja2를 활용하여 템플릿 작성 가능
- Antipattern 1. Online bigsize pattern: 웹 서비스라면 요청에 대해 N초 안에 응답, 배치 처리라면 야간 N시간 내 전체 레코드를 완료해야하는 등 최대 소요 시간 내에 서비스가 작동할 수 있어야 함
- Antipattern 2. All-in-one pattern: 시스템 내의 모든 모델이 하나의 서버에서 가동되면 장애 대응 어려움

##### Operation patterns

- Model-in-image pattern: 추론기의 이미지에 모델 파일을 포함해서 빌드하는 패턴. 서버 이미지와 모델의 버전을 일치시킬 수 있지만, 학습한 모델의 수 만큼 서버 이미지의 수도 늘어난다는 단점 존재
  - 도커 이미지는 DockerHub에 두고, Kubernetes의 Masnifest용 YAML 파일에 사용할 리소스를 정의하는 방식
- Model-load pattern: 서버 이미지보다 추론 모델의 버전을 더 빈번하게 갱신하여거나, 동일한 서버 이미지로 여러 종류의 추론 모델 가동이 필요한 경우에, 모델 파일을 이미지 내에 포함시키지 않고 외부에서 다운로드해서 사용하는 패턴
  - 모델 파일은 AWS S3, GCP Storage에 저장 후, Kubernetes의 init container 기능 사용하여 컨테이너 초기화 시 모델 파일 다운로드
- Prediction log pattern: 클라이언트 이벤트 로그, 프록시 서버 지연 로그, 추론 서버 로그 등을 로그 스토리지에 저장하여 서비스를 개선하는 패턴
  - 로그 수집 기반으로는 queue나 Kubernetes의 Fluentd sidecar 기능 활용
- Prediction monitoring pattern: 로그를 감시하는 도중 경향이 비정상적인 경우에 운영자에게 통보하고자 하는 패턴. Prediction log pattern에서의 로그 스토리지를 바라보고 있는 감시 시스템을 추가하면 됨
- Parameter-based serving pattern: 추론 결과를 룰 베이스로 제어하고자 하는 패턴
  - 추론기마다 룰 베이스 제어에 사용할 변수를 환경 변수의 형태로 설정
- Condition-based-serving pattern: 각 그룹에 맞는 모델을 만들고 룰 베이스로 요청을 배분하는 패턴. 요청 지역에 따라, 요청 시간대에 따라 적합한 추론 모델을 골라 응답 가능
  - 추론 시스템은 Kubernetes 클러스터에 구축하고, 조건 분기는 Istio로 제어. Istio의 VirtualServie에는 요청의 헤더에 따라 요청의 전송처를 제어하는 기능이 내장되어 있으므로 이를 활용
- Antipattern 1. No logging pattern: 로그가 없다면 시스템을 개선할 수 없음
- Antipattern 2. Nobody knows pattern: 시스템 구축 이후에 운영하는 사람이 떠난 경우. 해당 시스템이 정확히 어떻게 동작하는 것인지 아무도 모르는 상태가 된다면 당연히 운용 및 개선 불가

##### QA patterns

- Loading test pattern: 추론 서버의 응답 속도를 측정
  - vegeta attack 활용
- Prediction circuit break pattern: 서버 액세스가 증가하는데 바로 서버의 스케일 아웃이 불가능한 경우에, 일부 요청을 일부러 처리하지 않도록 하여 서버 중단을 방지하는 패턴
  - Istio의 트래픽 관리 기능으로 서킷브레이커가 이미 내장되어 있음. 부하 테스트로는 vegeta attack 활용
- Shadow AB-testing pattern: 새로운 추론 모델이 실제 환경에서 문제 없이 작동하는지 확인하기 위한 패턴. Proxy서버가 현행 모델과 새로운 추론 모델에 둘 다 요청을 보내지만, 실제 응답은 현행 모델에게서만 받도록 구성
  - Istio의 VirtualService를 활용. VirtualService를 사용하여 트래픽 미러링
- Online AB-testing pattern: 요청의 일부를 새로운 추론기를 통해 응답하여 사용자의 반응을 확인하는 패턴
  - Istio의 VirtualService를 활용. VirtualService를 사용하여 트래픽 분할
- Antipattern 1. Offline-only pattern: 테스트셋으로만 모델을 검증하는 패턴. 모델을 판단하는 기준은 언제나 테스트 데이터가 아니라 실제 서비스 상황에서의 데이터여야 함

### References

- [Docker docs - Reference documentation](https://docs.docker.com/reference/)
- [MLflow documentation](https://mlflow.org/docs/latest/index.html)
- https://github.com/mercari/ml-system-design-pattern
- https://mercari.github.io/ml-system-design-pattern/README_ko.html
