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

### Few-shot Learning, Meta Learning

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

### Incremental Learning, Continual Learning

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
- [ ] [Zhou, Da-Wei, et al. "Forward compatible few-shot class-incremental learning." CVPR 2022.](https://arxiv.org/pdf/2203.06953.pdf)

### Domain Generalization

- [ ] [Cha, Junbum, et al. "Swad: Domain generalization by seeking flat minima." NIPS 2021.](https://proceedings.neurips.cc/paper/2021/hash/bcb41ccdc4363c6848a1d760f26c28a0-Abstract.html)
- [ ] [Fan, Xinjie, et al. "Adversarially adaptive normalization for single domain generalization." CVPR 2021.](http://openaccess.thecvf.com/content/CVPR2021/html/Fan_Adversarially_Adaptive_Normalization_for_Single_Domain_Generalization_CVPR_2021_paper.html)
- [ ] [Volpi, Riccardo, et al. "Continual Adaptation of Visual Representations via Domain Randomization and Meta-learning." CVPR 2021.](https://arxiv.org/pdf/2012.04324.pdf)

### Self-supervised Learning

- [x] [Grill, Jean-Bastien, et al. "Bootstrap your own latent: A new approach to self-supervised learning." NIPS 2020.](https://arxiv.org/abs/2006.07733)
- [ ] [Kolesnikov, Alexander, Xiaohua Zhai, and Lucas Beyer. "Revisiting self-supervised visual representation learning." CVPR 2019.](https://openaccess.thecvf.com/content_CVPR_2019/html/Kolesnikov_Revisiting_Self-Supervised_Visual_Representation_Learning_CVPR_2019_paper.html)
- [ ] [Tian, Yuandong, Xinlei Chen, and Surya Ganguli. "Understanding self-supervised Learning Dynamics without Contrastive Pairs." arXiv preprint arXiv:2102.06810, 2021.](https://arxiv.org/abs/2102.06810)
- [ ] [Kevin Lu, et al. "Pretrained Transformers as Universal Computation Engines." arXiv preprint arXiv:2103.05247, 2021](https://arxiv.org/abs/2103.05247?fbclid=IwAR3T_ZxXT0bmygQnpbWdPy_9_ilNR9nrCbALNgc6EffsXAevguFxQ_myPFE)
- [ ] [Goyal, Priya, et al. "Self-supervised Pretraining of Visual Features in the Wild." arXiv preprint arXiv:2103.01988, 2021.](https://arxiv.org/abs/2103.01988)

### Semi-supervised Learning

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
- [ ] [Saito, Kuniaki, Donghyun Kim, and Kate Saenko. "OpenMatch: Open-set Consistency Regularization for Semi-supervised Learning with Outliers." NeurIPS 2021.](https://arxiv.org/abs/2105.14148)
- Open-set semi-supervised learning(OSSL) task를 풀기 위한 알고리즘
- [ ] [Fan, Yue, Dengxin Dai, and Bernt Schiele. "CoSSL: Co-Learning of Representation and Classifier for Imbalanced Semi-Supervised Learning." CVPR 2022. ](https://arxiv.org/abs/2112.04564)- *8월 내로 읽는 것을 목표로*
- [ ] [Oh, Youngtaek, Dong-Jin Kim, and In So Kweon. "Distribution-aware semantics-oriented pseudo-label for imbalanced semi-supervised learning." CVPR 2022.](https://arxiv.org/abs/2106.05682) - *8월 내로 읽는 것을 목표로*

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
  
- [x] [Vaze, Sagar, et al. "Generalized Category Discovery." CVPR 2022.](https://arxiv.org/pdf/2201.02609.pdf)

  - Generalized Category Discovery라는 task를 처음으로 정의한 논문
  - Main algorithm: ViT DINO pretraining, Supervised contrastive learning + Self-supervised contrastive learning, Semi-supervised k-means clustering(using k-means++)의 순서로 알고리즘 구성
  - Class number estimation method: Brent's method 사용
  - Strong baselines: RS와 UNO에서 labelled dataset와 unlabelled dataset에 대한 classification head가 두 개로 나뉘어 존재하던 것을 하나로 합침. Backbone은 저자들이 제안한 ViT구조를 그대로 사용하였는데, backbone을 finetuning하는 것은 오히려 성능이 좋지 않아서, backbone은 freeze하고 classification head만 tuning하였음
  
- [x] [Bhattacharjee, Supritam, Devraj Mandal, and Soma Biswas. "Multi-class novelty detection using mix-up technique." WACV 2020.](https://openaccess.thecvf.com/content_WACV_2020/html/Bhattacharjee_Multi-class_Novelty_Detection_Using_Mix-up_Technique_WACV_2020_paper.html)

  - Test query를 novel class와 mixup하면 output prediction 값이 낮고, base class와 mixup하면 output prediction 값이 특정 하나의 class에 대해 높을 것이라 가정
  - Open-set recognition task에서 자주 사용되는 K개의 sigmoid classifier 사용
  - Class 마다 N개의 exemplar 이미지를 가지고, 해당 이미지와 test query의 mixed 샘플 output 확인. N개의 output을 평균내어 이를 membership score라는 이름으로 정의

### Data Augmentation

- [ ] [Yun, Sangdoo, et al. "Cutmix: Regularization strategy to train strong classifiers with localizable features." ICCV 2019.](https://openaccess.thecvf.com/content_ICCV_2019/html/Yun_CutMix_Regularization_Strategy_to_Train_Strong_Classifiers_With_Localizable_Features_ICCV_2019_paper.html)
- [x] [Verma, Vikas, et al. "Manifold mixup: Better representations by interpolating hidden states." ICML 2019.](https://proceedings.mlr.press/v97/verma19a.html)
  - 기존 Input-spcae mixup과 달리 itermediate layer의 representation을 mixup하는 방법
  - $\left(\tilde{g}_{k}, \tilde{y}\right):=\left(\operatorname{Mix}_{\lambda}\left(g_{k}(x), g_{k}\left(x^{\prime}\right)\right), \operatorname{Mix}_{\lambda}\left(y, y^{\prime}\right)\right)$
  - SVD 했을 때 eigenvalue가 전체적으로 작아지는 효과를 가짐. 즉, principal components 수가 작아지는 효과 (flattening)
  - Flattening을 통해 eigenvalue가 전체적으로 작아지니 volume이 작아지며, compression은 information theory 관점에서 이론적, 실험적으로 generalization과 연관이 있어 장점을 가짐
- [ ] [Wen, Yeming, et al. "Combining Ensembles and Data Augmentation Can Harm Your Calibration." ICLR 2021.](https://openreview.net/forum?id=g11CZSghXyY)
- [ ] [Zhang, Linjun, et al. "How Does Mixup Help With Robustness and Generalization?." ICLR 2021.](https://arxiv.org/pdf/2010.04819.pdf) - *6월 내로 읽는 것을 목표로*

### Natural Language Processing

- [ ] [Gunel, Beliz, et al. "Supervised Contrastive Learning for Pre-trained Language Model Fine-tuning." ICLR 2020.](https://openreview.net/pdf?id=cu7IUiOhujH)
- [x] [Li, Xiaoya, et al. "Dice Loss for Data-imbalanced NLP Tasks." ACL 2020.](https://aclanthology.org/2020.acl-main.45.pdf)
- [x] [Yadav, Vikas, and Steven Bethard. "A Survey on Recent Advances in Named Entity Recognition from Deep Learning models." COLING 2018.](https://aclanthology.org/C18-1182.pdf)

### Reinforcement Learning

- [ ] [Wang, Jane X., et al. "Learning to reinforcement learn." arXiv preprint arXiv:1611.05763, 2016](https://arxiv.org/pdf/1611.05763.pdf)

### Implicit Neural Representation

- [x] [Mildenhall, Ben, et al. "Nerf: Representing scenes as neural radiance fields for view synthesis." ECCV 2020.](https://link.springer.com/chapter/10.1007/978-3-030-58452-8_24)
- [x] [Martin-Brualla, Ricardo, et al. "Nerf in the wild: Neural radiance fields for unconstrained photo collections." CVPR 2021.](https://openaccess.thecvf.com/content/CVPR2021/html/Martin-Brualla_NeRF_in_the_Wild_Neural_Radiance_Fields_for_Unconstrained_Photo_CVPR_2021_paper.html)

### Bayesian Deep Learning

- [ ] [Gal, Yarin, and Zoubin Ghahramani. "Dropout as a bayesian approximation: Representing model uncertainty in deep learning." ICML 2016.](http://proceedings.mlr.press/v48/gal16.html) - *6월 내로 읽는 것을 목표로*

### Technical Reports

- [ ] [Wu, Yuxin, and Justin Johnson. "Rethinking" Batch" in BatchNorm." arXiv preprint arXiv:2105.07576, 2021.](https://arxiv.org/pdf/2105.07576.pdf)
- [x] [Lipton, Zachary C., and Jacob Steinhardt. "Troubling trends in machine learning scholarship." arXiv preprint arXiv:1807.03341, 2018.](https://arxiv.org/abs/1807.03341)
- [ ] [Ridnik, Tal, et al. "Solving ImageNet: a Unified Scheme for Training any Backbone to Top Results." arXiv preprint arXiv:2204.03475 , 2022.](https://arxiv.org/pdf/2204.03475.pdf)
  - 새로운 방법을 제안하는 논문은 아니고 technical report에 가까움
  - ImageNet dataset에 대해서, 어떤 모델 구조더라도 하이퍼파라미터 튜닝 없이 동일하게 적용할 수 있는 USI(Unified Scheme for ImageNet)을 제안. Knowledge distillation과 몇 가지 modern tricks를 사용하였고, 모든 모델에 대해서 previous SOTA를 넘었음
  - TResNet-L 구조의 teacher model과 더불어 논문에서 제안하는 하이퍼파라미터를 사용하면, CNN, Transformer, Mobile-oriented, MLP-only 형태의 student 모델에 대해서 모두 성능이 개선된다고 함
  - 일반적인 knowledge distillation 형태(vanilla KD)와 동일하게, true label y에 대해서는 cross entropy loss를 사용하고, teacher label에 대해서는 temperature를 사용하여 soft label을 만든 뒤에 student prediction과 KLD를 계산함