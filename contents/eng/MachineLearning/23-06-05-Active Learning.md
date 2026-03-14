---
title: "Learning with not Enough Data: Active Learning"
date: "2023-06-05"
template: "post"
draft: false
path: "/deeplearning/23-06-05/"
description: "An overview of Active Learning, a method for discovering valuable data from an unlabeled data pool. Parts of Lilian Weng's blog post were translated with her permission; please refer to the original link for more details."
category: "Deep Learning"
thumbnail: "deeplearning"
---

> An overview of Active Learning, a method for discovering valuable data from an unlabeled data pool. Parts of Lilian Weng's blog post were translated with her permission; please refer to the original link for more details: https://lilianweng.github.io/posts/2022-02-20-active-learning

### Preliminary

- Sampling strategy (Query strategy): A strategy for discovering the most valuable samples from an unlabeled set.
- Acquisition function $U(\mathbf x)$: A scoring function used for sampling. A higher score indicates a sample that is more valuable for ground truth labeling. This can be used not only to reduce labeling costs, but also to select only desired types of data.
- Two buckets of model uncertainty
  - Aleatoric uncertainty: Uncertainty caused by data noise. It is considered irreducible because information is lost in the ground truth.
  - Epistemic uncertainty: Uncertainty in the model parameters. Theoretically, it is considered reducible given more data.

### Acquisition Function

##### Uncertainty Sampling

A method that selects the samples for which the model's predictions are most uncertain. The most well-known methods are:

- Least confidence: $U(\mathbf{x}) = 1 - P_\theta(\hat{y} \vert \mathbf{x})$. Samples the data with the lowest maximum prediction probability.
- Margin score: $U(\mathbf{x}) = P_\theta(\hat{y}_1 \vert \mathbf{x}) - P_\theta(\hat{y}_2 \vert \mathbf{x})$. Samples the data with the smallest gap between the top-1 and top-2 prediction probabilities.
- Entropy: $U(\mathbf{x}) = \mathcal{H}(P_\theta(y \vert \mathbf{x})) = - \sum_{y \in \mathcal{Y}} P_\theta(y \vert \mathbf{x}) \log P_\theta(y \vert \mathbf{x})$. Samples the data with the highest entropy.

##### Uncertainty Sampling, Query-By-Committee

Aggregates predictions from multiple models and measures uncertainty based on them. Generally, it measures the disagreement level among model predictions.

- Voter entropy: $U(\mathbf{x}) = \mathcal{H}(\frac{V(y)}{C})$, where $V(y)$ counts the number of votes from the committee on the label $y$.
- Consensus entropy: $U(\mathbf{x}) = \mathcal{H}(P_\mathcal{C})$, where $P_\mathcal{C}$ is the prediction averaging across the committee
- KL divergence: $U(\mathbf{x}) = \frac{1}{C} \sum_{c=1}^C D_\text{KL} (P_{\theta_c} | P_\mathcal{C})$

##### Diversity Sampling

A method that samples a collection of samples that well represents the overall data distribution. For a model to perform well not only on a specific narrow subset but on all real-world data, data diversity is important. That is, the selected samples should be representative of the underlying distribution. In general, diversity sampling methods are based on measuring similarity between samples.

##### Expected Model Change

Expected model change refers to the impact a sample would have on model training. This impact can refer to effects on model parameters or improvements to the training loss.

##### Hybrid Strategy

The methods mentioned above are not mutually exclusive and can be used together. Additionally, instead of using active learning alone, methods such as semi-supervised learning can be used in combination.

### Measuring Uncertainty

##### Ensemble

Traditional ML algorithms used ensembles to improve model performance, but the cost of ensembles for DNNs is too high. A common approach in such cases is to perform Bayesian inference using dropout, which enables measurement of model uncertainty (epistemic uncertainty).

