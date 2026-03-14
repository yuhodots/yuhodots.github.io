---
title: "Python Package Manager 비교: pip, poetry, and uv"
date: "2024-10-18"
template: "post"
draft: false
path: "/cheatsheet/24-10-18/"
description: "Python 개발 환경에서 패키지 관리는 필수적입니다. pip, poetry가 제일 유명하지만 최근에는 uv를 사용하는 프로젝트들이 점점 늘어나고 있습니다. 이 글에서는 각 도구들의 주요 특징이나 장단점에 대해 비교해보도록 하겠습니다. pip은 Python 패키지 설치 도구 중 가장 오래되고 널리..."
category: "Cheat Sheet"
thumbnail: "python"
---

> Python 개발 환경에서 패키지 관리는 필수적입니다. pip, poetry가 제일 유명하지만 최근에는 uv를 사용하는 프로젝트들이 점점 늘어나고 있습니다. 이 글에서는 각 도구들의 주요 특징이나 장단점에 대해 비교해보도록 하겠습니다.

### pip

pip은 Python 패키지 설치 도구 중 가장 오래되고 널리 사용되는 도구입니다. Python 패키지 인덱스(PyPI)에서 패키지를 다운로드하고 설치하는 표준 도구로 자리 잡았으며, 대부분의 Python 프로젝트에서 기본적으로 사용됩니다. 파이썬으로 빠르게 코드를 작성한다던지 작은 실험을 빠르게 진행하는 경우에, 대부분 pip을 사용하곤 합니다. 

아래와 같은 장점을 갖습니다.

- 사용이 간단함: `pip install package-name` 명령으로 간편하게 패키지를 설치할 수 있습니다.
- 광범위한 호환성: 대부분의 Python 프로젝트에서 사용할 수 있으며, 다양한 Python 버전과 플랫폼에서 지원됩니다.
- 빠른 업데이트 주기: Python 패키지 인덱스(PyPI)와 밀접하게 연동되어 빠르게 패키지를 관리하고 업데이트할 수 있습니다.

하지만 아래와 같은 단점이 존재합니다. 

- 복잡한 프로젝트 관리: 대규모 프로젝트에서의 패키지 버전 충돌을 관리하는 데 어려움이 있습니다.
- Lockfile 미지원: Poetry와 같은 도구와 달리, pip은 lockfile을 기본적으로 생성하지 않아 의존성 관리에 불편함이 있을 수 있습니다.

다음의 명령어들을 통해 기본적인 사용이 가능합니다.

- `pip install package-name`: 패키지 설치
- `pip freeze > requirements.txt`: 현재 설치된 패키지 목록을 파일로 저장
- `pip uninstall package-name`: 패키지 제거

### poetry

poetry는 의존성 관리와 패키지 배포를 더 쉽게 하려는 목표로 개발된 Python 패키지 관리 도구입니다. 기존의 pip 및 pip-tools에서 부족했던 패키지 의존성 관리와 프로젝트 설정을 효율적으로 관리할 수 있도록 돕습니다.

아래와 같은 장점을 갖기 때문에 많은 중대형 파이썬 프로젝트들이 poetry를 사용하고 있습니다.

- pyproject.toml 기반: poetry는 `pyproject.toml` 파일을 사용하여 프로젝트의 설정과 의존성을 관리합니다.
- 의존성 해결 및 Lockfile 생성: poetry는 의존성 문제를 해결하는 강력한 기능을 제공하며, `poetry.lock` 파일을 통해 버전 충돌을 방지합니다.
- 패키지 배포 지원: 프로젝트 생성부터 패키지 배포까지 통합적으로 관리할 수 있습니다.

하지만 아래와 같은 단점도 여전히 존재합니다.

- 느린 성능: 패키지 설치 및 의존성 해결 속도가 다소 느릴 수 있습니다.
- 복잡한 설정: 작은 프로젝트보다는 중대형 프로젝트에서 더 유용하며, 초기 설정이 다소 복잡할 수 있습니다.

다음의 명령어들을 통해 기본적인 사용이 가능합니다.

- `poetry install`: 의존성 설치
- `poetry add package-name`: 패키지 추가
- `poetry update`: 의존성 업데이트

### uv

uv는 Rust로 작성된 새로운 Python 패키지 관리자입니다. uv는 python linter인 ruff를 개발한 Astral에서 개발한 도구 중 하나로, 특히 성능에 중점을 두고 있습니다. 기존의 pip 및 pip-tools의 워크플로우를 대체할 수 있도록 설계되었으며, 빠르고 신뢰할 수 있는 패키지 관리 경험을 제공합니다.

아래와 같은 강력한 장점을 갖기 때문에 많은 프로젝트들이 poetry에서 uv로 옮겨가고 있습니다. 대표적인 예로, Python Web Framework인 FastAPI도 uv 기반으로 프로젝트를 전환하였습니다. 

- Rust 기반의 빠른 성능: uv는 pip과 비교해 8~10배, warm-up된 캐시에서 80~115배 더 빠른 성능을 보여줍니다.
- 모듈화된 설계: 패키지 설치, 의존성 해결, 가상 환경 생성 등 다양한 기능을 유연하게 사용할 수 있습니다.
- 통합 관리 툴: pip, pip-tools, virtualenv를 대체할 수 있는 단일 바이너리로, Python 자체를 설치하는 기능까지 제공합니다. 기존 pip 환경에서 쉽게 대체하여 사용할 수 있다는 것도 장점입니다.
- 추가 기능: 다양한 의존성 해결 전략, 타겟 Python 버전에 따른 의존성 해결, 의존성 오버라이드 기능을 지원합니다.

아래와 같은 단점이 존재합니다.

- 미성숙한 기능: 아직 Poetry나 pip에 비해 모든 기능을 완벽하게 대체하지는 못합니다.
- 기존 프로젝트와의 호환성 문제: 일부 레거시 기능은 지원하지 않을 수도 있습니다.

다음의 명령어들을 통해 기본적인 사용이 가능합니다.

- `uv pip install`: 패키지 설치
- `uv pip compile`: 의존성 해결 및 lockfile 생성
- `uv pip sync`: 가상 환경 동기화

##### Quick Start

간단한 파이썬 프로젝트를 uv 기반으로 생성하고 테스트 해보겠습니다.

먼저, uv 설치를 진행합니다. 

```shell
curl -LsSf https://astral.sh/uv/install.sh | sh
```

프로젝트를 만들고 python linter인 ruff를 사용해봅니다.

```shell
uv init example
cd example
uv add ruff	# ruff package 설치
uv run ruff check	# ruff package 실행
```

다양한 python version을 설치하고, 빠른 전환도 가능합니다.

```shell
uv python install 3.10	# python 설치
uv python install pypy@3.10	# pypy 설치
uv python pin pypy@3.10 # 현재 프로젝트의 Python version을 3.10으로 변경
uv run hello.py	# 예시 파일 실행
```

uv sync, lock, build, publish 등 더 다양한 명령어는 [이곳](https://docs.astral.sh/uv/getting-started/features/#the-pip-interface)에서 확인 가능합니다. 

### References

- [uv: Python packaging in Rust](https://astral.sh/blog/uv)
- https://docs.astral.sh/uv/#highlights
- https://docs.astral.sh/uv/getting-started/features/#the-pip-interface

