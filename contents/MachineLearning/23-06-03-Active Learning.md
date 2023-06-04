---
title: "Active Learning"
date: "23-06-03"
template: "post"
draft: true
path: "/deeplearning/23-06-03/"
description: "Unlabeled data pool에서 가치있는 데이터를 발굴해내기 위한 방법인 Active Learning에 대해 정리합니다. 원작자인 Lillian weng 님의 허가를 받고 블로그 글을 번역하였으며, 더 자세한 내용은 원문 링크를 참고하시면 좋습니다: https://lilianweng.github.io/posts/2022-02-20-active-learning"
category: "Deep Learning"
thumbnail: "deeplearning"
---

> Unlabeled data pool에서 가치있는 데이터를 발굴해내기 위한 방법인 Active Learning에 대해 정리합니다. 원작자인 Lillian weng 님의 허가를 받고 블로그 글을 번역하였으며, 더 자세한 내용은 원문 링크를 참고하시면 좋습니다: https://lilianweng.github.io/posts/2022-02-20-active-learning

### Preliminary

- Sampling strategy (Query strategy): 말 그대로 샘플링 전략. Unlabeled set 중에서 가장 가치있는 샘플을 발견해내기 위한 전략
- Acquisition function $U(\mathbf x)$: 샘플링에 활용하기 위한 scoring function. Score가 높을수록 GT 라벨링하기에 더 가치있는 샘플임을 의미
- Two buckets of model uncertainty
  - Aleatoric uncertainty: Data noise로 인해 유발되는 uncertainty. 이는 ground truth에서 정보 유실이 있기 때문에 irreducible한 것으로 여겨짐
  - Epistemic uncertainty: 모델 파라미터에 존재하는 uncertainty. 이론적으로는 더 많은 데이터가 주어지면 reducible한 것으로 여겨짐

### Acquisition Function

##### Uncertainty Sampling

모델의 예측에 대해 가장 불확실한 샘플을 선정하는 방법. 가장 잘 알려진 방법들은 다음과 같음

- Least confidence: $U(\mathbf{x}) = 1 - P_\theta(\hat{y} \vert \mathbf{x})$. 최대 확률값이 가장 낮은 데이터를 샘플링
- Margin score: $U(\mathbf{x}) = P_\theta(\hat{y}_1 \vert \mathbf{x}) - P_\theta(\hat{y}_2 \vert \mathbf{x})$. Top-1 confidence와 Top-2 confidence의 차이가 낮은 데이터를 샘플링
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

과거 ML 알고리즘들이 모델 성능 향상 위해서 앙상블 사용했는데, DNN에 대해서는 앙상블의 cost가 너무 높음. 따라서 이런 경우에 일반적인 접근 방법은 dropout을 사용해서 Bayesian inference 수행하는 것임. 이러면 우리는 모델 uncertainty(epistemic uncertainty)를 측정할 수 있게 됨

