---
title: "An Introduction to TensorFlow 1.0"
date: "2020-01-07"
template: "post"
draft: false
path: "/cheatsheet/20-01-07/"
description: "Occasionally I need to use TensorFlow version 1 instead of 2.0, so I'm posting a rough guide on how to use it. My local machine has TensorFlow 2.0 installed, but when I need version 1, I use Google Colab. (Apparently, Colab will soon replace TensorFlow version 1 with 2.0.)"
category: "Cheat Sheet"
---

Occasionally I need to use TensorFlow version 1 instead of 2.0, so I'm posting a rough guide on how to use it. My local machine has TensorFlow 2.0 installed, but when I need version 1, I use Google Colab. (Apparently, Colab will soon replace TensorFlow version 1 with 2.0.)

### Overview

The overall process of building and executing a graph with TensorFlow 1.0 is as follows:

**1. Create weight and bias variables using tf.Variable**

Variables are used to update and maintain parameters during model training.

**2. Create x and y data placeholders using tf.placeholder**

Allows you to directly feed x and y data tensors to the graph's operations.

**3. Define the hypothesis**

Uses weight, bias, and x data.

**4. Set the activation function**

Uses the hypothesis and produces y hat as the output.

**5. Set the loss function**

Uses y hat and y data to produce the loss.

**6. Set the optimizer**

Uses the loss and learning rate to complete the final graph.

**7. Execute the graph within a Session**

Feed x and y data via feed_dict, train using a for loop, and print cost, W, and b.

- Steps 1 through 6 constitute the graph assembly process, while step 7 executes the graph's operations (ops).
- Steps 1 through 6 are called the construction phase, and step 7 is the execution phase.

### Example

Here is a simple example code for Simple Linear Regression.

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

- Example: Adapted from the Simple Linear Regression lab code in Professor Sung Kim's [Deep Learning/Machine Learning for Everyone](https://hunkim.github.io/ml/)
