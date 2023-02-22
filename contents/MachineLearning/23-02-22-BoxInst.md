---
title: "BoxInst: Instance Segmentation with Box Annotations"
date: "2023-02-22"
template: "post"
draft: false
path: "/deeplearning/23-02-22/"
description: "내용을 추가하고 있습니다."
category: "Deep Learning"
thumbnail: "deeplearning"
---

> 내용을 추가하고 있습니다.

### Segmentation Tasks

- Semantic Segmentation
- Instance Segmentation
- panoptic segmentation
- point cloud (3d) semantic segmentation

### Weakly-Supervised Image Segmentation

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

##### Multiscale Combinatorial Grouping (MCG)

- 내용을 추가하고 있습니다.

##### GrabCut and GrabCut+

- 내용을 추가하고 있습니다.

##### Conditional Random Field (CRF)

- 내용을 추가하고 있습니다.

##### Mask R-CNN

- 내용을 추가하고 있습니다.

### Prior Works

##### Simple Does It: Weakly Supervised Instance and Semantic Segmentation (SDI)

- 내용을 추가하고 있습니다.

##### Weakly Supervised Instance Segmentation Using the Bounding Box Tightness Prior (BBTP)

- 내용을 추가하고 있습니다.

### BoxInst

##### Conditional Convolutions for Instance Segmentation (CondInst)

- Mask R-CNN과의 차이점 설명

##### Projection Loss

- 내용을 추가하고 있습니다.

##### Pairwise Affinity Loss

- 내용을 추가하고 있습니다.

##### Learning without Mask Annotations

- 내용을 추가하고 있습니다.

### Results

- 내용을 추가하고 있습니다.

### References

[^1]:Tian, Zhi, et al. "Boxinst: High-performance instance segmentation with box annotations." *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition*. 2021.

