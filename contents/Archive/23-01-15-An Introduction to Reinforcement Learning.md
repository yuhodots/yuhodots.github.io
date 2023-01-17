---
title: "An Introduction to Reinforcement Learning"
date: "2023-01-15"
template: "post"
draft: true
path: "/cheatsheet/23-01-15/"
description: "강화학습(Reinforcement Learning)에 대해, 테이블 기반의 방법론부터 Deep RL까지 중요한 개념을 위주로 정리합니다. Sutton 교수님의 "*Reinforcement learning: An introduction*."를 참고하며 공부하였고, 수식과 정의에 대해서만 정리하였으며 자세한 내용은 해당 책을 직접 확인하시면 좋을 것 같습니다."
category: "Cheat Sheet"
---

> 강화학습(Reinforcement Learning)에 대해, 테이블 기반의 방법론부터 Deep RL까지 중요한 개념을 위주로 정리합니다. Sutton 교수님의 "*Reinforcement learning: An introduction*."를 참고하며 공부하였고, 수식과 정의에 대해서만 정리하였으며 자세한 내용은 해당 책을 직접 확인하시면 좋을 것 같습니다.

### Preliminaries

##### Basics

- Agent
- Environment
- Sequential Decision Problem
- Dynamic Programming (DP)

##### Markov Decision Process

- Markov Process
- Markov Reward Process
- Markov Decision Process

##### Policy and Value

- Policy
- Reward
- Return
- Value
- Optimal Policy
- Optimal Value

##### Prediction and Control

- Prediction
- Control

##### Bellman Equation

- Bellman Expectation Equation
- Bellman Optimality Equation

### Model-Based (Planning)

##### Prediction

- Iterative Policy Evaluation

##### Control

- Policy Iteration
- Value Iteration

### Model-Free

##### Prediction

- Monte-Carlo Prediction
- TD Prediction

##### Control

- Monte-Carlo Control
- TD Control
  - SARSA
  - Q-Learning

##### On-Policy and Off-Policy

- Target Policy
- Behavior Policy
- On-Policy
- Off-Policy

##### Overestimation

- Overestimation Problem
- Double Q-Learning

### Deep RL

##### Introduction

- Value Approximation
  - Q Learning with Function Approximation

- Value-Based Methods
- Policy-Based Methods
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

[^1]: Sutton, Richard S., and Andrew G. Barto., *"Reinforcement learning: An introduction,"* MIT Press, 2018.

