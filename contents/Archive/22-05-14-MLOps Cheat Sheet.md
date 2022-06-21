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

### Kubernetes



### MLflow

- Tracking: ML 실험과 관련된 모든 결과물을 기록 및 조회하기 위한 기능 제공
- Project: 재현을 위한 패키징 기능 제공
- Models: 다양한 플랫폼에서 모델 배포 및 추론을 관리하기 위한 기능 제공 (key concept: ***flavors***)
- Model Registry: 전체 라이프사이클을 공동 관리하기 위한 central model store 제공

##### MLflow Tracking

- **Parameter, Metrics, Artifcats, Tags and Notes**

(TODO). MLflow docs 빠르게 쭉 훑고, 중요한 내용만 기록하기

##### MLflow Projects

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

##### MLflow Models



##### MLflow Model Registry



### Kubeflow



##### Istio



### References

- [Docker docs - Reference documentation](https://docs.docker.com/reference/)
- [MLflow documentation](https://mlflow.org/docs/latest/index.html)
