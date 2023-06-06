---
title: "An Overview of Object Detection"
date: "2023-06-06"
template: "post"
draft: true
path: "/deeplearning/23-06-06/"
description: "Deep learning 기반의 object detection 알고리즘에 대해 리뷰합니다. Two-stage detector와 one-stage detector 알고리즘 중에서 유명한 알고리즘들을 위주로 간단히 정리하였습니다."
category: "Deep Learning"
thumbnail: "deeplearning"
---

> Deep learning 기반의 object detection 알고리즘에 대해 리뷰합니다. Two-stage detector와 one-stage detector 알고리즘 중에서 유명한 알고리즘들을 위주로 간단히 정리하였습니다.

### Introduction

- Localization: Object의 위치를 bouding box 형태로 알아내는 task
- Object detection: 이미지 내에 다수의 object가 존재할 때, 각각의 class를 맞추고 localization 하는 task
- RoI: Region of Interest
- Region proposal: Object가 있을 것 같은 영역을 제안
  - Sliding window: 다양한 크기의 window를 이미지 상에서 sliding 하면서 해당 위치에 물체가 존재하는지 확인하는 방법
  - Selective search: 인접한 region 사이의 유사도를 측정하고, 점점 큰 영역으로 통합하는 방법
- Localization layer: Bbox position를 제안하는 layer이고 일반적으로 regressor 활용
- Classification layer: Object의 class를 제안하는 layer
- RoI pooling: 각 RoI 영역에 대해 pooling 방식 (e.g., max-pooling) 적용해서 NxN matrix 추출
  - mask R-CNN에서는 RoI pooling 개선시킨 RoIAlign layer 활용함

- IoU (Intersection of Union): 예측 bbox와 정답 bbox가 겹치는 비율

$$
\text{IoU} = \frac{\text{두 bbox의 교집합}}{\text{두 bbox의 합집합}}
$$

```python
# Code by ChatGPT

def compute_iou(box, boxes):
    """
    Computes the IOU between a given box and a set of boxes.
    :param box: Numpy array with shape (4,) representing the coordinates of a bounding box.
    :param boxes: Numpy array with shape (N, 4) representing the coordinates of N bounding boxes.
    :return: Numpy array with shape (N,) containing the IOUs between the box and the N bounding boxes.
    """
    # Calculate coordinates of intersection boxes
    x1 = np.maximum(box[0], boxes[:, 0])
    y1 = np.maximum(box[1], boxes[:, 1])
    x2 = np.minimum(box[2], boxes[:, 2])
    y2 = np.minimum(box[3], boxes[:, 3])

    # Calculate area of intersection boxes and union boxes
    intersection = np.maximum(0.0, x2 - x1) * np.maximum(0.0, y2 - y1)
    area_box = (box[2] - box[0]) * (box[3] - box[1])
    area_boxes = (boxes[:, 2] - boxes[:, 0]) * (boxes[:, 3] - boxes[:, 1])
    union = area_box + area_boxes - intersection

    # Calculate IOU and return
    iou = intersection / union
    return iou
```

- Non-Maximum Suppression (NMS): 여러 개의 bbox가 동일한 class로 분류되면서 겹치는 경우에는 하나로(혹은 일부로) bbox 예측을 줄이는 방법

```python
# Code by ChatGPT

def non_maximum_suppression(bounding_boxes, confidence_scores, overlap_threshold):
    """
    Implements Non-Maximum Suppression on a set of bounding boxes and corresponding confidence scores.
    :param bounding_boxes: Numpy array with shape (N, 4) representing the coordinates of the N bounding boxes.
    :param confidence_scores: Numpy array with shape (N,) representing the confidence scores for the N bounding boxes.
    :param overlap_threshold: Float representing the maximum allowed overlap between two bounding boxes.
    :return: List with the indices of the selected bounding boxes.
    """
    # Sort bounding boxes by their confidence scores (highest to lowest)
    sorted_indices = np.argsort(-confidence_scores)

    selected_indices = []
    while sorted_indices.size > 0:
        # Select bounding box with highest confidence score
        best_box_index = sorted_indices[0]
        selected_indices.append(best_box_index)

        # Compute the IOUs between the selected bounding box and the remaining boxes
        remaining_indices = sorted_indices[1:]
        overlaps = compute_iou(bounding_boxes[best_box_index], bounding_boxes[remaining_indices])

        # Discard boxes with IOU greater than overlap threshold
        non_overlapping_indices = np.where(overlaps <= overlap_threshold)[0]
        sorted_indices = remaining_indices[non_overlapping_indices]

    return selected_indices
```

