---
title: "An Introduction to Reinforcement Learning"
date: "2023-01-15"
template: "post"
draft: false
path: "/cheatsheet/23-01-15/"
description: "A concise overview of key concepts in reinforcement learning, from table-based methods to deep RL. For study, I recommend reading Noh Seung-eun's 'Reinforcement Learning from Scratch' first, then Sutton's 'Reinforcement Learning: An Introduction.'"
category: "Cheat Sheet"
---

> A concise overview of key concepts in reinforcement learning (RL), from table-based methods to deep RL. For study, I recommend reading Noh Seung-eun's "Reinforcement Learning from Scratch" first, then Sutton's "Reinforcement Learning: An Introduction."

### Preliminary

- Reinforcement learning is the process of correcting a policy (behavior) to maximize return (cumulative reward) through trial and error (interaction with the environment) in a sequential decision problem.
- To effectively solve problems using reinforcement learning, it is important to properly define the MDP problem and find the optimal policy $\pi^*$ and optimal value function $v^*$.

##### Terminology

- Agent: The learner or decision-maker
- Environment: Everything outside the agent that interacts with it
- Model: Not a model in the ML sense, but a model of the "environment" -- an element that allows estimation of how the environment will change
- Tick (= Time-Step): A discrete time unit in a sequential decision problem
- Episode (= Trial): A single journey from state $s_0$ to terminal state $s_T$. That is, it takes the form $[s_0, a_0, R_0, s_1, a_1, R_1, \cdots, s_T]$
- Transition: Generally refers to one state transition. That is, it takes the form $(s, a, r, s')$
- Exploitation: Selecting the best action known to the agent for a given state
- Exploration: Taking a new action to obtain more information beyond the agent's current knowledge
- Law of Large Numbers: A law describing the relationship between empirical probability and mathematical probability, stating that as the sample size grows, the sample mean approaches the population mean
- Simulator: A device for simulating interactions between the agent and the environment and accumulating experience
- Bootstrap: Generally refers to a method of updating a particular estimate based on other estimates
- Dynamic Programming (DP): A method of solving a complex problem by breaking it down into simpler sub-problems. Think of recurrence relations. All DP methods can be viewed as bootstrap methods, since the value estimate of a state is updated based on value estimates of states derived from it

##### Value and Policy

- Reward: A signal indicating how well decisions are being made
- Properties of Reward: Does not contain information about "how," can be sparse and delayed, and is a scalar value rather than a vector. Fundamentally, reinforcement learning is applicable when there is a scalar reward
- Return $G_t$: The sum of rewards from the present into the future. That is, $G_t = R_{t+1} + \gamma R_{t+2} + \gamma^2R_{t+3} + \cdots$
- Value: A numerical measure of how "good" a given state or action is
- Optimal Value: The maximum expected reward obtainable from a given state or action; the value that occurs when the agent always selects the action with the highest expected reward at each step. The value obtained by following the optimal policy is the optimal value
- Policy: Determining which action to take for a given state
- Optimal Policy: A policy that yields higher value than any other policy; a policy that maximizes expected reward
- State Value Function $v_\pi(s) = \mathbb E_\pi[G_t|s]$: A function that outputs the value for a given state
- State-Action Value Function $q_\pi(s,a) = \mathbb E_\pi[G_t | s, a]$: A function that outputs the value for a given state and action

##### Markov Decision Process

- State-Transition Probability $P_{ss'}$: The probability of arriving at the next state $s'$ from state $s$
- Markov Property: $P[s_{t+1} | s_1, s_2, \cdots, s_t] = P[s_{t+1} | s_t]$. That is, the property where $s_{t+1}$ is determined solely by the current state $s_t$. Since reinforcement learning fundamentally assumes the Markov property, modeling a phenomenon using RL becomes more useful the more Markovian the situation is
- Markov Process (a.k.a Markov Chain) $MP(S, P)$: A mathematical model consisting of sequential events with the Markov property. That is, every state change is influenced only by the previous state, and the probabilities of transitioning from one state to another sum to 1
- Markov Reward Process $MRP(S, P, R, \gamma)$: A Markov process with reward added. A reward is received upon reaching a certain state $s$, and $\gamma$ denotes the decaying factor
- Markov Decision Process $MDP(S,A,P,R,\gamma)$: A Markov reward process with an agent added

##### Prediction and Control

- Prediction: The problem of evaluating the value of each state given a policy $\pi$
- Control: The problem of finding the optimal policy $\pi^*$

##### On-Policy and Off-Policy

- Target Policy: The policy that is the target of improvement
- Behavior Policy: The policy that is actually interacting with the environment and accumulating experience
- On-Policy: When the target policy and behavior policy are the same
- Off-Policy: When the target policy and behavior policy differ

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

- Policy Iteration: A method that repeatedly performs policy evaluation and policy improvement until the policy converges.
  - Policy Evaluation: Performs iterative policy evaluation. That is, after initializing table values, it repeatedly uses the Bellman expectation equation to incrementally update the table values.
  - Policy Improvement: Generates a greedy policy.
  - Since waiting for iterative policy evaluation to converge can be too slow, early stopping is also possible. In the extreme case, it is possible to move to policy improvement after just a single policy evaluation step.

- Value Iteration: A method that adopts a greedy policy based on the optimal value. That is, it computes the value using the Bellman optimality equation $v^*(s)=\max_{a}[r^a_s + \gamma \sum_{s'}P^a_{ss'}v^*(s')]$, and then uses a greedy policy. Simply put, you can think of it as performing policy evaluation exactly once based on the optimality equation, followed by policy improvement.

- An important related theorem is the *Policy Improvement Theorem*.

### Model-Free

- Monte-Carlo Prediction: Computes value through sampling. That is, it runs multiple episodes, computes returns, and averages the returns to evaluate value. The basic form is $v_\pi(s_t) =\frac{\text{sum of returns}}{\text{number of visits}} =\frac{V(s_t)}{N(s_t)}$, and it can only be used in terminating MDPs.
  - w. Moving Average: Generally, the formula $V(s_t) \leftarrow (1-\alpha)V(s_t) + \alpha G_t $ or equivalently $V(s_t) \leftarrow V(s_t) + \alpha (G_t-V(s_t)) $ is used. In this case, there is no need to separately store $N(s_t)$; the table values can be updated at the end of each episode.

- TD Prediction: A method that uses estimates of other "non-terminal states" to update estimates. Therefore, like DP, it can be called a bootstrap method. Monte-Carlo uses the formula $v_\pi(s_t) = \mathbb E_\pi[G_t]$, while TD uses $v_\pi(s_t) = \mathbb E_\pi[r_{t+1} + \gamma v_\pi(s_{t+1})]$. In other words, Monte-Carlo collects multiple returns $G_t$, whereas TD collects multiple $r_{t+1} + \gamma v_\pi(s_{t+1})$ values. Generally, the formula $V(s_t) \leftarrow V(s_t) + \alpha (r_{t+1} + \gamma v_\pi(s_{t+1})-V(s_t)) $ is used.
- TD Target: Since $r_{t+1} + \gamma v_\pi(s_{t+1})$ is treated as the target or goal, this value is called the TD target.
- TD Zero: TD that uses $r_{t+1} + \gamma v_\pi(s_{t+1})$ is called TD Zero (or one-step TD), while using estimates from further steps ahead is called n-step TD.
- Monte-Carlo Control
  1. Accumulate experience through one episode, update the $q(s,a)$ table with the collected data (Policy Evaluation),
  2. Create an $\epsilon$-greedy policy using the updated $q(s,a)$ table (Policy Improvement)
- TD Control: Uses TD instead of Monte-Carlo in the policy evaluation step.
- On-Policy TD Control (SARSA): $Q(S,A) \leftarrow Q(S,A) + \alpha (R + \gamma Q(S',A')-Q(S,A)) $
- Off-Policy TD Control (Q-Learning): $Q(S,A) \leftarrow Q(S,A) + \alpha (R + \gamma \max_{A'}Q(S',A')-Q(S,A)) $. The behavior policy is $\epsilon$-greedy, but since the target policy is greedy, it is off-policy.
- An important related proof to study is *Convergence of Q-Learning*.

##### Overestimation Problem

- Overestimation Problem: Most algorithms involve maximization when constructing the target policy (e.g., greedy, $\epsilon$-greedy). In such cases, even when a value is not actually good when multiple options are considered, the algorithm focuses solely on the maximum value and ends up selecting a suboptimal policy. The figure below illustrates this.
- Double Q-Learning: $Q_1(S,A) \leftarrow Q_1(S,A) + \alpha (R + \gamma Q_2(S', \text{argmax}_a Q_1(S', a))-Q_1(S,A))$. Instead of using the same estimate ($Q$) for both q-value estimation and maximization, $Q_1$ is used to determine the maximizing action $A'=\text{argmax}_a Q_1(S', a)$, and a different estimate $Q_2$ is used to provide an estimate of the value of the maximizing action $Q_2(S', A')$. This estimate then becomes an unbiased estimate in the sense of $\mathbb E[Q_2(S',A')]$ (the same process is repeated for $Q_2$).

![img](../../img/overestimation.png)

### Deep Reinforcement Learning

- Value-Based Methods: Select actions based on the value function $q(s,a)$. That is, approximate $q(s,a)$ with a neural network.
- Policy-Based Methods: Select actions directly from $\pi(a|s)$. That is, approximate $\pi(a|s)$ with a neural network.
- Actor-Critic Methods: Both $\pi(a|s)$ and $q(s,a)$ are present. That is, approximate both $q(s,a)$ and $\pi(a|s)$ with neural networks.

##### Value-Based Methods

- Deep Q-Learning (DQN)
  - $\mathcal L(\theta) = \mathbb E[(r + \gamma \max_{a'}Q_\theta(s',a') - Q_\theta(s,a))^2]$
  - $\theta'= \theta + \alpha((r + \gamma \max_{a'}Q_\theta(s',a') - Q_\theta(s,a))\nabla_\theta Q_\theta(s,a,)$
  - Experience Replay: A method that reuses past experiences for training. Transitions are continuously stored in a replay buffer, and each transition serves as one training data point.
  - Target Network: When there is only a single network $\theta$ for modeling $q$, the target depends on $\theta$, so the target value keeps changing as $\theta$ is updated, making stable training difficult. Therefore, the parameters of the network used to compute the target are frozen temporarily, kept separate from the parameters used for training, and the frozen network is replaced with the latest parameters at regular intervals.


##### Policy-Based Methods

- Introduction to Policy-Based Methods
  - Has the advantage of being able to adopt stochastic policies. Therefore, policy-based methods are useful when actions are infinite, such as in continuous action spaces.
  - Instead of reducing a loss function, a criterion for evaluating the policy is established and gradients are updated in the direction that increases this criterion (policy gradient).

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
  - Advantage and Baseline: $A(s,a) = Q(s,a) - V(s)$ is called the advantage, and $V(s)$ is called the baseline. Arriving at state $s$ is already a fait accompli; the judgment is based on whether taking action $a$ from there makes things better or worse. In other words, this method considers only the additional gain attributable to the action, which also helps improve performance.

##### Advanced Topics

- Trust Region Policy Optimization (TRPO)
- Proximal Policy Optimization (PPO)
- Asynchronous Advantage Actor-Critic (A3C)
- Deep Deterministic Policy Gradient (DDPG)
- Monte Carlo Tree Search

### References

- Sutton, Richard S., and Andrew G. Barto., *Reinforcement learning: An introduction*, MIT press, 2018.
- Sutton, Richard S., and Andrew G. Barto., translated by Sung-woo Kim, *Reinforcement Learning: An Introduction (Korean Edition)*, Jpub (2020)
- Noh Seung-eun, *Reinforcement Learning from Scratch*, Youngjin.com (2020)
