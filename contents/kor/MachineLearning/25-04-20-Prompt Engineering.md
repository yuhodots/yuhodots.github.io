---
title: "Prompt Engineering Tips"
date: "2025-04-20"
template: "post"
draft: False
path: "/deeplearning/25-04-20/"
description: "구글에서 업로드한 Prompt Engineering 문서에 대해 리뷰합니다.  Temperature는 출력의 '창의성'이나 '랜덤함'의 정도를 설정. Top-K는 토큰 생성 시, 확률이 가장 높은 K개 단어 중에 선택. Top-P는 누적 확률이 P 이상이 되는 후보에서 선택"
category: "Deep Learning"
thumbnail: "deeplearning"
---

> 구글에서 업로드한 Prompt Engineering 문서에 대해 리뷰합니다. 

### Introduction

- Temperature: 출력의 '창의성'이나 '랜덤함'의 정도를 설정
  - 모델 출력은 수식으로 $p_i= \frac{e^{s_i}_{T}}{\Sigma_j{e^{s^j}_{T}}}$로 표현됨
  - $T < 1$: $s^i$ 값이 더 크게(확률분포가 뾰족하게) 반영 → 가장 확률 높은 토큰이 선택될 확률 올라감
  - $T > 1$: $s^i$ 값이 희석되어(확률분포가 평평해짐) 다양한 토큰이 선택될 확률 올라감
  - $T = 1$: 원래 모델이 계산한 확률 분포
  - 즉, 낮을수록 안정적, 일관된 출력을 만들고 높을수록 보다 다양한 출력을 생성
- Top-K: 토큰 생성 시, 확률이 가장 높은 K개 단어 중에 선택
- Top-P: 누적 확률이 P 이상(보통 0.8~1.0)이 되는 후보에서 선택
- Output Length: 생성할 토큰 수를 제한하여 속도 & api 비용을 줄일 수 있음. 다만 모델이 이 길이를 고려하여 답변을 짧게 만드는 것은 아님

### Prompting Techniques

- Zero-shot prompting: 예시 없이, 단지 질문만 던져서 답을 받는 가장 기본적인 방식

- One-shot & few-shot prompting: 모델에 올바른 답변의 예시를 1개(one-shot), 또는 소수(few-shot) 제공하고 추론을 요구

- System, contextual and role prompting
  - System prompting: 모델의 전반적인 동작 방침을 미리 제시하는 프롬프트
  - Role prompting: 특정 역할을 수행하도록 요청

    ```
    I want you to act as a travel guide. I will write to you about my location and you will suggest 3 places to visit near me in a humorous style
    ```
  - Contextual prompting: 대화나 문서 등 맥락을 주고 답변을 요청

    ```
    You are writing for a blog about retro 80's arcade video games.
    ```

- **Step-back prompting**: 정답을 바로 묻지 않고, 일단 문제에 대해 다시 요약 또는 재해석하게 한 뒤 답변

  ```
  (1) Write a one paragraph storyline for a new level of a first-person shooter video game that is challenging and engaging. 
  ```

  ```
  (2) Based on popular first-person shooter action games, what are 5 fictional key settings that contribute to a challenging and engaging level storyline in a first-person shooter video game?
  ```

  ```
  (3) Based on the above 5 theme, Take one of the themes and write a one paragraph storyline for a new level of a first-person shooter video game that is challenging and engaging.
  ```

- **Chain of Thought (CoT)**: 모델이 문제 해결의 과정을 차근차근 논리적으로 서술하게 유도

  ```
  답을 내기 전, 해당 문제를 단계별로 천천히 생각해보세요. (= Let's think step by step.)
  ```

- Self-consistency: 동일한 프롬프트를 여러 번 반복 실행해서 다양한 답안 중 가장 일관성 높은 결과를 추출

- **Tree of Thoughts (ToT)**: 의사 결정 과정에서 여러 선택지(가지)를 동시에 탐색하고, 각 가지별 생각 흐름을 평가해 최적의 답을 선정하는 방식

- **ReAct (reason & act)**: Reasoning과 Acting을 반복하며, 모델이 자체적으로 추론/검색/행동을 수행해 결과를 업데이트. 기본적으로 정보를 검색하고 액션을 취하는 과정을 반복하여 효율적으로 결과를 도출

  - 예를 들어, Metallica 멤버의 자식 수를 찾는 과정에서 각 멤버별로 정보를 검색한 후 종합하여 답변을 제시하는 것이 리액트의 예시

- Automatic Prompt Engineering: 더 많은 프롬프트들을 생성을 할 수 있도록 프롬프팅하는 것
  ```
  We have a band merchandise t-shirt webshop, and to train a chatbot we need various ways to order: "One Metallica t-shirt size S". Generate 10 variants, with the same semantics but keep the same meaning.
  ```

### Best Practices

1. Few-shot prompting 예시는 보통 **3개에서 5개** 정도의 예시를 추는 것이 좋다고 함
2. 간결하게 질문을 구성해야 하며, 복잡한 질문은 AI가 이해하기 어렵게 만들 수 있으므로 명료하게 표현하는 것이 좋음
3. 명령어 톤을 사용해야 하며, 상대방에게 직접적으로 지시하는 것이 효과적
4. AI에게 할 행동을 명확히 설명하는 동사를 사용하여 직관적인 이해를 돕는 것이 중요
   - e.g., Act, Analyze, Categorize, Classify, Contrast, Compare, Create, Describe, Define, Evaluate, Extract, Find, Generate, Identify, List, Measure, Organize, Parse, Pick, Predict, Provide, Rank, Recommend, Return, Retrieve, Rewrite, Select, Show, Sort, Summarize, Translate, Write.
5. DO or DO NOT에 대해 자세히 명시해주는 것이 좋음
6. AI가 해야 할 것(instruction)에 집중하는 것이 중요하며, 하지 말아야 할 것(constraint)은 언급하지 않는 것이 더 효과적
7. 프롬프트에 variables 사용하는 것 좋음
8. Classification task를 위한 few-shot prompting을 할 때는, **class에 대한 예시를 골고루** 제공해야 함
9. **json이나 xml형태**로 응답을 받으면 더 일관된 답변을 제공받을 수 있으며, 할루시네이션을 줄이는 데 기여
10. Chain of Thought 기법을 사용할 때는 **temperature를 0**으로 설정하는 것이 유리하며, 그 이유는 확정된 문제 해결에 적합하기 때문
11. 여러 프롬프트 실험한 내용을 어딘가에 기록해두어야 테스트, 업데이트 시 유용하게 활용 가능

##### Top-K and Top-P

- General starting point: **T=0.2 / Top-P=0.95 / Top-K=30**
- Creative results: **T=0.9 / Top-P=0.99 / Top-K=40**
- Less creative results: **T=0.1 / Top-P=0.9 / Top-K=20**

### Reference

https://www.kaggle.com/whitepaper-prompt-engineering
