---
title: "MLOps Cheat Sheet"
date: "2022-05-14"
template: "post"
draft: false
path: "/cheatsheet/22-05-14/"
description: "MLOps를 위한 도구들의 사용법을 명령어 위주로 정리하고 있습니다. 대부분은 공식 문서의 내용을 참고하고 있고, 그 외 내용을 참고하게 되는 경우에는 글 내용에 언급하거나 reference에 추가하고 있습니다. 현재는 Docker, Kubernetes, MLflow, Kubeflow의 내용을 다루고 있으며, 공부 진행 상황에 따라서 내용을 계속해서 추가하고 있습니다."
category: "Cheat Sheet"
---

> MLOps를 위한 도구들의 사용법을 명령어 위주로 정리하고 있습니다. 대부분은 공식 문서의 내용을 참고하고 있고, 그 외 내용을 참고하게 되는 경우에는 글 내용에 언급하거나 reference에 추가하고 있습니다. 현재는 공부 진행 상황에 따라서 내용을 계속해서 추가하는 중에 있습니다. 

### Docker

##### Commands

- `docker pull [OPTIONS] NAME[:TAG|@DIGEST]`: Docker Hub로부터 이미지 다운로드
- `docker push [OPTIONS] NAME[:TAG]`: Docker Hub로 이미지 업로드
- `docker create [OPTIONS] IMAGE [COMMAND] [ARG...]`: 이미지로부터 새 컨테이너 생성
- `docker stop [OPTIONS] CONTAINER [CONTAINER...]`: 작동중인 컨테이너를 stop. (*memory release*)
- `docker start [OPTIONS] CONTAINER [CONTAINER...]`: stop 상태의 컨테이너를 시작
- `docker run [OPTIONS] IMAGE [COMMAND] [ARG...]`: 이미지 다운로드 후, 컨테이너 생성(create) 후, 컨테이너 시작(start). 옵션은 [이곳](https://docs.docker.com/engine/reference/commandline/run/#options) 참고
- `docker build [OPTIONS] PATH | URL | -`: Dockerfile로부터 이미지 빌드
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

##### Options

- `--volume, -v`: 컨테이너 내부 디렉토리를 로컬 컴퓨터의 디렉토리에 마운트

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
- `docker-compose up [options] [--scale SERVICE=NUM...] [SERVICE...]`: `docker-compose.yml` 파일 따라 서비스 실행
- `docker-compose down [options]`: 서비스 지움
- `docker-compose start [SERVICE...]`: stop 되어있던 서비스 시작
- `docker-compose stop [options] [SERVICE...]`: 서비스 stop
- `docker-compose ps`: 현재 실행중인 서비스 상태 확인

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



### References

- [Docker docs - Reference documentation](https://docs.docker.com/reference/)
- [MLflow documentation](https://mlflow.org/docs/latest/index.html)
