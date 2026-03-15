---
title: "Deep Learning Paper List"
date: "2022-03-15"
template: "post"
draft: false
path: "/deeplearning/22-03-15/"
description: "A curated list of papers in areas of interest. For recently read papers, key content is summarized in three lines. Papers without check marks are those that need to be revisited later. Papers are recorded in the fields of Few-shot Learning, Meta Learning, Incremental & Continual Learning, Self & Semi-supervised Learning, Reinforcement Learning, and Natural Language Processing."
category: "Deep Learning"
---

> A curated list of papers in areas of interest. For recently read papers, key content summaries in three lines are added. Papers without check marks are those that need to be revisited later.

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
  - Solves semi-supervised few-shot classification where unlabeled data contains distractors (novel classes not provided in the support set, which interfere with naive SSL)
  - Proposes three methods: ProtoNet w. soft k-means / ProtoNet w. soft k-means w. a distractor cluster / ProtoNet w. soft k-means and masking

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
  - Uses data-init for base and novel classifier creation, same as CEC
  - Does not use CE loss; instead uses triplet loss, minimize cosine similarity loss (for prototype), and regularization loss
  - Selects only the bottom 10% of all weights by magnitude and fine-tunes them on novel samples
- [x] [Zhu, Kai, et al. "Self-Promoted Prototype Refinement for Few-Shot Class-Incremental Learning." CVPR 2021.](https://openaccess.thecvf.com/content/CVPR2021/html/Zhu_Self-Promoted_Prototype_Refinement_for_Few-Shot_Class-Incremental_Learning_CVPR_2021_paper.html)
- [ ] [Kirkpatrick, James, et al. "Overcoming catastrophic forgetting in neural networks." PNAS 2017.](https://www.pnas.org/content/114/13/3521.short)
  - An algorithm that uses the Fisher Information Matrix to constrain parameter learning with a specific covariance in parameter space (same formulation as Mahalanobis distance)
  - Blog posts explaining the paper: [Link 1](https://yukyunglee.github.io/Fisher-Information-Matrix/), [Link 2](https://nzer0.github.io/Fisher-Info-and-NLL-Hessian.html)
- [x] [Shi, Guangyuan, et al. "Overcoming Catastrophic Forgetting in Incremental Few-Shot Learning by Finding Flat Minima." NeurIPS 2021.](https://proceedings.neurips.cc/paper/2021/hash/357cfba15668cc2e1e73111e09d54383-Abstract.html)
  - Closely related to robust optimization. Figure 2 alone conveys the paper's main message
- [x] [Cha, Hyuntak, Jaeho Lee, and Jinwoo Shin. "Co2l: Contrastive continual learning." ICCV 2021.](https://openaccess.thecvf.com/content/ICCV2021/html/Cha_Co2L_Contrastive_Continual_Learning_ICCV_2021_paper.html)
  - Novel learning with asymmetric SupCon loss, knowledge preservation with self-supervised instance-wise relation distill (IRD)
  - Asymmetric SupCon: Uses both current task and memory buffer, but only the current task as anchors. This performs better than standard SupCon
  - IRD: Regulates current model to match reference (previous) model output (applied to all 2N samples)
- [x] [Hu, Dapeng, et al. "How Well Does Self-Supervised Pre-Training Perform with Streaming ImageNet?." NeurIPS 2021.](https://openreview.net/pdf?id=gYgMSlZznS)
  - Claims that self-supervised pre-training achieves performance comparable to joint training on streaming data
  - Pre-training follows the MoCo-v2 protocol, based on OpenSelfSup implementation
  - When the distribution shift of streaming data is mild, joint training and self-supervised pre-training perform almost identically; for large distribution shifts, using MAS (memory aware synapse) and data replay achieves comparable performance
- [ ] [Madaan, Divyam, et al. "Rethinking the Representational Continuity: Towards Unsupervised Continual Learning." ICLR 2022.](https://openreview.net/pdf?id=9Hrka5PA7LW)
  - Surprisingly, solving unsupervised continual learning (CURL) with label-unannotated data using SimSiam and Barlow Twins algorithms is more robust to catastrophic forgetting than supervised continual learning
  - Lifelong Unsupervised Mixup (LUMP) leverages interpolation between previous task (in memory buffer) and current task; performs well even without LUMP, but better with it
  - UCL/SCL are similar in low layers but dissimilar in high layers. UCL's loss landscape is smoother
  - Classification at test time uses KNN, though the details of how it is used have not been closely examined yet
- [ ] [Fini, Enrico, et al. "Self-Supervised Models are Continual Learners." arXiv preprint arXiv:2112.04215, 2021.](https://arxiv.org/pdf/2112.04215.pdf)
- [ ] [Zhou, Minghao, et al. "Diagnosing Batch Normalization in Class Incremental Learning." arXiv preprint arXiv:2202.08025, 2022.](https://arxiv.org/abs/2202.08025)
  - Training batch must contain only new classes for better normalization & representation learning, but this biases the model due to BN discrepancy. This is called the BN dilemma
  - Proposes the BN trick (BNT) to resolve the BN dilemma
  - EMA update uses $B_b$ (balanced batch), while parameter update uses $B_t, B_\mathcal{M}$ for joint training without EMA update
- [x] [Pham, Quang, Chenghao Liu, and H. O. I. Steven. "Continual normalization: Rethinking batch normalization for online continual learning." ICLR 2022.](https://openreview.net/forum?id=vwLLQ-HwqhZ)
  - The phenomenon of using moments biased toward the current task during inference on previous tasks is called the cross-task normalization effect
  - Since this cross-task normalization effect exists when simply using BN in continual learning tasks, the paper proposes also using methods without cross-task normalization effect like GN. In other words, balancing between mini-batch and spatial normalization is important for normalization in continual learning
  - Claims that the GN -> BN (=CN) form is better than blending weight forms like SwitchNorm or TaskNorm that combine BN, LN, IN, GN, etc.
- [x] [Cha, Sungmin, et al. "Task-Balanced Batch Normalization for Exemplar-based Class-Incremental Learning." arXiv preprint arXiv:2201.12559, 2022.](https://arxiv.org/abs/2201.12559)
  - For exemplar-based CIL, proposes task-balanced $\mu$ & $\sigma^2$ calculation method and a less biased computation for affine transformation parameters
  - Task-balanced $\mu$ & $\sigma^2$ calculation: Proposes a new $\mu$ & $\sigma^2$ calculation method using reshape and repeat operations to avoid current-task bias
- [ ] [Skorokhodov, Ivan, and Mohamed Elhoseiny. "Class Normalization for (Continual)? Generalized Zero-Shot Learning." ICLR 2021.](https://openreview.net/forum?id=7pgFL2Dkyyy)
  - Addresses limitations of 'normalize+scale' (NS) and 'attributes normalization' (AN) methods commonly used in ZSL, and proposes CN as an improvement
  - The informal analysis/opinions on why NS and AN work well, and the smooth process of proposing CN based on this, likely contributed to its acceptance
- [ ] [Zhu, Fei, et al. "Class-Incremental Learning via Dual Augmentation." NeurIPS 2021.](https://proceedings.neurips.cc/paper/2021/file/77ee3bc58ce560b86c2b59363281e914-Paper.pdf)
- [x] [Zhou, Da-Wei, et al. "Forward compatible few-shot class-incremental learning." CVPR 2022.](https://arxiv.org/pdf/2203.06953.pdf)
- [ ] [Shibhansh Dohare, et al. "Loss of Plasticity in Deep Continual Learning"](https://arxiv.org/pdf/2306.13812.pdf)
  - [Presentation video 1](https://www.youtube.com/watch?v=p_zknyfV9fY), [Presentation video 2](https://www.youtube.com/watch?v=oA_XLqh4Das)
  - Existing CL research focused only on preventing catastrophic forgetting, but CL settings also affect the ability to learn new knowledge
  - Properly adjusting L2 regularization & [shrink-and-perturb](https://arxiv.org/pdf/1910.08475.pdf) in CL helps plasticity (the ability to learn new knowledge)
  - Reinitializing some dead neurons during CL training was helpful (continual backpropagation)
- [x] [Ash, Jordan, and Ryan P. Adams. "On warm-starting neural network training." NeurIPS 2020.](https://proceedings.neurips.cc/paper/2020/hash/288cd2567953f06e460a33951f55daaf-Abstract.html)
  - Warm starting (learning similar knowledge from pre-learned weights) yields worse generalization performance than re-learning from random initialization (even if final training loss is similar). This paper analyzes why this happens and proposes several tricks to overcome it
  - Preliminary experiment: Generalization gap of warm start -- pre-training on half the dataset, then comparing random init vs. warm start shows warm start performs worse. For the convection approach, warm start is always worse than random init regardless of hyperparameter tuning
  - Proposes Shrink, Perturb, Repeat: (1) Shrink previously learned weights toward zero, (2) Insert parameter noise. i.e., $\theta_i^t \leftarrow \lambda \theta_i^{t-1}+p^t \text {, where } p^t \sim \mathcal{N}\left(0, \sigma^2\right) \text { and } 0<\lambda<1 \text {. }$
  - This method can be applied to pre-training, continual active learning, batch online-learning, etc.

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
  - The author's presentation video is available [here](https://www.youtube.com/watch?v=7QmsTleiRLs)
  - Key idea: Train an embedding with consistent cluster(prototypes) assignments between views of the same image
  - Constraint: All prototypes are selected the same amount of time. This prevents all samples from being assigned to only one cluster. In the objective formula, this is expressed as a regularizer of the form $\max H(\mathbf{Q})$ (since entropy is maximized when uniformly distributed across all clusters)
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
  - Performs co-training using two kNN regressors
  - For sufficient and redundant views, the two regressors use different metrics: p=2 Minkowski and p=5 Minkowski
  - The key mechanism was creating confidence for regression; calculates how much MSE improves ($\vartriangle_u$) when $x_u$ is added, and assigns pseudo labels to the $x_u$ that maximizes this improvement, judging it as having high confidence
- [ ] [Jean, Neal, Sang Michael Xie, and Stefano Ermon. "Semi-supervised Deep Kernel Learning: Regression with Unlabeled Data by Minimizing Predictive Variance." NIPS 2018.](https://par.nsf.gov/servlets/purl/10080181)
- [ ] [Berthelot, David, et al. "Mixmatch: A holistic approach to semi-supervised learning." NeurIPS 2019.](https://proceedings.neurips.cc/paper/2019/hash/1cd138d0499a68f4bb72bee04bbec2d7-Abstract.html)

  1. Perform $K$ stochastic augmentations on unlabeled data and feed them into the model
  2. Average the $K$ probability outputs from the model, then perform entropy minimization (sharpening) via temperature scaling. This value $p$ is shared by the $K$ unlabelled data
     - Within a batch, there are $B$ labelled data and $B*K$ unlabelled data
  3. Shuffle all $B*(K + 1)$ data, then Mixup with $B$ labelled data and $B*K$ unlabelled data respectively
     - Here, mixup $\lambda' = \max(\lambda, 1-\lambda)$ is always set to be at least 0.5, so labelled mixup data is dominant in labelled data, and unlabelled mixup data is dominant in unlabelled data
  4. CE loss computed for labelled mixup data, consistency loss computed for unlabelled mixup data
- [ ] [Berthelot, David, et al. "ReMixMatch: Semi-Supervised Learning with Distribution Matching and Augmentation Anchoring." ICLR 2020.](https://openreview.net/pdf?id=HklkeR4KPB)
  - Distribution Alignment: Normalizes the prediction distribution of unlabelled data to the distribution of labelled data. That is, divides the existing prediction $q$ by the running average of the unlabelled data distribution and multiplies by the running average of the labelled data distribution
  - Augmentation Anchoring
- [ ] [Sohn, Kihyuk, et al. "Fixmatch: Simplifying semi-supervised learning with consistency and confidence." NeurIPS 2020.](https://proceedings.neurips.cc/paper/2020/file/06964dce9addb1c5cb5d6e3d9838f733-Paper.pdf)
  - Labelled image: Cross entropy using weakly augmented image
  - Unlabelled image: For weakly augmented images where predictions exceed the threshold, the one-hot encoding of this prediction is used as the pseudo label for the strongly augmented image. Predictions below the threshold are not included in the loss
    - Originally, temperature scaling was used for pseudo labeling, but temperature 0 worked well (equivalent to one-hot encoding in this case)
- [x] [Li, Xinzhe, et al. "Learning to self-train for semi-supervised few-shot classification." NeurIPS 2019.](https://proceedings.neurips.cc/paper/2019/hash/bf25356fd2a6e038f1a3a59c26687e80-Abstract.html)
  - Devises a method for selecting data to pseudo-label (self-training) for unlabeled data in few-shot SSL (SSFSC)

  - Adds a soft weighting network (SWN) module to reduce the impact of optimization in unfavorable directions due to noisy labels
  - The overall process is as follows:
    1. [Cherry picking stage 1.] Select top Z unlabeled data per class for pseudo labeling
    2. [Cherry picking stage 2.] Assign soft labels to selected unlabeled samples using SWN: Concatenate top Z samples with class-wise prototypes and feed into a RelationNet-style SWN to obtain soft values
    3. Inner update the model based on soft-labeled pseudo samples and support set
    4. Compute query loss for the inner-updated model and meta-update the model
  - Initial model parameters directly use the pre-trained model from the previous SOTA method MTL (meta transfer learning) as the starting point. Then, only the classifier weight is meta-updated (freezing the feature extractor)
- [ ] [Baixu Chen, et al. "Debiased Self-Training for Semi-Supervised Learning." NeurIPS 2022.](https://openreview.net/pdf?id=NI7moUOKtc)
  - What are data bias and training bias?:
  - Method to reduce training bias:
  - Method to reduce data bias:
- [x] [Mingcai Chen, et al. "Semi-supervised learning with multi-head co-training." AAAI 2022.](https://ojs.aaai.org/index.php/AAAI/article/view/20577)
  - Unlike existing co-training methods that require 2 or more models (backbones), this paper uses a single backbone with multiple classification heads for co-training
  - Weakly augmented samples are passed to multiple heads, and the outputs of heads other than the target head are used as pseudo-labels for the target head
  - The strongly augmented sample is passed to the target head, and loss is computed based on cross-entropy between the output and pseudo-label

### Open-Set Recognition

- Novelty Detection (ND) = One-Class Classification: Binary classification between known class and unknown class
- Open-Set Recognition (OSR): Simultaneously performs closed-set classification for known classes and unknown class detection
- Out-of-Distribution Detection (OOD): Similar to OSR, but unknown classes (outliers) exist across a broader domain
- Anomaly Detection (AD): All training data is unlabeled. i.e., unsupervised learning scenario

- [ ] [Saito, Kuniaki, Donghyun Kim, and Kate Saenko. "OpenMatch: Open-set Consistency Regularization for Semi-supervised Learning with Outliers." NeurIPS 2021.](https://arxiv.org/abs/2105.14148)
  - An algorithm for solving the open-set semi-supervised learning (OSSL) task
- [x] [Vaze, Sagar, et al. "Open-Set Recognition: A Good Closed-Set Classifier is All You Need." ICLR 2022.](https://openreview.net/pdf?id=5hLP5JY9S2d)
  - Shows that being good at close-set classification means being good at OSR (positive correlation exists between these two performances)
  - Therefore, even using the basic Maximum Softmax Probability (MSP) OSR algorithm, as long as the feature extractor performance is high, performance equal to or better than existing SOTA can be achieved
  - The paper additionally proposes the Maximum Logit Score (MLS) method using logits (before softmax), and the Semantic Shift Benchmark (SSB) split
- [ ] [Chen, Guangyao, et al. "Adversarial reciprocal points learning for open set recognition." TPAMI 2021.](https://arxiv.org/abs/2103.00953)
  - While a prototype is a vector representing the target class, a reciprocal point is a vector representing non-target classes
  - Bounds the space where unlabeled data may exist


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
  3. Training on pseudo-labelled data with ranking statistics using BCE loss (training the head $\eta^u$ and the last micro-block of $\Phi$)

  - Joint training of steps 2 and 3. However, since step 3 uses different pseudo-labels each epoch which causes training instability, MSE is added as a consistency cost (see the paper for detailed formulas)

- [ ] [Chi, Haoang, et al. "Meta discovery: Learning to discover novel classes given very limited data." ICLR 2022.](https://openreview.net/pdf?id=MEpKGLsY8f)

  - Proves that previous assumptions for Learning to Discover Novel Classes (L2DNC) were theoretically incorrect, and re-establishes theoretically viable L2DNC conditions. Additionally defines the L2DNCL task assuming the more practically relevant scenario of few novel observations
  - Since the re-established L2DNCL is similar to meta-learning assumptions, proposes MM and MP borrowing ideas from MAML and ProtoNet
  - Proposes Clustering-rule-aware Task Sampler (CATA) to integrate L2DNCL with meta-learning

- [x] [Zhong, Zhun, et al. "Neighborhood Contrastive Learning for Novel Class Discovery." CVPR 2021.](http://openaccess.thecvf.com/content/CVPR2021/html/Zhong_Neighborhood_Contrastive_Learning_for_Novel_Class_Discovery_CVPR_2021_paper.html)

  - Adds NCL, SCL, and HNG -- three methods on top of the Ranking Statistics (RS) method. However, does not use ranking statistics for pseudo-labelling; instead uses cosine similarity for pseudo-labelling
  - Neighborhood Contrastive Learning (NCL): Loss for the unlabelled dataset. In addition to self-supervised contrastive loss, labels the $k$ features with highest similarity as positive and computes additional contrastive loss. $\ell_{n c l}=\alpha \ell_{\left(z^{u}, \hat{z}^{u}\right)}+(1-\alpha) \ell_{\left(z^{u}, \rho_{k}\right)}$
  - Supervised Contrastive Learning (SCL): Loss for the labelled dataset. Same as standard supervised contrastive loss
  - Hard-Negative Generation (HNG): Uses the top $k$ most similar among interpolations between true negatives (labelled dataset) and easy negatives (unlabelled dataset) as hard negatives

- [x] [Bhattacharjee, Supritam, Devraj Mandal, and Soma Biswas. "Multi-class novelty detection using mix-up technique." WACV 2020.](https://openaccess.thecvf.com/content_WACV_2020/html/Bhattacharjee_Multi-class_Novelty_Detection_Using_Mix-up_Technique_WACV_2020_paper.html)

  - Assumes that mixing a test query with a novel class yields low output prediction values, while mixing with a base class yields high output prediction for a specific class
  - Uses K sigmoid classifiers commonly employed in open-set recognition tasks
  - For each class, takes N exemplar images and checks the output of mixed samples between these images and the test query. Averages N outputs and defines this as the membership score

- [ ] [Joseph, K. J., et al. "Novel Class Discovery without Forgetting." ECCV 2022.](https://arxiv.org/abs/2207.10659)

  - Proposes NCD without Forgetting, an advanced setting of NCD and GCD
  - The key difference from GCD is that access to base data is restricted after base data training (a harder task than GCD)
  - Solves NCDwF through pseudo-latent, mutual information based regularizer, and Known Class Identifier methods, though the details have not been fully understood yet

- [x] [Fini, Enrico, et al. "A unified objective for novel class discovery." ICCV 2021.](https://openaccess.thecvf.com/content/ICCV2021/papers/Fini_A_Unified_Objective_for_Novel_Class_Discovery_ICCV_2021_paper.pdf)

  - Unlike existing multi-step approaches (supervised learning or self-supervised pre-training using labeled data, followed by transfer clustering with unlabeled data), proposes combining all objectives into a single step from the beginning, achieving good performance
  - Reading the SwAV paper is more helpful for understanding the UNO algorithm than reading the UNO paper itself
  - It was somewhat surprising that this paper was selected as an oral paper despite not proposing fundamentally new methods (although the task changed), as it is essentially a paper that effectively combines existing methods for NCD

### Generalized Category Discovery

- [x] [Vaze, Sagar, et al. "Generalized Category Discovery." CVPR 2022.](https://arxiv.org/pdf/2201.02609.pdf)

  - The first paper to define the Generalized Category Discovery task
  - Main algorithm: Algorithm composed of ViT DINO pretraining, Supervised contrastive learning + Self-supervised contrastive learning, Semi-supervised k-means clustering (using k-means++)
  - Class number estimation method: Uses Brent's method
  - Strong baselines: Merged the two separate classification heads for labelled and unlabelled datasets in RS and UNO into one. Uses the ViT architecture proposed by the authors as the backbone, but since finetuning the backbone actually worsened performance, only the classification head was tuned with the backbone frozen

- [x] [Fei, Yixin, et al. "XCon: Learning with Experts for Fine-grained Category Discovery." arXiv preprint arXiv:2208.01898 (2022).](https://arxiv.org/abs/2208.01898)

  - For fine-grained datasets, there is a tendency to cluster based on class-irrelevant cues (e.g., background, object pose)
  - To address this, first performs k-means clustering on the dataset (which roughly groups data with similar class-irrelevant cues), then performs contrastive learning on each data split to reduce the negative impact of class-irrelevant cues
- [x] [Cao, Kaidi, Maria Brbic, and Jure Leskovec. "Open-world semi-supervised learning." ICLR 2022.](https://openreview.net/pdf?id=O-r8LOR-CCA)

  - First proposes the Open-World Semi-Supervised Learning setting that generalizes Novel Category Discovery to traditional SSL (same setting as Generalized Category Discovery)
  - Proposes ORCA, an end-to-end algorithm that adjusts the intra-class of known (seen) classes while learning, based on the uncertainty of unlabeled data
    - e.g., When unlabeled data uncertainty is low, fully exploit labeled data
    - This prevents discriminative representation learning for known classes from progressing too quickly relative to novel classes
  - Composed of three main objectives: Supervised objective w. uncertainty adaptive margin, Pairwise objective, Regularization term
    - Supervised objective w. uncertainty adaptive margin: $
        \mathcal{L}_{\mathrm{S}}=\frac{1}{n} \sum_{z_i \in \mathcal{Z}_l}-\log \frac{e^{s\left(W_{y_i}^T \cdot z_i+\lambda \bar{u}\right)}}{e^{s\left(W_{y_i}^T \cdot z_i+\lambda \bar{u}\right)}+\sum_{j \neq i} e^{s W_{y_j}^T \cdot z_i}}
        $ where uncertainty $\bar{u}=\frac{1}{\left|\mathcal{D}_u\right|} \sum_{x_i \in \mathcal{D}_u} 1-\max _k \operatorname{Pr}\left(Y=k \mid X=x_i\right)$
    - Pairwise objective: $
        \mathcal{L}_{\mathrm{P}}=\frac{1}{m+n} \sum_{\substack{z_i, z_i^{\prime} \in
        \left(\mathcal{Z}_l \cup \mathcal{Z}_u, \mathcal{Z}_l^{\prime} \cup \mathcal{Z}_u^{\prime}\right)}}-\log \left\langle\sigma\left(W^T \cdot z_i\right), \sigma\left(W^T \cdot z_i^{\prime}\right)\right\rangle
        $
    - Regularization term: $\mathcal{R}=K L\left(\frac{1}{m+n} \sum_{z_i \in \mathcal{Z}_l \cup \mathcal{Z}_u} \sigma\left(W^T \cdot z_i\right) \| \mathcal{P}(y)\right)$
- [x] [Rizve, Mamshad Nayeem, et al. "OpenLDN: Learning to Discover Novel Classes for Open-World Semi-Supervised Learning." ECCV 2022.](https://arxiv.org/pdf/2207.02261.pdf)
  1. Performs the OpenLDN algorithm based on pairwise loss, cross entropy, and regularization to discover novel classes
  2. Reinitializes all parameters, then performs closed-SSL again based on the novel pseudo labels obtained from OpenLDN (using MixMatch and UDA)
  3. Uses an iterative pseudo labeling strategy so that novel pseudo labels improve as training progresses
- [x] [Xin Wen, et al. "A Simple Parametric Classification Baseline for Generalized Category Discovery." Under review.](https://arxiv.org/abs/2211.11727)
  - Identifies why existing parametric classifiers failed in the GCD setting (less discriminative representation & unreliable pseudo-labeling strategy), and modifies existing algorithms based on these findings to achieve SOTA performance with a parametric classifier
  - In conclusion, only a "parametric classification" objective was added to GCD's representation learning approach (self-supervised & supervised contrastive learning). Non-parametric clustering is not used (just read section 4.2. of the paper)
  - Insights discovered prior to experiments:
    1. Classifier: Parametric (linear, cosine) classifier is better than class-mean classifier
    2. Representation: Using the representation directly from the backbone is better than using representation after the projector
    3. Decoupling (GCD) vs. Joint training (UNO): UNO's poor performance was because UNO used 'self-label'. Switching to 'self-distill' (section 4.2.) shows better performance than GCD
  - Self-distill: Outputs model predictions for 2 different views, then applies sharpening to one output and uses it as the pseudo label for the other output (additionally adds an entropy regularization term to prevent dead prototypes)
- [ ] [Sheng Zhan, et al. "PromptCAL: Contrastive Affinity Learning via Auxiliary Prompts for Generalized Novel Category Discovery." Under review.](https://openreview.net/pdf?id=yVcLmMW5ySI)
  - Warm-up process for representation using Multi-Prompt Clustering (MPC). In $L_1(\boldsymbol{x})=L_{\mathrm{semi}}^{\mathrm{CLS}}(\boldsymbol{z})+\gamma L_{\mathrm{semi}}^{\mathrm{CLU}}\left(\overline{\boldsymbol{z}}_{\mathrm{CLU}}\right)$, $L_{\mathrm{semi}}^{\mathrm{CLS}}(\boldsymbol{z})$ is the same as GCD's contrastive learning but with prompt weights added at each layer, and $L_{\mathrm{semi}}^{\mathrm{CLU}}\left(\overline{\boldsymbol{z}}_{\mathrm{CLU}}\right)$ features contrastive learning performed on [CLU] prompts
  - Generates an affinity graph for pseudo-positive selection using semi-supervised affinity generation (SemiAG). Uses graph diffusion to spread labels to each node, initializing edge weights to 1 for same-class edges and 0 for different-class edges
  - Since computing the affinity graph for all data every time is infeasible, graph sampling techniques are employed, and contrastive affinity learning (CAL) is performed using the sampled graphs
  - Notably, the performance on fine-grained datasets is very impressive
- [ ] [Florent Chiaroni, et al., "Mutual Information-based Generalized Category Discovery." Under review.](https://arxiv.org/pdf/2212.00334.pdf)
  - Tunes the model using entropy $\mathcal H(Y)$, conditional entropy $\mathcal H(Y|Z)$, and cross entropy
  - Reducing conditional entropy encourages the model to output confident predictions, while the entropy term helps balance class predictions
- [ ] [Bingchen Zhao, et al., "Generalized Category Discovery via Adaptive GMMs without Knowing the Class Number." Under review.](https://openreview.net/pdf?id=oQjWltREeRA)
  - E-step: Semi-supervised k-means to estimate GMM class number and prototypes
  - M-step: Prototypical contrastive learning based on estimated class number and prototypes
  - The prototypical contrastive learning formula in the M-step appears no different from softmax cross-entropy using prototypes as classifiers

### Data Augmentation

- [ ] [Zhang, Hongyi, et al. "mixup: Beyond Empirical Risk Minimization." ICLR 2018.](https://openreview.net/pdf?id=r1Ddp1-Rb)
- [x] [Yun, Sangdoo, et al. "Cutmix: Regularization strategy to train strong classifiers with localizable features." ICCV 2019.](https://openaccess.thecvf.com/content_ICCV_2019/html/Yun_CutMix_Regularization_Strategy_to_Train_Strong_Classifiers_With_Localizable_Features_ICCV_2019_paper.html)
- [x] [Verma, Vikas, et al. "Manifold mixup: Better representations by interpolating hidden states." ICML 2019.](https://proceedings.mlr.press/v97/verma19a.html)
  - Unlike conventional input-space mixup, this method mixes up representations at intermediate layers
  - $\left(\tilde{g}_{k}, \tilde{y}\right):=\left(\operatorname{Mix}_{\lambda}\left(g_{k}(x), g_{k}\left(x^{\prime}\right)\right), \operatorname{Mix}_{\lambda}\left(y, y^{\prime}\right)\right)$
  - Has the effect of making eigenvalues overall smaller when SVD is performed. i.e., reduces the number of principal components (flattening)
  - Through flattening, eigenvalues become overall smaller leading to reduced volume, and compression is theoretically and experimentally associated with generalization from an information theory perspective, which is advantageous
- [ ] [Lim, Soon Hoe, et al. "Noisy feature mixup." ICLR 2022.](https://openreview.net/pdf?id=vJb4I2ANmy)
- [ ] [Wen, Yeming, et al. "Combining Ensembles and Data Augmentation Can Harm Your Calibration." ICLR 2021.](https://openreview.net/forum?id=g11CZSghXyY)

### Object Detection
- [x] [Zhu, Xizhou, et al. "Deformable DETR: Deformable Transformers for End-to-End Object Detection." ICLR 2021.](https://arxiv.org/abs/2010.04159)
- [x] [Carion, Nicolas, et al. "End-to-end object detection with transformers." ECCV  2020.](https://link.springer.com/chapter/10.1007/978-3-030-58452-8_13)
- [ ] [Dai, Jifeng, et al. "Deformable convolutional networks." ICCV 2017.](http://openaccess.thecvf.com/content_iccv_2017/html/Dai_Deformable_Convolutional_Networks_ICCV_2017_paper.html)
- [ ] [Tian, Zhi, et al. "Fcos: Fully convolutional one-stage object detection." ICCV 2019.](https://openaccess.thecvf.com/content_ICCV_2019/html/Tian_FCOS_Fully_Convolutional_One-Stage_Object_Detection_ICCV_2019_paper.html)
  - Redefines object detection as per-pixel prediction. Therefore, model predictions are performed per pixel, producing class predictions and bbox predictions (and centerness predictions) at the pixel level. Since it is defined as per-pixel prediction, a large number of foreground samples can be used for training the regressor
  - Uses FPN and shared heads on multi-level features for predictions
  - Also adds centerness loss that predicts how close the current pixel is to the object center. At inference time, this is multiplied with the classification score to naturally filter out low quality predictions, and then NMS is applied to obtain final bbox predictions

### Image Segmentation

- [ ] [Zhi Tian, et al., "Boxinst: High-performance instance segmentation with box annotations," CVPR 2021.](https://openaccess.thecvf.com/content/CVPR2021/html/Tian_BoxInst_High-Performance_Instance_Segmentation_With_Box_Annotations_CVPR_2021_paper.html)
- [ ] [Meta AI Research, "Segment Anything," 2023](https://scontent-ssn1-1.xx.fbcdn.net/v/t39.2365-6/10000000_900554171201033_1602411987825904100_n.pdf?_nc_cat=100&ccb=1-7&_nc_sid=3c67a6&_nc_ohc=YLTtOW2cPwwAX_Yy2Sd&_nc_ht=scontent-ssn1-1.xx&oh=00_AfB4YsQnTr0-I00xt5Q9W1P6Qbe_M9ey4Y1zBP7vvmRbLA&oe=643500E7)
  - Develops a foundation model for image segmentation
  - SAM is a generalized version of interactive segmentation (where humans iteratively guide mask corrections) and automatic segmentation (directly segmentable but requires large amounts of training data). In other words, both approaches are possible
  - In quantitative evaluation of zero-shot instance segmentation, ViTDet is better, but in human evaluation, SAM is better
  - Task: Promptable segmentation (for pre-training): Must return at least one valid segmentation mask even when various ambiguous prompts are provided including foreground/background points, boxes, masks, and free-form text
    - Interactive segmentation follows prior works
    - Foreground, background points: (x, y, fg/bg)
    - Boxes, masks: (x1, y1, x2, y2)
    - Free-form text: Not yet released
  - Model: Segment Anything Model (SAM)
    - Image encoder: MAE pre-trained ViT
    - Prompt encoder: input points and boxes by positional encoding, free-form text with text encoder CLIP, and dense(mask) prompt are embedded by ConvNet and summed element-wise with the image embedding
    - Mask decoder: a modification of a Transformer decoder block
    - Resolving ambiguity: Modified model architecture to have multi-output masks to handle ambiguous prompts. 3 was sufficient, and during training only the output with the smallest loss was backpropagated
    - Losses: linear combination of focal and dice loss 20:1
  - Data: Data engine and Dataset (SA-1B)
    - Data engine (model-in-the-loop): Initially trained on public segmentation datasets (1) model assist annotator (classic interactive segmentation setup) - (2) semi-automatic annotation - (3) fully automatic mask creation
    - SA-1B: the largest ever segmentation dataset (400x more masks than any existing segmentation dataset)
- [ ] [Tian, Zhi, Chunhua Shen, and Hao Chen. "Conditional Convolutions for Instance Segmentation." ECCV 202.](https://link.springer.com/chapter/10.1007/978-3-030-58452-8_17)
  - MaskRCNN feeds ROIs as input to fixed weights to output masks, but when two person instances A and B highly overlap with similar features, it is difficult to identify B as background for A
  - CondInst: (1) Composed entirely of ConvNets without ROI crop or feature alignment. (2) Uses dynamically generated ConvNets instead of fixed weights, making the mask head very compact and fast
  - The operation sequence is as follows:
    1. Feed image input into FPN to extract multi-resolution features
    2. Generate classification prediction and filter parameter $\theta_{x,y}$, as well as center-ness output and box output based on features. Filter parameters are 1x1 8 channel conv, with 3 of them (conv1, conv2, conv3). Since ROI is not used, the box head is technically unnecessary, but using NMS based on the box head reduces inference time
    3. Append relative coord to mask branch $F_\text{mask} \in \mathbb R^{H,W,C}$, then feed this mask feature as input to the mask ConvNet head based on $\theta_{x,y}$. The mask feature is 1/8 of the image input resolution. The number of conditioned filters can be thought of as the number of instances (in MaskRCNN, the number of ROI boxes represents the number of instances)
    4. Uses FCOS loss and Mask loss as loss functions
- [x] [Cheng, Bowen, Omkar Parkhi, and Alexander Kirillov. "Pointly-supervised instance segmentation." CVPR 2022.](http://openaccess.thecvf.com/content/CVPR2022/html/Cheng_Pointly-Supervised_Instance_Segmentation_CVPR_2022_paper.html)
  - Box-supervised methods like BoxInst already exist but performance is still poor. However, fully-supervised methods are too costly
  - Therefore, the authors suggest using point-supervision in addition to box-supervision, and propose an efficient (fast) method for creating point-supervision based on box-supervision
    1. Annotators first create bboxes, then points are randomly sampled within them
    2. Annotators then perform foreground and background labeling for these points
    3. This process takes about 15 seconds per instance -- about 5x faster than fully supervised labeling

  - The point supervision created this way is made compatible with all other instance segmentation pipelines. Specifically, a method for computing mask loss using this point supervision was devised
    1. Predictions are performed identically to existing instance segmentation models
    2. Loss is computed for GT points, where prediction points use bilinear interpolation of prediction masks. This method requires no structural changes to existing instance segmentation models, which is advantageous
- [x] Tianheng Cheng, et al. "Boxteacher: Exploring high-quality pseudo labels for weakly supervised instance segmentation." CVPR 2023.
  1. Models are trained in teacher-student architecture (using CondInst as the backbone), with strong augmentation applied to image inputs
  2. Not all model predictions are used as pseudo labels; only predictions that are sufficiently similar to box GT (high IoU) and where the model shows strong confidence (high confidence) are filtered and used as pseudo labels
  3. Additionally, a loss designed to reduce prediction noise is devised and applied

- [x] Ruihuang Li, et al. "SIM: Semantic-aware Instance Mask Generation for Box-Supervised Instance Segmentation." CVPR 2023.
  1. Prepare a pre-trained instance segmentation model (CondInst and Mask2Former)
  2. Obtain semantic mask by measuring similarity with class-wise prototypes
  3. Obtain instance mask
  4. Obtain pseudo mask by weighted averaging semantic mask and instance mask

- [ ] Beomyoung Kim, et al. "The Devil is in the Points: Weakly Semi-Supervised Instance Segmentation via Point-Guided Mask Representation." CVPR 2023.
  1. If only 10% of the dataset is fully labeled, point supervision is provided for the remaining 90%. Of course, this must be created by humans, but since it is one point per instance, the cost is low
  2. (Step 1): First train the Teacher network and MaskRefineNet on fully-labeled data. MaskRefineNet takes [Teacher's mask prediction / image / Instance Point] as input and improves the mask prediction. That is, it uses point labels to update masks to better predictions!
     1. During Teacher training, since point supervision does not exist in the dataset, the center point of the mask prediction is used as the input point
     2. During Student training, since point supervision exists in the dataset, the provided point supervision is used
  3. (Step 2): Teacher's predictions are improved using MaskRefineNet, then the improved masks are used as pseudo-labels
  4. An additional adaptive strategy for further refining pseudo labels is also proposed

### Multi-Modal Learning

- [ ] [Lee, Kenton, et al. "Pix2Struct: Screenshot parsing as pretraining for visual language understanding." arXiv preprint arXiv:2210.03347, 2022.](https://arxiv.org/abs/2210.03347)
  - Visually-Situated Language Understanding: Documents, tables, infographics, and user interfaces (UIs) are intended to be consumed holistically, without clear boundaries between textual and visual elements
  - Prior works for visually-situated language understanding were too scattered, with models, approaches, and data not being widely shared
  - Pre-training: This paper devises a 'pre-training method that takes masked screenshots of web pages as input and predicts HTML', building a general-purpose visually-situated language understanding model
  - Curriculum learning: Having a warm-up stage with very easy parsing problems (e.g., HTML parsing with only colored text) at the beginning of training leads to faster convergence and better fine-tuning performance (see Appendix D)
  - Transfer learning: Proposes a new fine-tuning strategy for ViT called variable-resolution input representation. Typically ViT rescales to a pre-defined resolution before extracting image patches, which may distort screenshots or hinder transfer learning at high resolutions. Therefore, the authors provide 2D absolute positional embeddings along with input patches
  - Architecture: image-encoder-text-decoder ViT
- [ ] Xiaoshuai Hao, et al. "Mixgen: A new multi-modal data augmentation." WACV Workshop 2023.
  - Images are interpolated, text is concatenated
- [ ] Liu, Zichang, et al. "Learning Multimodal Data Augmentation in Feature Space." ICLR 2023.

  - Introduces Task Network and Augmentation Network for learning-based multi-modal feature augmentation
- [ ] So, Junhyuk, et al. "Geodesic multi-modal mixup for robust fine-tuning." *arXiv preprint arXiv:2203.03897* (2022).

  - CLIP's embeddings are separated between text and image. This is the first paper to analyze and address this problem with CLIP embeddings
  - Finding: Increasing temperature improves uniformity and alignment measures, but degrades downstream task performance
  - Proposes geodesic multi-modal mixup (m2 mixup) to address this
    - Creates hard negatives using image-text feature mixup and inserts them into the contrastive loss
    - Since the feature mixup (interpolation) is performed on a hypersphere, it is named geodesic mixup
    - Improves alignment between text and image embeddings, achieving robustness in fine-tuning

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

  - Previous NAS research was conducted only using RL due to the non-differentiable search space. DARTS defines a differentiable search space and introduces bilevel optimization (identical to MAML's optimization approach) to enable gradient descent-based NAS

  1. Differentiable architecture search: Weight $\alpha$ optimization through the bilevel optimization formula defined in the paper
  2. Discretization step: Removing unnecessary operation edges based on $\alpha$ and $k$
  3. Retraining for the top-$k$ strongest operations: Retraining from scratch on the remaining operation edges

### Long-Tailed Recognition

- [ ] [Kang, Bingyi, et al. "Decoupling Representation and Classifier for Long-Tailed Recognition." ICLR 2020.](https://openreview.net/pdf?id=r1gRTCVFvB)

### Bayesian Deep Learning

- [ ] [Gal, Yarin, and Zoubin Ghahramani. "Dropout as a bayesian approximation: Representing model uncertainty in deep learning." ICML 2016.](http://proceedings.mlr.press/v48/gal16.html)

### Deep Neural Architectures

- [ ] [Geoffrey Hinton. "The Forward-Forward Algorithm: Some Preliminary Investigations." (2022).](https://www.cs.toronto.edu/~hinton/FFA13.pdf)

### Image Editing

- [ ] [Winter, Daniel, et al. "Objectdrop: Bootstrapping counterfactuals for photorealistic object removal and insertion." ECCV 2024.](https://arxiv.org/abs/2403.18818)

  - Trains a diffusion model on a well-curated counterfactual dataset
  - Removal: Photographing a scene, removing the object, and re-photographing the scene (counterfactual supervised training)
  - Insertion: Uses synthetic datasets (bootstrap supervision)
    1. Train an object removal model
    2. Generate vast synthetic datasets through the removal model
    3. Tune the diffusion model using this dataset

- [x] [Xiao, Shitao, et al. "Omnigen: Unified image generation." arXiv preprint arXiv:2409.11340 (2024).](https://arxiv.org/abs/2409.11340)

  - **Unification:** txt2img, image editing, subject-driven generation, visual-conditional generation, etc. are all possible in a single model
  - **Simplicity:** Simple architecture with no need for a text encoder. Only VAE and Transformer exist
    - Similar to LLaVa, images are received as patch embeddings from the VAE encoder, text as text tokens, and timestep and noise are all converted to token format and passed as input to the transformer
    - Finally, only the noise token output is taken and passed through the decoder
  - **Knowledge Transfer:** Trained in a unified form across multiple tasks
  - Constructs and shares the X2I (anything to image) dataset that enables unified training across multiple tasks

- [ ] [Avrahami, Omri, et al. "Stable Flow: Vital Layers for Training-Free Image Editing." arXiv preprint arXiv:2411.14430 (2024).](https://arxiv.org/abs/2411.14430)

  - Devises a method that analyzes the DiT model architecture using flow matching to automatically identify vital layers (key layers) and uses them to perform various image editing tasks without training

  - **Measuring the Importance of DiT Layers**: Analyzes how image quality changes when each layer is removed from the DiT architecture, and searches for vital layers. By injecting editing information only into vital layers, more stable editing is possible
  - **Image Editing using Vital Layers**: Inserts attention information from vital layers into the new edited image to adjust only the changed parts. Various edits can be performed in the same manner
  - **Latent Nudging for Real Image Editing**: Applying existing Inverse Euler ODE solver causes differences from the original image. Applies latent nudging technique to improve preservation of the original image during editing

- [x] Mao, Chaojie, et al. "Ace++: Instruction-based image creation and editing via context-aware content filling." arXiv preprint arXiv:2501.02487 (2025)

  - Proposes an instruction-based diffusion framework

  - Uses LCU from ACE to define inputs, but proposes **LCU++** with a more efficient channel-wise feature concat approach

  - **All-around model**: After learning 0-ref text-to-image tasks, trains using all data proposed in the ACE paper (0-ref + N-ref)

  - **Task-specific model**: Uses Flux.1-Fill-dev as starting point for LoRA fine-tuning

  - 0-ref task: $\mathbf{L C U}_{0-\mathrm{ref}}^{++}=\left\{\{T\},\left\{V^{++}\right\}\right\}, \quad V_{0 \text {-ref }}^{++}=\left\{\left[I^{i n} ; M^{i n} ; X_t\right]\right\}$

  - General task. Below, $I^N$ is the sample we want to transform (edit image)
    $$
    \begin{aligned}
    \mathrm{LCU}^{++} & =\left\{\left\{T_1, T_2, \ldots, T_m\right\},\left\{V_1^{++}, V_2^{++}, \ldots, V_m^{++}\right\}\right\} \\
    V^{++} & \left.=\left\{I^1 ; M^1 ; X_t^1\right],\left[I^2 ; M^2 ; X_t^2\right], \ldots,\left[I^N ; M^N ; X_t^N\right]\right\}
    \end{aligned}
    $$

  - **Loss**: Given the sample to transform $I^N$, $\sum_{N-1}^{i=0} \mathbb{E}_{t, \mathbf{x}_0, \mathbf{x}_1}\left\|\mathbf{v}_t^i-\mathbf{u}_t^i\right\|^2+\mathbb{E}_{t, \mathbf{x}_0, \mathbf{x}_1}\left\|\mathbf{v}_t^N-\mathbf{u}_t^N\right\|^2$

    - For reference images, velocity prediction toward original recovery
    - For target images, velocity prediction toward good generation

### Technical Report

- [ ] [Wu, Yuxin, and Justin Johnson. "Rethinking" Batch" in BatchNorm." arXiv preprint arXiv:2105.07576, 2021.](https://arxiv.org/pdf/2105.07576.pdf)
- [x] [Lipton, Zachary C., and Jacob Steinhardt. "Troubling trends in machine learning scholarship." arXiv preprint arXiv:1807.03341, 2018.](https://arxiv.org/abs/1807.03341)
- [ ] [Ridnik, Tal, et al. "Solving ImageNet: a Unified Scheme for Training any Backbone to Top Results." arXiv preprint arXiv:2204.03475 , 2022.](https://arxiv.org/pdf/2204.03475.pdf)
  - Not a paper proposing new methods, closer to a technical report
  - Proposes USI (Unified Scheme for ImageNet) that can be uniformly applied to any model architecture on the ImageNet dataset without hyperparameter tuning. Uses knowledge distillation and several modern tricks, surpassing previous SOTA for all models
  - Using a TResNet-L teacher model with the hyperparameters proposed in the paper improves performance for all student model types: CNN, Transformer, Mobile-oriented, and MLP-only
  - Same as vanilla KD: cross entropy loss for true label y, and KLD computed between soft labels (created with temperature) from teacher labels and student predictions
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
