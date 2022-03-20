---
title: "Deep Learning Paper List"
date: "2022-03-15"
template: "post"
draft: true
path: "/cheatsheet/22-03-15/"
description: "관심 분야의 논문 리스트를 기록합니다. 최근에 읽은 논문들에 대해서는 핵심 내용을 세 줄 요약으로 적고 있습니다. 지금까지는 Few-shot learning / Meta Learning, Incremental / Continual Learning, Self / Semi-supervised Learning, Reinforcement Learning, Natural Language Processing에 대한 논문을 기록하였습니다."
category: "Cheat Sheet"
---

> 관심 분야의 논문 리스트를 기록합니다. 최근에 읽은 논문은 핵심 내용을 세 줄 요약으로 추가하고 있습니다. 

### Few-shot / Meta Learning

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
- [ ] [Volpi, Riccardo, et al. "Continual Adaptation of Visual Representations via Domain Randomization and Meta-learning." CVPR 2021.](https://arxiv.org/pdf/2012.04324.pdf)
- [ ] [Cha, Junbum, et al. "Swad: Domain generalization by seeking flat minima." NIPS 2021.](https://proceedings.neurips.cc/paper/2021/hash/bcb41ccdc4363c6848a1d760f26c28a0-Abstract.html)

### Incremental / Continual Learning

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
  - 참고할 블로그 [링크1](https://yukyunglee.github.io/Fisher-Information-Matrix/), [링크2](https://nzer0.github.io/Fisher-Info-and-NLL-Hessian.html)
- [x] [Shi, Guangyuan, et al. "Overcoming Catastrophic Forgetting in Incremental Few-Shot Learning by Finding Flat Minima." NeurIPS 2021.](https://proceedings.neurips.cc/paper/2021/hash/357cfba15668cc2e1e73111e09d54383-Abstract.html)
  - Robust optimization과 관계가 깊은 논문. Figure 2만 봐도 논문이 말하고자 하는 내용은 파악 가능
- [ ] [Chi, Haoang, et al. "Meta discovery: Learning to discover novel classes given very limited data." ICLR 2022.](https://openreview.net/pdf?id=MEpKGLsY8f)
  - Learning to discover novel classes(L2DNC) task에 대해서 이전 가정이 이론적으로 잘못되었다는 것을 증명하고, 이론적으로 가능한 L2DNC 상황을 재정립함. 이와 더불어 더 실생활과 관련있는 few novel observation 상황을 가정하여, L2DNCL task를 정의함.
  - 재정립한 L2DNC이 meta-learning의 가정과 유사하여 MAML, ProtoNet의 아이디어를 차용한 MM, MP를 제안함.
  - 그리고 meta-learning에 L2DNC를 접목할 수 있도록 Clustering-rule-aware Task Sampler(CATA)를 제안함.
- [x] [Cha, Hyuntak, Jaeho Lee, and Jinwoo Shin. "Co2l: Contrastive continual learning." ICCV 2021.](https://openaccess.thecvf.com/content/ICCV2021/html/Cha_Co2L_Contrastive_Continual_Learning_ICCV_2021_paper.html)
  - Asymmetric SupCon loss로 novel learning하고, self-supervised instance-wise relation distill(IRD)로 preserve knowledge
  - Asymmetric SupCon: current task와 memory buffer를 둘 다 사용하지만, anchor로는 current task만 사용. 이 경우에 그냥 SupCon보다 효과 좋음
  - IRD: reference(previous) model output과 동일해지도록 현재 모델 regulate (대상은 2N개 전부)
- [x] [Hu, Dapeng, et al. "How Well Does Self-Supervised Pre-Training Perform with Streaming ImageNet?." NeruIPS 2021.](https://openreview.net/pdf?id=gYgMSlZznS)
  - Self-supervised learning 방식으로 pre-training하면, streaming data에 대해서 joint training 만큼의 성능이 나온다는 것을 주장
  - Pre-training은 MoCo-v2 protocol을 따르고, OpenSelfSup의 구현을 기반으로 하였음
  - Streaming data의 distribution shift가 milld한 경우에는 joint training과 self-supervised pre-training의 성능이 거의 비슷하고, large distribution shift인 경우에는 MAS(memory aware synapse)와 data replay 방법을 사용하면 비슷함.
- [ ] [Madaan, Divyam, et al. "Rethinking the Representational Continuity: Towards Unsupervised Continual Learning." ICLR 2022.](https://openreview.net/pdf?id=9Hrka5PA7LW)
- [ ] [Fini, Enrico, et al. "Self-Supervised Models are Continual Learners." arXiv preprint arXiv:2112.04215, 2021.](https://arxiv.org/pdf/2112.04215.pdf)

### Self / Semi-supervised Learning

- [x] [Grill, Jean-Bastien, et al. "Bootstrap your own latent: A new approach to self-supervised learning." NIPS 2020.](https://arxiv.org/abs/2006.07733)
- [x] [Pham, Hieu, et al. "Meta pseudo labels." CVPR 2021.](https://openaccess.thecvf.com/content/CVPR2021/html/Pham_Meta_Pseudo_Labels_CVPR_2021_paper.html)
- [ ] [Kolesnikov, Alexander, Xiaohua Zhai, and Lucas Beyer. "Revisiting self-supervised visual representation learning." CVPR 2019.](https://openaccess.thecvf.com/content_CVPR_2019/html/Kolesnikov_Revisiting_Self-Supervised_Visual_Representation_Learning_CVPR_2019_paper.html)
- [ ] [Tian, Yuandong, Xinlei Chen, and Surya Ganguli. "Understanding self-supervised Learning Dynamics without Contrastive Pairs." arXiv preprint arXiv:2102.06810, 2021.](https://arxiv.org/abs/2102.06810)
- [ ] [Kevin Lu, et al. "Pretrained Transformers as Universal Computation Engines." arXiv preprint arXiv:2103.05247, 2021](https://arxiv.org/abs/2103.05247?fbclid=IwAR3T_ZxXT0bmygQnpbWdPy_9_ilNR9nrCbALNgc6EffsXAevguFxQ_myPFE)
- [ ] [Goyal, Priya, et al. "Self-supervised Pretraining of Visual Features in the Wild." arXiv preprint arXiv:2103.01988, 2021.](https://arxiv.org/abs/2103.01988)
- [x] [Zhou, Zhi-Hua, and Ming Li. "Semi-supervised regression with co-training." IJCAI 2005.](https://cs.nju.edu.cn/zhouzh/zhouzh.files/publication/ijcai05.pdf)
  - 두 개의 kNN regressor를 사용하여 co-training 진행
  - Sufficient and redundant view를 위해서 두 regressor의 metric은 p=2 Minkowsky와 p=5 Minkowsky로 서로 다르게 설정함 
  - Key mechanism은 regression에서 confidence를 만들어내는 작업이었고, $x_u$가 추가됨에 따라서 MSE가 얼마나 개선되는지를 계산하여($\vartriangle_u$) 이 값이 제일 커지는 $x_u$에 대해 confidence가 높다고 판단하여 해당 $x_u$에 pseudo label을 부여
- [ ] [Jean, Neal, Sang Michael Xie, and Stefano Ermon. "Semi-supervised Deep Kernel Learning: Regression with Unlabeled Data by Minimizing Predictive Variance." NIPS 2018.](https://par.nsf.gov/servlets/purl/10080181)

### Reinforcement Learning

- [ ] [Wang, Jane X., et al. "Learning to reinforcement learn." arXiv preprint arXiv:1611.05763, 2016](https://arxiv.org/pdf/1611.05763.pdf)

### Natural Language Processing

- [ ] [Gunel, Beliz, et al. "Supervised Contrastive Learning for Pre-trained Language Model Fine-tuning." ICLR 2020.](https://openreview.net/pdf?id=cu7IUiOhujH)
- [x] [Li, Xiaoya, et al. "Dice Loss for Data-imbalanced NLP Tasks." ACL 2020.](https://aclanthology.org/2020.acl-main.45.pdf)
- [x] [Yadav, Vikas, and Steven Bethard. "A Survey on Recent Advances in Named Entity Recognition from Deep Learning models." COLING 2018.](https://aclanthology.org/C18-1182.pdf)

### etc.

- [ ] [Wu, Yuxin, and Justin Johnson. "Rethinking" Batch" in BatchNorm." arXiv preprint arXiv:2105.07576, 2021](https://arxiv.org/pdf/2105.07576.pdf)
- [x] [Lipton, Zachary C., and Jacob Steinhardt. "Troubling trends in machine learning scholarship." arXiv preprint arXiv:1807.03341, 2018.](https://arxiv.org/abs/1807.03341)
- [ ] [Gal, Yarin, and Zoubin Ghahramani. "Dropout as a bayesian approximation: Representing model uncertainty in deep learning." ICML 2016.](http://proceedings.mlr.press/v48/gal16.html)
- [ ] [Khosla, Prannay, et al. "Supervised contrastive learning." NIPS 2020.](https://proceedings.neurips.cc/paper/2020/hash/d89a66c7c80a29b1bdbab0f2a1a94af8-Abstract.html)
- [ ] [Sohn, Kihyuk. "Improved deep metric learning with multi-class n-pair loss objective." NIPS 2016.](https://proceedings.neurips.cc/paper/2016/hash/6b180037abbebea991d8b1232f8a8ca9-Abstract.html)
- [ ] [He, Xinwei, et al. "Triplet-center loss for multi-view 3d object retrieval." CVPR 2018.](https://openaccess.thecvf.com/content_cvpr_2018/html/He_Triplet-Center_Loss_for_CVPR_2018_paper.html)
- [x] [Martin-Brualla, Ricardo, et al. "Nerf in the wild: Neural radiance fields for unconstrained photo collections." CVPR 2021.](https://openaccess.thecvf.com/content/CVPR2021/html/Martin-Brualla_NeRF_in_the_Wild_Neural_Radiance_Fields_for_Unconstrained_Photo_CVPR_2021_paper.html)
