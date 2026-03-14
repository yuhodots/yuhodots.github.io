---
title: "An Introduction to TensorFlow 1.0"
date: "2020-01-07"
template: "post"
draft: false
path: "/cheatsheet/20-01-07/"
description: "가끔 TensorFlow 2.0이 아닌 버전 1을 사용하게 되는 경우가 있어서, 대략적인 사용 방법을 포스팅 합니다. 제 로컬 컴퓨터에는 TensorFlow 2.0이 설치되어 있지만 버전 1을 사용해야하는 경우는 구글 colab을 통해 사용하고있습니다. (colab의 경우 곧 TensorFlow 버전 1이 버전 2.0로 대체된다고 하네요)"
category: "Cheat Sheet"
---

가끔 TensorFlow 2.0이 아닌 버전 1을 사용하게 되는 경우가 있어서, 대략적인 사용 방법을 포스팅 합니다. 제 로컬 컴퓨터에는 TensorFlow 2.0이 설치되어 있지만 버전 1을 사용해야하는 경우는 구글 colab을 통해 사용하고있습니다. (colab의 경우 곧 TensorFlow 버전 1이 버전 2.0로 대체된다고 하네요)

### Overview

TensorFlow 1.0을 통해 graph를 build하고 이를 실행시키는 전체적인 과정은 아래와 같습니다. 

**1. tf.Variable을 통해 weight, bias 변수 생성**

모델을 학습 시킬 때, 매개 변수(parameter) 업데이트와 유지를 위해 변수(Variables)를 사용

**2. tf.placeholder을 통해 x, y data 공간 생성**

graph의 연산에게 줄 x, y data tensor 값을 직접 feed 가능

**3. Hypothesis 설정**

weight, bias, x data 활용

**4. Activation function 설정**

hypothesis 활용, 결과로 y hat 도출

**5. Loss function 설정**

y hat, y data 활용, 결과로 loss 도출

**6. Optimizer 설정**

loss, learning rate 활용, 최종적인 graph 생성 완료

**7. Session 내에서 graph 실행**

feed_dict를 통해 x, y data를 입력하고 이에 대해 for loop로 학습, cost, W, b 출력

- 1~6 까지의 과정은 graph를 조립하는 과정이고, 7은 graph의 작업을(op) 실행시키는 과정
- 1~6 까지의 과정을 construction phase라 하고, 7은 execution phase라 함

### Example

Simple Linear regression에 대한 간단한 예시 코드입니다.

```python
import tensorflow as tf
tf.set_random_seed(777)  # for reproducibility

W = tf.Variable(tf.random_normal([1]), name="weight")
b = tf.Variable(tf.random_normal([1]), name="bias")

X = tf.placeholder(tf.float32, shape=[None])
Y = tf.placeholder(tf.float32, shape=[None])

# Hypothesis
hypothesis = X * W + b

# Loss function
cost = tf.reduce_mean(tf.square(hypothesis - Y))

# Optimizer
train = tf.train.GradientDescentOptimizer(learning_rate=0.01).minimize(cost)

# Launch the graph in a session
with tf.Session() as sess:
  
    # Initializes global variables in the graph.
    sess.run(tf.global_variables_initializer())

    # Fit the line with new training data
    for step in range(2001):
        _, cost_val, W_val, b_val = sess.run(
            [train, cost, W, b],
            feed_dict={X: [1, 2, 3, 4, 5], Y: [2.1, 3.1, 4.1, 5.1, 6.1]},
        )
        if step % 100 == 0:
            print(step, cost_val, W_val, b_val)

    # Best fit W:[ 1.],  b:[ 1.1]
    print('\n')
    print('x = 5 ->',sess.run(hypothesis, feed_dict={X: [5]}))
    print('x = 2.5 ->',sess.run(hypothesis, feed_dict={X: [2.5]}))
    print('x = 1.5, 3.5 ->',sess.run(hypothesis, feed_dict={X: [1.5, 3.5]}))
```

### Reference

- Example: 김성훈 교수님의 [모두를 위한 딥러닝/머신러닝](https://hunkim.github.io/ml/), Simple Linear Regression 실습 코드 참고

