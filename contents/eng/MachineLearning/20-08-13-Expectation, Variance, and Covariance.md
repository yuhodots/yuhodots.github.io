---
title: "Expectation, Variance, and Covariance"
date: "2020-08-13"
template: "post"
draft: false
path: "/mathematics/20-08-13/"
description: "A brief summary of definitions and properties based on Wikipedia and the Deep Learning Book, organized for reference. Expectation is the sum over all events of the product of a random variable and its probability - it can be thought of as the mean of a probabilistic event, which can be treated as the population mean."
category: "Mathematics"
thumbnail: "mathematics"
---

A brief summary of definitions and properties based on Wikipedia and the Deep Learning Book, organized for reference.

### Expectation

- The sum over all events of the product of a random variable and the probability of that event occurring
- Can be thought of as the mean of a probabilistic event


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

- A measure of how far a random variable is spread out from its expected value
- Computed by subtracting the mean from each observation, squaring the result, summing all squared differences, and dividing by the total count; in other words, the mean of squared differences


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

- A value that indicates the degree of correlation between two random variables
- If one variable tends to increase while the other also tends to increase, the covariance will be positive; conversely, if one variable tends to increase while the other tends to decrease, the covariance will be negative
- While the direction (increase or decrease) of correlation can be understood, the value varies depending on the scale of measurement units of the two variables, making it inadequate for determining the degree of correlation through correlation analysis. In correlation analysis, the population correlation coefficient rho is used as a unit to represent the degree of correlation


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