---
title: "Deep Learning Cheat Sheet"
date: "2021-01-27"
template: "post"
draft: false
path: "/archive/deep_learning/21-01-27"
description: "none"
category: "Deep Learning"
---

### Activation Function

- Sigmoid
  1. Logistic function = ${\frac{1}{1+e^{-x}}}$
  2. tanh = ${\frac{e^x - e^{-x}}{e^x+e^{-x}}}$
  3. arctan = $arctan \ x$ 
  4. erf = $\frac{2}{\sqrt{\pi}} \int^x_0e^{-t^2}$
- Relu
- LeakyRelu, PRelu
- ELU
- Softmax = $\frac{e^{z_i}}{\Sigma^K_{j=1}e^{z_j}}$

### Loss Function

- MSE
  - RMSE
- BCE = $-\frac{1}{N} \sum_{i=1}^N y_i \log\big(h(x_i; \theta)\big) + (1-y_i) \log\big(1- h(x_i; \theta)\big)$
- CE = $ - \sum_{i=1}^N p(x_i) \log q(x_i)$

### Optimizer

- GD, SGD
- Adagrad
  - AdaDelta
  - RMSProp
- Momentum
  - NAG
- Adam
- Nadam
- AdamP