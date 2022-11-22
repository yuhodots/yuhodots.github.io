---
title: "Linux Command Cheat Sheet"
date: "2020-10-08"
template: "post"
draft: false
path: "/cheatsheet/20-10-08/"
description: " 랩에서 머신러닝 워크스테이션으로 Ubuntu 18.04 OS를 사용하고 있는데, 서버 관리 및 작업 과정에서 자주 사용되는 커맨드를 아래에 글로 정리하는 중입니다. 새로 알게 되거나 공유하고 싶은 내용이 생길 때 마다 추가해나가고 있습니다."
category: "Cheat Sheet"
thumbnail: "linux"
---

 랩에서 머신러닝 워크스테이션으로 Ubuntu 18.04 OS를 사용하고 있는데, 서버 관리 및 작업 과정에서 자주 사용되는 커맨드를 아래에 글로 정리하는 중입니다. 새로 알게 되거나 공유하고 싶은 내용이 생길 때 마다 추가해나가고 있습니다.

### 프로그램 실행

##### 백그라운드, 데몬 실행

- *`nohup 명령어 &`*
- nohup의 의미: nohup은 끊지 말라는 뜻의 no hang up 의 약자이며 데몬 형태로 실행할 때 사용. 데몬으로 실행시 서버에서 로그아웃을 하여 세션이 종료되더라도 프로그램은 종료되지 않음
- &의 의미: 백그라운드에서 실행. 사용자에 눈에 보이지 않는 곳에서 실행하지만, 세션이 종료되면 프로그램도 종료
- 실행중인 작업 확인: *`jobs -l`*

##### 표준 출력

- 파일의 출력로그는 기본적으로 해당 디렉토리의 nohup.out 파일에 쌓임
- 전체 출력 확인: *`cat nohup.out`*
- 마지막 10줄만 확인: *`tail -f nohup.out`*
- 표준 출력을 실시간으로 쓰기 (파이썬): *`nohup python -u 파일명.py &`*
- 기본적으로는 출력 내용이 바로 전송되는 것이 아니라 어느정도 버퍼에 쌓여야 전송이 되는데, 파이썬의 경우에는 -u 옵션 사용해서 출력을 개별적으로 전송이 가능. 그렇기에 이 옵션을 사용할 경우 출력을 바로 확인 가능
- 표준출력을 nohup.out이 아닌 다른 파일에 쓰기: *`nohup 명령어 > 파일명.out &`*
- 표준출력과 표준에러를 서로 다른 파일에 쓰기: *`nohup 명령어 1 > 파일명_출력.out 2 > 파일명_에러.err &`*

##### 프로세스

- 프로세스 ID 확인: *`ps -ef | grep 파일명`*
- 프로세스 종료: *`kill -9 프로세스ID`* (9 옵션은 강제종료, 15 옵션은 종료)

### 파일 관리

##### 기본 명령어

- 이전 디렉토리로 이동: *`cd -`*
- 홈 디렉토리로 이동: *`cd`* (혹은 *`cd ~`*)
- 디렉토리 내 파일들 확인: *`ls 폴더명`* (아무 폴더도 입력 안할 시, 현재 위치 출력)
- ls 명령어에서 -a 옵션은 숨겨진 파일도 확인, -l 옵션은 자세히 보기
- 파일, 디렉토리 이동: *`mv 파일명 이동위치`*
- 파일 이름 변경: *`mv 파일명 변경후파일명`*
- 파일 이름 일괄 변경: *`rename 파일명 변경후파일명 변경대상`*
- 파일 삭제: *`rm 파일명`* (-f 옵션은 강제삭제, * 사용시 파일 전체삭제)
- 디렉토리 삭제: *`rm -r 폴더명`* (혹은 *`rmdir`*)

##### grep

- 폴더 내에서 해당 내용이 존재하는 파일 찾기: *`grep 해당내용 해당폴더`*
- -h 옵션은 파일명 출력하지 않음, -o 옵션은 일치하는 부분만 출력, -l 옵션은 파일명만 출력
- 더 많은 옵션은 하단 양햄찌가 만드는 세상님 블로그 글 참고
- grep 명령어는 정규표현식을 사용해서 유동적으로 활용이 가능

##### 파일 압축 관련

