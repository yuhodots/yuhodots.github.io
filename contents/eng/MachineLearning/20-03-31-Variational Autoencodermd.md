---
title: "Variational Autoencoder"
date: "2020-03-31"
template: "post"
draft: true
path: "/deeplearning/20-03-31/"
description: "Let's explore the variational autoencoder (VAE), one of the deep learning generative models. This post is based on what I learned from the book 'Generative Deep Learning' (O'REILLY), with extensive references to the Additional Information section."
category: "Deep Learning"
thumbnail: "deeplearning"
---

Let's explore the variational autoencoder (VAE), one of the deep learning generative models. This post is based on what I learned from the book 'Generative Deep Learning' (O'REILLY), with extensive references to the Additional Information section.

### Variational Autoencoder

##### 1. The Goal of VAE

The ultimate goal we want to achieve with VAE is to discover the **distribution of the actual data**. If we want to generate 'human photo data in 10,000 dimensions,' our goal is to determine, as an ideal probability distribution, where human photo data points are located in the 10,000-dimensional space. We denote this distribution as p(x).

##### 2. How Should We Estimate the Data Distribution?

If we can find this probability distribution p(x), we will be able to generate data. However, we have no basis for estimating where human photo data points are located in the 10,000-dimensional space. Since there are infinitely many points in a 10,000-dimensional space, trying to place points one by one and check whether data is generated well would not work either. Therefore, we **estimate p(x) through the representation vector z**, which captures the characteristics of the data well.

##### 3. How Should We Estimate the Distribution of the Representation Vector z?

If we set up the representation vector z properly and pass it to the VAE's decoder, the decoder will tell us where data points exist in the 10,000-dimensional space. However, another problem arises here. We cannot know how the representation vector z is ideally distributed. To **estimate the probability distribution p(z) of the representation vector z**, we can encode the original data through the encoder, which can be thought of as p(z|x), but we cannot know what the ideal p(z|x) looks like (i.e., the true posterior is unknown). To solve this problem, we use a method called **variational inference**.

##### 4. Variational Inference

Variational inference is a method where, even though we do not know the ideal probability distribution, we assume a tractable distribution and adjust its parameters (mean, standard deviation) to approximate the ideal probability distribution, then use that approximation instead. In VAE, since we do not know the ideal p(z|x), we define a standard normal distribution q(z|x) and adjust the parameters of q(z|x) to approximate p(z|x). As training progresses, q(z|x) becomes reasonably close to p(z|x), and as a result, the representation vector z becomes a value we can work with.

### Understanding VAE Through Equations

To implement the above workflow as a deep learning model, we first need to define the loss function mathematically, and then we need to be able to train the model in the direction of reducing the loss function. Since what we ultimately want to know is p(x), let's start with log(p(x)), the log of p(x). (The derivation process is described in detail in the [Data Science School](https://datascienceschool.net/view-notebook/c5248de280a64ae2a96c1d4e690fdf79/) post, so please refer to it.) Expanding the equation for log(p(x)) ultimately yields:
$$
log(p(x))=ELBO(\phi)+KL(q_{\phi}(z|x)||p(z))
$$

$$
ELBO(\phi)=\mathbb{E}_{q_{\phi}(z|x)}[log(p(x|z))]-KL(q_{\phi}(z|x)||p(z))
$$

Since log(p(x)) is a bounded value, **minimizing KLD is equivalent to maximizing ELBO**. In other words, finding the probability distribution p(x) is the same as maximizing ELBO. Ultimately, we just need to define the loss function to maximize ELBO. However, loss functions are typically defined so that training proceeds in the direction of minimizing the loss. Therefore, instead of maximizing ELBO, we define the loss as -ELBO so that training proceeds in the direction of minimizing -ELBO. The final loss is as follows:
$$
\mathcal L_{\theta,\phi;x^i}=-\mathbb E_{q_{\phi}(z|x^i)}[log(p_{\theta}(x^i|z))]+KL(q_{\phi}(z|x^i)||p(z))
$$
The first term (-E...) is called the **reconstruction error**, referring to the loss between the input data and the output data. The second term (KL...) is called the **regularization error**, as it forces the values of z to follow a Gaussian normal distribution.

### Additional information

##### Reparametrization trick

The reparametrization trick is a modification of the z sampling method to ensure that the backpropagation algorithm works properly in code. Originally, sampling z from a Gaussian normal distribution with mean mu and standard deviation sigma is expressed as:
$$
z^{i,l}\sim N(\mu_i,\sigma_i^2)
$$
However, sampling this way makes backpropagation impossible. So we modify the z sampling method as follows. This allows z to be sampled while preserving its original probabilistic properties, and also enables backpropagation. (Epsilon is a value sampled from the N(0,1) Gaussian normal distribution.)
$$
z^{i,l}= \mu_i + \sigma_i^2 \odot \epsilon
$$

##### KL Divergence

Simply put, KLD is a tool that measures how different one probability distribution is from another. In VAE, it is used to measure how different a normal distribution with estimated mean mu and variance log_var is from the standard normal distribution. Adding KLD to the loss function gives us a well-defined distribution that can be used when selecting points in the latent space. Sampling from this distribution makes it very likely to select points within the region that the VAE is looking at. Furthermore, KLD forces all encoded distributions to be close to the standard normal distribution. This reduces the likelihood of large gaps forming between point clusters.

### Reference

- ratsgo's blog - [Variational Autoencoder](https://ratsgo.github.io/generative model/2018/01/27/VAE/)
- David Foster - Generative Deep Learning (O'REILLY)
- Hwalseok Lee's 'Everything About Autoencoders' - https://www.youtube.com/watch?v=o_peo6U7IRM
- Data Science School - https://datascienceschool.net/view-notebook/c5248de280a64ae2a96c1d4e690fdf79/