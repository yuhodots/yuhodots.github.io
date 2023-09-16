---
title: "Packaging Python Projects"
date: "2023-09-16"
template: "post"
draft: false
path: "/cheatsheet/23-09-16/"
description: " Python project packaging과 관련하여 poetry 사용법과 pyproject.toml 작성 방법에 대해 간단히 기록합니다. 과거에는 python package 제작시 setuptools를 활용하여 setup.py에 package 정보를 적고, 이를 twine 등을 통해 PyPI에 등록하는 절차를 거쳤지만, 최근에는 pypoject.toml을 활용하여 패키징하는 형태로 대부분 바뀌는 중입니다."
category: "Cheat Sheet"
---

>  Python project packaging과 관련하여 poetry 사용법과 pyproject.toml 작성 방법에 대해 간단히 기록합니다.

- 과거에는 python package 제작시 setuptools를 활용하여 `setup.py`, `setup.cfg`에 package 정보를 적고, 이를 twine 등을 통해 PyPI에 등록하는 절차를 거쳤지만, 최근에는 `pypoject.toml`을 활용하여 패키징하는 형태로 대부분 바뀌는 중
- 관련하여 [awesome-pyproject](https://github.com/carlosperate/awesome-pyproject) 저장소에서 다양한 설명과 예시 확인 가능

### Poetry

- Poetry는 python의 dependency management와 packaging을 돕는 툴. 자세한 설명은 [공식 문서](https://python-poetry.org/docs/) 참고
- `.toml`, `.lock`을 통해 의존성을 관리하기 때문에 프로젝트마다 가상환경 하나하나 설정해주던 기존의 pip의 귀찮음을 해결가능
- `curl -sSL https://install.python-poetry.org | python3`: installation
- `poetry new ${project_name}`: create project. (or use `poetry init`)
- `poetry add ${package_name}`: add dependency
- `poetry remove ${package_name}`: remove dependency
- `poetry install`: install dependencies from poetry.lock
- `poetry check`: check validity of pyproject.toml
- `poetry update`: update dependecies. same with `rm poetry.lock` + `poetry install`
- `poetry build`: builds the source and wheels archives (e.g., **tarball, wheel**)
- `poerty publish`: publish to PyPI (need to run `poetry build` first)
- `poetry env use /full/path/to/python`: tell poetry which python version to use for the current project (for switching between environments)

### pyproject.toml

- 아래는 poetry 저장소에서 제공하고 있는 `.toml` 파일 작성 예시

```toml
[tool.poetry]
name = "my-package"
version = "0.1.0"
description = "The description of the package"

license = "MIT"

authors = [
    "NAME <name@gmail.com>"
]

repository = "https://github.com/python-poetry/poetry"
homepage = "https://python-poetry.org"

# README file(s) are used as the package description
readme = ["README.md", "LICENSE"]

# Keywords (translated to tags on the package index)
keywords = ["packaging", "poetry"]

[tool.poetry.dependencies]
# Compatible Python versions
python = ">=3.8"
# Standard dependency with semver constraints
aiohttp = "^3.8.1"
# Dependency with extras
requests = { version = "^2.28", extras = ["security"] }
# Version-specific dependencies with prereleases allowed
tomli = { version = "^2.0.1", python = "<3.11", allow-prereleases = true }
# Git dependencies
cleo = { git = "https://github.com/python-poetry/cleo.git", branch = "master" }
# Optional dependencies (installed by extras)
pendulum = { version = "^2.1.2", optional = true }

# Dependency groups are supported for organizing your dependencies
[tool.poetry.group.dev.dependencies]
pytest = "^7.1.2"
pytest-cov = "^3.0"

# ...and can be installed only when explicitly requested
[tool.poetry.group.docs]
optional = true
[tool.poetry.group.docs.dependencies]
Sphinx = "^5.1.1"

# Python-style entrypoints and scripts are easily expressed
[tool.poetry.scripts]
my-script = "my_package:main"
```

- `[tool.poetry]`: `{package_name} = [{ include = "{pacakge path}" },]` 를 통해 특정 폴더를 패키지화
- `[tool.poetry.dependencies]`: 의존성 있는 패키지들 나열. `poetry add`로 패키지 추가 가능
  - `some_api = { path = "some_directory/some_api", optional = true }` 이런식으로 세부 패키지마다 따로 관리할 수도 있음
- `[tool.poetry.group.{group name}.dependencies]`: 의존성을 그룹지어 둘 수 있음
  - `optional = true`로 설정해두면 `poetry install --with {group name}`로 설치 가능

```toml
[tool.poetry.group.{group name}]
optional = true
```

- `[tool. poetry.extras]`:  `poetry install --extras "{module name}"` 혹은 `pip install ".[module name]"`으로 특정 모듈 다운받거나, `poetry install --all-extras`로 전체 extras 받을 수 있음

- `[build-system]`: 필요한 build system 정의

- `[tool.poetry.scripts]`: 패키지들을 설치한 뒤 터미널에서 특정 명령어로 바로 실행하기 위한 entrypoint

### Installing Packages

- Installation with pip: git+https, https, git+ssh 등의 방법이 존재하며 형태는`pip install git+https://...`
- Installation with git clone

```sh
git clone https://github.com/author_name/repo_path
cd repo_path
pip install -e .	# –editable option, install all
# or you can use `poetry install --all-extras` if the package use poetry
```

- Installation with pyproject.toml

```toml
[tool.poetry.dependencies]
{package_name} = {git = "ssh://git@github.com/{author}/{package_name}.git", tag = "{tag or version}", extras = ["{extra_name}"]}
```

- Installation sub-directory: (1) dependencies 상에서 `optional = true` 설정, (2) extras에 선언 후에 (3) `poetry install --extras "{module name}"` 혹은 `pip install ".[module name]"`으로 설치

- Dokerizer 하는 경우에도 별 차이 없이 pip 혹은 poetry 통해서 다운받으면 되고, private repo 설정해둔 경우 [이 방법](https://stackoverflow.com/questions/55929417/how-to-securely-git-clone-pip-install-a-private-repository-into-my-docker-image) 참고

