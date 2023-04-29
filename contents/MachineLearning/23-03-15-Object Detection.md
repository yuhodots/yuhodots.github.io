---
title: "Object Detection"
date: "2023-04-01"
template: "post"
draft: true
path: "/deeplearning/23-04-01/"
description: "Deep learning 기반의 object detection 알고리즘에 대해 리뷰합니다. Two-stage detector와 one-stage detector 알고리즘 중에서 제일 유명한 알고리즘을 위주로 간단히 정리하였습니다."
category: "Deep Learning"
thumbnail: "deeplearning"
---

> Deep learning 기반의 object detection 알고리즘에 대해 리뷰합니다. Two-stage detector와 one-stage detector 알고리즘 중에서 제일 유명한 알고리즘을 위주로 간단히 정리하였습니다.

### TODOs

아래 세개만 보고 내용 정리하기

1. https://www.youtube.com/watch?v=jqNCdjOB15s
2. https://lilianweng.github.io/posts/2017-12-31-object-recognition-part-3/
3. https://lilianweng.github.io/posts/2018-12-27-object-recognition-part-4/

### Preliminary

- Localization: Object의 위치를 bouding box 형태로 알아내는 task
- Object detection: 이미지 내에 다수의 object가 존재할 때, 각각의 class를 맞추고 localization 하는 task
- Region proposal: 물체가 있을 것 같은 위치를 찾아서 제안. **Region of Interst(RoI)**라고도 함
  - Sliding window: 다양한 크기의 window를 이미지 상에서 sliding 하면서 해당 위치에 물체가 존재하는지 확인하는 방법
  - Selective search: 인접한 region 사이의 유사도를 측정하고, 점점 큰 영역으로 통합하는 방법

##### Intersection of Union (IoU)

예측 bbox와 정답 bbox가 겹치는 비율
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

##### Non-Maximum Suppression (NMS)

여러 개의 bbox가 동일한 class로 분류되면서 겹치는 경우에는 하나로(혹은 일부로) bbox 예측을 줄일 필요가 있음. 

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

##### mean Average Precision (mAP)

- Average Precision (**AP@0.5**)

  - IoU 0.5 이상을 true positive로 잡음

- 11점 보간법
  $$
  \begin{aligned}
  & A P_{11}=\frac{1}{11} \sum_{\boldsymbol{R} \in\{0,0.1,0.2, \ldots, 0.9,1\}} \boldsymbol{P}_{\text {interp }}(\boldsymbol{R}) \\
  & \boldsymbol{P}_{\text {interp }}(\boldsymbol{R})=\max _{\widetilde{\boldsymbol{R}}: \widetilde{\boldsymbol{R}} \geq {\boldsymbol{R}}} \boldsymbol{P}(\widetilde{\boldsymbol{R}})
  \end{aligned}
  $$
  

- 모든점 보간법
  $$
  \begin{aligned}
  & \boldsymbol{A P}_{\text {all }}=\sum_n\left(\boldsymbol{R}_{n+1}-\boldsymbol{R}_{\boldsymbol{n}}\right) \boldsymbol{P}_{\text {interp }}\left(\boldsymbol{R}_{n+1}\right) \\
  & \boldsymbol{P}_{\text {interp }}\left(\boldsymbol{R}_{n+1}\right)=\max _{\widetilde{\boldsymbol{R}}: \widetilde{\boldsymbol{R}} \geq \boldsymbol{R}_{n+1}} \boldsymbol{P}(\widetilde{\boldsymbol{R}})
  \end{aligned}
  $$
  

- **AP@[.5:.05:.95]**

  - AP@0.5, AP@0.55, ..., AP@0.95의 값을 모두 측정하여 평균
  - 모든점 보간법을 이용해서 AP를 구한 값의 평균
  - 즉, **Precision Recall Curve의 아래 면적**을 의미함

- mean Average Precision

  - 기본적으로 precision은 하나의 object에 대한 검출을 의미하므로, mAP는 각각의 class에 대해 AP(AP@[.5:.05:.95])를 계산하고 평균을 산출했다는 의미
    $$
    m A P=\frac{1}{N} \sum_{i=1}^N A P_i
    $$

![img](../img/23-03-15-1.png)

##### micro, macro

