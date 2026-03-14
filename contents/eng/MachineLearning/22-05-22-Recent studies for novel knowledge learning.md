---
title: "Recent Studies for Novel Knowledge Learning"
date: "2022-05-22"
template: "post"
draft: true
path: "/deeplearning/22-05-22/"
description: "ML algorithms that start from a base model and expand knowledge by learning novel information offer advantages such as saving data storage space and reducing computing costs. This post surveys recent research trends related to this topic of novel knowledge learning."
category: "Deep Learning"
thumbnail: "deeplearning"
---

> ML algorithms that progressively learn new knowledge starting from a base model not only enable human-like learning but also offer advantages such as saving data storage space, reducing computing costs, and addressing security concerns. This post surveys recent research trends related to the topic of novel knowledge learning.

### Introduction

There have been numerous attempts to leverage previously learned knowledge for learning new information. This line of research is essential for advancing toward AGI and, as mentioned in a [previous post](https://yuhodots.github.io/deeplearning/21-08-01/), can help save data storage space, reduce computational costs, and resolve security issues.

Related research includes directions such as "learning new knowledge without forgetting previously learned knowledge," represented by Continual Learning, Class-Incremental Learning, and Dynamic Few-Shot Learning, as well as "leveraging learned knowledge to learn (exclusively) new knowledge quickly and accurately," represented by Meta-Learning and Transfer Learning. However, since considerable time has passed since these tasks were first proposed, and some contain unnatural settings, there have been ongoing calls to redefine these tasks in forms closer to real-world problem scenarios.

Following this trend, newly defined tasks related to novel knowledge learning have been appearing at major ML/AI conferences since 2019 and 2020, with an even higher frequency this year. This motivated me to write this post summarizing two particularly interesting tasks: 'Blurry CIL' and 'Novel Class Discovery (NCD).'

### Blurry Class-Incremental Learning

In the conventional Class-Incremental Learning task, given a total of 100 classes, 100/N classes are sequentially introduced over N stages. Each input of a class set is considered a single task, and training ends after all N tasks have been provided. The classes across tasks are disjoint, and data from previous tasks is not provided again when learning new tasks. Therefore, the goal is to learn new tasks well while preserving knowledge from previous ones. While this problem definition is well-suited to the concept of learning new knowledge without forgetting old knowledge in the absence of additional data, it is somewhat unnatural in real-world scenarios to assume that previously seen classes would never be observed at all during the learning of new knowledge (the disjoint assumption).

Therefore, Blurry CIL, in contrast to conventional CIL where each task has a disjoint class set, adopts a setting where tasks share classes. Instead, newly introduced novel classes become the majority class for each task, with the ratio of the majority class set significantly higher than that of other classes. As a result, the data within each task is imbalanced across classes.

For example, the Rainbow Memory (Bang et al.) paper illustrates that in an online clothing shopping search, new items may be added each season and search volumes vary by season. Although this example is not strictly class-incremental learning, it still demonstrates that Blurry CIL is closer to real-world problem settings than Disjoint CIL.

This is denoted as *BlurryM*. $(100-M)$% consists of majority classes and $M$% consists of the remaining classes in a balanced manner. Typically, Blurry10 means 90% majority classes within a task, with the remaining 10% equally divided among previous task classes.

The Blurry task is expected to be relatively less affected by the forgetting problem compared to Disjoint CIL. However, since it introduces the additional challenge of data imbalance within tasks compared to conventional CIL, methods that can address this issue are needed. The following papers provide more details.

- Aljundi, Rahaf, et al. "Gradient based sample selection for online continual learning." *Advances in neural information processing systems* 32 (2019).
- Bang, Jihwan, et al. "Rainbow memory: Continual learning with a memory of diverse samples." *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition*. 2021

### Novel Class Discovery

Learning new classes that have never been seen before requires labeled data. But what happens if there is not enough labeled data to train the model? Naturally, the model cannot be trained well. To address this problem, prior research used a transfer learning approach: pretraining a model on a large dataset such as ImageNet to learn good representations, then fine-tuning those parameters on the target dataset. However, this approach presupposes that a large dataset is needed for pretraining to learn sufficiently good representations, and that the target dataset for fine-tuning must also be labeled.

In Few-shot & Meta-learning, to train a model with high generalization performance capable of handling any new class at inference time, N classes are sampled during the training phase and provided to the model as various class combination tasks repeated many times. While this approach achieves better generalization for novel classes than transfer learning and requires only few shots, it has the drawback of needing many training classes to sample diverse class combinations during the training stage.

Novel class discovery aims to solve the same problem as transfer learning and meta-learning, but tackles the more challenging scenario where novel classes have no labels at all. The labeled classes $C^l$ and unlabeled classes $C^u$ are disjoint.

For example, suppose a model trained on dog and cat data is used to distinguish between monkeys and birds. The dog and cat data used during training was labeled. However, monkey and bird images are provided as an unlabeled dataset with no labels attached. Therefore, the model must sufficiently leverage previously learned representations to perform clustering such that novel classes are well separated. For a dataset with 100 classes, a model trained on 80 base classes must cluster 20 unlabeled novel classes. This is not entirely unsupervised clustering, because the existing 80 labeled classes can be utilized to help distinguish the 20 novel classes.

Since clustering performance on the unlabeled dataset must be evaluated, clustering accuracy is used as the evaluation metric. The following papers provide more details.

- Hsu, Yen-Chang, Zhaoyang Lv, and Zsolt Kira. "Learning to cluster in order to transfer across domains and tasks." *International Conference on Learning Representations*. 2018.
- Kai Han, Andrea Vedaldi, and Andrew Zisserman. Learning to discover novel visual categories via deep transfer clustering. In *Proc. ICCV*, 2019
- Kai Han, Sylvestre-Alvise Rebuffi, Sebastien Ehrhardt, Andrea Vedaldi, and Andrew Zisserman. Automatically discovering and learning new visual categories with ranking statistics. In *Proc. ICLR*, 2020

NCD can be further divided into several sub-types: (1) classifying novel categories when the number of clusters is given, (2) estimating the number of novel classes when the cluster number is unknown, and (3) classifying novel categories using the estimated class number. "Learning to cluster in order to transfer across domains and tasks." experiments with all three cases, while "Automatically discovering and learning new visual categories with ranking statistics" provides the number of unlabeled classes in advance, though unknown class number experiments are also included in the appendix. Additionally, the latter paper also defines and solves a more realistic incremental learning scheme where the model must perform well on both the existing labeled classes $C^l$ and unlabeled classes $C^u$ simultaneously.

NCD can be viewed as a form of transfer learning: leveraging knowledge from the source domain to solve the clustering problem in the target domain. The domain shift here is not as drastic as in domain adaptation tasks; rather, it involves a relatively small distributional shift between disjoint class sets within the same dataset. However, NCD papers do not explicitly state this assumption, and the paper "Meta-discovery" pointed out that if this assumption is not properly observed, it becomes a theoretically unsolvable problem.

##### Deep Transfer Clustering for NCD

- First extended the deep clustering problem to deep transfer clustering. In other words, this is the paper that first proposed Novel Class Discovery.

##### Ranking Statistics for NCD

1. Self-supervised pre-training on labelled and unlabelled data using RotNet loss (training $\Phi$)
2. Supervised training on labelled data using CE loss (training the head $\eta^l$ and the last micro-block of $\Phi$)
3. Training on pseudo-labelled data with ranking statisitics using BCE loss (training the head $\eta^u$ and the last micro-block of $\Phi$)

- Steps 2 and 3 are jointly trained.
- However, since step 3 is pseudo-labeled differently at each epoch, which causes training instability, an MSE consistency cost is added. This is a loss that minimizes the difference between outputs of randomly transformed inputs and original outputs.

##### Neighborhood Contrastive Learning for NCD

- This paper adds three methods--NCL, SCL, and HNG--on top of the Ranking Statistics (RS) approach. However, instead of using ranking statistics for pseudo-labeling, pseudo-labeling is performed based on cosine similarity.
- Neighborhood Contrastive Learning (NCL): A loss for the unlabeled dataset. In addition to the self-supervised contrastive loss, the $k$ features with the highest similarity are labeled as positive to compute an additional contrastive loss. $\ell_{n c l}=\alpha \ell_{\left(z^{u}, \hat{z}^{u}\right)}+(1-\alpha) \ell_{\left(z^{u}, \rho_{k}\right)}$
- Supervised Contrastive Learning (SCL): A loss for the labeled dataset, identical to the standard supervised contrastive loss.
- Hard-Negative Generation (HNG): The $k$ most similar samples among interpolations between true negatives (labeled dataset) and easy negatives (unlabeled dataset) are used as hard negatives.

##### Generalized Class Discovery (GCD)



##### Finding the number of novel categories (AutoNovel & RS)

1. KCL amd MCL assume the num- ber of categories to be a large value (i.e., 100) instead of estimating the number of categories explicitly
2. DTC and AutoNovel algorithms: Perform k-means while varying data splits, and consider the k that best predicts the labeled data as the correct k.
   1. Set $C^l_r$ as the probe class number, and perform supervised feature representation with $C^l - C^l_r$ classes
   2. Split $C^l_r$ into anchor probe set $C^l_{ra}$ and validation probe set $C^l_{rv}$, then perform **constrained (semi-supervised) k-means**
   3. At this point, the anchor probe set $C^l_{ra}$ is fixed with assigned labels, while the validation probe set $C^l_{rv}$ is treated as additional unlabelled data
   4. Loop $k$ from $C^l_r \to C^l_r + C^u_{\max}$
   5. Measure ACC for $D^l_{rv}$ and CVI for $D^u$
      - Average clustering accuracy(ACC): Permutations are optimized using the Hungarian algorithm
      - Cluster validity index(CVI): Silhouette index was used among several metrics
   6. Find $C^{u*}_a$ optimal from ACC perspective and $C^{u*}_v$ optimal from CVI perspective, then select $\hat{C}^u = (C^{u*}_a + C^{u*}_v)/2$ as the final number of unlabelled classes
   7. Perform k-means once more with this value and drop outliers from the dataset


---

To truly solve real-world problems:

1. The number of novel classes should not be provided as a priori
   - That is why NCD papers include experiments on estimating the number of novel classes
2. The model should be able to classify + cluster both base classes and novel classes
