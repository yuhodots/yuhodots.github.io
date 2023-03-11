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

### IntelliJ IDE

- `⌘ B`: declaration or usage search. 제일 유용하다고 생각되는 단축키
- `⌘ -`: expand 되어 있는 코드의 특정 부분을 collapse
- `⌘ +`: collapse 되어 있는 코드의 특정 부분을 expand
- Structure (`⌘ 7`): 파일 구조를 한 눈에 빠르게 파악할 수 있는 기능

### Shell

- [LeCoupa / awesome-cheatsheets](https://github.com/LeCoupa/awesome-cheatsheets/blob/master/languages/bash.sh)
- `env`: 전역 변수 설정 및 조회(뒤에 값 입력하지 않는 경우)

### Vim

- [Vim cheat sheet](https://vim.rtorr.com/lang/ko)
- `dd`: 한 줄 잘라내기
- `j`, `k`: 한 줄 단위의 커서 이동

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
- GitHub issue and PR template: [About issue and pull request templates](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/about-issue-and-pull-request-templates)
