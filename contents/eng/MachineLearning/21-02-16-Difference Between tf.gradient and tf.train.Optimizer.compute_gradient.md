---
title: "tf.gradient and tf.train.Optimizer.compute_gradient"
date: "2021-02-16"
template: "post"
draft: false
path: "/deeplearning/21-02-16/"
description: "This post translates the TensorFlow official documentation for tf.gradient and compute_gradient, and summarizes their differences based on Stack Overflow references. tf.gradient computes the symbolic derivative of ys with respect to xs."
category: "Deep Learning"
thumbnail: "deeplearning"
---

> This post translates the TensorFlow official documentation for tf.gradient and tf.train.Optimizer.compute_gradient, and summarizes their differences based on Stack Overflow references.

### tf.gradient

Computes the symbolic derivative of `ys` with respect to `xs`. Returns a list of tensors, where each tensor represents the result of computing `sum(dy/dx)`.

```python
tf.gradients(
    ys, xs, grad_ys=None, name='gradients', colocate_gradients_with_ops=False,
    gate_gradients=False, aggregation_method=None, stop_gradients=None,
    unconnected_gradients=tf.UnconnectedGradients.NONE
)
```

`ys` and `xs` are tensors or lists of tensors. `grad_ys` is a list of tensors that holds the initial gradient values for `ys`, so it has the same length as `ys`.

`stop_gradients` is a tensor or list of tensors that should be treated as constants with respect to `xs`. These tensor values are not backpropagated during training.

```python
a = tf.constant(0.)
b = 2 * a
g = tf.gradients(a + b, [a, b], stop_gradients=[a, b])
```

In the example above, `g` yields the result [1.0, 1.0]. If the code is changed to `tf.gradients(a + b, [a, b])`, the result would be [3.0, 1.0]. The following example has the same meaning as the one above.

```python
a = tf.stop_gradient(tf.constant(0.))
b = tf.stop_gradient(2 * a)
g = tf.gradients(a + b, [a, b])
```

While `tf.stop_gradient` is used **during graph construction**, the `stop_gradients` argument provides a way to stop gradient computation even **after the graph has already been built**.

### tf.train.Optimizer.compute_gradients

Computes the gradient of `loss` with respect to `var_list`.

```python
compute_gradients(
    loss, var_list=None, gate_gradients=GATE_OP, aggregation_method=None,
    colocate_gradients_with_ops=False, grad_loss=None
)
```

This function is also used as the first part of `minimize()`. It returns a list of (gradient, variable) pairs for the variables in `var_list`.

### Differences

`tf.train.Optimizer.compute_gradients` (hereafter `compute_gradients`) wraps `tf.gradients` and therefore includes additional asserts. In the [actual source code](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/python/training/optimizer.py), `compute_gradients` calls `tf.gradients` under the name `gradients.gradients`, and it allows extension via subclasses for auxiliary purposes such as tracking or debugging.

Comparing the return values: `compute_gradients` returns a list of (gradient, variable) pairs. In this case, the variable always exists, but the gradient may not. If you want to apply gradient changes to variables, you can directly use the list returned by `compute_gradients` for weight updates.

On the other hand, `tf.gradients` only returns the `sum(dy/dx)` computation result for each variable, so an additional variable list must be provided to use it for weight updates.

Both approaches can be used as shown in the example below.

```python
### Approach 1 ###
variable_list = desired_list_of_variables
gradients = optimizer.compute_gradients(loss,var_list=variable_list)
optimizer.apply_gradients(gradients)

### Approach 2 ###
variable_list = desired_list_of_variables
gradients = tf.gradients(loss, var_list=variable_list)
optimizer.apply_gradients(zip(gradients, variable_list))
```

### Reference

- [TensorFlow - tf.gradients](https://www.tensorflow.org/api_docs/python/tf/gradients)
- [TensorFlow - tf.compat.v1.train.Optimizer](https://www.tensorflow.org/api_docs/python/tf/compat/v1/train/Optimizer#compute_gradients)
- [What's the difference between optimizer.compute_gradient() and tf.gradients() in tensorflow?](https://stackoverflow.com/questions/40539938/whats-the-difference-between-optimizer-compute-gradient-and-tf-gradients-in)
- [What is the difference between tf.gradients and tf.train.Optimizer.compute_gradient?](https://stackoverflow.com/questions/45347275/what-is-the-difference-between-tf-gradients-and-tf-train-optimizer-compute-gradi)
