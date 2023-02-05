---
title: "An Introduction to Reinforcement Learning"
date: "2023-01-15"
template: "post"
draft: false
path: "/cheatsheet/23-01-15/"
description: "강화학습(Reinforcement Learning)에 대해, 테이블 기반의 방법론부터 Deep RL까지 중요한 개념을 위주로 간단히 정리합니다. 공부를 위해 교재로는 노승은 님의 '바닥부터 배우는 강화학습'을 읽은 뒤에 Sutton 교수님의 'Reinforcement learning - An introduction.'을 살펴보시는 것을 추천드립니다. 정의와 수식 위주로 포스팅을 작성하였으며 자세한 설명은 해당 책들을 참고하시면 좋습니다."
category: "Cheat Sheet"
---

> 강화학습(Reinforcement Learning)에 대해, 테이블 기반의 방법론부터 Deep RL까지 중요한 개념을 위주로 간단히 정리합니다.

### Preliminary

- 강화학습이란, **Sequential Decision Problem**에서 **Trial and Error**(환경과의 상호작용)를 통해 **Return**(누적 보상)을 최대화하기 위한 방향으로 **Policy**(행동, 정책)를 교정하는 과정임
- 강화학습 기반으로 문제상황을 잘 해결하기 위해서는, MDP 문제를 잘 정의하고 optimal policy $\pi^*$와 optimal value function $v^*$을 찾아내는 것이 중요함

##### Terminology

