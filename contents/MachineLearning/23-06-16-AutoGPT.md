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

> 뇌피셜이 많이 포함된 자료이며 미완성이라 draft로 유지합니다...

### LangChain

- 주요 기능들
  - prompts: User-defined prompt template이나, 함수 형태로 만들 수 있음. 말그대로 템플릿 고정해서 사용가능
  - llms: 어떤 모델 사용할지, temperature 어떻게 설정할지
  - memory
    - First, LangChain provides helper utilities for managing and manipulating previous chat messages. These are designed to be modular and useful regardless of how they are used.
    - Secondly, LangChain provides easy ways to incorporate these utilities into chains.
  - chains: workflow 생성. 이전 대화 입력과 결과 받아서 다음으로 넘겨주는?
  - utilites: 내용 추가 필요
  - indexes: 내용 추가 필요
    - document_loaders: PDF, xls, csv, markdown 등 로딩
  - agents: AutoGPT랑 비슷한듯?

### AutoGPT

https://github.com/Significant-Gravitas/Auto-GPT

ChatGPTUp 내용 넣기

- AutoGPT란?
  - Auto-GPT is an experimental open-source application showcasing the capabilities of the GPT-4 language model. This program, driven by GPT-4, chains together LLM "thoughts", to autonomously achieve whatever goal you set. As one of the first examples of GPT-4 running fully autonomously, Auto-GPT pushes the boundaries of what is possible with AI: 유저가 입력한 goal을 달성하기 위해 iterative process를 모델이 스스로 결정하고 수행
  - 기본 작동 프로세스
    - thinking, command 등

  - 기본 구성 요소: 시스템 / 유저 / OpenAI API 구조
  - Installation: OpenAI API key, .env 설정, Docker setting 등
  - Configuration: name, role 설정 등

- AutoGPT의 작동 원리에 대한 설명
  - Iteration 동안 내부적으로 어떤 프로세스 수행되는지
    - task_complete되면 끝
  - Memory(Input of ChatGPT)내에 어떤 정보들이 쌓이는지
- AutoGPT의 한계점
  - Hallucination에 의한 성능 저하
  - Cost와 speed 문제
  - 4000 token 등
  - 너무 똑같은 질문에 대한 루프 많이 돌음
- 느낀점
  - 아이디어가 놀랍고, 실제로 이렇게 모델은 그대로 두고 엔지니어링 만으로도 thinking process 된다는게 놀라움
  - 다만 hallucination 문제 아직 심하고, google searching이라는 점 외에는 chatGPT 대비 엄청나게 큰 차이까지 있는건 아님
  - https://openai.com/blog/function-calling-and-other-api-updates 6월 13일에 가격 내려감


### LangChain vs. AutoGPT

- 개발자 입맛에 맞게 최대한 커스터마이징하고 다양한 용도로 활용하고 싶다면 LangChain (여러 모듈 형태로 제공). LLM을 사용하는 다양한 최종 애플리케이션을 개발할 수 있도록 하는 프레임워크

- 개발 리소스 최대한 줄이고, GPT가 맘대로 결과물 내도 상관 없다면 AutoGPT

- LangChain is about process with control, while Auto-GPT is about result without control

##### LangChain Agent vs. AutoGPT

- 즉, LangChain은 최대한 유저가 다 정해줘야하고 AutoGPT는 에이전트가 혼자 다 함
- 둘 다 활용해서 프로덕트 만드는 사람 있을듯?

### AutoGPT of UpstageAI

https://github.com/ChatGPTUp/Auto-GPT

- AutoGPT의 한계점을 어떻게 개선하는가?
  - Hallucination에 의한 성능 저하
  - Cost와 speed 문제
  - 4000 token 등

### Slack API

https://github.com/ChatGPTUp/Auto-GPT/issues

- Slack bot 만들기 기초 (빠르게만 훑기)
  - Slack key 설정 등
  - Slack role and permission 설정 등
- AutoGPT server deploy
  - Deploy with FastAPI + Docker container
    - 빠르게 Digital Ocean 사용
  - Slack message 전달 받기 위해 configuration 설정 (e.g., port, domain 설정 어떻게 해야하는지)
  - 잘 되는지 테스트해보기 (Docker run - ping check - ask question to AutoAskUp)

### Random Thoughts

- Thinking iteration을 보고 있자니, '생각-방법 고민-다음 행동을 결정'하는 프로세스가 baby version의 AGI가 아닐까 싶다는 생각. 내년 쯤에는 ChatGPT 만큼 임팩트가 있는 AutoGPT 기반의 서비스 무언가 하나 나올 것 같음

- 매우 좋은 foundation model 가지고 이것을 어떻게 활용하는지가 점점 더 중요해지고, modeling 보다 점점 더 engineering 중요해지는 듯. 특히 지금 당장은 어떻게 memory에 입력 prompt 잘 쌓을 것인가에 대한 고민 기반으로 프롬프트 엔지니어들 점점 생겨날듯
