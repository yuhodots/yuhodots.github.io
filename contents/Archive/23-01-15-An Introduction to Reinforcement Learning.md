---
title: "An Introduction to Reinforcement Learning"
date: "2023-01-15"
template: "post"
draft: true
path: "/cheatsheet/23-01-15/"
description: "강화학습(Reinforcement Learning)에 대해, 테이블 기반의 방법론부터 Deep RL까지 중요한 개념을 위주로 간단히 정리합니다. 공부를 위한 교재로는 Sutton 교수님의 'Reinforcement learning - An introduction.'와 노승은 님의 '바닥부터 배우는 강화학습'을 추천드립니다. 포스팅에서는 자세한 설명을 제공하지 않을 예정이기에 설명 또한 해당 책들을 참고하시면 좋습니다."
category: "Cheat Sheet"
---

> 강화학습(Reinforcement Learning)에 대해, 테이블 기반의 방법론부터 Deep RL까지 중요한 개념을 위주로 간단히 정리합니다. 공부를 위한 교재로는 Sutton 교수님의 'Reinforcement learning - An introduction.'와 노승은 님의 '바닥부터 배우는 강화학습'을 추천드립니다. 포스팅에서는 자세한 설명을 제공하지 않을 예정이기에 설명 또한 해당 책들을 참고하시면 좋습니다.

### Preliminaries

##### Terminology

- Brief Explanation of RL: 순차적 의사결정 문제(Sequential Decision Problem)에서 시행착오(혹은 환경과의 상호작용)를 통해 행동(정책)을 교정하는 과정
- Agent: 학습자 혹은 의사결정자
- Environment: 에이전트와 상호작용하는 에이전트 이외의 모든 것
- Model: ML 분야에서 말하는 모델이 아니라, '환경'에 대한 모델을 말함. 즉, 환경이 어떻게 변화해 갈지를 추정할 수 있게 해주는 요소. 
- Dynamic Programming (DP): 
- Tick (=Time-Step)
- Episode (=Trial)
- Transition
- Exploitation
- Exploration
- Law of Large Numbers

##### Markov Decision Process

- Markov Process
- Stat-Transition Probability
- Markov Reward Process
- Markov Decision Process

##### Policy and Value

- Reward
- Return
- Value and Optimal Value
- Policy and Optimal Policy
- State Value Function 
- State-Action Value Function

##### Prediction and Control

- Prediction
- Control

##### On-Policy and Off-Policy

- Target Policy
- Behavior Policy
- On-Policy
- Off-Policy

### Bellman Equation

- Bellman Expectation Equation
- Bellman Optimality Equation

### Model-Based (Planning)

- Iterative Policy Evaluation
- Policy Iteration
  - Policy Evaluation
  - Policy Improvement

- Value Iteration

### Model-Free

- Monte-Carlo Prediction
- TD Prediction
- Monte-Carlo Control
- On-Policy TD Control (SARSA)
- Off-Policy TD Control (Q-Learning)

##### Overestimation

- Overestimation Problem
- Double Q-Learning

### Deep RL

##### Introduction

- Value Approximation
  - Q Learning with Function Approximation

- Experience Replay
- Target Network
- Value-Based Methods
- Policy Gradient
- Policy-Based Methods
- Advantage and Baseline
- Actor-Critic Methods

##### Value-Based Methods

- Deep Q-Learning (DQN)

##### Policy-Based Methods

- REINFORCE

##### Actor-Critic Methods

- Q Actor-Critic
- TD Actor-Critic
- Advantage Actor-Critic (A2C)
- Trust Region Policy Optimization (TRPO)
- Proximal Policy Optimization (PPO)
- Asynchronous Advantage Actor-Critic (A3C)
- Deep Deterministic Policy Gradient (DDPG)

##### Monte Carlo Tree Search (MCTS)

- Monte Carlo Tree Search

### References

[^1]: Sutton, Richard S., and Andrew G. Barto, "Reinforcement learning: An introduction," MIT Press, 2018.
[^2]: 노승은 저, "바닥부터 배우는 강화학습," 영진닷컴.
