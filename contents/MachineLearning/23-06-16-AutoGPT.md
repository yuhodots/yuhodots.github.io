---
title: "AutoGPT"
date: "2023-06-16"
template: "post"
draft: true
path: "/deeplearning/23-06-16/"
description: ""
category: "Deep Learning"
thumbnail: "deeplearning"
---

### AutoGPT

https://github.com/Significant-Gravitas/Auto-GPT

- AutoGPT란?
  - 유저가 입력한 goal을 달성하기 위해 iterative process 수행
  - 기본 작동 프로세스: thinking, command 등
  - 기본 구성 요소: 시스템 / 유저 / OpenAI API 구조
  - Installation: OpenAI API key, .env 설정, Docker setting 등
  - Configuration: name, role 설정 등
- AutoGPT의 작동 원리에 대한 설명
  - Iteration 동안 내부적으로 어떤 프로세스 수행되는지
  - Memory(Input of ChatGPT)내에 어떤 정보들이 쌓이는지
- AutoGPT의 한계점
  - Hallucination에 의한 성능 저하
  - Cost와 speed 문제
  - 4000 token 등

### AutoGPT of UpstageAI

https://github.com/ChatGPTUp/Auto-GPT

- AutoGPT의 한계점을 어떻게 개선하는가?
  - Hallucination에 의한 성능 저하
  - Cost와 speed 문제
  - 4000 token 등
- 추가적으로 어떤 기능들을 더 넣었는가?
  - 추가된 기능들 list-up

- 실제 코드를 살펴보기
  - 위에서 list-up 된 내용에 대해서 모두 코드 함수 복붙 밑 분석

### Slack API

https://github.com/ChatGPTUp/Auto-GPT/issues

- Slack bot 만들기 기초 (빠르게만 훑기)
  - Slack key 설정 등
  - Slack role and permission 설정 등
- AutoGPT server deploy
  - Deploy with FastAPI + Docker container
  - Slack message 전달 받기 위해 configuration 설정 (e.g., port, domain 설정 어떻게 해야하는지)
  - 잘 되는지 테스트해보기 (Docker run - ping check - ask question to AutoAskUp)

### Random Thoughts

- Thinking iteration을 보고 있자니, '생각-방법 고민-다음 행동을 결정'하는 프로세스가 baby version의 AGI가 아닐까 싶다는 생각. 내년 쯤에는 ChatGPT 만큼 임팩트가 있는 AutoGPT 기반의 서비스 무언가 하나 나올 것 같음
- 매우 좋은 foundation model 가지고 이것을 어떻게 활용하는지가 점점 더 중요해지고, modeling 보다 점점 더 engineering 중요해지는 듯. 특히 지금 당장은 어떻게 memory에 입력 prompt 잘 쌓을 것인가에 대한 고민 기반으로 프롬프트 엔지니어들 점점 생겨날듯
