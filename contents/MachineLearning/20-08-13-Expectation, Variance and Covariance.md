---
title: "Expectation, Variance and Covariance"
date: "2020-08-13"
template: "post"
draft: false
path: "/datascience/20-08-13/"
description: "위키피디아와 DeepLearning Book 등을 바탕으로, 참고하기 위해 정의와 성질 순서로 간단하게만 정리한 글입니다.사건에 대한 확률 변수와 그 사건이 벌어질 확률을 곱한 것을 전체 사건에 대해 합한 값 - 확률적 사건에 대한 평균의 의미로 생각할 수 있다. 이 경우 '모 평균'으로 다룰 수 있다."
category: "Data Science"
thumbnail: "datascience"
---

위키피디아와 DeepLearning Book을 바탕으로, 참고하기 위해 정의와 성질 순서로 간단하게만 정리한 글입니다.

### Expectation

- 사건에 대한 확률 변수와 그 사건이 벌어질 확률을 곱한 것을 전체 사건에 대해 합한 값
- 확률적 사건에 대한 평균의 의미


$$
\mathbb E_{x \backsim P}[f(x)] = \sum_x P(x)f(x)
$$

$$
\mathbb E_{x \backsim p}[f(x)] = \int p(x)f(x)dx
$$


$$
\mathbb E[cX] = c\mathbb E[X] 
$$

$$
\mathbb E[X+Y] = \mathbb E[X] + \mathbb E[Y]  
$$

$$
\mathbb E[\alpha X+ \beta Y] = \alpha\mathbb E[X] + \beta\mathbb E[Y] 
$$

### Variance

- 확률변수가 기댓값으로부터 얼마나 떨어진 곳에 분포하는지를 가늠하는 숫자
- 관측값에서 평균을 뺀 값을 제곱하고, 그것을 모두 더한 후 전체 개수로 나눔. 즉, 차이값의 제곱의 평균


$$
\begin{aligned}
Var[f(x)] 
&= \mathbb E[(f(x)-\mathbb E[f(x)])^2] \\
&= \mathbb E[(f(x)-\mu)^2]
\end{aligned}
$$

$$
Var[c] = 0
$$

$$
Var[cX]=c^2Var[X]
$$

$$
\begin{aligned}Var[X] 
&= \mathbb E[X^2]-(\mathbb E[X])^2 \\ 
&= \mathbb E[X^2]-\mu^2
\end{aligned}
$$

$$
\begin{aligned}
Var[X+Y] 
&= Var[X]+Var[Y]+2\mathbb E[(X-\mu_x)(Y-\mu_y)]\\
& =Var[X]+Var[Y]+2Cov[X,Y]
\end{aligned}
$$

### Covariance

- 2개의 확률변수의 상관정도를 나타내는 값
- 2개의 변수 중 하나의 값이 상승하는 경향을 보일 때, 다른 값도 상승하는 경향의 상관관계에 있다면, 공분산의 값은 양수가 될 것이며, 반대로 2개의 변수중 하나의 값이 상승하는 경향을 보일 때, 다른 값이 하강하는 경향을 보인다면 공분산의 값은 음수
- 상관관계의 상승 혹은 하강하는 경향을 이해할 수 있으나 2개 변수의 측정 단위의 크기에 따라 값이 달라지므로 상관분석을 통해 정도를 파악하기에는 부적절. 상관분석에서는 상관관계의 정도를 나타내는 단위로 모상관계수 ρ를 사용


$$
\begin{aligned}
Cov[f(x),g(y)] 
&= \mathbb E[(f(x)-\mathbb E[f(x)])(g(y)-\mathbb E[g(y)]] \\
&= \mathbb E[(f(x)-\mu_x)(g(y)-\mu_y)] 
\end{aligned}
$$

$$
Cov[c,X] = 0
$$

$$
Cov[\alpha X, \beta y] = \alpha \beta Cov[X,Y]
$$

$$
Cov[\alpha+X,\beta+Y] = Cov[X,Y]
$$