##### Evaluation Metric

- Average Precision (AP .5): IoU 0.5 이상을 true positive로 인식
- 11점 보간법과 모든점 보간법 계산법

$$
\begin{aligned}
& A P_{11}=\frac{1}{11} \sum_{R \in\{0,0.1,0.2, \ldots, 0.9,1\}} P_{\text {interp }}(R) \\
& {P}_{\text {interp }}({R})=\max _{\widetilde{{R}}: \widetilde{{R}} \geq {{R}}} {P}(\widetilde{{R}})
\end{aligned}
$$

$$
\begin{aligned}
& {A P}_{\text {all }}=\sum_n\left({R}_{n+1}-{R}_{{n}}\right) {P}_{\text {interp }}\left({R}_{n+1}\right) \\
& {P}_{\text {interp }}\left({R}_{n+1}\right)=\max _{\widetilde{{R}}: \widetilde{{R}} \geq {R}_{n+1}} {P}(\widetilde{{R}})
\end{aligned}
$$

- AP[.5:.05:.95]: AP .5, AP .55, ..., AP .95의 값을 모두 측정하여 평균. 모든점 보간법을 이용해서 AP를 구한 값의 평균, 즉, Precision-Recall Curve의 아래 면적을 의미

- mean Average Precision: 기본적으로 precision은 하나의 object에 대한 검출을 의미하므로, mAP는 각각의 class에 대해 AP[.5:.05:.95]를 계산하고 평균을 산출했다는 의미
  $$
  m A P=\frac{1}{N} \sum_{i=1}^N A P_i
  $$

![img](../img/23-06-03-1.png)

<center><p><i>Taken from https://cocodataset.org/#detection-eval</i></p></center>

- Macro: '평균의 평균'을 구하는 방법. macro_precision = (precision_1 + precision_2 + ... + precision_K) / K where K is the number of classes
- Micro: '전체의 평균'을 구하는 방법. micro_precision = TP / (TP + FP)

##### Feature Pyramid Networks (FPN)[^4]

Multi-resolution 정보를 최대한 활용하여 object detection 성능 향상을 이루고자 하는 연구들 많았는데 FPN도 그 중 하나임. 다양한 object detection 모델들의 backbone으로 활용되어 성능을 높여줌

- Featurized image pyramid: 입력 이미지를 여러 크기로 resize 하여 각각 CNN에 통과시켜 feature map 획득하는 방법. 당연히도 매우 느림
- Single feature map: 가장 마지막 feature map만 예측에 활용하므로 작은 object에 대한 정보 잘 잡지 못할 것임
- Pyramidal feature hierarchy: 
- Feature Pyramid Network (FPN): 

![img](../img/23-06-03-4.png)

<center><p><i>Taken from Tsung-Yi Lin, et al.</i></p></center>

- Bottom-up pathway in FPN: 
- Top-down pathway in FPN: 

### Two-Stage Detector

Region proposals을 먼저 생성 한 이후에 object classification and bbox regression 수행. 따라서 속도가 느리지만 일반적으로 성능이 좋음

![img](../img/23-06-03-2.png)

<center><p><i>Taken from  Wu, Xiongwei, Doyen Sahoo, and Steven CH Hoi.</i></p></center>

##### R-CNN[^1]

Abbreviation of 'Region-Based Convolutional Neural Networks'

