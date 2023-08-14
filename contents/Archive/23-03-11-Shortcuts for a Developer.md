---
title: "Shortcuts for a Developer"
date: "2023-03-11"
template: "post"
draft: false
path: "/cheatsheet/23-03-11/"
description: "IDE keyboard shortcuts 부터, vim, shell, tmux 등 개발자들이 자주 사용하는 툴의 편리한 기능들에 대해 기록합니다. 협업 관련 참고할 수 있는 기능이나 convention도 기록합니다. 잘 설명되어있는 블로그 글이나 자료들은 링크로 공유하였습니다. 새로 알게되는 내용이 생길 때 마다 계속해서 내용을 추가하고 있습니다."
category: "Cheat Sheet"
---

> IDE keyboard shortcuts 부터, vim, shell, tmux 등 개발자들이 자주 사용하는 툴의 편리한 기능들에 대해 기록합니다. 협업 관련 참고할 수 있는 기능이나 convention도 기록합니다.  잘 설명되어있는 블로그 글이나 자료들은 링크로 공유하였습니다.  새로 알게되는 내용이 생길 때 마다 계속해서 내용을 추가하고 있습니다.

### Pycharm

- `⌘ B`: declaration or usage search. 제일 유용하다고 생각되는 단축키
- `⌘ -`: expand 되어 있는 코드의 특정 부분을 collapse
- `⌘ +`: collapse 되어 있는 코드의 특정 부분을 expand
- Structure (`⌘ 7`): 파일 구조를 한 눈에 빠르게 파악할 수 있는 기능
- `⇧ ⇧`: 전체 검색
- `⌘ E`: 최근에 사용한 파일
- `⌥ Enter`: pycharm의 제안사항 확인
- 가끔 debugging 시에 내부 라이브러리로 step in 잘 안되는 경우 있는데, 이런 경우는 대부분 .idea 폴더 삭제해서 캐시 없애면 잘 작동함
- Pycharm remote debugging in a docker container: [파이참에서 DOCKER를 이용한 디버깅 환경 구축](https://seongwoopark.github.io/2017-06-02-study-pycharm_interpreter/)

### VSCode

- `⌘ ⇧ P`: open the command palette
- `⌘ ⇧ D`: open debugging tab
- `⌘ ⇧ E`: open the project tab
- `⌘ ⌥ up/down`: multiple cursors
- `⌘ D`: multiple selection
- `⌘ P`: search file by name
- `⌘ P + @`: `⌘ F` 보다 더 간편히 파일 내 코드 검색 가능
- `⌘ ⇧ .`: `⌘ P + @`와 유사한 기능
- `⌘ G`: go to line number
- `⌘ L`: highlight line
- `⌘ /`: comment
- `⌘ N`: open a new file
- `⌥ up/down`: move a line
- `⌘ >`: vscode의 제안사항 확인
- `⇧ ⌥ F`: auto-formatting

##### Debugging

- launch.json 파일을 통해서 디버깅 옵션 설정 가능
- `name`: 디버깅 config의 이름
- `type`: 디버거 유형
- `request`: launch or attach
- `cwd`: project working directory
- `program`: run a script
- `args`: command line arguments
- `env`: environment variables
- `console`: 사용할 console 종류
- `justMyCode`: false시 내부 라이브러리 까지도 jump-in 가능

```
# Example code
{
    "version": "0.2.0",
    "configurations": [

        {
            "name": "debugging option 1",
            "type": "python",
            "request": "launch",
            "cwd":"${workspaceFolder}/project_dir",
            "program": "${workspaceFolder}/project_dir/main.py",
            "args": [
                "--config", "configs/base.yaml",
                "--mode", "train",
            ],
            "env": {
                "CUDA_VISIBLE_DEVICES": "0, 1, 2",
            },
            "console": "integratedTerminal",
            "justMyCode": false
        },

    ]
}
```

### Vim

- [Vim cheat sheet](https://vim.rtorr.com/lang/ko)
- `dd`: 한 줄 잘라내기
- `j`, `k`: 한 줄 단위의 커서 이동

### iTerm2

- 플러그인 적용하려면 `.zshrc` 파일의 `plugins=()`에 플러그인 이름 적어넣으면 됨
  - zsh-syntax-highlighting: `git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting`
  - zsh-autosuggestions: `git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions`
  - autojump: `brew install autojump`
- dotenv라는 내장 플러그인 존재하는데, 해당 플러그인 사용시 `~/.env` 파일에 환경변수 설정 가능하며 이 때 export는 적지 않아도 됨

### Linux

- [LeCoupa / awesome-cheatsheets](https://github.com/LeCoupa/awesome-cheatsheets/blob/master/languages/bash.sh)
- `env`: 전역 변수 설정 및 조회(뒤에 값 입력하지 않는 경우)
- `<< 'TEXT'` `'TEXT'`: Bash multiline comment. 둘 사이에 내용을 입력하면 됨
- `pkill -f "process name"`: grep을 통해 하나씩 PID를 확인할 필요 없이, 한 번에 process를 kill 할 수 있음

##### Task Scheduling

- `at {time}` `Ctrl+D`: command를 time에 실행. time의 형태는 `now+{num} [minutes, hours, days]`, `HH:MM YYYY-MM-DD` 등이 가능
- `at -f {file_name} {time}`: file을 time에 실행
- `atq`: 예약되어 있는 작업 목록 확인
- `atrm {task_num}`: 예약된 작업을 제거

##### CPU Limit

- `taskset -c 0-3 python script.py`: CPU cores 0~3만을 사용
- `cpulimit -p "$(pgrep -f ${file_name})" -l 50`: file_name 실행하기 위해 CPU 50%만 사용

### NVIDIA

nvidia-smi에서 smi는 system management interface의 약자. Official document는 [이 곳](https://developer.download.nvidia.com/compute/DCGM/docs/nvidia-smi-367.38.pdf) 참고.

- `nvidia-smi -pl 150`: power limit을 150W으로 설정
- `nvidia-smi -lmc 6500`: lmc는 lock memory clock의 약자. memory clock frequency를 6500 MHz으로 제한
- `nvidia-smi -lgc 0,1800`: lgc는 lock gpu clock의 약자. minGpuClock=0, maxGpuClock=1800으로 설정

### Network

##### SSH Tunneling

- `ssh -L local_port:remote_server:remote_port remote_username@remote_server`
- ssh -L을 통한 터널링을 통해, local에서 remote server에 실행중인 서비스에 요청을 보내고 응답을 받을 수 있음
- 예를 들어, (remote server에 대해 ssh_config에 server1으로 설정해두었다고 하고) server1의 host 0.0.0.0(모든 접근 허용), port 5000에 특정 API를 띄워 두었다고 가정. 그러면 `ssh -L 8080:0.0.0.0:5000 server1`으로 터널링 후, local의 웹 브라우저에서 http://127.0.0.1:8080/ 접속 가능하며 요청 보내기도 가능

### tmux

- [Tmux Cheat Sheet & Quick Reference](https://tmuxcheatsheet.com)
- [MohamedAlaa / tmux-cheatsheet.markdown](https://gist.github.com/MohamedAlaa/2961058)

##### Session

- `tmux`, `tmux new`, `tmux new -s 세션이름`: session 생성
- `tmux kill-session -t 세션이름`: session 삭제
- `tmux kill-session -a`: 현재 session 제외 모두 삭제
- `tmux kill-session -a -t 세션이름`: 특정 session 제외 모두 삭제
- `Ctrl+b` `$`: session 이름 변경
- `tmux ls`, `Ctrl+b` `s`: 모든 session 확인
- `tmux a`, `tmux a -t 세션이름`: session에 attach
- `Ctrl+b` `d`: session에 detach
- `Ctrl+b` `(`, `Ctrl+b` `)`: session 이동

##### Window

- `tmux new -s 세션이름 -n 윈도우이름`: session 이름, window 이름을 설정하여 session 생성
- `Ctrl+b` `c`: window 생성
- `Ctrl+b` `,`: window 이름 변경
- `Ctrl+b` `&`: window 닫기
- `Ctrl+b` `p`, `Ctrl+b` `n`, `Ctrl+b` `0~9`: window 이동

##### Pane

- `Ctrl+b` `%`: split vertically
- `Ctrl+b` `"`: split horizontally
- `Ctrl+b` `방향키`, `Ctrl+b` `0~9`: pane 이동
- `Ctrl+b` `!`: pane을 window로 전환
- `Ctrl+b+방향키`: pane 크기 변경
- `Ctrl+b` `x`: pane 닫기

### Collaboration

- Code formatter: **black, flake8, yapf, pre-commit**. IDE 연동되는 경우에, 연동해서 사용하면 편리
- Type checker: **mypy, pyright, pyre-check**. IDE 연동되는 경우에, 연동해서 사용하면 편리
- Commit convention: [angular / angular](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines), [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- Branch naming: [Vincent Driessen, A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model/)
- Issue and PR template: [About issue and pull request templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates)
- Documentation (Github wiki): https://github.com/zxing/zxing/wiki (A good example of GitHub wiki) 
- GitHub action to run pre-commit: [pre-commit/action](https://github.com/pre-commit/action)

### Package

- 원격 저장소의 내용을 clone 받은 후 패키지로 설치 가능

  ```sh
  git clone https://github.com/author_name/repo_path
  cd repo_path
  pip install -e .	# –editable option, install all
  # or you can use `poetry install --all-extras` if the package use poetry
  ```

- 원격 저장소의 내용을 pip 통해 패키지로 설치가능: git+https, https, git+ssh 등의 방법이 존재하며, 형태는`pip install git+https://...` 
- 과거에는 python package 제작시 setuptools를 활용하여 `setup.py`, `setup.cfg`에 package 정보를 적고, 이를 twine 등을 통해 PyPI에 등록하는 절차를 거쳤지만, 최근에는 `pypoject.toml`을 활용하여 패키징하는 형태로 대부분 바뀌는 중
- 관련하여 [awesome-pyproject](https://github.com/carlosperate/awesome-pyproject) 저장소에서 다양한 설명과 예시 확인 가능

##### Poetry

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

### Etc.

- SQL/NoSQL GUI tools: Beekeeper, MongoDB Compass , DBgate, NoSQLBooster...
- YAML: TBU