- Macro: **평균의 평균**을 구하는 방법입니다. 
  - macro_precision = (precision_1 + precision_2 + ... + precision_K) / K
  - where K is the number of classes.
- Micro: **전체의 평균**을 구하는 방법입니다.
  - micro_precision = TP / (TP + FP)

### Two-Stage Detector

Localization과 classification을 순차적으로 수행. 따라서 속도가 느리지만 일반적으로 성능이 좋음 

##### R-CNN[^1]

- 전체 구조 그림 넣기

1. 이미지에 대해 selective search를 이용하여 약 2000개의 RoI 추출
2. 각 RoI들을 warping
3. Warped image에 대해 CNN으로 feature 추출
4. Feature를 활용하여, SVM으로는 classification, regressor로는 bbox 예측(i.e., {x, y, width, height})을 수행

##### Fast R-CNN[^2]

- 전체 구조 그림 넣기

1. 이미지에 대해 selective search를 이용하여 약 2000개의 RoI 추출 (R-CNN과 동일)
2. 이미지를 CNN에 한번만 넣어 feature map을 추출
3. 각각의 RoI를 feature map dimension으로 projection(RoI projection)
4. RoI pooling 수행: RoI 영역의 feature map에 max-pooling 적용
5. 최종 feature를 활용하여 softmax layer으로는 classification, regressor로는 bbox 예측을 수행

##### Faster R-CNN[^3]

- 전체 구조 그림 넣기

1. 이미지를 CNN에 넣어 feature map을 추출
2. Feature map을 region proposal network(RPN)으로 보내, feature map에 대한 RoI 생성
3. RoI pooling 수행
4. 최종 feature를 활용하여 softmax layer으로는 classification, regressor로는 bbox 예측을 수행

- RPN
  - k 개의 앵커박스를 이용
  - sliding window를 거쳐 각 위치에 regression과 classification 수행
  - 다만 물체가 있다 없다만 알면 되므로 2개에 대한 classification

##### Feature Pyramid Networks (FPN)[^4]

- 전체 구조 그림 넣기



##### Summary

|              | Conference   | Region proposal             | RoI pooling | Classification layer | Localization layer |
| ------------ | ------------ | --------------------------- | ----------- | -------------------- | ------------------ |
| R-CNN        | CVPR 2014    | Selective search (CPU)      |             | SVMs                 | Regressor          |
| Fast R-CNN   | ICCV 2015    | Selective search (CPU)      |             | Softmax              | Regressor          |
| Faster R-CNN | NeurIPS 2015 | Sliding window w. RPN (GPU) |             | Softmax              | Regressor          |
| FPN          |              |                             |             |                      |                    |



### One-Stage Detector

Localization과 classification을 동시에 수행하여 속도가 빨라 실시간 서비스에 활용하는데에 용이함

##### YOLO[^5]

- 전체 구조 그림 넣기



##### Single Shot Multibox Detector (SSD)[^6]

- 전체 구조 그림 넣기



##### RetinaNet[^7]

- 전체 구조 그림 넣기



### References

[^1]:Girshick, Ross, et al. "Rich feature hierarchies for accurate object detection and semantic segmentation." *Proceedings of the IEEE conference on computer vision and pattern recognition*. 2014.
[^2]: Girshick, Ross. "Fast r-cnn." *Proceedings of the IEEE international conference on computer vision*. 2015.
[^3]: Ren, Shaoqing, et al. "Faster r-cnn: Towards real-time object detection with region proposal networks." *Advances in neural information processing systems* 28 (2015).
[^4]: Lin, Tsung-Yi, et al. "Feature pyramid networks for object detection." *Proceedings of the IEEE conference on computer vision and pattern recognition*. 2017.
[^5]: Redmon, Joseph, et al. "You only look once: Unified, real-time object detection." *Proceedings of the IEEE conference on computer vision and pattern recognition*. 2016.
[^6]:Liu, Wei, et al. "Ssd: Single shot multibox detector." *Computer Vision–ECCV 2016: 14th European Conference, Amsterdam, The Netherlands, October 11–14, 2016, Proceedings, Part I 14*. Springer International Publishing, 2016.
[^7]: Lin, Tsung-Yi, et al. "Focal loss for dense object detection." *Proceedings of the IEEE international conference on computer vision*. 2017.
