---
title: "Deep Learning Paper List"
date: "2022-03-15"
template: "post"
draft: false
path: "/deeplearning/22-03-15/"
description: "관심 분야의 논문들을 기록합니다. 최근에 읽은 논문들에 대해서는 핵심 내용을 세 줄 요약으로 적고 있습니다. 체크 표시가 되어있지 않은 논문들은 추후 다시 읽어 볼 필요가 있는 논문을 의미합니다. Few-shot learning, Meta Learning, Incremental & Continual Learning, Self & Semi-supervised Learning, Reinforcement Learning, Natural Language Processing 분야의 논문을 기록하였습니다."
category: "Deep Learning"
---

> 관심 분야의 논문 리스트를 기록합니다. 최근에 읽은 논문은 핵심 내용을 세 줄 요약으로 추가하고 있습니다. 체크 표시가 되어있지 않은 논문들은 추후 다시 읽어 볼 필요가 있는 논문을 의미합니다.

### Few-Shot Learning / Meta-Learning

- [x] [Vinyals, Oriol, et al. "Matching networks for one shot learning." NIPS 2016.](https://dl.acm.org/doi/abs/10.5555/3157382.3157504)
- [ ] [Santoro, et al. "Meta-Learning with Memory-Augmented Neural Networks." ICML 2016.](http://proceedings.mlr.press/v48/santoro16.pdf)
- [x] [Snell, Jake, Kevin Swersky, and Richard Zemel. "Prototypical networks for few-shot learning." NIPS 2017.](https://dl.acm.org/doi/abs/10.5555/3294996.3295163)
- [x] [Yoon, Sung Whan, Jun Seo, and Jaekyun Moon. "TapNet: Neural network augmented with task-adaptive projection for few-shot learning." ICML 2019.](http://proceedings.mlr.press/v97/yoon19a.html)
- [x] [Finn, Chelsea, Pieter Abbeel, and Sergey Levine. "Model-agnostic meta-learning for fast adaptation of deep networks." ICML 2017.](http://proceedings.mlr.press/v70/finn17a)
- [x] [Mukaiyama, Kei, Issei Sato, and Masashi Sugiyama. "LFD-Protonet: prototypical network based on local fisher discriminant analysis for few-shot learning." arXiv preprint arXiv:2006.08306, 2020.](https://arxiv.org/abs/2006.08306)
- [x] [Liu, Yanbin, et al. "Learning to propagate labels: Transductive propagation network for few-shot learning." ICLR 2019.](https://arxiv.org/abs/1805.10002)
- [x] [Kim, Jongmin, et al. "Edge-labeling graph neural network for few-shot learning." CVPR 2019.](https://openaccess.thecvf.com/content_CVPR_2019/html/Kim_Edge-Labeling_Graph_Neural_Network_for_Few-Shot_Learning_CVPR_2019_paper.html)
- [x] [Goldblum, Micah, et al. "Unraveling meta-learning: Understanding feature representations for few-shot tasks." ICML 2020.](http://proceedings.mlr.press/v119/goldblum20a.html)
- [ ] [Xu, Jin, et al. "Metafun: Meta-learning with iterative functional updates." ICML 2020.](http://proceedings.mlr.press/v119/xu20i.html)
- [ ] [Finn, Chelsea, Kelvin Xu, and Sergey Levine. "Probabilistic model-agnostic meta-learning." ICML 2018.](https://dl.acm.org/doi/abs/10.5555/3327546.3327622)
- [ ] [Fortin, Mathieu Page, and Brahim Chaib-draa. "Towards Contextual Learning in Few-Shot Object Classification." CVPR 2021.](https://openaccess.thecvf.com/content/WACV2021/html/Fortin_Towards_Contextual_Learning_in_Few-Shot_Object_Classification_WACV_2021_paper.html)
- [x] [Bronskill, et al. "TaskNorm: Rethinking Batch Normalization for Meta-Learning." ICML 2020.](http://proceedings.mlr.press/v119/bronskill20a.html)
- [x] [Nichol, Alex, Joshua Achiam, and John Schulman. "On first-order meta-learning algorithms." arXiv preprint arXiv:1803.02999 (2018).](https://arxiv.org/abs/1803.02999)
- [ ] [Oh, Jaehoon, et al. "BOIL: Towards Representation Change for Few-shot Learning." ICLR 2021.](https://openreview.net/pdf?id=umIdUL8rMH)
- [x] [Oreshkin, Boris N., et al. "Tadam: Task dependent adaptive metric for improved few-shot learning." NIPS 2018.](https://dl.acm.org/doi/abs/10.5555/3326943.3327010)
- [ ] [Ren, Mengye, et al. "Meta-Learning for Semi-Supervised Few-Shot Classification." ICLR 2018.](https://openreview.net/pdf?id=HJcSzz-CZ)
  - Semi-supervised few-shot classification을 푸는데, 이 때 unlabeled data에 distractor(support set에서 주어지지 않았던 class로, 단순 SSL시 방해가 되는 novel class)가 존재하는 상황
  - ProtoNet w. soft k-means / ProtoNet w. soft k-means w. a distractor clsuter / ProtoNet w. soft k-means and masking, 총 3개의 방법을 제안

### Incremental Learning / Continual Learning

- [x] [Li, Zhizhong, and Derek Hoiem. "Learning without forgetting." IEEE transactions on pattern analysis and machine intelligence 40.12 (2017): 2935-2947.](https://ieeexplore.ieee.org/abstract/document/8107520)
- [x] [Parisi, German I., et al. "Continual lifelong learning with neural networks: A review." Neural Networks 113 (2019): 54-71.](https://www.sciencedirect.com/science/article/pii/S0893608019300231)
- [x] [Yoon, Sung Whan, et al. "XtarNet: Learning to Extract Task-Adaptive Representation for Incremental Few-Shot Learning." ICML 2020.](http://proceedings.mlr.press/v119/yoon20b.html)
- [x] [Ren, Mengye, et al. "Incremental Few-Shot Learning with Attention Attractor Networks." NIPS 2019.](https://papers.nips.cc/paper/2019/hash/e833e042f509c996b1b25324d56659fb-Abstract.html)
- [x] [Tao, Xiaoyu, et al. "Few-shot class-incremental learning." CVPR 2020.](https://openaccess.thecvf.com/content_CVPR_2020/html/Tao_Few-Shot_Class-Incremental_Learning_CVPR_2020_paper.html)
- [ ] [Ren, Mengye, et al. "Wandering within a world: Online contextualized few-shot learning." arXiv preprint arXiv:2007.04546, 2020.](https://arxiv.org/abs/2007.04546)
- [ ] [Luo, Yadan, et al. "Learning from the Past: Continual Meta-Learning with Bayesian Graph Neural Networks." AAAI 2020.](https://ojs.aaai.org/index.php/AAAI/article/view/5942)
- [ ] [Gidaris, Spyros, and Nikos Komodakis. "Dynamic few-shot visual learning without forgetting." CVPR 2018.](https://openaccess.thecvf.com/content_cvpr_2018/html/Gidaris_Dynamic_Few-Shot_Visual_CVPR_2018_paper.html)
- [x] [Cheraghian, Ali, et al. "Semantic-aware Knowledge Distillation for Few-Shot Class-Incremental Learning." CVPR 2021.](https://arxiv.org/abs/2103.04059)
- [x] [Liu, Bing. "Learning on the job: Online lifelong and continual learning." AAAI 2020.](https://ojs.aaai.org//index.php/AAAI/article/view/7079)
- [x] [Rusu, Andrei A., et al. "Progressive neural networks." arXiv preprint arXiv:1606.04671 (2016).](https://arxiv.org/abs/1606.04671)
- [ ] [Yoon, Jaehong, et al. "Lifelong Learning with Dynamically Expandable Networks." ICLR. 2018.](https://openreview.net/pdf?id=Sk7KsfW0-)
- [x] [Masana, Marc, et al. "Class-incremental learning: survey and performance evaluation." arXiv preprint arXiv:2010.15277 (2020).](https://arxiv.org/abs/2010.15277)
- [x] [Mazumder, Pratik, Pravendra Singh, and Piyush Rai. "Few-Shot Lifelong Learning." AAAI 2021.](file:///C:/Users/ECE/Desktop/16334-Article%20Text-19828-1-2-20210518.pdf)
  - CEC와 동일하게 data-init을 사용하여 base, novel classifier 생성
  - CE loss를 사용하지 않고 triplet loss, minimize cosine similarity loss(for prototype), regularization loss를 사용
  - 전체 weight 중에서 크기가 작은 10%만 골라서, 이를 novel sample에 대해서 fine-tuning 진행
- [x] [Zhu, Kai, et al. "Self-Promoted Prototype Refinement for Few-Shot Class-Incremental Learning." CVPR 2021.](https://openaccess.thecvf.com/content/CVPR2021/html/Zhu_Self-Promoted_Prototype_Refinement_for_Few-Shot_Class-Incremental_Learning_CVPR_2021_paper.html)
- [ ] [Kirkpatrick, James, et al. "Overcoming catastrophic forgetting in neural networks." PNAS 2017.](https://www.pnas.org/content/114/13/3521.short)
  - Fisher Information Matrix를 사용하여, parameter space 상에서 특정 covariance를 제약으로 parameter 학습이 이루어지도록 하는 알고리즘 (mahalanobis distance와 동일한 formulation)
  - 논문 설명 블로그 [링크1](https://yukyunglee.github.io/Fisher-Information-Matrix/), [링크2](https://nzer0.github.io/Fisher-Info-and-NLL-Hessian.html)
- [x] [Shi, Guangyuan, et al. "Overcoming Catastrophic Forgetting in Incremental Few-Shot Learning by Finding Flat Minima." NeurIPS 2021.](https://proceedings.neurips.cc/paper/2021/hash/357cfba15668cc2e1e73111e09d54383-Abstract.html)
  - Robust optimization과 관계가 깊은 논문. Figure 2만 봐도 논문이 말하고자 하는 내용은 파악 가능
- [x] [Cha, Hyuntak, Jaeho Lee, and Jinwoo Shin. "Co2l: Contrastive continual learning." ICCV 2021.](https://openaccess.thecvf.com/content/ICCV2021/html/Cha_Co2L_Contrastive_Continual_Learning_ICCV_2021_paper.html)
  - Asymmetric SupCon loss로 novel learning하고, self-supervised instance-wise relation distill(IRD)로 preserve knowledge
  - Asymmetric SupCon: current task와 memory buffer를 둘 다 사용하지만, anchor로는 current task만 사용. 이 경우에 그냥 SupCon보다 효과 좋음
  - IRD: reference(previous) model output과 동일해지도록 현재 모델 regulate (대상은 2N개 전부)
- [x] [Hu, Dapeng, et al. "How Well Does Self-Supervised Pre-Training Perform with Streaming ImageNet?." NeruIPS 2021.](https://openreview.net/pdf?id=gYgMSlZznS)
  - Self-supervised learning 방식으로 pre-training하면, streaming data에 대해서 joint training 만큼의 성능이 나온다는 것을 주장
  - Pre-training은 MoCo-v2 protocol을 따르고, OpenSelfSup의 구현을 기반으로 하였음
  - Streaming data의 distribution shift가 milld한 경우에는 joint training과 self-supervised pre-training의 성능이 거의 비슷하고, large distribution shift인 경우에는 MAS(memory aware synapse)와 data replay 방법을 사용하면 비슷함.
- [ ] [Madaan, Divyam, et al. "Rethinking the Representational Continuity: Towards Unsupervised Continual Learning." ICLR 2022.](https://openreview.net/pdf?id=9Hrka5PA7LW)
  - Label unannotated인 unsupervised continual learning(CURL)을 SimSiam과 Barlow Twining 알고리즘 사용하여 해결해보았더니 신기하게도 supervised continual learning보다 catastrophic forgetting에 robust 함
  - Lifelong Unsupervised Mixup(LUMP)는 previous task(in memory buffer)와 current task 사이의 interpolate를 활용하는 방법이며, LUMP를 안 써도 잘하지만 LUMP 사용시 더 잘함
  - UCL/SCL이 low layer에서는 similar하고 high layer에서는 dissimilar함. UCL의 loss landscape이 더 smooth 함.
  - Test 단계에서 classifying은 KNN을 사용한다고 하는데, 어떻게 사용한건지 아직 제대로 살펴보진 않았음
- [ ] [Fini, Enrico, et al. "Self-Supervised Models are Continual Learners." arXiv preprint arXiv:2112.04215, 2021.](https://arxiv.org/pdf/2112.04215.pdf)
- [ ] [Zhou, Minghao, et al. "Diagnosing Batch Normalization in Class Incremental Learning." arXiv preprint arXiv:2202.08025, 2022.](https://arxiv.org/abs/2202.08025)
  - Training batch에 new class만 존재해야 better normalization & representation 학습 가능하지만, 이러면 모델이 BN discrepancy에 의해 편향됨. 이를 BN dilemma라고 함
  - BN dilemma를 해소하기 위해서 BN trick(BNT) 방법을 제안
  - EMA update는 $B_b$ (balanced batch)로 하고, parameter update는 $B_t, B_\mathcal{M}$를 가지고 EMA update 없이 joint training
- [x] [Pham, Quang, Chenghao Liu, and H. O. I. Steven. "Continual normalization: Rethinking batch normalization for online continual learning." ICLR 2022.](https://openreview.net/forum?id=vwLLQ-HwqhZ)
  - Previous task에 대한 inference 상황에서 current task에 biased된 moments를 사용하게 되는 현상을 cross-task normalization effect라고 함
  - BN을 continual learning task에 단순히 사용하는 경우에 이런 cross-task normalization effect가 존재하기 때문에, GN과 같이 cross-task normalization effect 없는 method도 같이 사용하자는 것이 논문의 아이디어. 즉, mini-batch와 spatial normalization 사이에 balancing이 continual learning 에서의 normalization에 중요하다고 주장
  - SwithNorm이나 TaskNorm과 같이 BN, LN, IN, GN 등의 blending weight 형태보다 GN -> BN (=CN)의 형태가 더 좋다고 주장
- [x] [Cha, Sungmin, et al. "Task-Balanced Batch Normalization for Exemplar-based Class-Incremental Learning." arXiv preprint arXiv:2201.12559, 2022.](https://arxiv.org/abs/2201.12559)
  - Exemplar-based CIL에 대해, task-balaneced $\mu$ & $\sigma^2$ 계산 방법과 affine transformation parameter를 덜 편향되게 하는 계산법을 제안함
  - Task-balanced $\mu$ & $\sigma^2$ calculation: current biased 되지 않도록 reshape과 repeat 연산을 사용한 새로운 $\mu$ & $\sigma^2$ 계산 방법 제안
- [ ] [Skorokhodov, Ivan, and Mohamed Elhoseiny. "Class Normalization for (Continual)? Generalized Zero-Shot Learning." ICRL 2021.](https://openreview.net/forum?id=7pgFL2Dkyyy)
  - ZSL에서 자주 사용되는 'normalize+scale'(NS) 방법과 'attributes normalization'(AN) 방법의 한계점을 언급하며 이를 개선한 CN 제안
  - NS와 AN이 잘 되는 이유에 대한 informal한 분석/의견을 내놓으면서 이를 바탕으로 CN을 제안하는 과정이 매끄러움. 이 점 덕분에 accept이 되었다고 생각함
- [ ] [Zhu, Fei, et al. "Class-Incremental Learning via Dual Augmentation." NeurIPS 2021.](https://proceedings.neurips.cc/paper/2021/file/77ee3bc58ce560b86c2b59363281e914-Paper.pdf)
- [x] [Zhou, Da-Wei, et al. "Forward compatible few-shot class-incremental learning." CVPR 2022.](https://arxiv.org/pdf/2203.06953.pdf)
- [ ] [Shibhansh Dohare, et al. "Loss of Plasticity in Deep Continual Learning"](https://arxiv.org/pdf/2306.13812.pdf)
  - [발표 영상 1](https://www.youtube.com/watch?v=p_zknyfV9fY), [발표 영상 2](https://www.youtube.com/watch?v=oA_XLqh4Das)
  - 기존 CL 연구들은 catastrophic forgetting 막는것만 집중했는데 사실 CL 세팅은 새로운 지식 학습하는 능력에도 영향을 미침
  - CL에서 L2 regularization & [shrink-and-perturb](https://arxiv.org/pdf/1910.08475.pdf) 적절히 조정해주는게 plasticity(새로운 지식을 배우는 능력)에 도움됨
  - CL 학습시 일부 dead neuron을 reinitialize해주는 방식 사용한게 도움됨 (continual backpropagation)
- [x] [Ash, Jordan, and Ryan P. Adams. "On warm-starting neural network training." NeurIPS 2020.](https://proceedings.neurips.cc/paper/2020/hash/288cd2567953f06e460a33951f55daaf-Abstract.html)
  - 어떠한 지식을 배운 후, 해당 weight으로 유사한 지식을 학습하는 것을 warm start라고 하는데, 이는 (최종 training loss는 비슷하더라도) random initialzation으로 부터 다시 학습하는 것 보다 더 안 좋은 일반화 성능을 가짐. 본 논문에서는 이 현상이 왜 일어나는지 분석하고, 이를 극복할 수 있는 몇 가지 트릭을 제안 
  - 사전 실험: warm start의 generalization gap - 데이터 셋 절반을 미리 학습하고, 이에 대해 random init와 warm start 비교해봤을 때 warm start가 못함. Convection approach의 경우, 어떤 하이퍼파라미터 튜닝을 하던지 warm start가 항상 random init 보다 좋지 않음
  - 따라서 Shrink, Perturb, Repeat라는 방식 제안: (1) 이전 학습된 weight을 zero 방향으로 줄이고 (shrink), (2) paramter noise를 삽입. 즉, $\theta_i^t \leftarrow \lambda \theta_i^{t-1}+p^t \text {, where } p^t \sim \mathcal{N}\left(0, \sigma^2\right) \text { and } 0<\lambda<1 \text {. }$
  - 해당 방법을 pre-training, continual active learning, batch online-learning 등에서 다양하게 활용 가능

### Domain Generalization

- [ ] [Cha, Junbum, et al. "Swad: Domain generalization by seeking flat minima." NIPS 2021.](https://proceedings.neurips.cc/paper/2021/hash/bcb41ccdc4363c6848a1d760f26c28a0-Abstract.html)
- [ ] [Fan, Xinjie, et al. "Adversarially adaptive normalization for single domain generalization." CVPR 2021.](http://openaccess.thecvf.com/content/CVPR2021/html/Fan_Adversarially_Adaptive_Normalization_for_Single_Domain_Generalization_CVPR_2021_paper.html)
- [ ] [Volpi, Riccardo, et al. "Continual Adaptation of Visual Representations via Domain Randomization and Meta-learning." CVPR 2021.](https://arxiv.org/pdf/2012.04324.pdf)
- [x] [Zhou, Zhi, et al. "ODS: Test-Time Adaptation in the Presence of Open-World Data Shift." ICML 2023.](https://openreview.net/pdf?id=Phjti0QbkZ) 

### Unsupervised Learning / Self-Supervised Learning

- [x] [Grill, Jean-Bastien, et al. "Bootstrap your own latent: A new approach to self-supervised learning." NIPS 2020.](https://arxiv.org/abs/2006.07733)
- [ ] [Kolesnikov, Alexander, Xiaohua Zhai, and Lucas Beyer. "Revisiting self-supervised visual representation learning." CVPR 2019.](https://openaccess.thecvf.com/content_CVPR_2019/html/Kolesnikov_Revisiting_Self-Supervised_Visual_Representation_Learning_CVPR_2019_paper.html)
- [ ] [Tian, Yuandong, Xinlei Chen, and Surya Ganguli. "Understanding self-supervised Learning Dynamics without Contrastive Pairs." arXiv preprint arXiv:2102.06810, 2021.](https://arxiv.org/abs/2102.06810)
- [ ] [Kevin Lu, et al. "Pretrained Transformers as Universal Computation Engines." arXiv preprint arXiv:2103.05247, 2021](https://arxiv.org/abs/2103.05247?fbclid=IwAR3T_ZxXT0bmygQnpbWdPy_9_ilNR9nrCbALNgc6EffsXAevguFxQ_myPFE)
- [ ] [Goyal, Priya, et al. "Self-supervised Pretraining of Visual Features in the Wild." arXiv preprint arXiv:2103.01988, 2021.](https://arxiv.org/abs/2103.01988)
- [ ] [Caron, Mathilde, et al. "Unsupervised learning of visual features by contrasting cluster assignments." NeurIPS 2020.](https://proceedings.neurips.cc/paper/2020/file/70feb62b69f16e0238f741fab228fec2-Paper.pdf)
  - 저자의 논문 설명 영상은 [이곳](https://www.youtube.com/watch?v=7QmsTleiRLs)에서 확인할 수 있음
  - Key idea: Train an embedding with consistent cluster(prototypes) assignments between views of the same image
  - Constraint: All prototypes are selected the same amount of time. 그래야 모든 sample이 하나의 cluster에만 할당되는 것을 방지할 수 있음. Objective 식에서는 $\max H(\mathbf{Q})$ 형태의 regularizer로 표현됨 (모든 cluster에 균등하게 할당되는 경우에 entropy기 maximize 되기 때문)
  - Problem: $\max _{\mathbf{Q} \in \mathcal{Q}} \operatorname{Tr}\left(\mathbf{Q}^{\top} \mathbf{C}^{\top} \mathbf{Z}\right)+\varepsilon H(\mathbf{Q})$ 
    - Where $\mathbf{Q}$ is the mapping matrix, $\mathbf{C}$ are prototypes, and $\mathbf Z$ are feature vectors
  - Solution: Sinkhorn-Knopp algorithm $\mathbf{Q}^*=\operatorname{Diag}(\mathbf{u}) \exp \left(\frac{\mathbf{C}^{\top} \mathbf{Z}}{\varepsilon}\right) \operatorname{Diag}(\mathbf{v})$
    - Where $\mathbf u$ and $\mathbf v$ are renormalization vectors in $\mathbb R^K$ and $\mathbb R^B$ respectively

### Semi-Supervised Learning

- Generative model: Gaussian mixture, Deep generative models
- Graph based: Label propagation
- Self-training: Pseudo labelling, Co-training
- Consistency regularization: Pi-model, Mean teacher
- [x] [Pham, Hieu, et al. "Meta pseudo labels." CVPR 2021.](https://openaccess.thecvf.com/content/CVPR2021/html/Pham_Meta_Pseudo_Labels_CVPR_2021_paper.html)
- [x] [Zhou, Zhi-Hua, and Ming Li. "Semi-supervised regression with co-training." IJCAI 2005.](https://cs.nju.edu.cn/zhouzh/zhouzh.files/publication/ijcai05.pdf)
  - 두 개의 kNN regressor를 사용하여 co-training 진행
  - Sufficient and redundant view를 위해서 두 regressor의 metric은 p=2 Minkowsky와 p=5 Minkowsky로 서로 다르게 설정함 
  - Key mechanism은 regression에서 confidence를 만들어내는 작업이었고, $x_u$가 추가됨에 따라서 MSE가 얼마나 개선되는지를 계산하여($\vartriangle_u$) 이 값이 제일 커지는 $x_u$에 대해 confidence가 높다고 판단하여 해당 $x_u$에 pseudo label을 부여
- [ ] [Jean, Neal, Sang Michael Xie, and Stefano Ermon. "Semi-supervised Deep Kernel Learning: Regression with Unlabeled Data by Minimizing Predictive Variance." NIPS 2018.](https://par.nsf.gov/servlets/purl/10080181)
- [ ] [Berthelot, David, et al. "Mixmatch: A holistic approach to semi-supervised learning." NeurIPS 2019.](https://proceedings.neurips.cc/paper/2019/hash/1cd138d0499a68f4bb72bee04bbec2d7-Abstract.html)

  1. Unlabel data에 대해서 $K$개의 stochastic augmentation 수행 후 이를 모델에 입력
  2. 모델이 뱉은 $K$개의 probability 출력을 평균 낸 뒤에, temperature scailing을 통해 entropy minimization(sharpening) 수행. 그리고 이 값 $p$를 $K$개의 unlabelled data가 공유
     - 배치 내에서 Labelled data는 $B$개, Unlabelled data는 $B*K$개 존재하게 됨
  3. 총 $B*(K + 1)$ 개의 데이터를 섞은 뒤에 Labelled data $B$개, Unlabelled data $B*K$개와 각각 Mixup
     - 이 때, mixup $\lambda' = \max(\lambda, 1-\lambda)$는 항상 0.5 이상이 나오도록 설정하여, labelled mixup data는 labelled data에 dominant 하고, unlabelled mixup data는 unlabelled data에 dominant 하도록 강제함
  4. Labelled mixup data로는 CE loss 계산, Unlabelled mixup data로는 Consistency loss 계산
- [ ] [Berthelot, David, et al. "ReMixMatch: Semi-Supervised Learning with Distribution Matching and Augmentation Anchoring." ICLR 2020.](https://openreview.net/pdf?id=HklkeR4KPB)
  - Distribution Alignment: Unlabelled data의 예측 분포를 labelled data의 분포로 normalize. 즉, 기존 prediction $q$에 unlabelled data 분포의 running average로 나누고 labelled data 분포의 running average로 곱해줌.
  - Augmentation Anchoring
- [ ] [Sohn, Kihyuk, et al. "Fixmatch: Simplifying semi-supervised learning with consistency and confidence." NeurIPS 2020.](https://proceedings.neurips.cc/paper/2020/file/06964dce9addb1c5cb5d6e3d9838f733-Paper.pdf)
  - Labelled image: Weakly augmented image 사용해서 cross entropy
  - Unlabelled image: Weakly augmented image에 대해서 threshold를 넘는 경우에 이 예측의 one-hot encoding을 strong augmented image의 pseudo label로써 사용. Threshold를 넘지 못하는 경우에는 loss에 포함시키지 않음
    - 원래는 temperatured scaling해서 pseudo label하였으나, temperature를 0으로 했을 때 잘 나왔다고 함 (이 경우 one-hot encoding과 동일)
- [x] [Li, Xinzhe, et al. "Learning to self-train for semi-supervised few-shot classification." NeurIPS 2019.](https://proceedings.neurips.cc/paper/2019/hash/bf25356fd2a6e038f1a3a59c26687e80-Abstract.html)
  - Few-shot SSL (SSFSC)을 위해, unlabeled data에 pseudo-label(self-training)할 데이터 선정하는 방법 고안
  
  - Noisy label에 의해 좋지 않은 방향으로 optimize되는 영향을 줄이기 위해서, soft weighting network(SWN) 모듈을 추가
  - 전체 과정은 아래와 같음
    1. [Cherry picking stage 1.] Pseudo labeling 할 unlabeled data를 class 마다 top Z개 씩 선정
    2. [Cherry picking stage 2.] SWN을 사용하여 선정된 unlabeled sample에 soft label 할당: top Z sample을 class-wise prototype과 concatenate하여 RelationNet 형태의 SWN에 넣고, output으로 나온 soft value 획득
    3. Soft-labeled pseudo samples와 support set 기반으로 모델 inner update
    4. Inner-updated된 모델에 대해서 query loss를 뽑고, 모델을 meta-update
  - 모델 초기 파라미터는 previous SOTA method인 MTL(meta transfer learning) pre-trained model을 그대로 사용하며, 해당 pre-trained model을 학습 시작점으로 사용. 그 뒤에 오로지 classifier weight만 meta-update함 (freezing the feature extractor)
- [ ] [Baixu Chen, et al. "Debiased Self-Training for Semi-Supervised Learning." NeurIPS 2022.](https://openreview.net/pdf?id=NI7moUOKtc)
  - Data bias와 Training bias란?:
  - Training bias를 줄이기 위한 방법: 
  - Data bias를 줄이기 위한 방법: 
- [x] [Mingcai Chen, et al. "Semi-supervised learning with multi-head co-training." AAAI 2022.](https://ojs.aaai.org/index.php/AAAI/article/view/20577)
  - 2개 이상의 model(backbone)이 요구되는 기존 co-training 방식과 달리, 본 논문은 backbone은 하나로 두고 classification head만 여럿으로 두어 co-training 수행
  - Weakly augmented sample을 여러 head에 전달 한 뒤에, 타겟이 되는 head를 제외한 나머지 head의 출력을 타겟 head의 pseudo-label로 사용
  - 그리고 Strong augmented sample을 타겟 head에 전달하여 나온 출력과 pseudo-label 사이의 cross-entropy 기반으로 loss 계산

### Open-Set Recognition

- Novelty Detection (ND) = One-Class Classification: Known class와 unknown class를 binary classification
- Open-Set Recognition (OSR): Known에 대한 closed-set classification과 unknown class detect를 동시에 수행
- Out-of-Distribution Detection (OOD): OSR과 유사하며, unknown class(outlier)가 더 넓은 도메인까지도 존재
- Anomaly Detection (AD): 학습 데이터가 모두 unlabeled. 즉, unsupervised learning 상황

- [ ] [Saito, Kuniaki, Donghyun Kim, and Kate Saenko. "OpenMatch: Open-set Consistency Regularization for Semi-supervised Learning with Outliers." NeurIPS 2021.](https://arxiv.org/abs/2105.14148)
  - Open-set semi-supervised learning(OSSL) task를 풀기 위한 알고리즘
- [x] [Vaze, Sagar, et al. "Open-Set Recognition: A Good Closed-Set Classifier is All You Need." ICLR 2022.](https://openreview.net/pdf?id=5hLP5JY9S2d)
  - Close-set classification을 잘하면 OSR도 잘한다는 것을 보인 논문 (이 두 performance 사이에 positive correlation이 존재한다)
  - 따라서 아주 기본적인 Maximum Softmax Probability (MSP) OSR 알고리즘만 사용해도, feature extractor 성능만 높으면 기존의 SOTA와 동일하거나 더 높은 성능을 얻을 수 있음
  - 해당 논문에서, softmax가 아닌 그 직전 값인 logit을 활용한 Maximum Logit Score (MLS) 방법과, Semantic Shift Benchmark (SSB) split도 추가적으로 제안하였음
- [ ] [Chen, Guangyao, et al. "Adversarial reciprocal points learning for open set recognition." TPAMI 2021.](https://arxiv.org/abs/2103.00953)
  -  Porototype은 target class를 대표하는 벡터라면, reciprocal point는 non-target class를 대표하는 벡터임
  - Unlabeled data가 존재할 수 있는 공간을 bounding 함


### Metric Learning

- [ ] [Khosla, Prannay, et al. "Supervised contrastive learning." NIPS 2020.](https://proceedings.neurips.cc/paper/2020/hash/d89a66c7c80a29b1bdbab0f2a1a94af8-Abstract.html)
- [ ] [Sohn, Kihyuk. "Improved deep metric learning with multi-class n-pair loss objective." NIPS 2016.](https://proceedings.neurips.cc/paper/2016/hash/6b180037abbebea991d8b1232f8a8ca9-Abstract.html)
- [ ] [He, Xinwei, et al. "Triplet-center loss for multi-view 3d object retrieval." CVPR 2018.](https://openaccess.thecvf.com/content_cvpr_2018/html/He_Triplet-Center_Loss_for_CVPR_2018_paper.html)
- [ ] [Wu, Zhirong, et al. "Unsupervised feature learning via non-parametric instance discrimination." CVPR 2018.](https://openaccess.thecvf.com/content_cvpr_2018/html/Wu_Unsupervised_Feature_Learning_CVPR_2018_paper.html)

### Normalization Methods

- [ ] [Lubana, Ekdeep S., Robert Dick, and Hidenori Tanaka. "Beyond BatchNorm: towards a unified understanding of normalization in deep learning." NeurIPS 2021.](https://proceedings.neurips.cc/paper/2021/hash/2578eb9cdf020730f77793e8b58e165a-Abstract.html)
- [ ] [Ergen, Tolga, et al. "Demystifying batch normalization in relu networks: Equivalent convex optimization models and implicit regularization." ICLR 2022.](https://arxiv.org/pdf/2103.01499.pdf)
- [x] [Brock, Andrew, Soham De, and Samuel L. Smith. "Characterizing signal propagation to close the performance gap in unnormalized ResNets." ICLR 2021.](https://arxiv.org/pdf/2101.08692.pdf)
- [x] [Brock, Andy, et al. "High-performance large-scale image recognition without normalization." ICML 2021.](http://proceedings.mlr.press/v139/brock21a/brock21a.pdf)

### Novel Category Discovery

- [ ] [Han, Kai, Andrea Vedaldi, and Andrew Zisserman. "Learning to discover novel visual categories via deep transfer clustering." ICCV 2019.](https://arxiv.org/pdf/1908.09884.pdf)

- [x] [Han, Kai, et al. "Automatically Discovering and Learning New Visual Categories with Ranking Statistics." ICLR 2020.](https://openreview.net/forum?id=BJl2_nVFPB)

- [x] [Han, Kai, et al. "Autonovel: Automatically discovering and learning novel visual categories." TPAMI 2021.](https://ieeexplore.ieee.org/abstract/document/9464163/)

  1. Self-supervised pre-training on labelled and unlabelled data using RotNet loss (training $\Phi$)
  2. Supervised training on labelled data using CE loss (training the head $\eta^l$ and the last micro-block of $\Phi$)
  3. Training on pseudo-labelled data with ranking statisitics using BCE loss (training the head $\eta^u$ and the last micro-block of $\Phi$)

  - 2번과 3번 joint training 수행. 하지만 3번이 매 epoch마다 다르게 pseudo-labelled 되어 학습의 불안정을 유발하므로, MSE를 consistency cost로써 추가 (자세한 식은 논문 참고)

- [ ] [Chi, Haoang, et al. "Meta discovery: Learning to discover novel classes given very limited data." ICLR 2022.](https://openreview.net/pdf?id=MEpKGLsY8f)

  - Learning to discover novel classes(L2DNC) task에 대해서 이전 가정이 이론적으로 잘못되었다는 것을 증명하고, 이론적으로 가능한 L2DNC 상황을 재정립함. 이와 더불어 더 실생활과 관련있는 few novel observation 상황을 가정하여, L2DNCL task를 정의함.
  - 재정립한 L2DNCL이 meta-learning의 가정과 유사하여 MAML, ProtoNet의 아이디어를 차용한 MM, MP를 제안함.
  - Meta-learning에 L2DNCL를 접목할 수 있도록 Clustering-rule-aware Task Sampler(CATA)를 제안함.

- [x] [Zhong, Zhun, et al. "Neighborhood Contrastive Learning for Novel Class Discovery." CVPR 2021.](http://openaccess.thecvf.com/content/CVPR2021/html/Zhong_Neighborhood_Contrastive_Learning_for_Novel_Class_Discovery_CVPR_2021_paper.html)

  - Ranking Statistics(RS) 방법에 NCL, SCL, HNG 총 세 개의 방법을 더 추가한 논문. 다만 ranking statistics를 사용하여 pseudo-labelling 하지 않고, cosine similarity 기준으로 pseudo-labelling 수행
  - Neighborhood Contrastive Learning(NCL): Unlabelled dataset을 위한 loss. Self-supervised contrastive loss와 더불어, similarity가 높은 $k$ 개의 feature를 positive라고 labelling해서 contrastive loss를 추가적으로 계산. $\ell_{n c l}=\alpha \ell_{\left(z^{u}, \hat{z}^{u}\right)}+(1-\alpha) \ell_{\left(z^{u}, \rho_{k}\right)}$
  - Supervised Contrastive Learning(SCL): Labelled dataset을 위한 loss. 기존 supervised-contrastive loss와 동일
  - Hard-Negative Generation(HNG): True negative(labelled dataset)와 easy negative(unlabelled dataset)를 interpolate 한 것 중에서 제일 유사도 높은 $k$ 개를 hard negative로 사용 
  
- [x] [Bhattacharjee, Supritam, Devraj Mandal, and Soma Biswas. "Multi-class novelty detection using mix-up technique." WACV 2020.](https://openaccess.thecvf.com/content_WACV_2020/html/Bhattacharjee_Multi-class_Novelty_Detection_Using_Mix-up_Technique_WACV_2020_paper.html)

  - Test query를 novel class와 mixup하면 output prediction 값이 낮고, base class와 mixup하면 output prediction 값이 특정 하나의 class에 대해 높을 것이라 가정
  - Open-set recognition task에서 자주 사용되는 K개의 sigmoid classifier 사용
  - Class 마다 N개의 exemplar 이미지를 가지고, 해당 이미지와 test query의 mixed 샘플 output 확인. N개의 output을 평균내어 이를 membership score라는 이름으로 정의
  
- [ ] [Joseph, K. J., et al. "Novel Class Discovery without Forgetting." ECCV 2022.](https://arxiv.org/abs/2207.10659)

  - NCD, GCD의 advanced setting인 NCD without Forgetting을 제안함
  - GCD 세팅과, base data training 이후에 base data에 대한 접근이 제한된다는 점이 차이점 (GCD 보다 더 어려운 task)
  - Pseudo-latent, Mutual information based regularizer, Known Class Indentifier라는 방법들을 통해 NCDwF를 해결하는데, 아직 자세히 이해하지는 못했음

- [x] [Fini, Enrico, et al. "A unified objective for novel class discovery." ICCV 2021.](https://openaccess.thecvf.com/content/ICCV2021/papers/Fini_A_Unified_Objective_for_Novel_Class_Discovery_ICCV_2021_paper.pdf)

  - 기존 multi-step approach와 달리 (Labeled data를 활용한 supervised learning 혹은, self-supervised pre-training 이후에 unlabeled data로 transfer clustering하는 접근 방법), 처음부터 모든 objective를 하나의 step에 합쳐 학습하는 방법을 제안하였고 좋은 성능을 기록함
  - UNO 논문을 읽는 것 보다 SwAV 논문을 읽는 것이 UNO 알고리즘을 이해하는 데에 더 도움이 되니 참고하기
  - 논문 내에서 새롭게 제안하는 방법론이 없는데도 (task는 달라지긴 했지만) oral paper로 선정된 것이 조금 놀라움 (기존에 있는 방법들을 NCD에 적합하게 잘 엮은 논문임)

### Generalized Category Discovery

- [x] [Vaze, Sagar, et al. "Generalized Category Discovery." CVPR 2022.](https://arxiv.org/pdf/2201.02609.pdf)

  - Generalized Category Discovery라는 task를 처음으로 정의한 논문
  - Main algorithm: ViT DINO pretraining, Supervised contrastive learning + Self-supervised contrastive learning, Semi-supervised k-means clustering(using k-means++)의 순서로 알고리즘 구성
  - Class number estimation method: Brent's method 사용
  - Strong baselines: RS와 UNO에서 labelled dataset와 unlabelled dataset에 대한 classification head가 두 개로 나뉘어 존재하던 것을 하나로 합침. Backbone은 저자들이 제안한 ViT구조를 그대로 사용하였는데, backbone을 finetuning하는 것은 오히려 성능이 좋지 않아서, backbone은 freeze하고 classification head만 tuning하였음

- [x] [Fei, Yixin, et al. "XCon: Learning with Experts for Fine-grained Category Discovery." arXiv preprint arXiv:2208.01898 (2022).](https://arxiv.org/abs/2208.01898)

  - Fine-grained dataset에 대해서, class-irrelevant cues(e.g. background, object pose) 위주로 clustering 되는 경향이 있음
  - 따라서 이를 해결하기 위해 dataset을 먼저 k-means clustering 하고(그러면 class-irrelevant cues 비슷한 것 끼리 얼추 모임), 이 data split에 대해 각각 contrastive learning을 수행하면 class-irrelevant cues로 인한 부정적인 영향을 줄일 수 있음
- [x] [Cao, Kaidi, Maria Brbic, and Jure Leskovec. "Open-world semi-supervised learning." ICLR 2022.](https://openreview.net/pdf?id=O-r8LOR-CCA)

  - Novel Category Discovery를 traditional SSL로 일반화한 Open-World Semi-Supervised Learning 세팅을 처음으로 제안 (Generalized Category Discovery와 동일한 세팅)
  - Unlabeled data의 uncertainty를 기반으로 known(seen) class의 intra-class를 조절하면서 학습하는 end-to-end 알고리즘인 ORCA를 제안
    - e.g., Unlabeled data의 uncertainty가 낮은 경우에, labeled data를 fully exploit
    - 이 과정을 통해 known class에 대한 discriminative representation learning이 novel class 대비 너무 빠르게 진행되지 않도록 강제함
  - Supervised objective w. uncertainty adaptive margin, Pairwise objective, Regularization term, 총 3개의 주요 objectives로 이루어져있음
    - Supervised objective w. uncertainty adaptive margin: $
        \mathcal{L}_{\mathrm{S}}=\frac{1}{n} \sum_{z_i \in \mathcal{Z}_l}-\log \frac{e^{s\left(W_{y_i}^T \cdot z_i+\lambda \bar{u}\right)}}{e^{s\left(W_{y_i}^T \cdot z_i+\lambda \bar{u}\right)}+\sum_{j \neq i} e^{s W_{y_j}^T \cdot z_i}}
        $ where uncertainty $\bar{u}=\frac{1}{\left|\mathcal{D}_u\right|} \sum_{x_i \in \mathcal{D}_u} 1-\max _k \operatorname{Pr}\left(Y=k \mid X=x_i\right)$
    - Pairwise objective: $
        \mathcal{L}_{\mathrm{P}}=\frac{1}{m+n} \sum_{\substack{z_i, z_i^{\prime} \in
        \left(\mathcal{Z}_l \cup \mathcal{Z}_u, \mathcal{Z}_l^{\prime} \cup \mathcal{Z}_u^{\prime}\right)}}-\log \left\langle\sigma\left(W^T \cdot z_i\right), \sigma\left(W^T \cdot z_i^{\prime}\right)\right\rangle
        $
    - Regularization term: $\mathcal{R}=K L\left(\frac{1}{m+n} \sum_{z_i \in \mathcal{Z}_l \cup \mathcal{Z}_u} \sigma\left(W^T \cdot z_i\right) \| \mathcal{P}(y)\right)$
- [x] [Rizve, Mamshad Nayeem, et al. "OpenLDN: Learning to Discover Novel Classes for Open-World Semi-Supervised Learning." ECCV 2022.](https://arxiv.org/pdf/2207.02261.pdf)
  1. Pairwise loss, cross entropy, rgularization 기반으로 novel class를 discovering하기 위한 OpenLDN 알고리즘 수행
  2. 모든 파라미터를 다 초기화한 뒤에, OpenLDN으로 얻어낸 novel pseudo label 기반으로 closed-SSL 다시 수행 (MixMatch와 UDA 사용)
  3. Novel pseudo label이 학습이 진행됨에 따라 개선되도록 하기 위해서 iterative pseudo labeling 전략 사용
- [x] [Xin Wen, et al. "A Simple Parametric Classification Baseline for Generalized Category Discovery." Under review.](https://arxiv.org/abs/2211.11727)
  - GCD setting에서 기존 parametric classifier가 실패했던 이유를 찾아내고(less discriminative representation & unreliable pseudo-labeling strategy), 이를 기반으로 기존 알고리즘을 수정하여, parametric classifier로 SOTA 성능을 달성함
  - 결론적으로는, GCD의 representation learning 방식(self-supervised & superivsed contrastive learning)에서 "parametric classification" 관련 objective만 추가되었음. 그리고 non-parametric clustering은 사용하지 않음 (논문 내 section 4.2.만 읽으면 됨)
  - 실험에 앞서 발견한 인사이트들
    1. Classifier: class-mean classifier보다 parametric (linear, cosine) classifier가 더 좋음
    2. Representation: Projector를 거친 representation보다, backbone에서 나온 representation을 바로 사용하는 것이 더 좋음
    3. Decoupling(GCD) vs. Joint training(UNO): UNO의 성능이 낮았던 것은 UNO의 방식이 'self-label' 방식이었기 때문임. 'self-distill'(section 4.2.) 방식으로 수정하면 GCD보다 더 좋은 성능을 보임
  - Self-distill: 2개의 different view에 대한 모델 예측을 출력한 뒤에, 하나의 출력에 sharpening을 가하여 다른 출력의 pseudo label로써 사용 (부가적으로 dead prototype을 만들지 않기 위한 entropy regularization term도 추가)
- [ ] [Sheng Zhan, et al. "PromptCAL: Contrastive Affinity Learning via Auxiliary Prompts for Generalized Novel Category Discovery." Under review.](https://openreview.net/pdf?id=yVcLmMW5ySI)
  - Multi-Prompt Clustering (MPC)를 활용하여 representation의 warm-up process 거침. $L_1(\boldsymbol{x})=L_{\mathrm{semi}}^{\mathrm{CLS}}(\boldsymbol{z})+\gamma L_{\mathrm{semi}}^{\mathrm{CLU}}\left(\overline{\boldsymbol{z}}_{\mathrm{CLU}}\right)$ 식에서 $L_{\mathrm{semi}}^{\mathrm{CLS}}(\boldsymbol{z})$는 GCD의 contrastive learning과 동일하지만 매 layer마다 prompt weight이 추가되었다는 점만 다르고, $L_{\mathrm{semi}}^{\mathrm{CLU}}\left(\overline{\boldsymbol{z}}_{\mathrm{CLU}}\right)$는 [CLU] prompt 대상으로 contrastive learning을 수행한다는 점이 특징임
  - Semi-supervised affinity generration (SemiAG) 활용하여 pseudo-positive 선정을 위한 affinity graph 생성. Graph diffusion method를 사용하여 label을 각 노드로 퍼뜨리는데, 이 때 동일한 class 사이의 edge weight은 1, 다른 class 사이의 edge weight은 0으로 초기화 함
  - 모든 데이터셋에 대한 affinity graph를 매번 계산할 수 없으니 graph sampling 기법을 활용하며, 이렇게 샘플링된 graph를 활용하여 contrastive affinity learning (CAL) 수행
  - Fine-grained dataset에 대한 성능이 매우 좋다는 점에 주목할만 함
- [ ] [Florent Chiaroni, et al., "Mutual Information-based Generalized Category Discovery." Under review.](https://arxiv.org/pdf/2212.00334.pdf)
  - Entropy $\mathcal H(Y)$, Conditional entropy $\mathcal H(Y|Z)$, Cross entropy를 사용하여 모델을 튜닝
  - Conditional entropy를 줄이는 것은 모델이 confident prediction을 출력하도록 유도하며, entropy term은 예측에 대한 class balance를 맞추는 데에 도움이 됨
- [ ] [Bingchen Zhao, et al., "Generalized Category Discovery via Adaptive GMMs without Knowing the Class Number." Under review.](https://openreview.net/pdf?id=oQjWltREeRA)
  - E-step: Semi-supervised k-means 수행하여 GMM의 class number와 prototype 추정
  - M-step: 추정한 class number와 prototypes 기반으로 prototypical contrastive learning 수행
  - M-step의 prototypical contrastive learning 식 자체는 prototype을 classifier로 사용하는 softmax cross-entropy와 다를 바 없어보임

### Data Augmentation

- [ ] [Zhang, Hongyi, et al. "mixup: Beyond Empirical Risk Minimization." ICLR 2018.](https://openreview.net/pdf?id=r1Ddp1-Rb)
- [x] [Yun, Sangdoo, et al. "Cutmix: Regularization strategy to train strong classifiers with localizable features." ICCV 2019.](https://openaccess.thecvf.com/content_ICCV_2019/html/Yun_CutMix_Regularization_Strategy_to_Train_Strong_Classifiers_With_Localizable_Features_ICCV_2019_paper.html)
- [x] [Verma, Vikas, et al. "Manifold mixup: Better representations by interpolating hidden states." ICML 2019.](https://proceedings.mlr.press/v97/verma19a.html)
  - 기존 Input-spcae mixup과 달리 itermediate layer의 representation을 mixup하는 방법
  - $\left(\tilde{g}_{k}, \tilde{y}\right):=\left(\operatorname{Mix}_{\lambda}\left(g_{k}(x), g_{k}\left(x^{\prime}\right)\right), \operatorname{Mix}_{\lambda}\left(y, y^{\prime}\right)\right)$
  - SVD 했을 때 eigenvalue가 전체적으로 작아지는 효과를 가짐. 즉, principal components 수가 작아지는 효과 (flattening)
  - Flattening을 통해 eigenvalue가 전체적으로 작아지니 volume이 작아지며, compression은 information theory 관점에서 이론적, 실험적으로 generalization과 연관이 있어 장점을 가짐
- [ ] [Lim, Soon Hoe, et al. "Noisy feature mixup." ICLR 2022.](https://openreview.net/pdf?id=vJb4I2ANmy)
- [ ] [Wen, Yeming, et al. "Combining Ensembles and Data Augmentation Can Harm Your Calibration." ICLR 2021.](https://openreview.net/forum?id=g11CZSghXyY)

### Object Detection
- [x] [Zhu, Xizhou, et al. "Deformable DETR: Deformable Transformers for End-to-End Object Detection." ICLR 2021.](https://arxiv.org/abs/2010.04159) 
- [x] [Carion, Nicolas, et al. "End-to-end object detection with transformers." ECCV  2020.](https://link.springer.com/chapter/10.1007/978-3-030-58452-8_13)
- [ ] [Dai, Jifeng, et al. "Deformable convolutional networks." ICCV 2017.](http://openaccess.thecvf.com/content_iccv_2017/html/Dai_Deformable_Convolutional_Networks_ICCV_2017_paper.html)
- [ ] [Tian, Zhi, et al. "Fcos: Fully convolutional one-stage object detection." ICCV 2019.](https://openaccess.thecvf.com/content_ICCV_2019/html/Tian_FCOS_Fully_Convolutional_One-Stage_Object_Detection_ICCV_2019_paper.html)
  - Object detection을 per-pixel prediction으로 재정의함. 따라서, 모델 예측이 pixel 단위로 수행되며, pixel 단위로 class 예측과 bbox 예측(그리고 centerness 예측)을 뱉음. Per-pixel prediction으로 정의하다보니, regressor 학습하는데 있어서 매우 많은 forground sample을 사용하는 효과낼 수 있음
  - FPN 사용하고, multi-level feature에 shared head 활용해서 예측 뱉음
  - 현재 픽셀이 물체 중심과 얼마나 가까운지 예측하는 centerness loss도 추가하여 학습. Inference time에서는 classification socre와 곱하여 자연적으로 low quality prediction을 걸러낼 수 있었고, 또한 이후에 NMS 까지 한번 더 거치면 최종 bbox 예측 얻을 수 있음

### Image Segmentation

- [ ] [Zhi Tian, et al., "Boxinst: High-performance instance segmentation with box annotations," CVPR 2021.](https://openaccess.thecvf.com/content/CVPR2021/html/Tian_BoxInst_High-Performance_Instance_Segmentation_With_Box_Annotations_CVPR_2021_paper.html)
- [ ] [Meta AI Research, "Segment Anything," 2023](https://scontent-ssn1-1.xx.fbcdn.net/v/t39.2365-6/10000000_900554171201033_1602411987825904100_n.pdf?_nc_cat=100&ccb=1-7&_nc_sid=3c67a6&_nc_ohc=YLTtOW2cPwwAX_Yy2Sd&_nc_ht=scontent-ssn1-1.xx&oh=00_AfB4YsQnTr0-I00xt5Q9W1P6Qbe_M9ey4Y1zBP7vvmRbLA&oe=643500E7)
  - Image segmentation에 대한 foundation model 개발
  - SAM은 interactive segmentation 방식(mask 수정을 사람이 반복적으로 가이딩 해주는 방법)과 automatic segmentation 방식(바로 segmentation 가능하지만 많은 양의 학습 데이터 필요한 방법)의 일반화 버전. 즉, 두 방식 모두 가능하다는 것
  - Zero-shot instance segmentation 정량 평가에서는 ViTDet이 좋지만, 사람 평가에서는 SAM이 좋았음
  - Task: Promptable segmentation (for pre-training): forground, background points / boxs, masks / free-form text 등에 대한 다양한 제안이 ambiguous하게 들어오더라도, 올바른(valid) segmentation mask를 최소 하나 이상 반환해야 하는 task
    - Interactive segmentation 방식은 선행 논문들 참고
    - Forground, background points: (x, y, fg/bg)
    - Boxs, masks: (x1, y1, x2, y2)
    - Free-form text: 아직 공개되지 않음
  - Model: Segment Anything Model (SAM)
    - Image encoder: MAE pre-trained ViT
    - Prompt encoder: input points and boxes by positional encoding, free-form text with text encoder CLIP, and dense(mask) prompt are embedded by ConvNet and summed element-wise with the image embedding
    - Mask decoder: a modification of a Transformer decoder block
    - Resolving ambiguity: 애매한 prompt 대처할 수 있도록 multi-output mask 가지도록 모델 구조 수정함. 3개면 충분했고, 학습할 때 loss가 가장 작은 output만 backprop 했음
    - Losses: linear combination of focal and dice loss 20:1 
  - Data: Data engine and Dataset (SA-1B)
    - Data engine (model-in-the-loop): 처음에는 publice segmentation dataset으로 학습 (1) model assist annotator (classic interactive segmentation setup) - (2) semi-automatic annotation - (3) fully automatic mask creation
    - SA-1B: the largest ever segmentation dataset (400x more masks than any existing segmentation dataset)
- [ ] [Tian, Zhi, Chunhua Shen, and Hao Chen. "Conditional Convolutions for Instance Segmentation." ECCV 202.](https://link.springer.com/chapter/10.1007/978-3-030-58452-8_17)
  - MaskRCNN은 Fixed weights에 ROIs를 입력으로 줘서 mask 출력하는데, 만약 A, B라는 사람 instance가 매우 겹쳐진 위치에서 비슷한 특징을 가지고 있는 경우에 A에 대해 B를 배경으로 잡아야 하는데 이것 어려움.
  - CondInst: (1) ROI crop나 feature alignment 없이 ConvNet으로만 구성됨. (2) Fixed weight이 아니라 dynamically genarated ConvNet이라서 mask head 매우 컴팩트하고 빠름
  - 작동 순서는 다음과 같음
    1. 이미지 입력을 FPN에 넣어 multi-resolution feature를 뽑아냄
    2. Feature 기반으로 classification prediction과 filter parameter $\theta_{x,y}$, 그리고 center-ness output, box output를 생성. 여기서 filter parameter는 1x1 8 channel conv이고 이게 3개(conv1, conv2, conv3)임. 사실 ROI 사용 안하니까 box head는 필요 없긴 한데, box head 기반으로 NMNS하면 inference time 줄어들어서 사용함
    3. Mask branch $F_\text{mask} \in \mathbb R^{H,W,C}$에 대해 relative coord를 append한 뒤, 해당 mask feature를 $\theta_{x,y}$ 기반의 mask ConvNet head에 입력으로 넣어줌. 이 때, mask feature는 image input resolution의 1/8. 그리고 conditioning된 filter의 개수만큼의 instance가 있다고 생각하면 됨 (MaskRCNN에서는 ROI box 개수가 instance의 수를 나타냄)
    4. Loss function으로는 FCOS loss와 Mask loss 사용
- [x] [Cheng, Bowen, Omkar Parkhi, and Alexander Kirillov. "Pointly-supervised instance segmentation." CVPR 2022.](http://openaccess.thecvf.com/content/CVPR2022/html/Cheng_Pointly-Supervised_Instance_Segmentation_CVPR_2022_paper.html)
  - BoxInst 같은 box-supervised method가 이미 존재하지만, 여전히 성능은 좋지 않음. 그렇다고 해서 fully-supervised 방식을 사용하기에는 cost가 너무 많이 듦
  - 따라서 저자들은 box-supervison과 더불어 point-supervision도 사용해보자는 의견을 제시하고, 이 때point-supervision을 box-supervision 기반으로 만드는 효율적인(빠른) 방법을 제안함
    1. 먼저 작업자가 Bbox를 만들면, 여기서 랜덤하게 point가 찍힘
    2. 이 점에 대해서 작업자가 foreground와 background 라벨링을 또 한 번 수행함
    3. 이 작업은 instance당 15초 정도 소요됨. 즉, fully supervised 방식 대비 5배 정도 빠른 라벨링 가능
  
  - 그리고 이렇게 만든 point supervision이 다른 '모든' instance segmentation pipeline과 compatible 하도록 만들었음. 즉, 이 point supervision을 가지고 mask loss를 계산하는 방법을 고안하여 제안함
    1. 예측은 기존 instance segmentation의 모델과 동일하게 수행한 다음,
    2. GT points에 대해서 loss 계산을 하는데, prediction points는 prediction mask들의 bilinear interpolation을 사용. 이 방법은 기존 instance segmentation 모델에 대해 구조상으로는 변경될 것이 따로 없어서 좋음
- [x] Tianheng Cheng, et al. "Boxteacher: Exploring high-quality pseudo labels for weakly supervised instance segmentation." CVPR 2023.
  1. Teacher, student 구조로 모델 학습시키는데(Backbone으로는 CondInst 활용), 이미지 입력에는 strong augmentation 적용함
  2. 모든 모델 예측을 pseudo label로 사용하는게 아니라, box GT와 충분히 비슷하고(high IoU), 모델이 강한 확신 보이는(high confidence) 예측만 필터링해서 pseudo label로 사용
  3. 추가적으로, 예측 noise 줄이는 loss 고안해서 적용
  
- [x] Ruihuang Li, et al. "SIM: Semantic-aware Instance Mask Generation for Box-Supervised Instance Segmentation." CVPR 2023.
  1. Pre-trained instance segmentation model 구비 (CondInst and Mask2Former)
  2. Class-wise Prototypes과 similarity 측정해서 semantic mask 얻음
  3. Instance mask 얻음
  4. Semantic mask와 instance mask를 weighted averaging하여 pseudo mask 얻음
  
- [ ] Beomyoung Kim, et al. "The Devil is in the Points: Weakly Semi-Supervised Instance Segmentation via Point-Guided Mask Representation." CVPR 2023.
  1. 만약 dataset의 10%만 fully labeled 되어있다면, 나머지 90%는 point supervision을 부여함. 당연히 이 부분은 사람이 만들어야하지만, instance 하나 당 point 하나이기 때문에 cost는 적음
  2. (Step 1): Fully-labeled data로 먼저 Teacher network와 MaskRefineNet을 학습함. MaskRefineNet은 [Teacher의 mask 예측 / 이미지 / Instance Point]를 입력으로 받아서, mask 예측을 개선시키는 네트워크임. 즉, Point label을 사용해서 더 좋은 예측으로 mask를 업데이트!
     1. Teacher 학습시에는 데이터셋에 point supervision이 존재하지 않기 때문에, mask 예측의 center point를 입력 point로 사용
     2. Student 학습시에는 데이터셋에 point supervision이 존재하기 때문에 해당 point supervision 활용
  3. (Step 2): Teacher의 예측을, MaskRefineNet 기반으로 개선시킨 후에, 개선된 mask를 pseudo-label로 사용함
  4. 이 외에도 adaptive strategy라는 pseudo label 좀 더 보완하는 방법도 추가 제안함

### Multi-Modal Learning

- [ ] [Lee, Kenton, et al. "Pix2Struct: Screenshot parsing as pretraining for visual language understanding." arXiv preprint arXiv:2210.03347, 2022.](https://arxiv.org/abs/2210.03347)
  - Visually-Situated Language Understanding: Documents, tables, infographics, and user interfaces (UIs) are intended to be consumed holistically, without clear boundaries between textual and visual elements
  - Visually-situated language understanding task와 관련하여 prior work 들의 방법이 너무 산재해 있었고 서로 모델 구조나, 접근법, 데이터 등이 크게 sharing 되지 않았음
  - Pre-training: 본 논문은 '웹 페이지의 masked-screenshot을 input으로 받아 HTML을 예측하는 형태의 pre-training 방법'을 고안하여, general-purpose의 visually-situated language understanding model을 구축함
  - Curriculum learning: 학습 초기 단계에서 아주 쉬운 parsing 문제(e.g., 글씨에 색깔만 입힌 HTML parsing)로 warm-up stage를 거치면 converge도 빠르고 fine-tuning 성능도 좋아짐 (Appendix D 참고)
  - Transfer learning: ViT를 위한 새로운 fine-tuning 전략인 variable-resolution input representation을 제안. 일반적으로 ViT는 image patch를 뽑기 전에 pre-defined resolution으로 rescale을 하는데, 이 경우에 screenshot을 왜곡하거나 high resolution으로의 transfer learning에 방해가 될 것임. 따라서 저자들은 2d absolute positional embedding을 input patch와 같이 입력으로 제공하였음
  - Architecture: image-encoder-text-decoder ViT
- [ ] Xiaoshuai Hao, et al. "Mixgen: A new multi-modal data augmentation." WACV Workshop 2023.
  - image는 interpolating, text는 concatenating
- [ ] Liu, Zichang, et al. "Learning Multimodal Data Augmentation in Feature Space." ICLR 2023.
  
  - Task Network, Augmentation Network라는 것 도입해서 learning 기반으로 multi-modal feature augmentation
- [ ] So, Junhyuk, et al. "Geodesic multi-modal mixup for robust fine-tuning." *arXiv preprint arXiv:2203.03897* (2022).
  
  - CLIP의 임베딩이 text, image 서로 separated 되어있음. CLIP embedding을 분석하고, 문제를 해결한 첫 논문임
  - 발견: temperature를 높여서 학습하면 uniformity와 alignment measure는 좋아지는데, downstream task의 performance는 하락함
  - 이를 해결할 방법으로 geodesic multi-modal mixup (m2 mixup) 제안
    - hard negative를 image text feature mixup 사용해서 만들고, 이를 contrastive loss 안에 삽입
    - 이 때, feature mixup(interpolation)을 hypersphere 상에서 수행하여서 geodesic mixup이라 이름 붙임
    - text, timage emedding 사이의 alignment를 개선시키고 이를 통해 fine-tuning에서의 robustness를 얻음

### Natural Language Processing

- [ ] [Gunel, Beliz, et al. "Supervised Contrastive Learning for Pre-trained Language Model Fine-tuning." ICLR 2020.](https://openreview.net/pdf?id=cu7IUiOhujH)
- [x] [Li, Xiaoya, et al. "Dice Loss for Data-imbalanced NLP Tasks." ACL 2020.](https://aclanthology.org/2020.acl-main.45.pdf)
- [x] [Yadav, Vikas, and Steven Bethard. "A Survey on Recent Advances in Named Entity Recognition from Deep Learning models." COLING 2018.](https://aclanthology.org/C18-1182.pdf)

### Reinforcement Learning

- [ ] [Wang, Jane X., et al. "Learning to reinforcement learn." arXiv preprint arXiv:1611.05763, 2016](https://arxiv.org/pdf/1611.05763.pdf)

### Implicit Neural Representation

- [x] [Mildenhall, Ben, et al. "Nerf: Representing scenes as neural radiance fields for view synthesis." ECCV 2020.](https://link.springer.com/chapter/10.1007/978-3-030-58452-8_24)
- [x] [Martin-Brualla, Ricardo, et al. "Nerf in the wild: Neural radiance fields for unconstrained photo collections." CVPR 2021.](https://openaccess.thecvf.com/content/CVPR2021/html/Martin-Brualla_NeRF_in_the_Wild_Neural_Radiance_Fields_for_Unconstrained_Photo_CVPR_2021_paper.html)

### Neural Architecture Search

- [ ] [Liu, Hanxiao, Karen Simonyan, and Yiming Yang. "Darts: Differentiable architecture search." ICLR 2019.](https://openreview.net/pdf?id=S1eYHoC5FX)

  - Neural Architecture Search (NAS) 연구에 대해, 기존에는 search space가 미분 불가능하다는 문제점 때문에 RL 기반으로만 연구가 진행었는데, DARTS는 search space를 미분 가능하게 정의하고 여기에 MAML의 최적화 방식과 동일한 bilevel optimization을 도입하여 gradient descent 기반의 NAS를 가능하도록 만들었음

  1. Differentiable archtecture search: 논문에서 정의한 bilevel optimization 식을 통한 가중치 $\alpha$ 최적화 수행
  2. Discretization step: $\alpha$와 $k$ 기반으로 필요 없는 operation edge 제거
  3. Retraining for the top- $k$ strongest operations: 남은 operation edge에 대해 처음부터 다시 학습 수행

### Long-Tailed Recognition

- [ ] [Kang, Bingyi, et al. "Decoupling Representation and Classifier for Long-Tailed Recognition." ICLR 2020.](https://openreview.net/pdf?id=r1gRTCVFvB)

### Bayesian Deep Learning

- [ ] [Gal, Yarin, and Zoubin Ghahramani. "Dropout as a bayesian approximation: Representing model uncertainty in deep learning." ICML 2016.](http://proceedings.mlr.press/v48/gal16.html)

### Deep Neural Architectures

- [ ] [Geoffrey Hinton. "The Forward-Forward Algorithm: Some Preliminary Investigations." (2022).](https://www.cs.toronto.edu/~hinton/FFA13.pdf)

### Image Editing

- [ ] [Winter, Daniel, et al. "Objectdrop: Bootstrapping counterfactuals for photorealistic object removal and insertion." ECCV 2024.](https://arxiv.org/abs/2403.18818)

  - 잘 큐레이션된 counterfactual 데이터셋에 대해 diffusion 모델을 학습
  - Removal: 장면을 찍고, object를 제거해서 장면을 다시 찍은 데이터 셋 (couterfactual supervised training)
  - Insertion: 합성 데이터셋 사용 (bootstrap supervision)
    1. Object removal model을 학습
    2. Removal model을 통해 방대한 합성 데이터셋 생성
    3. 이 데이터셋을 통해 diffusion model을 튜닝

- [x] [Xiao, Shitao, et al. "Omnigen: Unified image generation." arXiv preprint arXiv:2409.11340 (2024).](https://arxiv.org/abs/2409.11340)

  - **Unification:** txt2img, image editing, subject-driven generation, visual-conditional generation 등이 하나의 모델에서 모두 가능
  - **Simplicity:** 단순한 구조로 텍스트 인코더가 필요하지 않음. VAE와 Transformer 만 존재
    - LLaVa와 비슷하게, image는 vae encoder로 뽑은 patch embedding을, text는 text tokens으로 받고, timestep과 noise도 전부 token 형태로 만들어서 이 모두를 transformer의 입력으로 전달받음
    - 최종적으로는 noise token의 출력만 취해서, 이를 decoder에 태움 
  - **Knowledge Transfer:** 여러 task에 대해 통합된 형태로 학습
  - 여러 task를 통합적으로 학습 가능한 데이터셋 X2I(anything to image)를 구축하여 공유

- [ ] [Avrahami, Omri, et al. "Stable Flow: Vital Layers for Training-Free Image Editing." arXiv preprint arXiv:2411.14430 (2024).](https://arxiv.org/abs/2411.14430)

  - Flow matching을 활용하는 DiT 모델 구조를 분석하여 vital layers(핵심 레이어)를 자동으로 식별하고 이를 활용하여 훈련 없이 다양한 이미지 편집 작업을 수행하는 방법 고안

  - **Measuring the Importance of DiT Layers**: DiT 구조에서 각 레이어를 제거했을 때 이미지 품질이 어떻게 변화하는지 분석하고, vital layers 탐색. Vital layers에만 편집 정보를 주입함으로써 보다 안정적인 편집 가능
  - **Image Editing using Vital Layers**: Vital layers의 attention 정보를 새로운 편집 이미지에 삽입하여 변화된 부분만 조정. 다양한 편집을 동일한 방식으로 수행 가능.
  - **Latent Nudging for Real Image Editing**: 기존의 Inverse Euler ODE solver를 적용했을 때, 원본 이미지와 차이가 발생하는 문제 발생. 이를 해결하기 위해 latent nudging 기법을 적용하여 편집 시 원본 이미지의 보존율을 향상
  
- [x] Mao, Chaojie, et al. "Ace++: Instruction-based image creation and editing via context-aware content filling." arXiv preprint arXiv:2501.02487 (2025)

  - Instruction based diffusion framework를 제안

  - ACE에서 제안한 LCU 활용하여 input을 정의하나, 더 효율 좋은 channel-wise feature concat 방식으로 수정한 **LCU++**를 제안하여 활용

  - **All-around model**: 0-ref text-to-image task 학습 후, ACE 논문에서 제안한 데이터 전체 활용해서 학습 (0-ref + N-ref)

  - **Task-sepcific model**: Flux.1-Fill-dev를 시작점으로 활용하여 LoRA fine-tuning

  - 0-ref task: $\mathbf{L C U}_{0-\mathrm{ref}}^{++}=\left\{\{T\},\left\{V^{++}\right\}\right\}, \quad V_{0 \text {-ref }}^{++}=\left\{\left[I^{i n} ; M^{i n} ; X_t\right]\right\}$

  - General task. 아래에서 $I^N$은 우리가 변형하고자하는 샘플 (edit image)
    $$
    \begin{aligned}
    \mathrm{LCU}^{++} & =\left\{\left\{T_1, T_2, \ldots, T_m\right\},\left\{V_1^{++}, V_2^{++}, \ldots, V_m^{++}\right\}\right\} \\
    V^{++} & \left.=\left\{I^1 ; M^1 ; X_t^1\right],\left[I^2 ; M^2 ; X_t^2\right], \ldots,\left[I^N ; M^N ; X_t^N\right]\right\}
    \end{aligned}
    $$

  - **Loss**: 변형하고자 하는 샘플 $I^N$이라 할 때, $\sum_{N-1}^{i=0} \mathbb{E}_{t, \mathbf{x}_0, \mathbf{x}_1}\left\|\mathbf{v}_t^i-\mathbf{u}_t^i\right\|^2+\mathbb{E}_{t, \mathbf{x}_0, \mathbf{x}_1}\left\|\mathbf{v}_t^N-\mathbf{u}_t^N\right\|^2$

    - Reference image에 대해서는 원본 복구를 하는 방향으로 velocity prediction
    - Target image에 대해서는 잘 예측해서 생성해내는 방향으로 velocity prediction 

### Technical Report

- [ ] [Wu, Yuxin, and Justin Johnson. "Rethinking" Batch" in BatchNorm." arXiv preprint arXiv:2105.07576, 2021.](https://arxiv.org/pdf/2105.07576.pdf)
- [x] [Lipton, Zachary C., and Jacob Steinhardt. "Troubling trends in machine learning scholarship." arXiv preprint arXiv:1807.03341, 2018.](https://arxiv.org/abs/1807.03341)
- [ ] [Ridnik, Tal, et al. "Solving ImageNet: a Unified Scheme for Training any Backbone to Top Results." arXiv preprint arXiv:2204.03475 , 2022.](https://arxiv.org/pdf/2204.03475.pdf)
  - 새로운 방법을 제안하는 논문은 아니고 technical report에 가까움
  - ImageNet dataset에 대해서, 어떤 모델 구조더라도 하이퍼파라미터 튜닝 없이 동일하게 적용할 수 있는 USI(Unified Scheme for ImageNet)을 제안. Knowledge distillation과 몇 가지 modern tricks를 사용하였고, 모든 모델에 대해서 previous SOTA를 넘었음
  - TResNet-L 구조의 teacher model과 더불어 논문에서 제안하는 하이퍼파라미터를 사용하면, CNN, Transformer, Mobile-oriented, MLP-only 형태의 student 모델에 대해서 모두 성능이 개선된다고 함
  - 일반적인 knowledge distillation 형태(vanilla KD)와 동일하게, true label y에 대해서는 cross entropy loss를 사용하고, teacher label에 대해서는 temperature를 사용하여 soft label을 만든 뒤에 student prediction과 KLD를 계산함
- [x] [Phuong, Mary, and Marcus Hutter. "Formal Algorithms for Transformers." *arXiv preprint arXiv:2207.09238* (2022).](https://arxiv.org/pdf/2207.09238.pdf)

### Blog Posts & Videos

- https://engineering.clova.ai/posts/2022/07/nsml-k8s-based-platform
- https://www.slideshare.net/deview/224nsml-80881317
- https://helloworld.kurly.com/blog/second-mlops
- https://yangoos57.github.io/blog/mlops/kubeflow/pipeline_using_kfp_sdk/
- https://samsungsds.tistory.com/32
- https://www.youtube.com/watch?v=EEsYbiqqcc0
- https://engineering.linecorp.com/ko/blog/data-engineering-with-airflow-k8s-1
- https://humbledude.github.io/blog/2019/07/12/airflow-on-k8s/

