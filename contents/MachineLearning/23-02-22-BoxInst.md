---
title: "BoxInst: Instance Segmentation with Box Annotations"
date: "2023-02-22"
template: "post"
draft: false
path: "/deeplearning/23-02-22/"
description: "CVPR 2021 학회에서 발표된 BoxInst 논문을 정리합니다. 해당 논문은 mask-level annotation이 아닌 bounding box annotation 만으로도 instance segmentation 모델을 학습시킬 수 있는 projection loss와 pairwise affinity loss라는 두 가지 loss를 제안합니다."
category: "Deep Learning"
thumbnail: "deeplearning"
---

> CVPR 2021 학회에서 발표된 'BoxInst: High-performance instance segmentation with box annotations' 논문을 정리합니다. 해당 논문은 mask-level annotation이 아닌 bounding box annotation 만으로도 instance segmentation 모델을 학습시킬 수 있는 projection loss와 pairwise affinity loss라는 두 가지 loss를 제안합니다.

`아직 작성이 완료되지 않은 포스팅입니다.`

### Segmentation Tasks

설명은 한줄씩만 적고, 나머지는 사진으로 제공

- Semantic Segmentation: class label도 알아맞춰야 하는건가?
- Instance Segmentation: class label은 알아맞출 필요는 없는건가?
- panoptic segmentation:
- point cloud (3d) semantic segmentation

최근, 속도 측면에서 detector FCOS나 CondInst 기반의 알고리즘들의 instance segmentation 속도가 bounding-box object detection 만큼 빠르기 때문에 굳이 object detec하는 경우에도 instance segmentation 쓰는 경우 늘어나고 있다고 함. 따라서 pixel-level mask annotation이라는 작업만 없다면 완전히 대체될 수도 있지 않을까 싶음 (weakly supervised instance segmentation의 중요성)

### Weakly-Supervised Image Segmentation

설명은 한줄씩만 적고, 나머지는 사진으로 제공하기

- Image-level class label
- Bounding boxes
- Scribbles

##### Explanation by ChatGPT

Weakly supervised instance segmentation is a type of image segmentation where only partial or weak supervision is available during training. In this approach, the labeling information is not precise, and only some information about the location or presence of instances is provided.

To deal with this type of weak supervision, different types of labels can be used, including:

1. Image-level labels: This type of label provides information about the presence or absence of instances within an image. These labels are usually obtained by labeling the entire image rather than individual objects within it.
2. Scribble or bounding box labels: These labels provide more precise information about the location of objects within the image. Scribble labels are rough annotations made by drawing a rough outline around an object, while bounding box labels define the approximate rectangular boundaries of an object.
3. Point or dot labels: Point or dot labels are similar to scribble labels, but instead of drawing an outline, a single point or dot is used to indicate the presence of an object.
4. Partial or incomplete labels: These labels indicate that only part of the object is visible in the image. These types of labels are useful when the object is occluded or only partially visible.
5. Noisy labels: In some cases, the labels provided may be noisy or incorrect, and this can be addressed using techniques like label smoothing or data augmentation.

The choice of label type depends on the nature of the data and the specific requirements of the application. In general, more precise labels lead to better performance, but they also require more annotation effort.

### Preliminaries

##### Dynamic Mask Heads

- 내용을 추가하고 있습니다.

##### Multiscale Combinatorial Grouping (MCG)

- non-deep learning based model
- 내용을 추가하고 있습니다.

##### GrabCut and GrabCut+

- non-deep learning based model
- 내용을 추가하고 있습니다.

##### Conditional Random Field (CRF)

- non-deep learning based model
- 내용을 추가하고 있습니다.

##### Mask R-CNN

- 내용을 추가하고 있습니다.
- Fixed mask head(Mask R-CNN)와 dynamic filter(CondInst)의 차이점 서술

##### Region of Interest (RoI)

- 내용을 추가하고 있습니다.

### Prior Works

##### BoxSup and Box2Seg

- BoxSup은 MCG의 region proposal를, Box2Seg는 GrabCut으로 만들어낸 mask를 pseudo label로 사용
- 하지만 이런 방법들이 modern GPU로 병렬화되기 힘들기 때문에 학습에 매우 오랜 시간 소요되고, 이중 몇몇은 iterative training이 요구되므로 하이퍼파라미터 튜닝도 더 많이 필요하다
- 그리고 제일 중요한 것은, 이들 중에 large benchmark인 COCO 같은 데이터셋에 좋은 성능을 보이는 논문은 아무것도 없다. 작은 benchmark인 Pascal VOC에 대해서만 평가

##### SDI and BBTP

- SDI: Simple Does It: Weakly Supervised Instance and Semantic Segmentation
- SDI가 box annotation으로 instance segmentation 풀었던 첫 논문. 이 논문 또한 MCG의 region proposal에 의존
- BBTP: Weakly Supervised Instance Segmentation Using the Bounding Box Tightness Prior

- 내용을 추가하고 있습니다.

### BoxInst

##### Conditional Convolutions for Instance Segmentation (CondInst)

- Mask R-CNN과의 차이점 설명 (Dynamic filter에 대해 설명)
- 어떻게해서 RoI free method가 되었는지 설명
- Full-image mask segmentation이 가능하다는 특징이 BoxInst에 어떤 도움을 주었는지 설명
- 최종적으로, CondInst의 어떤 losses 들이 있었고, 이것이 BoxInst로 발전되면서 어떻게 변했는지 설명
- Dice loss의 식과 장점에 대해 설명
- BoxInst의 core idea: CondInst 내의 pixel-wise mask losses를 projection loss와 pairwise affinity loss로 대체하는 것

##### Projection Loss

- 내용을 추가하고 있습니다.

##### Pairwise Affinity Loss

- Pairwise Affinity Loss 식에 대한 설명 (Mask annotation이 있다는 가정하에)
- 그렇다면 mask annotation이 없는 경우에는 어떻게 학습하는가? Learning without Mask Annotations 파트 설명
- 내용을 추가하고 있습니다.

### Experiments

##### Evaluation Metric

- Object detection과 Image Segmentation에서 사용되는 evaluation metric에 대해 소개합니다.
- Intersection of Union (IoU)
- Precision and Recall
- mean Average Precision (mAP)

- 내용을 추가하고 있습니다.

##### Experimental Results

- PolarMask나 YOLACK 같은 mask annotation 기반의 모델들 보다 성능이 좋다는 것은 인상적
- FPN, BiFPN, DCN에 대해 간단히 설명
- 내용을 추가하고 있습니다.

### References

[^1]:Tian, Zhi, et al. "BoxInst: High-performance instance segmentation with box annotations." *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition*. 2021.

