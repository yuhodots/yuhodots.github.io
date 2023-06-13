---
title: "Learning with not Enough Data: Active Learning"
date: "2023-06-05"
template: "post"
draft: false
path: "/deeplearning/23-06-05/"
description: "Unlabeled data pool에서 가치있는 데이터를 발굴해내기 위한 방법인 Active Learning에 대해 정리합니다. 원작자인 Lilian weng 님의 허락을 받고 블로그 글의 일부를 번역하였으며, 자세한 내용은 원문 링크를 참고하시면 좋습니다."
category: "Deep Learning"
thumbnail: "deeplearning"
---

> Unlabeled data pool에서 가치있는 데이터를 발굴해내기 위한 방법인 Active Learning에 대해 정리합니다. 원작자인 Lilian weng 님의 허락을 받고 블로그 글의 일부를 번역하였으며, 자세한 내용은 원문 링크를 참고하시면 좋습니다: https://lilianweng.github.io/posts/2022-02-20-active-learning

### Preliminary

- Sampling strategy (Query strategy): 말 그대로 샘플링 전략. Unlabeled set 중에서 가장 가치있는 샘플을 발견해내기 위한 전략을 의미
- Acquisition function $U(\mathbf x)$: 샘플링에 활용하기 위한 scoring function. Score가 높을수록 GT 라벨링하기에 더 가치있는 샘플임을 의미. 단순히 labeling cost를 줄이기 위함 뿐만 아니라, 원하는 유형의 데이터만 선정하고 싶을 때에도 사용할 수 있음
- Two buckets of model uncertainty
  - Aleatoric uncertainty: Data noise로 인해 유발되는 uncertainty. 이는 ground truth에서 정보 유실이 있기 때문에 irreducible한 것으로 여겨짐
  - Epistemic uncertainty: 모델 파라미터에 존재하는 uncertainty. 이론적으로는 더 많은 데이터가 주어지면 reducible한 것으로 여겨짐

### Acquisition Function

##### Uncertainty Sampling

모델의 예측에 대해 가장 불확실한 샘플을 선정하는 방법. 가장 잘 알려진 방법들은 다음과 같음

- Least confidence: $U(\mathbf{x}) = 1 - P_\theta(\hat{y} \vert \mathbf{x})$. 모델 예측의 최대 확률값이 가장 낮은 데이터를 샘플링
- Margin score: $U(\mathbf{x}) = P_\theta(\hat{y}_1 \vert \mathbf{x}) - P_\theta(\hat{y}_2 \vert \mathbf{x})$. Top-1 예측 확률과 Top-2 예측 확률의 차이가 낮은 데이터를 샘플링
- Entropy: $U(\mathbf{x}) = \mathcal{H}(P_\theta(y \vert \mathbf{x})) = - \sum_{y \in \mathcal{Y}} P_\theta(y \vert \mathbf{x}) \log P_\theta(y \vert \mathbf{x})$. Entropy가 높은 데이터를 샘플링

##### Uncertainty Sampling, Query-By-Committee

여러 모델들의 예측을 모으고 이를 기반으로 uncertainty 측정. 일반적으로는 모델 예측의 disagreement level을 측정

- Voter entropy: $U(\mathbf{x}) = \mathcal{H}(\frac{V(y)}{C})$, where $V(y)$ counts the number of votes from the committee on the label $y$.
- Consensus entropy: $U(\mathbf{x}) = \mathcal{H}(P_\mathcal{C})$, where $P_\mathcal{C}$ is the prediction averaging across the committee
- KL divergence: $U(\mathbf{x}) = \frac{1}{C} \sum_{c=1}^C D_\text{KL} (P_{\theta_c} | P_\mathcal{C})$

##### Diversity Sampling

전체 데이터 분포를 잘 나타내는 collection of samples를 샘플링하는 방법. 모델이 특정 narrow subset 뿐만 아니라 실제 세상의 모든 데이터에 대해 잘 동작하기 위해서는 (데이터의) diversity가 중요함. 즉, 선정된 샘플들이 기저 분포를 잘 대표해야 함. 일반적으로 diversity sampling 방법들은 샘플 사이의 유사도 측정에 기반함

##### Expected Model Change

Expected model change는 샘플이 모델 학습에 가져올 영향력을 의미함. 여기서 영향력이라 함은 모델 파라미터에 영향을 주는 것이나 training loss에 개선을 가져오는 것 등이 될 수 있음

##### Hybrid Strategy

위에서 언급한 방법들은 모두 상호 배타적인 방법들이 아니고, 같이 활용될 수 있음. 또한 active learning만 사용하는 것이 아니라 semi-supervised learning 등의 방법도 복합적으로 사용할 수 있음

### Measuring Uncertainty

##### Ensemble

과거 ML 알고리즘들이 모델 성능 향상 위해서 앙상블 사용했는데, DNN에 대해서는 앙상블의 cost가 너무 높음. 따라서 이런 경우에 일반적인 접근 방법은 dropout을 사용해서 Bayesian inference 수행하는 것이고, 그러면 모델 uncertainty(epistemic uncertainty)를 측정할 수 있게 됨