- Monte Carlo dropout: Dropout이 모든 weight layer 전에 적용됨. 이는 수학적으로 probabilistic deep Gaussian process ([Gal & Ghahramani 2016](https://arxiv.org/abs/1506.02157))로 근사됨. 따라서 이 방법은 모델의 uncertainty 측정이 필요할 때 가장 일반적으로 사용되는 방법임 (일반적으로 예측 결과의 신뢰도 측정에 모델의 uncertainty 계산이 요구되곤 함)
- MC dropout 보다 naive 앙상블이 일반적으로 더 좋은 결과를 보이지만 당연하게도 이는 cost가 더 높기 때문에, [Beluch et al. (2018)](https://openaccess.thecvf.com/content_cvpr_2018/papers/Beluch_The_Power_of_CVPR_2018_paper.pdf) 연구에서는  몇 개의 대안들(Snapshot Ensemble, Diversity Encouraging Ensemble, Split Head Approach)에 대해 탐구함. 그래도 여전히 MC dropout은 경제적으로 좋은 선택지임

##### Uncertainty in Parameter Space

- Bayes-by-backprop ([Blundell et al. 2015](https://arxiv.org/abs/1505.05424)): 뉴럴넷의 weight uncertainty를 측정하는 방법으로, weight $\mathbf w$를 확률 분포로 모델링. 알고리즘의 순서는 아래와 같으며 variational parameters $\theta = \{\mu_i , \rho_i\}^d_{i=1}$를 업데이트하기 위한 loss 식은 원문 글 참고

1. Sample $\epsilon \sim \mathcal{N}(0, I)$
2. Let $\mathbf{w} = \mu + \log(1+ \exp(\rho)) \circ \epsilon$
3. Let $\theta = (\mu, \rho)$
4. Let $f(\mathbf{w}, \theta) = \log q(\mathbf{w} \vert \theta) - \log p(\mathbf{w})p(\mathcal{D}\vert \mathbf{w})$
5. Calculate the gradient of $f(\mathbf{w}, \theta$ w.r.t. to $μ$ and $ρ$ and then update $θ$
6. Uncertainty is measured by sampling different model weights during inference

##### Other Methods

이 외에도, loss prediction module([Yoo & Kweon 2019](https://arxiv.org/abs/1905.03677))이라는 방법과, adversarial training 기반의 VAAL (Variational Adversarial Active Learning; [Sinha et al. 2019](https://arxiv.org/abs/1904.00370)), MAL (Minimax Active Learning; [Ebrahimiet al. 2021](https://arxiv.org/abs/2012.10467)), CAL (Contrastive Active Learning; [Margatina et al. 2021](https://arxiv.org/abs/2109.03764)) 등의 방법들도 존재함. Contrastive learning 기반의 알고리즘 사용하는 경우에 CAL 사용해보는 것도 괜찮아보임

### Measuring Representativeness

##### Core-Sets Approach

Core-set은 computational geometry 용어인데, larget point set의 형태를 근사하는 small set of points를 의미함. 결국 core-set 만으로 모델을 학습시키더라도 모든 data points에 대해 학습한 것 같은 효과를 내는 것을 목표로 함

- [Sener & Savarese (2018)](https://arxiv.org/abs/1708.00489): 
- [Coleman et al. (2020)](https://arxiv.org/abs/1906.11829): 

##### Diverse Gradient Embedding

- BADGE (Batch Active Learning by Diverse Gradient Embeddings; [Ash et al. 2020](https://arxiv.org/abs/1906.03671)):

### Training Effects

##### Quantify Model Changes

- EGL (Expected Gradient Length; [Settles et al. 2008](https://papers.nips.cc/paper/2007/hash/a1519de5b5d44b31a01de013b9b51a80-Abstract.html)): 
- BALD (Bayesian Active Learning by Disagreement; [Houlsby et al. 2011](https://arxiv.org/abs/1112.5745)): 

##### Forgetting Events

- Forgettable (redundant) samples: 
- Unforgettable samples:
- Label dispersion:

### Hybrid Methods

- SA (Suggestive Annotation; [Yang et al. 2017](https://arxiv.org/abs/1706.04737)): 
- [Zhdanov (2019)](https://arxiv.org/abs/1901.05954):
- CEAL (Cost-Effective Active Learning; [Yang et al. 2017](https://arxiv.org/abs/1701.03551)): Unconfident sample은 active learning을 사용하고 most confident sample은 pseudo label 할당

### Survey Papers

| Year | Paper                                                        | Author                      |
| ---- | ------------------------------------------------------------ | --------------------------- |
| 2022 | [A Comparative Survey of Deep Active Learning](https://arxiv.org/pdf/2203.13450.pdf) | Xueying Zhan et al.         |
| 2021 | [A Survey on Active Deep Learning: From Model-driven to Data-driven](https://arxiv.org/abs/2101.09933) | Peng Liu et al.             |
| 2020 | [A Survey of Active Learning for Text Classification using Deep Neural Networks](https://arxiv.org/abs/2008.07267) | Christopher Schröder et al. |
| 2020 | [A Survey of Deep Active Learning](https://arxiv.org/abs/2009.00236) | Pengzhen Ren et al.         |
| 2009 | [Active Learning Literature Survey](https://minds.wisconsin.edu/handle/1793/60660) | Settles, Burr.              |