- tar 압축해제: *`tar -xvf 파일명.tar`*
- tar로 압축하기: *`tar -cvf 파일명.tar 폴더명`*
- tar.gz 압축해제: *`tar -zxvf 파일명.tar`*
- tar.gz로 압축하기: *`tar -zcvf 파일명.tar 폴더명`*
- gz 압축해제: *`gzip -d 파일명.gz`* 
- gz로 압축하기: *`gzip 파일명`*
- tar 옵션은 하단 nota's stroy님 블로그 글 참고 

##### SFTP (SSH File Transfer Protocol)

- SFTP로 원격 서버 접속: *`sftp 유저아이디@서버아이피`*
- 파일 전송 작업을 하기 전에, 현재 로컬 컴퓨터의 위치를 미리 파악해두기
- 로컬과 관련된 명령어는 알파벳 'l'을 붙임으로써 사용가능 (예를 들어 cd는 *`lcd`*, ls는 *`lls`*) 
- 서버로부터 파일 다운로드: *`get 파일명`* (여러 파일의 경우 *`mget`*)
- 서버로 파일 업로드: *put 파일명* (여러 파일의 경우 mput)

### 계정 관리

- 전체 계정 확인: *`cat /etc/passwd`*
- useradd로 등록된 계정 확인: *`grep /bin/bash /etc/passwd`*
- sudo 권한을 가진 계정 확인: *`grep '^sudo:.\*$' /etc/group | cut -d: -f4`*
- 계정 생성: *`sudo useradd -m -s /bin/bash 계정이름`* (-m 옵션을 사용하면 홈 디렉토리도 자동 생성됨)
- 생성된 계정 암호 설정: *`sudo passwd 계정이름`*
- 계정 삭제: *`userdel 계정이름`* (-r 옵션을 사용하면 홈 디렉토리도 삭제됨)
- 현재 시스템에 로그인된 유저 확인: *`w`*

### 로그 확인

- 입력한 명령어 확인: *`history`* (경로: ~/.bash_history)
- 로그인 로그 확인: *`lastlog`* (경로: /usr/bin/lastlog)
- 로그인, 재부팅 로그 확인: *`last`* (경로: /usr/bin/last)
- 로그 파일이 모여있는 디렉토리: /var/log

### 서버 접속

##### SSH Key 등록

1. Key 생성: 로컬에서 `ssh-keygen -t rsa` (key type이 rsa라는 것을 의미)
2. Key 생성 확인: 로컬에 .ssh/id\_rsa.pub 파일이 생성되었는지 확인하고, 파일의 내용을 복사
3. Key 등록: 서버에 .ssh/authorized\_keys 파일을 만들고, 로컬에서 복사했던 rsa key 값을 authorized\_keys 파일에 붙여넣고 저장
4. .ssh/authorized\_keys 파일에 여러 개의 key를 등록하고 싶은 경우에는 줄 바꿈 사용

##### SSH config 설정

- 로컬의 .ssh/config 파일에 '서버 접속 이름 / ip address / username / port / key' 값을 저장하여, '서버 접속 이름' 만 입력하여도 서버 접속이 가능. 사용법은 아래 예시 참고

```
# vim ~/.ssh/config
Host servername
	HostName 10.20.12.123
	User username			
	Port 50100
	IdentityFile ~/.ssh/id_rsa
```

### 그 외

- 명령어 앞에 sudo 붙이는 것을 잊었을 때: *`sudo !!`*
- 최근에 사용한 argument 재사용: *`명령어 !$`*
- 복사, 붙여넣기: Ctrl+Shift+C, Ctrl+Shift+V
- 시스템 전체 정보 깔끔하게 출력: *`screenfetch`*

### Reference

- [Mr.Lin Blog - 쉽게 설명한 nohup 과 &(백그라운드) 명령어 사용](http://joonyon.tistory.com/98) ('프로그램 실행' 파트)
- [양햄찌가 만드는 세상 - 텍스트 필터 명령어1 (문자열 패턴 검색 grep 옵션, 정규표현식)](https://jhnyang.tistory.com/67) ('파일 관리' 파트)
- [nota's story - 리눅스 tar, gz 압축 및 해제](https://nota.tistory.com/53) ('파일 관리' 파트)
- [15 Essential Linux Command Line Tips and Tricks](https://medium.com/better-programming/15-essential-linux-command-line-tips-and-tricks-95e2bfa2890f) ('그 외' 파트)
- [https://shaeod.tistory.com - [리눅스 명령어] lastlog - 접속 로그 보기](https://shaeod.tistory.com/734) ('로그 확인' 파트)