1. 이미지에 대해 selective search를 이용하여 약 2000개의 RoI 추출
   - Selective search: 자세한 설명은 [이곳](https://lilianweng.github.io/posts/2017-10-29-object-recognition-part-1/#selective-search) 참고
2. 각 RoI들을 warping (i.e., transforming image regions to a fixed size)
3. Warped image에 대해 CNN으로 feature 추출
4. Feature를 활용하여, SVM으로는 classification, regressor로는 bbox 예측(i.e., {x, y, width, height})을 수행

##### Fast R-CNN[^2]

1. 이미지에 대해 selective search를 이용하여 약 2000개의 RoI 추출 (*R-CNN과 동일*)
2. 입력 이미지를 그대로 CNN에 넣어 feature map을 추출. 즉, 입력 이미지가 CNN에 한 번만 forwarding 되어도 됨
3. RoI projection: 각각의 RoI를 feature map dimension으로 projection
4. RoI pooling 수행: Feature map에서의 각 RoI 영역에 대해 max-pooling 적용해서 NxN matrix 추출
5. 최종 feature를 활용하여 softmax layer으로는 classification, regressor로는 bbox 예측을 수행

##### Faster R-CNN[^3]

Prior works의 region proposal 방식이 bottleneck이었는데, RPN을 통해 end-to-end 형태의 구조 제안하여 성능 향상

1. 이미지를 CNN에 넣어 feature map을 추출 (Prior works와 달리, region proposal 하기 전에 feature 부터 뽑음)
2. Feature map을 region proposal network(RPN)으로 보내 feature map에 대한 RoI 생성
   - RPN은 기본적으로 여러 개의 서로 다른 형태의 anchor boxes를 사용한 sliding window 방식 사용
   - RPN의 final layer에는 물체가 있는지 없는지 판단하는 2-softmax와, bbox 제안하는 regressor가 존재
   - 2-softmax와 regressor ouput을 기반으로 RoI 생성하고 이를 RoI pooling layer로 전달
3. RoI pooling 수행
4. 최종 feature를 활용하여 softmax layer으로는 classification, regressor로는 bbox 예측을 수행

##### Recap.

|              | Conference   | Region proposal             | Classification layer | Localization layer |
| ------------ | ------------ | --------------------------- | -------------------- | ------------------ |
| R-CNN        | CVPR 2014    | Selective search (CPU)      | SVMs                 | Regressor          |
| Fast R-CNN   | ICCV 2015    | Selective search (CPU)      | Softmax              | Regressor          |
| Faster R-CNN | NeurIPS 2015 | Sliding window w. RPN (GPU) | Softmax              | Regressor          |

### One-Stage Detector

Pre-generated region proposals 없이 object classification and bbox regression 수행

![img](../img/23-06-03-3.png)

<center><p><i>Taken from  Wu, Xiongwei, Doyen Sahoo, and Steven CH Hoi.</i></p></center>

##### YOLO[^5]

📍`Multi-resolution Detection`, `Hard-negative Mining`

- 세줄 요약 추가하기

##### RetinaNet[^7]

📍`Keypoint Based Detection`

- 세줄 요약 추가하기

##### DETR[^8]

📍`End to End Detection`, `Reference-free Detection`

![img](../img/23-06-03-5.png)

<center><p><i>Taken from Nicolas Carion, et al.</i></p></center>

- 세줄 요약 추가하기

### References

##### Blog Posts

- https://lilianweng.github.io/posts/2017-12-31-object-recognition-part-3/
- https://lilianweng.github.io/posts/2018-12-27-object-recognition-part-4/

##### Papers

[^1]:Girshick, Ross, et al. "Rich feature hierarchies for accurate object detection and semantic segmentation." *Proceedings of the IEEE conference on computer vision and pattern recognition*. 2014.
[^2]: Girshick, Ross. "Fast r-cnn." *Proceedings of the IEEE international conference on computer vision*. 2015.
[^3]: Ren, Shaoqing, et al. "Faster r-cnn: Towards real-time object detection with region proposal networks." *Advances in neural information processing systems* 28 (2015).
[^4]: Lin, Tsung-Yi, et al. "Feature pyramid networks for object detection." *Proceedings of the IEEE conference on computer vision and pattern recognition*. 2017.
[^5]: Redmon, Joseph, et al. "You only look once: Unified, real-time object detection." *Proceedings of the IEEE conference on computer vision and pattern recognition*. 2016.
[^6]:Liu, Wei, et al. "Ssd: Single shot multibox detector." *Computer Vision–ECCV 2016: 14th European Conference, Amsterdam, The Netherlands, October 11–14, 2016, Proceedings, Part I 14*. Springer International Publishing, 2016.
[^7]: Lin, Tsung-Yi, et al. "Focal loss for dense object detection." *Proceedings of the IEEE international conference on computer vision*. 2017.
[^8]: Carion, Nicolas, et al. "End-to-end object detection with transformers." *Computer Vision–ECCV 2020: 16th European Conference, Glasgow, UK, August 23–28, 2020, Proceedings, Part I 16*. Springer International Publishing, 2020.
[^9]: Zou, Zhengxia, et al. "Object detection in 20 years: A survey." *Proceedings of the IEEE* (2023).
[^10]: Wu, Xiongwei, Doyen Sahoo, and Steven CH Hoi. "Recent advances in deep learning for object detection." *Neurocomputing*396 (2020): 39-64.