- Agent: 학습자 혹은 의사결정자
- Environment: 에이전트와 상호작용하는 에이전트 이외의 모든 것
- Model: ML 분야에서 말하는 모델이 아니라, **'환경'에 대한 모델**을 말함. 즉, 환경이 어떻게 변화해 갈지를 추정할 수 있게 해주는 요소
- Tick (=Time-Step): Sequential decision problem에서의 이산적(discrete) 시간 단위
- Episode (=Trial): State $s_0$에서 terminal state $s_T$에 도달할 때 까지의 하나의 여정. 즉, $[s_0, a_0, R_0,s_1, a_1, R_1, \cdots, s_T]$의 형태를 가짐
- Transition: 일반적으로 state trainsition 1번을 의미. 즉, $(s,a,r,s')$의 형태를 가짐
- Exploitation: 주어진 state에 대해 에이전트가 알고있는 최선의 action을 선택하는 것
- Exploration: 에이전트의 지식 외에 더 많은 정보를 얻기 위해서 새로운 action을 취하는 것
- Law of Large Numbers: 경험적 확률과 수학적 확률 사이의 관계를 나타내는 법칙으로, 표본집단의 크기가 커지면 그 표본 편균이 모평균에 가까워짐을 의미
- Simulator: 에이전트와 환경 간 상호작용을 시뮬레이팅하고 경험을 쌓기 위한 장치
- Bootstrap: 다른 추정값들을 기반으로 특정 추정값을 갱신하는 방법을 일반적으로 부트스트랩이라 부름 
- Dynamic Programming (DP): 복잡한 문제를 간단한 여러 개의 문제로 나누어 푸는 방법. 점화식을 생각해보면 좋음. 모든 DP 방법은 어떤 state의 value 추정값 갱신을 위해 그 state로부터 파생되는 state의 value 추정값을 기반으로 하므로, bootstrap 방법으로 볼 수 있음

##### Policy and Value

- Reward: 의사결정을 얼마나 잘하고 있는지에 대한 신호
- Properties of Reward: '어떻게?'에 대한 정보를 담고 있지 않고, 희소 및 지연될 수 있으며, 벡터가 아닌 스칼라 값임. 기본적으로 강화학습은 스칼라 형태의 보상이 있는 경우에 적용이 가능
- Return $G_t$: 현재부터 미래까지 얻게 될 보상의 합. 즉, $G_t = R_{t+1} + \gamma R_{t+2} + \gamma^2R_{t+3} + \cdots$ 
- Value: 주어진 state나 action의 '좋은 정도'를 수치로 나타낸 것
- Optimal Value: 주어진 state나 action에서 얻을 수 있는 최대 기대 보상을 의미하며, 에이전트가 각 단계에서 항상 기대 보상이 가장 높은 action을 선택할 경우 발생하는 value를 의미. Optimal policy을 따랐을 때 얻는 value는 optimal value
- Policy: 주어진 state에 대해 어떤 action을 취할지 결정하는 것
- Optimal Policy: 다른 어떤 정책보다 더 높은 가치를 주는 정책. 기대보상을 최대화하는 정책
- State Value Function $v_\pi(s) = \mathbb E_\pi[G_t|s]$: 주어진 state에 대해 value를 출력하는 함수
- State-Action Value Function $q_\pi(s,a) = \mathbb E_\pi[G_t | s, a]$: 주어진 state와 action에 대해 value를 출력하는 함수

##### Markov Decision Process

- State-Transition Probability $P_{ss'}$: State $s$에서 다음 state $s'$에 도착할 확률
- Markov Property: $P[s_{t+1} | s_1, s_2, \cdots, s_t] = P[s_{t+1} | s_t]$. 즉, $s_{t+1}$이 오로지 현재 state인 $s_t$에 의해서만 결정되는 성질. 강화학습은 기본적으로 Markov property를 가정하므로, 마르코프한 상황일수록 특정 현상을 강화학습 기반으로 모델링 하는 것이 유용해짐
- Markov Process (a.k.a Markov Chain) $MP(S, P)$: Markov property를 가지는 순차적 이벤트로 이루어진 수학적 모델. 즉, 변화된 모든 state가 오로지 이전의 state에만 영향을 받으며, 하나의 state에서 다른 state로 변화하는 확률들의 합이 1임
- Markov Reward Process $MRP(S, P, R, \gamma)$: Markov process에 reward가 추가됨. 어떤 state $s$에 도달했을 때 reward를 받게되며, $\gamma$는 decaying factor를 의미
- Markov Decision Process $MDP(S,A,P,R,\gamma)$: Markov reward process에 에이전트가 더해진 것 

##### Prediction and Control

- Prediction: 어떤 $\pi$가 주어졌을 때 각 state의 value를 평가하는 문제
- Control: Optimal policy $\pi^*$를 찾는 문제

##### On-Policy and Off-Policy

- Target Policy: 강화하고자 하는 목표가 되는 정책
- Behavior Policy: 실제로 환경과 상호작용하며 경험을 쌓고있는 정책
- On-Policy: Target policy와 behavior policy가 일치하는 경우
- Off-Policy: Target policy와 behavior policy가 일치하지 않는 경우

### Bellman Equation

- Bellman Expectation Equation for $v_\pi(s)$
  1. $v_\pi(s) = \mathbb E_\pi[G_t] = \mathbb E_\pi[r_{t+1} + \gamma v_\pi(s_{t+1})]$
  2. $v_\pi(s)=\sum_a \pi(a | s) q_\pi (s,a)$
  3. $v_\pi(s)=\sum_a \pi(a|s)(r^a_s + \gamma \sum_{s'}P^a_{ss'}v_\pi(s'))$
- Bellman Expectation Equation for $q_\pi(s, a)$
  1. $q_\pi(s, a)=\mathbb E_\pi[r_{t+1} + \gamma q_\pi(s_{t+1}, a_{t+1})]$
  2. $q_\pi(s, a)=r^a_s + \gamma\sum_{s'}P^a_{ss'}v_\pi(s')$
  3. $q_\pi(s, a)=r^a_s + \gamma \sum_{s'} P^a_{ss'}\sum_{a'} \pi(a' | s') q_\pi (s',a')$
- Bellman Optimality Equation for $v^*(s) = \max_\pi v_\pi(s)$
  1. $v^*(s)=\max_a\mathbb E[r_{t+1} + \gamma v^*(s_{t+1})]$
  2. $v^*(s)=\max_{a}q^*(s, a)$
  3. $v^*(s)=\max_{a}[r^a_s + \gamma \sum_{s'}P^a_{ss'}v^*(s')]$
- Bellman Optimality Equation for $q^*(s, a)= \max_\pi q_\pi(s, a)$
  1.  $q^*(s, a)=\mathbb E[r_{t+1} + \gamma \max_{a'}q^*(s_{t+1}, a_{t+1})]$
  2.  $q^*(s, a)=r^a_s + \gamma\sum_{s'}P^a_{ss'}v^*(s')$
  3.  $q^*(s, a)=r^a_s + \gamma \sum_{s'} P^a_{ss'}\max_{a'}q^* (s',a')$

### Model-Based (Planning)

- Policy Iteration: Policy evaluation과 policy improvement를 반복적으로 수행하면서 policy가 수렴할 때 까지 반복하는 방법론
  - Policy Evaluation: Iterative policy evaluation 수행. 즉, 테이블 값들을 초기화한 후, Bellman expectation equation을 반복적으로 사용하여 테이블 값을 조금씩 업데이트하는 방법론 수행
  - Policy Improvement: Greedy policy 생성
  - Iterative policy evaluation이 수렴할 때 까지 반복하는 경우에 수행시간이 너무 느려지기 때문에, 일찍 멈추는 방법도 가능. 극단적으로는 한번의 policy evaluation 후에 바로 policy improvement로 넘어가는 것 가능

- Value Iteration: Optimal value에 대한 greedy policy를 채택하는 방법론. 즉, Bellman optimality equation $v^*(s)=\max_{a}[r^a_s + \gamma \sum_{s'}P^a_{ss'}v^*(s')]$을 활용해 value를 계산하고, 이후 greedy policy 사용. 쉽게 생각하면, policy evaluation을 최적 방정식 기반으로 오로지 한 번 계산한 뒤에 policy improvement 한다고 생각하면 됨

- 관련된 중요한 정리로는 *Policy Improvement Theorem*이 존재

### Model-Free

- Monte-Carlo Prediction: 샘플링을 통해 value 계산. 즉 여러 번 episode를 진행하면서 return을 계산하고, return의 평균을 계산하여 value 평가. 기본적으로는 $v_\pi(s_t) =\frac{\text{리턴의 합}}{\text{방문횟수}} =\frac{V(s_t)}{N(s_t)}$ 형태를 생각해볼 수 있으며, terminating MDP에서만 사용 가능
  - w. Moving Average: 일반적으로는 $V(s_t) \leftarrow (1-\alpha)V(s_t) + \alpha G_t $ 형태의 식, 혹은 $V(s_t) \leftarrow V(s_t) + \alpha (G_t-V(s_t)) $ 형태의 식을 사용. 이 경우에는 $N(s_t)$를 따로 저장해 둘 필요 없이 episode가 끝날 때 마다 테이블 값을 업데이트 해줄 수 있음

- TD Prediction: 추정값 갱신을 위해, 다른 '비종단 상태'에 대한 추정값을 활용하는 방법. 따라서 DP와 같은 bootstrap 방법이라고 말할 수 있음. Monte-Carlo에서는 $v_\pi(s_t) = \mathbb E_\pi[G_t]$ 식을 사용하지만, TD에서는 $v_\pi(s_t) = \mathbb E_\pi[r_{t+1} + \gamma v_\pi(s_{t+1})]$ 식을 사용함. 즉, Monte-Carlo에서는 regturn $G_t$를 여러개 모았지만, TD에서는 $r_{t+1} + \gamma v_\pi(s_{t+1})$를 여러개 모음. 일반적으로 $V(s_t) \leftarrow V(s_t) + \alpha (r_{t+1} + \gamma v_\pi(s_{t+1})-V(s_t)) $ 형태의 식을 사용
- TD Target: $r_{t+1} + \gamma v_\pi(s_{t+1})$를 정답 혹은 목표치로 여기는 것이기 때문에 이 값을 TD target이라 함
- TD Zero: $r_{t+1} + \gamma v_\pi(s_{t+1})$를 사용하는 TD를 TD Zero(혹은 one-step TD)라고 하며, 더 여러 스텝 뒤의 추측치를 사용하는 경우는 n-step TD라 말 함
- Monte-Carlo Control
  1. 한 episode의 경험을 쌓아, 경험한 데이터로 $q(s,a)$ 테이블의 값을 업데이트하고 (Policy Evaluation),
  2. 업데이트된 $q(s,a)$ 테이블을 이용하여 $\epsilon$-greedy 정책을 만듦 (Policy Improvement)
- TD Control: Policy evaluation 단계에서 Monte-Carlo 대신 TD를 사용
- On-Policy TD Control (SARSA): $Q(S,A) \leftarrow Q(S,A) + \alpha (R + \gamma Q(S',A')-Q(S,A)) $
- Off-Policy TD Control (Q-Learning): $Q(S,A) \leftarrow Q(S,A) + \alpha (R + \gamma \max_{A'}Q(S',A')-Q(S,A)) $. Behavior policy는 $\epsilon$-greedy이지만, target policy가 greedy이므로 off-policy임
- 관련된 중요한 증명으로 *Convergence of Q-Learning* 찾아보고 공부하기

##### Overestimation Problem

- Overestimation Problem: 대부분의 알고리즘이 target policy를 만드는 데 있어서 최대화를 포함하는데(e.g., greedy, $\epsilon$-greedy), 이 경우에 실제로 여러 옵션을 고려했을 때는 좋지 않은 value임에도 오로지 최대 value에만 집중해버려 suboptimal policy를 선택해버리는 현상이 발생함. 아래 사진을 예시로 생각해볼 수 있음
- Double Q-Learning: $Q_1(S,A) \leftarrow Q_1(S,A) + \alpha (R + \gamma Q_2(S', \text{argmax}_a Q_1(S', a))-Q_1(S,A))$. 동일한 추정값($Q$)을 가지고 q value 추정과 최대화에 동시에 사용하는 것이 아니라, $Q_1$을 이용하여 최대화 행동 $A'=\text{argmax}_a Q_1(S', a)$를 결정하고, 다른 추정값 $Q_2$를 이용하여 최대화 행동의 가치에 대한 추정값 $Q_2(S', A')$를 제공하는 방식. 그러면 이 추정값은 $\mathbb E[Q_2(S',A')]$라는 의미에서 편차없는 추정값이 됨 ($Q_2$에 대해서도 동일한 과정 반복)

![img](../img/overestimation.png)

### Deep Reinforcement Learning

- Value-Based Methods: Value function $q(s,a)$에 근거하여 action을 선택. 즉, neural network로 $q(s,a)$를 근사
- Policy-Based Methods: $\pi(a|s)$를 보고 직접 action을 선택. 즉, neural network로 $\pi(a|s)$를 근사
- Actor-Critic Methods:  $\pi(a|s)$와 $q(s,a)$가 모두 존재하는 방식. 즉, neural network로 $q(s,a)$와 $\pi(a|s)$를 근사

##### Value-Based Methods

- Deep Q-Learning (DQN)
  - $\mathcal L(\theta) = \mathbb E[(r + \gamma \max_{a'}Q_\theta(s',a') - Q_\theta(s,a))^2]$
  - $\theta'= \theta + \alpha((r + \gamma \max_{a'}Q_\theta(s',a') - Q_\theta(s,a))\nabla_\theta Q_\theta(s,a,)$
  - Experience Replay: 이전에 겪었던 경험ㄴ을 학습에 재사용하는 방법. Transition을 replay buffer에 계속 쌓아가며, trainsition 하나가 학습을 위한 데이터 하나임
  - Target Network: $q$를 모델링하기 위해 오로지 하나의 네트워크 $\theta$만 존재하는 경우에는 정답이 $\theta$에 의존적이기 때문에 $\theta$ 업데이트에 따라 정답 값이 계속해서 변하여 안정적인 학습이 어려움. 따라서 정답지를 계산할 때 사용하는 네트워크의 파라미터를 잠시 얼려두어 학습을 위한 파라미터와 따로 두고, 일정 주기마다 얼려 놓았던 네트워크를 최신 파라미터로 교체해주는 방식을 사용


##### Policy-Based Methods

- Introduction to Policy-Based Methods
  - Stochastic policy를 취할 수 있다는 장점을 가짐. 따라서 continuous action space과 같이 action이 무한인 경우에 policy-based method가 유용
  - 손실함수를 줄이는 방향이 아니라, policy를 평가하는 기준을 세워서 그 값을 증가시키도록 하는 방향으로 gradient를 업데이트 (policy gradient)

- Policy Gradient
  - Objective for 1-step MDP: $J(\theta) = \sum_sd(s)*v_{\pi_\theta}(s) = \sum_sd(s)\sum_a\pi_\theta(a|s)*R_{s,a}$
  - Gradient for 1-step MDP: $\nabla_\theta J(\theta) = \nabla_\theta\sum_sd(s)\sum_a\pi_\theta(a|s)*R_{s,a} = \sum_sd(s)\sum_a\pi_\theta(a|s)\nabla_\theta\ln \pi_\theta(a|s)*R_{s,a}=\mathbb E_{\pi_\theta}[\nabla_\theta\ln \pi_\theta(a|s)*R_{s,a}]$
  
  - Policy gradient: $\nabla_\theta J(\theta) = \mathbb E_{\pi_\theta}[\nabla_\theta\ln \pi_\theta(a|s)*Q_{\pi_\theta}{(s,a)}]$
  
- REINFORCE: $\nabla_\theta J(\theta) = \mathbb E_{\pi_\theta}[\nabla_\theta\ln \pi_\theta(a|s)*G_t]$

##### Actor-Critic Methods

- Q Actor-Critic: $\nabla_\theta J(\theta) = \mathbb E_{\pi_\theta}[\nabla_\theta\ln \pi_\theta(a|s)*Q_{w}{(s,a)}]$
- TD Actor-Critic: $\nabla_\theta J(\theta) = \mathbb E_{\pi_\theta}[\nabla_\theta\ln \pi_\theta(a|s)*\delta]$
  - TD error $\delta$: $r + \gamma V_\phi(s') - V_\phi(s)$

- Advantage Actor-Critic (A2C): $\nabla_\theta J(\theta) = \mathbb E_{\pi_\theta}[\nabla_\theta\ln \pi_\theta(a|s)* \{ Q_{w}{(s,a)-V_\phi (s)\}}]$
  - Advantage and Baseline: $A(s,a) = Q(s,a) - V(s)$를 advantage, $V(s)$를 baseline이라고 함. State $s$에 도착하는 사건은 이미 벌어진 일이고, 거기서 action $a$를 했을 때 더 좋아지느냐 덜 좋아지느냐를 가지고 판단. 즉, action으로 인해 생기는 추가 이득만을 고려하는 방법이며 성능 향상에도 도움이 됨

##### Advanced Topics

- Trust Region Policy Optimization (TRPO)
- Proximal Policy Optimization (PPO)
- Asynchronous Advantage Actor-Critic (A3C)
- Deep Deterministic Policy Gradient (DDPG)
- Monte Carlo Tree Search