- Monte Carlo dropout: Dropout is applied before every weight layer. Mathematically, this approximates a probabilistic deep Gaussian process ([Gal & Ghahramani 2016](https://arxiv.org/abs/1506.02157)). Therefore, this method is the most commonly used when model uncertainty measurement is needed (in general, computing model uncertainty is required for measuring the reliability of prediction results).
- Generally, naive ensembles produce better results than MC dropout, but they are naturally more costly. Therefore, [Beluch et al. (2018)](https://openaccess.thecvf.com/content_cvpr_2018/papers/Beluch_The_Power_of_CVPR_2018_paper.pdf) explored several alternatives (Snapshot Ensemble, Diversity Encouraging Ensemble, Split Head Approach). Nevertheless, MC dropout remains an economically good choice.

##### Uncertainty in Parameter Space

- Bayes-by-backprop ([Blundell et al. 2015](https://arxiv.org/abs/1505.05424)): A method that directly measures weight uncertainty in neural networks by modeling weights $\mathbf w$ as probability distributions. The algorithm proceeds as follows, and the derivation of the KLD loss for updating variational parameters $\theta = \{\mu_i , \rho_i\}^d_{i=1}$ can be found in the original post.
  1. Sample $\epsilon \sim \mathcal{N}(0, I)$
  1. Let $\mathbf{w} = \mu + \log(1+ \exp(\rho)) \circ \epsilon$
  1. Let $\theta = (\mu, \rho)$
  1. Let $f(\mathbf{w}, \theta) = \log q(\mathbf{w} \vert \theta) - \log p(\mathbf{w})p(\mathcal{D}\vert \mathbf{w})$
  1. Calculate the gradient of $f(\mathbf{w}, \theta)$ w.r.t. to $μ$ and $ρ$ and then update $θ$
  1. Uncertainty is measured by sampling different model weights during inference


##### Other Methods

In addition to these, there are methods such as the loss prediction module ([Yoo & Kweon 2019](https://arxiv.org/abs/1905.03677)), as well as adversarial training-based approaches like VAAL (Variational Adversarial Active Learning; [Sinha et al. 2019](https://arxiv.org/abs/1904.00370)), MAL (Minimax Active Learning; [Ebrahimiet al. 2021](https://arxiv.org/abs/2012.10467)), and CAL (Contrastive Active Learning; [Margatina et al. 2021](https://arxiv.org/abs/2109.03764)).

### Measuring Representativeness

##### Core-Set Approach

A core-set is a concept from the field of computational geometry, referring to a small set of points that approximates the shape of a larger point set. The goal is to achieve the same effect as training on all data points even when training a model on only a subset (i.e., the core-set).

- [Sener & Savarese (2018)](https://arxiv.org/abs/1708.00489): Views active learning as a core-set selection problem. With this perspective, the active learning problem can be expressed as the equation below. Denoting the data labeled at time step $t$ as $\mathcal S^{(t)}$, the problem becomes minimizing the difference between the average empirical loss over the entire dataset (including unlabeled data) and the average empirical loss over the labeled data at time $t$ (this is said to be equivalent to the [k-Center problem](https://en.wikipedia.org/wiki/Metric_k-center), though I did not fully understand this).

$$
\min_{\mathcal{S}^{(t+1)} : \vert \mathcal{S}^{(t+1)} \vert \leq b} \bigg\vert \frac{1}{N}\sum_{i=1}^N \mathcal{L}(\mathbf{x}_i, y_i) - \frac{1}{\vert \mathcal{S}^{(t)} \cup \mathcal{S}^{(t+1)} \vert} \sum_{j=1}^{\vert \mathcal{S}^{(t)} \cup \mathcal{S}^{(t+1)} \vert} \mathcal{L}(\mathbf{x}^l_j, y_j) \bigg\vert
$$

- [Coleman et al. (2020)](https://arxiv.org/abs/1906.11829): Core-set selection methods become less efficient as the number of classes increases, but using a weaker (or smaller, not fully-trained) model as a proxy can significantly speed up the data selection process without performance degradation. This is named SVP (Selection via Proxy).

##### Diverse Gradient Embedding

- BADGE (Batch Active Learning by Diverse Gradient Embeddings; [Ash et al. 2020](https://arxiv.org/abs/1906.03671)): A method that captures model uncertainty and data diversity in the gradient space.
  - Uncertainty: Computed based on the gradient magnitude (norm) of the final layer. Highly confident samples have smaller magnitudes.
  - Diversity: Performs k-means++ clustering in the gradient space to assess how spread out the gradient embeddings are.


### Measuring Training Effects

##### Quantify Model Changes

- EGL (Expected Gradient Length; [Settles et al. 2008](https://papers.nips.cc/paper/2007/hash/a1519de5b5d44b31a01de013b9b51a80-Abstract.html)): A method that finds data samples that can bring the greatest change to the model. While the formula below can be computed, since the true label $y_i$ is unknown, EGL uses the current model's belief (presumably the model's prediction) as a substitute.

$$
\text{EGL}(\mathbf{x}_i) = \sum_{y_i \in \mathcal{Y}} p(y=y_i \vert \mathbf{x}) \|\nabla \mathcal{L}^{(y_i)}(\theta)\|
$$

- BALD (Bayesian Active Learning by Disagreement; [Houlsby et al. 2011](https://arxiv.org/abs/1112.5745)): A method that finds data samples that maximize information gain with respect to model weights.

##### Forgetting Events

- [Mariya Toneva et al. (2019)](https://arxiv.org/abs/1812.05159): Analyzed how previously learned information changes during active learning and model retraining. Found that for most unforgettable samples, the model's predictions do not change once learned. This implies that unforgettable samples can be safely removed (i.e., they do not need to be included in future sampling).
  - Forgettable (redundant) samples: Samples whose model predictions change during training.
  - Unforgettable samples: Samples whose model predictions do not change during training.

- [Bengar et al. (2021)](https://arxiv.org/abs/2107.14707): Changes in model predictions during training can be used as a metric for model uncertainty. However, since ground truth is unknown, a new metric called label dispersion is proposed. Letting $t$ denote training steps, the most frequently predicted label is denoted $c^*$, and the proportion of predictions that match $c^*$ at each training step is measured (i.e., how uniformly the model predicts for a given data sample).

$$
\text{Dispersion}(\mathbf{x}) = 1 - \frac{f_\mathbf{x}}{T} \text{ where }
f_\mathbf{x} = \sum_{t=1}^T \mathbb{1}[\hat{y}_t = c^*], c^* = \arg\max_{c=1,\dots,C}\sum_{t=1}^T \mathbb{1}[\hat{y}_t = c]
$$

### Hybrid Methods

- SA (Suggestive Annotation; [Yang et al. 2017](https://arxiv.org/abs/1706.04737)): Proposes a two-step hybrid strategy for selecting high uncertainty and highly representative labeled samples.
  1. Uncertainty sampling: Select $K$ high uncertainty samples based on disagreement among ensemble models.
  2. Core-set approach: From the samples selected in step (1), use a similarity-based core-set approach to sample representative data.
- [Zhdanov (2019)](https://arxiv.org/abs/1901.05954): Similar to SA, but replaces step (1) with a k-means-based method.
- CEAL (Cost-Effective Active Learning; [Yang et al. 2017](https://arxiv.org/abs/1701.03551)): Uses active learning for unconfident samples and assigns pseudo labels to the most confident samples.

### Survey Papers

| Year | Paper                                                        | Author                      |
| ---- | ------------------------------------------------------------ | --------------------------- |
| 2022 | [A Comparative Survey of Deep Active Learning](https://arxiv.org/pdf/2203.13450.pdf) | Xueying Zhan et al.         |
| 2021 | [A Survey on Active Deep Learning: From Model-driven to Data-driven](https://arxiv.org/abs/2101.09933) | Peng Liu et al.             |
| 2020 | [A Survey of Active Learning for Text Classification using Deep Neural Networks](https://arxiv.org/abs/2008.07267) | Christopher Schröder et al. |
| 2020 | [A Survey of Deep Active Learning](https://arxiv.org/abs/2009.00236) | Pengzhen Ren et al.         |
| 2009 | [Active Learning Literature Survey](https://minds.wisconsin.edu/handle/1793/60660) | Settles, Burr.              |
