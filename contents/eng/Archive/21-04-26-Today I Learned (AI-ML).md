---
title: "Today I Learned (AI/ML)"
date: "2021-04-26"
template: "post"
draft: false
path: "/cheatsheet/21-04-26/"
description: "This is a collection of newly learned knowledge that feels too small for a dedicated post. Rather than recording daily study notes, I update content here irregularly whenever I learn something new. This post accumulates AI/ML-related technical knowledge. More recently written content is placed at the bottom."
category: "Cheat Sheet"
---

This is a collection of newly learned knowledge that feels too small for a dedicated post. Rather than recording daily study notes, I update content here irregularly whenever I learn something new. This post accumulates AI/ML-related technical knowledge. More recently written content is placed at the bottom.

##### 🧩 ML library

*2021.04.25*

I read the description of the `tf.map_fn` function from the [TensorFlow official documentation](https://www.tensorflow.org/versions/r1.15/api_docs/python/tf/map_fn). It maps the elements of a tensor list called elems, unpacked at dimension 0, to fn.

```python
tf.map_fn(fn, elems, dtype=None, parallel_iterations=None, back_prop=True,
    	  swap_memory=False, infer_shape=True, name=None)
```

When implementing MAML, the following code can be used to compute cross entropy for meta-batches in parallel. Here, the shape of xs is [meta-batch size, nway\*kshot, 84\*84\*3].

```python
cent, acc = tf.map_fn(lambda inputs: self.get_loss_single(inputs, weights),
					 elems=(xs, ys, xq, yq),
				 	 dtype=(tf.float32, tf.float32),
				 	 parallel_iterations=self.metabatch)
```

##### 🧩  ML library

*2021.04.27*

I used to think that using many for loops in the function that builds the model graph would cause those for loops to be applied at every training step, slowing down model training. But after thinking about it more carefully, that's not the case.

Even if for loops run multiple times during the build stage, once each node of the graph is connected, what matters is the built graph structure itself—the for loops during the build stage become irrelevant. I had this misconception for quite a long time without realizing it, so I'm recording it here. I'm still curious about what specific cases `map_fn` provides advantages in though 🧐

##### 🧩  ML library

*2021.05.02*

While coding with TensorFlow 1.15, I discovered that `softmax_cross_entropy_with_logits` supports 2nd-order computation of loss, but `sparse_softmax_cross_entropy_with_logits` does not. The only difference between the two is whether the label is given in one-hot form or not, so it was strange that this difference existed. Looking into it, I found a [related issue](https://github.com/tensorflow/tensorflow/issues/5876) raised on the TensorFlow repository.

In summary, it states that derivative computation for certain indexing operations is not yet properly implemented, or that 2nd-order differentiation for some operations has errors that even the developers haven't resolved (I don't know the specific cause). It was interesting that there were problems the TensorFlow team couldn't consistently resolve through development from version 0.2 to 1.15.

##### 🤖 ML & DL

*2021.05.10*

Through the video [PR-317: MLP-Mixer: An all-MLP Architecture for Vision](https://www.youtube.com/watch?v=KQmZlxdnnuY), I learned that CNNs and MLPs aren't very different. In the video, JinWon Lee explains that the two differences between CNN weights and Fully-Connected weights are weight sharing and locally connected properties. It struck me that this content is so easily understood just by looking at the visualized material, yet I hadn't realized it until now. I understood that simply adding a number of weights (actually a very large amount) to a CNN can make it completely identical to a Fully-Connected structure.

##### 🧩  ML library

*2021.05.11*

When using the `tf.contrib.layers.batch_norm` function, you need to be careful about the `is_training` argument setting. When using batch normalization, the source of statistics used for mean and variance differs depending on whether it's a training or testing situation, so if `is_training` is set incorrectly, even if accuracy appears high, the experiment results may be wrong.

When `is_training` is True, statistics of the moments (mini-batch mean and variance) are accumulated in the moving_mean and moving_variance tensors according to the exponential moving average formula. The mini-batch mean and variance are used for BN computation. When `is_training` is False, the previously accumulated moving_mean and moving_variance tensor values are retrieved and used for BN computation.

In few-shot learning settings, if both support set and query set have `is_training` set to True, this becomes a transductive setting. This means that not only support but also query distribution information is used to estimate the query. In few-shot learning, transductive settings generally show about 3% performance improvement over non-transductive, so you should set the argument value appropriately for your experimental situation.

Instance-based normalization methods like `tf.contrib.layers.group_norm` don't use running statistics over mini-batches, so they don't have an `is_trainable` parameter.

##### 🤖 ML & DL

*2021.05.14*

Moment[^1] in physics represents how physical quantities are positioned in space through the product of a specific physical quantity and distance, with examples including Force, Torque, and Angular momentum. For moment of mass, the zeroth moment is total mass, 1st moment is center of mass, and 2nd moment is moment of inertia.

In mathematics, the word "moment" is used to describe characteristics of a function. When the function is in the form of a probability distribution, the first moment represents the expected value of the probability distribution, also called moments about zero. Additionally, the second central moment is variance, the third standardized moment is skewness, and the fourth standardized moment is kurtosis.

##### 🧩 ML library

*2021.09.20*

Organizing the most basic torch Tensor functions with reference to the [PyTorch official documentation](https://pytorch.org/docs/stable/generated/torch.unsqueeze.html#torch.unsqueeze).

- squeeze: A function that removes dimensions of size 1. If no option is specified, all dimensions of size 1 are removed.
- unsqueeze: A function that adds a dimension of size 1 at a specific position.
- view: A function that changes the shape of a tensor.

##### 🤖 ML & DL

*2021.11.13*

I read the Wikipedia explanation of Signed Distance Function (SDF)[^4]. First, SDF is defined as follows:

- If $\Omega$ is a subset of a metric space and $b$ is the boundary of $\Omega$ the signed distance function $f$ is defined by

$$
f(x)=
\begin{cases}
d(x, \partial \Omega) & \text{if } x \in \Omega \\
-d(x, \partial \Omega) & \text{if } x \in \Omega^c
\end{cases}
$$

SDF is a function that represents the distance to a certain boundary. If a point $x$ is located inside the boundary, the function value is positive, and as this point moves closer to the boundary, the function value approaches 0, becoming 0 when located on the boundary. Conversely, when $x$ is located outside the boundary, the function value is negative.

In the formula above, the case inside the boundary is denoted as positive, but there are also cases where the inside of the boundary is set to negative and used in reverse. The image below is an example of SDF from the paper DeepSDF[^5], where the inside of the boundary is set to negative.

![img](../../img/21-11-14-2.png)

While past approaches to tasks like surface estimation or 3D reconstruction mainly used voxels, points, or meshes, recently there seems to be a growing trend toward using SDF. Research combining Implicit Neural Representation with SDF looked particularly interesting.

Implicit Neural Representation is a research direction that aims to represent images or 3D data not as pixel/voxel-unit matrices, but as a single function that takes (x, y) values and outputs (r, g, b) values (one function represents one data sample, so each training input would be a single pixel value). Since data is represented in continuous function form, super resolution is naturally achievable, and recently much research has been conducted on combining this approach with SDF to produce very smooth final outputs.

##### 🤖 ML & DL

*2021.12.02*

Until now, I had thoughtlessly assumed that specific probabilities exist for single points in continuous distributions. For example, I incorrectly assumed that for $\mathcal N (0, 1)$, the probability of observing point $x=1$ exists as a specific value.

Referring to [this source](https://www.itl.nist.gov/div898/handbook/eda/section3/eda361.htm)[^6], since a continuous probability function is defined over infinite points of a continuous interval, the probability at a single point is always 0. Therefore, probability in continuous probability functions is measured over specific intervals, not at single points.

In hindsight it was quite simple, but I hadn't thought about it carefully enough to get confused. Additionally, I became curious about how zeros can add up to 1, which made me feel like I should immediately restart studying math from the fundamentals, but since time is limited and there's much to do, I concluded that I should take it slow and study gradually 🥲

##### 🧩 ML library

*2021.12.08*

I looked into whether PyTorch has a feature to freeze only specific weights.

For freezing at the layer level, I had been using `required_grad=False`, but I hadn't seen a feature for selectively freezing specific weights within a layer. After searching, I came across [this link](https://discuss.pytorch.org/t/how-do-i-freeze-the-specific-weights-in-a-layer/104722/2). The author describes two workarounds:

- Assign `grad=0` to the weights you want to freeze before calling `.step()`. However, for optimizers using momentum or weight decay, `.step()` can still modify weights even with `grad=0`, so it may not work as intended
- Copy the weights you want to freeze beforehand, call `.step()` to update the weights, then overwrite the updated weights with the copied ones

##### 🤖 ML & DL

*2022.01.15*

I familiarized myself with triplet loss related terminology by referring to [this link](https://omoindrot.github.io/triplet-loss)[^7].

- Easy triplets: $d(a, p) + \text{margin} < d(a, n)$
- Hard triplets: $d(a,n) < d(a, p)$
- Semi-hard triplets: $d(a, p) < d(a, n) < d(a,p) + \text{margin}$

##### 🧩 ML library

*2022.02.28*

I recorded the key things to consider first when fixing random seeds.

```python
random.seed(args.seed)
np.random.seed(args.seed)
torch.manual_seed(args.seed)
torch.cuda.manual_seed_all(args.seed)
```

##### 🤖 ML & DL

*2022.04.10*

Through my research, I gained the empirical tip that residual connections are useful for training stability. Not only utilizing residual connections in model architecture like ResNet, but also when you want to cautiously change a value, structures with residual connections showed relatively higher performance.

For example, when updating embedding vectors through GNN, using the form $V_{t+1} = V_t + G(V_t)$ is better than $V_{t+1} = G(V_t)$. Among my current experiments, there's one about estimating the mean of a distribution well from few-shot data, and in this case too, $\hat \mu = \text{mean of few-shot} +  f_\theta(\text{few-shot})$ yielded better results than $\hat \mu = f_\theta(\text{few-shot})$.

I suspect that since parameters are generally initialized with near-zero Gaussian values, using residual connections results in a smaller initial loss, making training relatively more stable. (*Need to verify whether this is actually the case and add content*)

##### 🤖 ML & DL

*2022.05.16*

Notes on Moore–Penrose inverse (=Pseudo inverse)[^8].

- When solving a linear system of the form $A\mathrm  x =\mathrm b$, if $A$ is not a square matrix, the following two situations exist:

1. Underdetermined (n < m): Wide A. Infinitely many solution given $\mathrm b$ in general
2. Overdetermined (n > m): Tall A. Zero solution for given $\mathrm b$ in general

- Performing singular value decomposition on $A$ allows the following derivation:

$$
A \mathrm x = b \\
U \Sigma V^\top \mathrm  x =\mathrm b \\
V \Sigma ^{-1} U^\top U \Sigma V^\top \mathrm  x =V \Sigma ^{-1} U^\top \mathrm b \\
\tilde {\mathrm x} = V \Sigma ^{-1} U^\top \mathrm b := A^+ \mathrm  b
$$

- Here $A^+ = V \Sigma ^+ U^\top $ is called the pseudo inverse of A
- When $\Sigma = \text{diag}_{n,m}(\lambda_1, \cdots, \lambda_{\min\{ n, m \}})$, $\Sigma^+ = \text{diag}_{m,n}(\lambda_1^+, \cdots, \lambda^+_{\min\{ n, m \}})$ where $\lambda^+=
  \begin{cases}
      \lambda^{-1},& \lambda \neq 0 \\
      0,              & \lambda = 0
  \end{cases}$

Using Moore–Penrose inverse allows many parts of linear algebra to be easily described and proven:

1. In the underdetermined case (multiple solutions exist), $A^+ \mathrm b$ is the solution that minimizes the Euclidean norm $||\tilde {\mathrm x} ||_2$
2. In the overdetermined case, $||A \tilde {\mathrm  x} - \mathrm b||_2 = ||A A^+ \mathrm b - \mathrm b||_2$ is the optimal solution of least squares

##### 🤖 ML & DL

*2022.05.27*

For linear combinations, when the coefficients are positive and their sum equals 1, this is called a convex combination.

Relating this to the definition of a convex set: if the convex combination of any points belonging to a set C belongs to C, then that set is called a convex set. Likewise, convex combinations of points belonging to a convex set C always belong to C.

##### 🤖 ML & DL

*2022.05.28*

I organized various data augmentation methods [here](https://cse-study.github.io/ai/2022-05/220527-data-augmentation/).

##### 🤖 ML & DL

*2022.06.29*

Organizing the mathematical definitions of Upper bound, Lower bound, Supremum, and Infimum with reference to [this source](https://web.math.ucsb.edu/~agboola/teaching/2021/winter/122A/rudin.pdf).

- Upper bound: When there exists a real number $\beta$ such that for all elements $x$ in $E$, $x < \beta$, then $\beta$ is called an upper bound of $E$. In this case, $E$ is said to be ***bounded above***. (Lower bound is defined in the same way)
- Supremum, Least upper bound: For $\alpha = \sup E$, $\alpha$ must be an upper bound of $E$, and for every $\gamma < \alpha$, $\gamma$ must not be an upper bound of $E$. In other words, **the least among upper bounds is the supremum**
- Infimum, Greatest lower bound: For $\alpha = \inf E$, $\alpha$ must be a lower bound of $E$, and for every $\beta > \alpha$, $\beta$ must not be a lower bound of $E$. In other words, **the greatest among lower bounds is the infimum**

##### 🤖 ML & DL

*2022.10.06*

Recording content from the AI workshop held on October 6th. First, content related to Federated Learning.

1. Federated Learning (FL)
   - How can we train models when client data cannot be uploaded to the central server?
   - The most general approach is for each client to upload their updated 'model' to the server, take the average, and distribute it back to clients (FedAvg)
   - However, this approach suffers from severe performance degradation in non-IID settings (heterogeneous): the background for PFL research
2. Personalized Federated Learning (PFL): Client-specific weights are introduced
3. PFL via Meta-learning: Conceived from the observation that PFL's concept and Meta-learning (MAML)'s concept are very similar

Content related to Imitation Learning.

1. Reinforcement Learning (RL)
   - Purpose: Find an optimal policy $\pi*$ that miximize $V$
   - Require domain knowledge for real-world application
   - Using drones as an example, real drones break very easily so Sim2Real learning must be considered, and many perturbations exist in drone physics so Robust learning must also be considered
2. Imitation Learning (IL)
   - Methods include Behavior cloning (BC), Inverse RL (IRL), IRL + RL, etc.
   - BC requires large amounts of data and is vulnerable to compounding error, so IRL has advantages in these aspects
3. Generative Adversarial Imitation Learning (GAIL)
   - Expert actions are provided as real data, and policy actions as fake data, training the model to mimic the expert's policy
   - Limitation: Does not model real environment danger and environment perturbation well. Therefore, domain-adaptive IL is needed
4. Simulation-based Learning: Domain Adaptive IL
   - Extracts information from the simulation (source) environment to help the target environment's policy, making the information extraction process critical

##### 🤖 ML & DL

*2022.10.06*

While reading Reddit, I found a post about "How should you tune hyperparameters when training takes too long?" and recorded the comments and personal thoughts.

- Reduce the model scale and tune hyperparameters, or train with only a subset of the dataset for hyperparameter tuning
- e.g., If using ResNet152, use a smaller model like ResNet18, or if using ImageNet, train with only 100 classes
- This approach is obviously sub-optimal, but seemed like a viable method when training takes too long
- The best approach is really to engineer the system to fully utilize parallel GPU resources before training. Because there will certainly be differences in model behavior depending on hyperparameters between big and small models, experimenting at the original scale is best

##### 🤖 ML & DL

*2022.10.14*

Recording the meaning of the term "Grokking" in the ML field.

- A phenomenon where an overparameterized neural network model, after overfitting to a small training dataset, suddenly achieves good generalization performance (validation loss decrease) after a very long time (optimization steps) at some point
- Named in OpenAI's paper ["Grokking: Generalization Beyond Overfitting on Small Algorithmic Datasets"](https://mathai-iclr.github.io/papers/papers/MATHAI_29_paper.pdf)

##### 🤖 ML & DL

*2022.10.21*

- The stability-plasticity dilemma: The need for permanent modification of the model to acquire new knowledge, while simultaneously not forgetting existing knowledge
- Learning in a parallel and distributed system requires plasticity for the integration of new knowledge but also stability in order to prevent the forgetting of previous knowledge.[^10]

##### 🤖 ML & DL

*2022.12.03*

What does a noisy label mean?

- When data labeling is incorrect within a dataset, it's called a noisy label or labeling noise. For large-scale datasets, since the process of verifying labels is difficult (costing time and money), such noisy labels can sufficiently exist
- It's also occasionally used in the semi-supervised learning field, where a pseudo-label-based self-training model incorrectly pseudo-labels unlabeled data, and this is referred to as a noisy label

What does ad-hoc mean?

- Generally, it can be interpreted as 'a method devised for only one specific purpose'

##### 🤖 ML & DL

*2023.01.01*

Anomaly detection related terminology, organized using ChatGPT.

- Assuming the target (positive) class is dogs, situations that can arise with new data:
  1. A dog, but discovering a new breed never seen before
  2. Discovering an entirely new class, such as cat data
  3. Dog data that is damaged/corrupted
- Novelty detection: A term primarily used when discovering unseen data points or when discovering **new trends or tendencies**
- Outlier detection: A term primarily used when discovering data points that significantly differ from existing data or when discovering **corrupted or damaged data** that needs to be removed
- Anomaly detection: A relatively broad term encompassing both novelty detection and outlier detection cases
- However, these three terms are very frequently used interchangeably, so they should be understood flexibly according to the paper or situation

##### 🤖 ML & DL

*2023.01.11*

Organizing object detection related terminology. First, listing the problem scenarios.

- Localization: **Single object**, setting a bounding box for where the object is located in the image
- Object detection: **Multiple objects**, setting bounding boxes for where multiple objects are located in the image and assigning class information to each
- Segmentation: **Multiple objects**, assigning class information 'at the pixel level' for where multiple objects are located in the image
- 2-Stage approach: Proposes locations where objects are likely to exist (**Region proposal**, localization), then extracts features and assigns classes based on that location information
- 1-Stage approach: Performs localization and classification simultaneously. Lower performance than 2-Stage but faster
- Region proposal methods
  1. Sliding window: Slides a window and checks if an object exists within the window
  2. Selective search: Measures similarity between adjacent regions and progressively merges them into larger regions
- NMS: A method to consolidate multiple bounding boxes when they overlap for the same class into a single class
- RoI = Region of Interest = Region proposal

Brief summary of 2-Stage detectors.

- R-CNN: Finds about 2000 region proposals through selective search. Inputs each crop image into CNN, then extracts feature vectors. Finally, sets bounding boxes through a Regressor and performs classification through SVM
- Fast R-CNN: Finds about 2000 region proposals through selective search
- Faster R-CNN: While previous approaches used CPU-based selective search, this algorithm proposes a GPU-based Region Proposal Network (RPN) for speed improvement. Otherwise identical to Fast R-CNN

Brief summary of 1-Stage detectors.

- YOLO: Divides the image into an NxN grid and generates a prediction tensor
- SSD: Does not re-extract pixels or features for bounding box adjustment

##### 🤖 ML & DL

*2023.01.14*

Brief notes on Bayesian Inference.

- Bayesian Inference: A method of inferring the posterior probability of an inference target through its prior probability and additional information
- Generally, our goal is to compute $p(x^* | X)$. That is, we need to be able to make correct predictions for test data $x^*$ based on given data $X$
- This can be computed as $p(x^* | X) = \int p (x^* | \theta) p(\theta | X) d \theta$, where $p(\theta | X)$ by Bayes rule is $p(\theta | X) = \frac{p(X|\theta)p(\theta)}{P(X)}$

##### 🤖 ML & DL

*2023.02.22*

Brief notes on CLIP.

- **Natural language supervision**: Training image models using datasets where images and text are paired

1. Contrastive pre-training: For batchsize images and their corresponding texts (sentences), extract image and text embeddings respectively, and train the model so that similarity between matching embedding pairs increases
2. Extract class label embeddings for the target dataset, using 'a photo of a {class label}' as the text input (Prompt engineering!)
3. Finally, check which 'a photo of a {class label}' embedding from the target dataset has the highest similarity with the test image embedding

##### 🤖 ML & DL

*2023.03.24*

- Domain generalization: Generalize directly to the target domain after training on the source domain
- Domain adaptation: Some labels exist in the target domain, allowing retraining
- Style-based generalization: Uses Gram matrix, Maximum Mean Discrepancy (MMD), Mean Var, etc. as style
- Generally, CNNs are said to be high-pass filters that capture texture well (primarily passing high frequencies), while Transformers are low-pass filters that capture contours well. Therefore, when adversarially attacking CNNs, applying a different texture to a specific image reduces prediction performance

##### 🤖 ML & DL

*2023.04.03*

Brief notes on Stable Diffusion.

- Uses a text encoder (CLIP's text encoder) and image generator for Text2Image
- Image generator: Consists of Image information creator (UNet + Scheduler) and image decoder (Autoencoder decoder)
  - Image information creator: latent space to latent space. Performs diffusion process
  - Image decoder: latent space to image space
- Text conditioning: Adds attention layers between resnet blocks inside UNet, providing token embeddings as input to each attention layer for conditioning

##### 🤖 ML & DL

*2023.04.08*

Random thought of AI tech.

- A thought that has grown stronger (though I've had it for a while) while reading recent papers like Segment Anything and PIX2STRUCT is that thinking about 'how to define tasks for training' and 'how to collect massive amounts of training data' will be the most important foundation for creating powerful models
- Related to this, Video PreTraining (VPT) was also researched based on this thinking

##### 🧩 ML library

*2023.05.05*

Notes on things to consider when using Distributed Data Parallel in Lightning.

- Reference link: https://github.com/Lightning-AI/lightning/discussions/6501#discussioncomment-553152
- Using `sync_dist=True` option syncs across all processes. The default option is reduced mean
- However, regarding torchmetrics, since it has its own sync code, the `sync_dist`, `sync_dist_op`, `sync_dist_group`, `reduce_fx`, `tbptt_reduce_fx` flags of `self.log(...)` have no effect on metric logging
- Metric sync operates when the `metric.compute()` function is called

##### 🤖 ML & DL

*2023.05.05*

Notes on Reinforcement Learning from Human Feedback (RLHF).

- Video link: https://www.youtube.com/watch?v=2MBJOuVq380
- Paper link: https://arxiv.org/pdf/2203.02155.pdf
- A method of training models from human feedback using RL. However, I need to study it again as I haven't fully understood why training actually works through the 2-3 stages.

1. Pretraining a language model (LM)
2. Gathering data and training a reward model
3. Fine-tuning the LM with reinforcement learning

##### 🤖 ML & DL

*2023.05.05*

Notes on VQ-VAE.

- AutoEncoder: A structure for extracting good latent variables $z$
- VAE: The distribution of $z$ encoding is given as a prior
- VQ-VAE
  - Has the same structure as an AutoEncoder, but retrieves the nearest embedding from a codebook (K embeddings) based on $z$ and uses it as the decoder input. It's called vector quantization because it goes through the codebook (see [this blog post](https://zerojsh00.github.io/posts/Vector-Quantization/) for codebook explanation)
  - Posterior and prior are categorical distributions
  - One question: Whether K is equal to the number of image samples
  - Forward pass: As mentioned above, retrieves a similar embedding from the codebook and feeds it to the decoder
  - Backward pass: The decoder performs regular backpropagation, but since the codebook embedding selection part cannot be backpropagated through argmin, the decoder's gradient is directly brought to the encoder's end
  - Loss: (reconstruction error for encoder-decoder) + (l2 loss to help codebook embedding become similar to encoder output) + (l2 loss to help encoder output become similar to codebook embedding)

##### 🤖 ML & DL

*2023.05.12*

Notes on ImageBind announced by Meta on May 9th.

- A model trained with 6 modalities (Image/Video, Text, Heatmap, Depth, Audio, IMU) surpasses one-modality specialist model performance
- Moreover, it's extensible to multi-modality research such as transferring from one modality to another, e.g., generating images from audio
- Cross-modal retrieval, embedding-space arithmetic, audio-to-image generation, etc. are possible
- It's an amalgamation of Meta's recent open source AI tools, including DINO v2, SAM, etc.
- For the four additional modalities (audio, depth, thermal, and IMU readings), ImageBind use naturally paired self-supervised data. That is, ImageBind demonstrated that all 6 modalities can be combined by pairing images or videos with other modalities

##### 🤖 ML & DL

*2023.05.15*

Comparison of ViT and CNN: [How Do Vision Transformers Work?](https://arxiv.org/abs/2202.06709)

- ViT, i.e., Multi-head Self Attention (MSA), is shape (structure) biased = low-pass filter
- ResNet, i.e., ConvNet, is texture biased = high-pass filter

Comparison of CL ViT and MIM ViT: [What Do Self-Supervised Vision Transformers Learn?](https://arxiv.org/abs/2305.00729)

- CL: self-attentions collapse into homogeneity / utilizes the low-frequency signals / a crucial role in the later layers
- MIM: utilizes high-frequency signals / focuses on the early layers

##### 🤖 ML & DL

*2023.05.20*

- Hyper-parameter tuning thoughts: Writing a shell script to run multiple experiment options according to pre-determined rules, then viewing only desired options in table form on wandb runs seems most convenient

##### 🤖 ML & DL

*2023.05.20*

Content from ChatGPT's response to a question about what criteria determine whether AI is service-ready. It seemed worth considering, so I recorded it.

1. Define requirements: Clearly identify the specific tasks or problems the AI model needs to address. Determine the desired input-output behavior, performance metrics, scalability, and any other relevant criteria.
2. Training and validation data: The data should cover various scenarios that the AI model will encounter in real-world usage.
3. Model selection: Consider factors like the model's architecture, complexity, size, computational requirements, and availability of resources.
4. Model evaluation: Common metrics include accuracy, precision, recall, F1 score, or domain-specific metrics relevant to the task.
5. Testing and validation: Deploy the AI model in a controlled or limited production environment. Validate its performance against real-world data or simulated scenarios, including edge cases and corner cases.
6. Iterative improvement: Continuously monitor and evaluate the AI model's performance in a live or simulated environment. Collect user feedback and address any issues or limitations through iterative updates, such as fine-tuning, retraining, or architecture modifications.
7. Ethical considerations: Evaluate the AI model's compliance with ethical guidelines, privacy requirements, and legal regulations.
8. Scalability and resource requirements: Assess the AI model's scalability and resource demands, such as computing power, memory, or network bandwidth.
9. Robustness and reliability: Test the AI model's robustness by subjecting it to adversarial attacks, noisy or incomplete data, or other challenging conditions. Assess its reliability by measuring its performance over an extended period, considering factors like model drift or degradation.
10. Cost considerations: Evaluate the total cost of deploying and maintaining the AI model, including infrastructure, licensing, data storage, and ongoing support. Consider the model's value proposition and its impact on productivity, efficiency, or revenue generation.

##### 🤖 ML & DL

Brief notes on DINO and DINO v2.

- Self-supervised ViT features: Good at identifying scene layout boundaries, and k-NN classifier built from features alone performs well
- However, for k-NN classifier performance, momentum encoder, multi-crop augmentation, and small patches were found to be required
- DINO: Adopts BYOL-style momentum encoder approach. With slight differences in the loss formula, the teacher-student structure remains the same
- DINO v2: At the image level, distinguishes different images; at the patch level, distinguishes different patches within the same image. Additionally, proposes large amounts of 'high-quality' data and fast, efficient training methods

##### 🧩 ML library

*2023.08.12*

- Apache Arrow: High overhead of serialization and deserialization is a frequently occurring problem when handling data. Apache Arrow enables zero-copy reads without serialization, as it works directly with serialized data rather than the typical approach of working with objects
  - Main purpose: Language-independent open standards and libraries to accelerate and simplify in-memory computing
- Huggingface datasets w. arrow: As mentioned above, Arrow enables fast processing and movement of large amounts of data (because Arrow format enables zero-copy reads, eliminating serialization overhead). Therefore, Huggingface datasets uses Arrow. Also, being column-oriented makes querying and slicing fast

##### 🧩 ML library

*2024.05.30*

- Scrap: [[python] OpenCV, PIL, Numpy, PyTorch Type Analysis and Type Conversion Summary](https://mvje.tistory.com/97 )

##### 🤖 ML & DL

*2024.08.05*

![img](../../img/24-08-05-1.png)

**Attention**

- Attention: The formula for the scaled dot-product attention mechanism is shown below. It computes the similarity between query and key, then reflects that similarity onto each value mapped to the key. For self-attention, (1) the input passes through Wq, Wk, Wv matrices to become query, key, and value embeddings, then (2) attention is performed among these query, key, and value embeddings.

$$
\operatorname{Attention}(Q, K, V)=\operatorname{softmax}\left(\frac{Q K^T}{\sqrt{d_k}}\right) V
$$

![img](../../img/24-08-05-2.png)

- Multi-Head Attention (MHA): By using multiple attention heads instead of just one, it helps capture contextual information from various subspaces of the input data and better understand complex patterns. Since one query, key, and value head is needed for each attention operation, H query, key, and value heads are needed for H operations.
- Multi-Query Attention (MQA): A variant where only one key and value head is used.
- Grouped-Query Attention (GQA): GQA divides H queries into G groups and performs attention operations. GQA-G has G groups of key and value heads, so GQA-H is identical to MHA and GQA-1 is identical to MQA. To convert MHA checkpoints to GQA checkpoints, existing heads within each group are mean pooled to create new key and value heads. GQA is as fast as MQA while approaching MHA performance.

**Pre-Training**

- Mixture of Experts (MoE): Multiple expert subnetworks learn to specialize in different aspects of the data. During inference, only a subset of these experts is activated, reducing computational burden while maintaining high performance.

- Mixture of Depth (MoD): An approach that dynamically adjusts the depth of the model during training and inference.

**Instruction Tuning**

- Multi-Turn Instructions: Multi-Turn Instructions involves training models to understand and generate responses across multiple conversation turns. This tuning method improves the model's ability to maintain context and consistency during extended interactions, making it useful for applications like chatbots.

- Instruction Following: Instruction Following is the process of training models to understand and execute given instructions. This technique is important for improving the model's ability to accurately follow complex instructions, making it more useful in applications requiring precise and reliable task completion.

**Alignment**

- Reinforcement Learning from Human Feedback

  1. Initial Training of the Language Model (Pre-training): First, the LLM is generally pre-trained on large amounts of text data. In this stage, the language model learns statistical patterns of language and acquires various text generation and understanding capabilities.
  2. Supervised Fine-tuning: After the LLM is pre-trained, datasets typically labeled by humans are used to fine-tune the model for specific tasks. This stage helps the model better perform specific tasks like answering questions in particular formats or writing in specific styles.
  3. Collecting Human Feedback: Once the model has a certain level of performance, human feedback is collected on the generated text. Feedback is generally provided in the form of evaluating text quality, accuracy, relevance, etc. This data is used to train the reward model.
  4. Training the Reward Model: The reward model is trained based on the collected human feedback data. This model scores given text, evaluating text quality or alignment with user intent.
  5. Reinforcement Learning (RL) Fine-tuning: The trained reward model is used to fine-tune the LLM through reinforcement learning. The algorithm primarily used in this stage is Proximal Policy Optimization (PPO). It proceeds as follows:
     - Policy Generation: Generate text using the current LLM.
     - Reward Evaluation: Evaluate the generated text through the reward model to calculate rewards.
     - Policy Update: Update the LLM's parameters to maximize rewards. The PPO algorithm is used in this process to stably optimize the policy.
  6. Iterative Improvement: The model continuously improves through reinforcement learning. If needed, more human feedback can be collected to update the reward model, which is then reflected back in the LLM's reinforcement learning to iteratively enhance the model.

- Direct Preference Optimization:

**Decoding Strategies**

- Greedy Search: Greedy search is a simple decoding strategy where the model selects the highest probability token at each step. It's fast and intuitive but may miss optimal results by not considering future possibilities.

- Beam Search: Beam search is a more sophisticated decoding strategy that maintains multiple candidate sequences (beams) at each step. By simultaneously exploring multiple paths, it's more likely to find optimal solutions than greedy search, but costs more computation.

- Top-k Sampling: Top-k sampling is a stochastic decoding strategy where the model selects the next token from the top k most probable candidates. This method introduces diversity and reduces repetitive or deterministic outputs, improving the naturalness and variety of generated text.

- Top-p Sampling: Top-p sampling (nucleus sampling) selects the next token from the smallest candidate set whose cumulative probability exceeds a threshold p. This method enables dynamic adjustment of the sampling pool, balancing diversity and consistency of generated text.

**Efficient Tuning**

- Low-Rank Adaptation: After freezing all pretrained model weights, adds rank decomposition matrices for downstream task fine-tuning to perform efficient fine-tuning.

### References

[^1]: Wikipedia contributors. (2021, April 12). Moment (mathematics). In Wikipedia, The Free Encyclopedia. Retrieved 12:08, May 24, 2021, from https://en.wikipedia.org/w/index.php?title=Moment_(mathematics)&oldid=1017468752
[^2]: JinWon Lee - PR-317: MLP-Mixer: An all-MLP Architecture for Vision. https://www.youtube.com/watch?v=KQmZlxdnnuY
[^3]: JoonYoung Yi - Slideshare, Dynamically Expandable Network (DEN). https://www.slideshare.net/ssuser62b35f/180808-dynamically-expandable-network

[^4]: Wikipedia contributors. (2021, August 1). Signed distance function. In *Wikipedia, The Free Encyclopedia*. Retrieved 00:41, November 14, 2021, from https://en.wikipedia.org/w/index.php?title=Signed_distance_function&oldid=1036639454
[^5]: Park, Jeong Joon, et al. "Deepsdf: Learning continuous signed distance functions for shape representation." *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition*. 2019.
[^6]: 1.3.6.1.What is a Probability Distribution., *NIST/SEMATECH e-Handbook of Statistical Methods*, http://www.itl.nist.gov/div898/handbook/, December 2, 2021.

[^ 7]: Olivier Moindrot. "Triplet Loss and Online Triplet Mining in TensorFlow". https://omoindrot.github.io/triplet-loss, Mar 19, 2018.

[^8]: Wikipedia contributors. (2022, April 27). Moore–Penrose inverse. In *Wikipedia, The Free Encyclopedia*. Retrieved 06:08, May 16, 2022, from [https://en.wikipedia.org/w/index.php?title=Moore%E2%80%93Penrose_inverse&oldid=1085006448](https://en.wikipedia.org/w/index.php?title=Moore–Penrose_inverse&oldid=1085006448)
[^9]: https://github.com/onnx/onnx/blob/main/docs/Overview.md
[^10]: Mermillod, Martial, Aurélia Bugaiska, and Patrick Bonin. "The stability-plasticity dilemma: Investigating the continuum from catastrophic forgetting to age-limited learning effects." *Frontiers in psychology* 4 (2013): 504.
