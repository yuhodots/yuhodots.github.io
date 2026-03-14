---
title: "Recent Studies for Novel Knowledge Learning"
date: "2022-05-22"
template: "post"
draft: true
path: "/deeplearning/22-05-22/"
description: "Base model에서 시작하여 새로운 지식을 배우며 지식을 확장하는 형태의 ML 알고리즘은 데이터 저장 공간 확보, computing cost 절약 등에 도움을 줄 수 있다는 장점을 가집니다. 이번 포스팅에서는 이런 novel knowledge learning이라는 토픽과 관련된 최근 연구 동향을 살펴봅니다."
category: "Deep Learning"
thumbnail: "deeplearning"
---

> Base model에서 시작하여 점차 새로운 지식을 배우며 지식을 확장하는 형태의 ML 알고리즘은, 인간과 유사한 방식의 학습을 가능케 하는 것은 물론, 데이터 저장 공간 확보, computing cost 절약 및 보안 이슈에도 도움을 줄 수 있다는 장점을 가집니다. 이번 포스팅에서는 이런 novel knowledge learning이라는 연구 토픽과 관련된 최근 연구 동향을 살펴봅니다.

### Introduction

과거에 모델이 학습한 지식을 모델의 새로운 지식 학습에 활용하고자 하는 시도들은 다양하게 존재했습니다. 이는 AGI에 다가가기 위해 꼭 필요한 연구이기도 하고, [이전 포스팅](https://yuhodots.github.io/deeplearning/21-08-01/)에서 언급했던 것 처럼 데이터 저장 공간의 확보, 계산 비용 절약, 보안 이슈 해결 등에 도움을 줄 수 있는 연구이기 때문입니다.

관련하여 진행된 연구들로는 "이전에 학습한 지식을 잊어버리지 않으면서도 새로운 지식을 잘 학습해보자"라는 방향성을 가진 Continual Learning, Class-Incremental Learning, Dynamic Few-Shot Leaning 등의 연구와, "학습한 지식을 최대한 활용하여 (오로지) 새로운 지식을 빠르고 정확하게 학습하자"는 Meta-Learning, Transfer Learning 등의 연구들이 있지만, 해당 task들이 처음 제안된 이후로 시간이 꽤 흐르기도 했고, 일부 부자연스러운 세팅이 존재하기도 하여 더 real-world의 문제 상황과 가까운 형태로 task가 재정의되어야 한다는 의견이 꾸준히 제기되어 왔습니다.

이러한 흐름에 따라 2019, 2020년 이후 ML/AI 주요 학회에서는 새롭게 정의된 novel knowledge learning 관련 task들이  종종 등장하였고, 특히 올해 학회에서 더욱 빈번하게 등장하는 것 같아 관련 분야의 최근 연구 동향 중에서 특히 관심이 가는 'Blurry CIL'와 'Novel Class Discovery(NCD)'라는 task에 대해서 포스팅으로 정리하게 되었습니다.

### Blurry Class-Incremental Learning

기존 Class-Incremenal Learning task는 100개의 total class 집합이 있다고 한다면, 100/N개의 class가 N번에 걸쳐 순차적으로 입력되는 세팅을 가집니다. 한 번의 class 집합이 입력되는 것을 하나의 task로 보고, N개의 task가 모두 입력된 후에 전체 학습이 종료됩니다. Task들 사이의 class는 서로 disjoint하고, 이전에 지나쳤던 previous task 데이터는 새로운 task를 학습할 때 다시 제공되지 않기 때문에, previous task에서 학습한 지식을 보존하면서도 새로운 task를 잘 학습하는 것이 목표가 됩니다. 물론 과거의 지식을 추가 데이터의 제공 없이 잊지 않으면서도 새로운 지식을 배운다는 컨셉에 적합한 문제 정의이긴 하나, real-world에서는 이전에 보았던 class가 새로운 지식을 학습하는 과정에서 전혀 관측되지 않을 것이라는 disjoint 형태의 문제정의에 부자연스러운 점도 존재합니다. 

따라서 Blurry CIL는 기존의 CIL이 task마다 disjoint한 class set을 가졌던과 반대로, task 끼리 classes를 공유하는 세팅을 가집니다. 대신 task 마다의 새로 입력되는 novel class가 majority class가 되어, 해당 task의 majority class 비율이 다른 class들에 비해서 상대적으로 높게 설정됩니다. 따라서 task 내의 데이터 수가 클래스에 따라 불균형합니다. 

예를 들어 Rainbow Memory(Bang et al.,) 논문에서는  의류 쇼핑몰의 검색에 대해서는 계절 별로 품목이 새로이 추가될 수 있고 계절별로 검색 수치가 달라진다는 것을 예시로 들고 있습니다. 비록 해당 예시가 완전한 class-incremental learning 이라고 보기는 어렵지만, 그럼에도 blurry-CIL이 disjoint-CIL보다 real-world 문제상황에 가까운 것을 확인 가능합니다.

*BlurryM* 으로 표기합니다. $(100-M)$%는 majority class로 가지고 있고 $M$%는 나머지 class를 balanced로 가짐. 일반적으로는  Blurry10으로써 task 내에 90% majority class를 가지고 있고 나머지 10%가 previosud task classes를 동등한 비율로 나눠서 가지고 있음

Blurry task는 Disjoint CIL에 비해 forgetting문제에 비교적 덜 영향을 받을 것으로 생각되나, 또 기존 CIL에 비해 task 내 data imbalance 문제가 추가되는 것이기 때문에 이를 해결할 수 있는 방법이 요구될 것으로 생각됩니다. 아래의 논문을 참고하면 더 자세히 확인할 수 있습니다. 

- Aljundi, Rahaf, et al. "Gradient based sample selection for online continual learning." *Advances in neural information processing systems* 32 (2019).
- Bang, Jihwan, et al. "Rainbow memory: Continual learning with a memory of diverse samples." *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition*. 2021

### Novel Class Discovery

이전에 본 적 없는 새로운 class를 학습하기 위해서는 labeling된 데이터가 필요합니다. 하지만 모델을 학습시킬 만한 충분한 labeling 데이터가 없다면 어떻게 될까요? 당연히 모델을 잘 학습시킬 수 없게 됩니다. 따라서 해당 문제를 해결하기 위해서 기존 연구들은 ImageNet dataset과 같이 거대한 데이터셋에 모델을 pretraining 시켜 좋은 representation을 학습시킨 후에, 해당 parameter를 가지고 target 데이터셋에 finetuning 시키는 transfer learning 방식을 사용했습니다. 하지만 이 방법은 일단 pretarining 시에 충분히 좋은 representation을 학습하기 위해 거대한 데이터셋이 필요하고, 그리고 finetuning을 위한 target 데이터셋의 데이터도 labeling 되어있어야 한다는 것을 전제로 합니다.

그리고 Few-shot & Meta-learning에서는 어떤 새로운 class가 inference time에 입력되더라도 대응할 수 있는 높은 generalization 성능을 가진 모델을 학습시키고자, training phase에서 N개의 class를 샘플링해서 모델에 여러 class 조합을 하나의 task로 매우 여러번 반복해서 제공합니다. 이 경우에 transfer learning 보다 novel class에 대해서 좋은 일반화 성능을 보이고 few-shot만이 필요하지만, training 단계에서 여러 class 조합을 샘플링하기 위해서 training class가 많아야 한다는 단점이 존재합니다.

Novel class discovery도 transfer learning, meta-learning이 풀고자 하는 문제와 동일한 문제를 풀고자 합니다. 다만 novel class가 하나도 labeling 되어있지 않은 좀 더 challenging한 문제를 풀고자 합니다. labeling class $C^l$와 unlabeled class $C^u$는 disjoint. 

예를 들어,  강아지와 고양이 데이터를 가지고 학습된 모델을, 원숭이와 새를 구분하기 위해 사용한다고 가정해보겠습니다. 강아지와 고양이 데이터를 가지고 학습할 떄는 labeling data 였습니다. 하지만 원숭이와 새 이미지에 대해서는 이미지만 주어질 뿐 어떠한 label도 붙어있지 않은 unlabeled dataset의 형태로 주어집니다. 따라서 모델은 기존에 배운 representation을 충분히 활용하여, novel class가 서로 잘 구분되도록 clustering을 수행할 수 있어야 합니다. 100개의 class를 가지고 있던 데이터셋이라고 한다면, 80개의 base class를 가지고 학습된 모델이, 20개의 unlabeled novel class를 잘 clustering하는 문제를 풀게됩니다. 그렇다고 해서 완전히 unsupervised clustering라고 말할수는 없는것이, 20개의 novel class를 잘 구분하기 위해서 기존 80개의 labeled class는 활용이 가능하기 때문입니다. 

unlabeled dataset에 대해서 clustering 성능을 확인해야하기 때문에 clustering accuracy를 evaluation metric으로 사용하며, 아래의 논문을 참고하면 더 자세히 확인할 수 있습니다. 

- Hsu, Yen-Chang, Zhaoyang Lv, and Zsolt Kira. "Learning to cluster in order to transfer across domains and tasks." *International Conference on Learning Representations*. 2018.
- Kai Han, Andrea Vedaldi, and Andrew Zisserman. Learning to discover novel visual categories via deep transfer clustering. In *Proc. ICCV*, 2019
- Kai Han, Sylvestre-Alvise Rebuffi, Sebastien Ehrhardt, Andrea Vedaldi, and Andrew Zisserman. Automatically discovering and learning new visual categories with ranking statistics. In *Proc. ICLR*, 2020

이러한 NCD도 세부적으로 나누면 여러 몇가지 형태가 존재합니다. (1) cluster number 알려주고 novel category classification 하는 경우와, (2) cluster number 안 알려주고 number of novel class estimation를 하는 경우와, (3) Estimated class number 가지고 novel category classification 하는 경우. "Learning to cluster in order to transfer across domains and tasks." 논문에서는 세가지 경우를 다 실험하고, "Automatically discovering and learning new visual categories with ranking statistics" 에서는 unlabel number 개수를 미리 알려주었음. appendix에는 unknown class number 실험 결과도 있긴 함. 또한 해당 논문에서는 기존 labeling class $C^l$과 unlabeled class $C^u$도 동시에 잘하도록 더 realistic한 incremental learning scheme도 정의하여 풀었음. 

NCD는 transfer learning의 일종이라고 볼 수 있음. source domain의 지식을 leaverage하여 target domain에서의 clustering 문제를 푸는 것! 그리고 이 domain이라는 것이 domain adaptation task처럼 급격하게 변하는 것은 아니고, 동일한 dataset에서 서로 disjoint한 class set 정도로 상대적으로 작은 distributional shifting 가짐. 다만 이 가정을 NCD 논문 들에서 명시적으로 하고있지는 않은데, 이 점을 잘 지키지 않으면 theoretically not solvable problem이라고 지적한 놈문이 "Meta-discovery"라는 논문임

##### Deep Transfer Clustering for NCD

- Deep clsutering 문제를 처음으로 Deep transfer clsutering으로 확장시켰음. 즉, Novel class discovery를 처음으로 제안한 논문

##### Ranking Statistics for NCD

1. Self-supervised pre-training on labelled and unlabelled data using RotNet loss (training $\Phi$)
2. Supervised training on labelled data using CE loss (training the head $\eta^l$ and the last micro-block of $\Phi$)
3. Training on pseudo-labelled data with ranking statisitics using BCE loss (training the head $\eta^u$ and the last micro-block of $\Phi$)

- 2번과 3번을 동시에 joint training
- 하지만 3번이 매 epoch마다 다르게 pseudo-labelled 되는 것이 학습의 불안정을 유발하므로, MSE를 consistency cost 로써 추가. randomly transformed된 출력과 기존 출력사이의 차이가 적도록 하는 loss

##### Neighborhood Contrastive Learning for NCD

- Ranking Statistics(RS) 방법에 NCL, SCL, HNG 총 세 개의 방법을 더 추가한 논문. 다만 ranking statistics를 사용하여 pseudo-labelling 하지 않고, cosine similarity 기준으로 pseudo-labelling 수행
- Neighborhood Contrastive Learning(NCL): Unlabelled dataset을 위한 loss. Self-supervised contrastive loss와 더불어, similarity가 높은 $k$ 개의 feature를 positive라고 labelling해서 contrastive loss를 추가적으로 계산. $\ell_{n c l}=\alpha \ell_{\left(z^{u}, \hat{z}^{u}\right)}+(1-\alpha) \ell_{\left(z^{u}, \rho_{k}\right)}$
- Supervised Contrastive Learning(SCL): Labelled dataset을 위한 loss. 기존 supervised-contrastive loss와 동일
- Hard-Negative Generation(HNG): True negative(labelled dataset)와 easy negative(unlabelled dataset)를 interpolate 한 것 중에서 제일 유사도 높은 $k$ 개를 hard negative로 사용 

##### Generalized Class Discovery (GCD)



##### Finding the number of novel categories (AutoNovel & RS)

1. KCL amd MCL assume the num- ber of categories to be a large value (i.e., 100) instead of estimating the number of categories explicitly
2. DTC와 AutoNovel 알고리즘: 데이터 스플릿을 바꿔가면서 k-means를 수행하면서, label 있는 데이터에 대해서 가장 잘 맞춘 경우를 올바른 k로 여김
   1. $C^l_r$를 probe class number로 두고, $C^l - C^l_r$개로 supervised feature representation
   2. $C^l_r$는 anchor probe set $C^l_{ra}$와 validation probe set $C^l_{rv}$로 나누고 **constrained (semi-supervised) k-means** 수행
   3. 이 때, anchor probe set $C^l_{ra}$는 label을 부여한 상태로 고정하고, validation probe set $C^l_{rv}$는 additional unlabelled data로 여김
   4. 이 상태에서 $k$를 $C^l_r \to C^l_r + C^u_{\max}$ 까지 loop 돌면서 수행
   5. $D^l_{rv}$에 대해서는 ACC를 측정하고, $D^u$에 대해서는 CVI를 측정
      - Average clustering accuracy(ACC): Permutations are optimized using the Hungarian algorithm
      - Cluster validity index(CVI): 여러 metric 중에서 Silhouette index 사용했음
   6. ACC 관점에서 optimal인 $C^{u*}_a$와 CVI 관점에서 optimal인 $C^{u*}_v$를 찾아, $\hat{C}^u = (C^{u*}_a + C^{u*}_v)/2$를 최종 unlabelled class number로 선정
   7. 다시 한번 이 값을 가지고 k-means를 수행한 뒤에 outlier를 데이터 셋에서 drop


---

정말 real-world의 문제를 풀고 싶다면

1. Novel class의 개수가 priori로 제공되면 안됨
   - 그래서 NCD 논문에서는 number of novel class estimation 실험도 있음
2. Base class와 novel class 전부를 classification + clustering 할 수 있어야 함