- Monte Carlo dropout: Dropout이 모든 weight layer 전에 적용됨. 이는 수학적으로 probabilistic deep Gaussian process ([Gal & Ghahramani 2016](https://arxiv.org/abs/1506.02157))로 근사됨. 따라서 이 방법은 모델의 uncertainty 측정이 필요할 때 가장 일반적으로 사용되는 방법임 (일반적으로 예측 결과의 신뢰도 측정에 모델의 uncertainty 계산이 요구되곤 함)
- 일반적으로 MC dropout 보다 naive 앙상블이 일반적으로 더 좋은 결과를 보이지만 당연하게도 이는 cost가 더 높음. 따라서 [Beluch et al. (2018)](https://openaccess.thecvf.com/content_cvpr_2018/papers/Beluch_The_Power_of_CVPR_2018_paper.pdf)의 연구에서는 몇 개의 대안들(Snapshot Ensemble, Diversity Encouraging Ensemble, Split Head Approach)에 대해 탐구함. 그래도 여전히 MC dropout은 경제적으로 좋은 선택지임

##### Uncertainty in Parameter Space

- Bayes-by-backprop ([Blundell et al. 2015](https://arxiv.org/abs/1505.05424)): 뉴럴넷의 weight uncertainty를 직접적으로 측정하는 방법으로, weight $\mathbf w$를 확률 분포로 모델링함. 알고리즘의 순서는 아래와 같으며 variational parameters $\theta = \{\mu_i , \rho_i\}^d_{i=1}$를 업데이트하기 위한 KLD loss 식 유도 과정은 원문 글 참고
  1. Sample $\epsilon \sim \mathcal{N}(0, I)$
  1. Let $\mathbf{w} = \mu + \log(1+ \exp(\rho)) \circ \epsilon$
  1. Let $\theta = (\mu, \rho)$
  1. Let $f(\mathbf{w}, \theta) = \log q(\mathbf{w} \vert \theta) - \log p(\mathbf{w})p(\mathcal{D}\vert \mathbf{w})$
  1. Calculate the gradient of $f(\mathbf{w}, \theta)$ w.r.t. to $μ$ and $ρ$ and then update $θ$
  1. Uncertainty is measured by sampling different model weights during inference


##### Other Methods

이 외에도, loss prediction module([Yoo & Kweon 2019](https://arxiv.org/abs/1905.03677))이라는 방법과, adversarial training 기반의 VAAL (Variational Adversarial Active Learning; [Sinha et al. 2019](https://arxiv.org/abs/1904.00370)), MAL (Minimax Active Learning; [Ebrahimiet al. 2021](https://arxiv.org/abs/2012.10467)), CAL (Contrastive Active Learning; [Margatina et al. 2021](https://arxiv.org/abs/2109.03764)) 등의 방법들도 존재

### Measuring Representativeness

##### Core-Set Approach

Core-set은 computational geometry 분야의 개념인데, larget point set의 형태를 근사하는 small set of points를 의미함. 일부 subset(i.e., core-set)만으로 모델을 학습시키더라도 entire data points에 대해 학습한 것 같은 효과를 내는 것을 목표로 함

- [Sener & Savarese (2018)](https://arxiv.org/abs/1708.00489): Active learning을 core-set selection problem으로 여김. 이러한 관점을 가지면 active learning problem을 아래 식으로 표현 가능하고, time step $t$ 마다 라벨링되는 데이터를 $\mathcal S^{(t)}$라고 할 때, 'unlabeled data를 포함한 모든 데이터셋에 대한 emprical loss의 평균'과 '$t$에서의 labeled data에 대한 empirical loss의 평균'의 차이를 줄이는 문제가 됨 (이는 [k-Center problem](https://en.wikipedia.org/wiki/Metric_k-center)과 equivalent 하다고 하는데 제대로 이해는 못했음)

$$
\min_{\mathcal{S}^{(t+1)} : \vert \mathcal{S}^{(t+1)} \vert \leq b} \bigg\vert \frac{1}{N}\sum_{i=1}^N \mathcal{L}(\mathbf{x}_i, y_i) - \frac{1}{\vert \mathcal{S}^{(t)} \cup \mathcal{S}^{(t+1)} \vert} \sum_{j=1}^{\vert \mathcal{S}^{(t)} \cup \mathcal{S}^{(t+1)} \vert} \mathcal{L}(\mathbf{x}^l_j, y_j) \bigg\vert
$$

- [Coleman et al. (2020)](https://arxiv.org/abs/1906.11829): Core-set selection 방법은 class 수가 많아질수록 효율성이 떨어지는데, weaker(or smaller, not fully-trained) model을 프록시로 사용하는 경우에 성능 저하 없이 데이터 선정 프로세스를 훨씬 단축시킬 수 있다는 것을 보임. 이를 SVP(Selection via Proxy)라 명명

##### Diverse Gradient Embedding

- BADGE (Batch Active Learning by Diverse Gradient Embeddings; [Ash et al. 2020](https://arxiv.org/abs/1906.03671)): model uncertainty와 data diversity를 gradient space에서 파악하는 방법
  - Uncertainty: Final layer의 gradient magnitude(norm) 기반으로 uncertainty 계산. High confident sample 일수록 작은 magnitude를 가짐
  - Diversity: Gradient space에서 k-means++라는 clustering 방법 수행하여 gradient embedding이 얼마나 퍼져있는지 파악


### Measuring Training Effects

##### Quantify Model Changes

- EGL (Expected Gradient Length; [Settles et al. 2008](https://papers.nips.cc/paper/2007/hash/a1519de5b5d44b31a01de013b9b51a80-Abstract.html)): 모델에 가장 큰 변화를 줄 수 있는 데이터 샘플을 찾는 방법. 아래의 식을 계산하면 되긴 하지만 true label $y_i$이 unknown이기 때문에, EGL은 현재 모델의 belief(아마 모델 예측값을 말하는 듯)를 대신 사용

$$
\text{EGL}(\mathbf{x}_i) = \sum_{y_i \in \mathcal{Y}} p(y=y_i \vert \mathbf{x}) \|\nabla \mathcal{L}^{(y_i)}(\theta)\|
$$

- BALD (Bayesian Active Learning by Disagreement; [Houlsby et al. 2011](https://arxiv.org/abs/1112.5745)): 모델 weights에 대해 information gain을 최대화 하는 데이터 샘플을 찾는 방법

##### Forgetting Events

- [Mariya Toneva et al. (2019)](https://arxiv.org/abs/1812.05159): 과거에 배운 정보들이 active learning 및 모델 재학습 과정에서 어떻게 변화되는지를 분석하였음. 대부분의 unforgettable samples가 한 번 학습된 이후에는 모델 예측이 변하지 않는다는 사실을 발견. 이는 unforgettable samples이 안전하게 제거되어도 된다는 것을 의미 (추후 샘플링에 포함되지 않아도 된다는 것을 의미하는 듯)
  - Forgettable (redundant) samples: 학습 과정에서 모델 예측이 변경되는 샘플들
  - Unforgettable samples: 학습 과정에서 모델 예측이 변경되지 않는 샘플들

- [Bengar et al. (2021)](https://arxiv.org/abs/2107.14707): 학습 과정에서 모델 예측의 변화를 model uncertainty 측정 지표로 사용 가능. 하지만 ground truth가 unknown이기 때문에 label dispersion이라는 새로운 metric을 제안. $t$를 training steps라고 할 때 가장 빈번하게 예측되는 label을 $c^*$으로 두고, training step마다 $c^*$로 예측하는 비율이 얼마나 높은지를 측정 (즉, 특정 데이터 샘플에 대해 모델이 얼마나 균일한 예측을 뱉는지 측정)

$$
\text{Dispersion}(\mathbf{x}) = 1 - \frac{f_\mathbf{x}}{T} \text{ where }
f_\mathbf{x} = \sum_{t=1}^T \mathbb{1}[\hat{y}_t = c^*], c^* = \arg\max_{c=1,\dots,C}\sum_{t=1}^T \mathbb{1}[\hat{y}_t = c]
$$

### Hybrid Methods

- SA (Suggestive Annotation; [Yang et al. 2017](https://arxiv.org/abs/1706.04737)): High uncertainty & highly representative labeled samples을 선정하기 위한 two-step hybrid strategy 제안
  1. Uncertainty sampling: Ensemble 모델들의 disagreement 기반으로 $K$ 개의 high uncertainty 샘플 선정
  2. Core-set approach: 단계 (1)에서 선정된 샘플 중에서 representative 데이터 샘플을 선정하기 위한 단계로, 유사도 측정 기반의 core-set approach 사용해서 일부 데이터 샘플링
- [Zhdanov (2019)](https://arxiv.org/abs/1901.05954): SA와 비슷하지만, SA의 단계 (1)을 k-means 기반의 방법으로 변경함
- CEAL (Cost-Effective Active Learning; [Yang et al. 2017](https://arxiv.org/abs/1701.03551)): Unconfident sample은 active learning을 사용하고 most confident sample은 pseudo label 할당

### Survey Papers

| Year | Paper                                                        | Author                      |
| ---- | ------------------------------------------------------------ | --------------------------- |
| 2022 | [A Comparative Survey of Deep Active Learning](https://arxiv.org/pdf/2203.13450.pdf) | Xueying Zhan et al.         |
| 2021 | [A Survey on Active Deep Learning: From Model-driven to Data-driven](https://arxiv.org/abs/2101.09933) | Peng Liu et al.             |
| 2020 | [A Survey of Active Learning for Text Classification using Deep Neural Networks](https://arxiv.org/abs/2008.07267) | Christopher Schröder et al. |
| 2020 | [A Survey of Deep Active Learning](https://arxiv.org/abs/2009.00236) | Pengzhen Ren et al.         |
| 2009 | [Active Learning Literature Survey](https://minds.wisconsin.edu/handle/1793/60660) | Settles, Burr.              |
