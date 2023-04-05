---
title: "Object Detection"
date: "2023-04-01"
template: "post"
draft: true
path: "/deeplearning/23-04-01/"
description: "Deep learning 기반의 object detection 알고리즘에 대해 리뷰합니다. Two-stage detector와 one-stage detector 알고리즘 중에서 제일 유명한 알고리즘을 위주로 정리하였습니다. Two-stage detector는 성능 측면에서, one-stage detector는 속도 측면에서 각각 이점을 가지기 때문에 목적에 알맞은 접근 방법을 선택하는 것이 좋습니다."
category: "Deep Learning"
thumbnail: "deeplearning"
---

> Deep learning 기반의 object detection 알고리즘에 대해 리뷰합니다. Two-stage detector와 one-stage detector 알고리즘 중에서 제일 유명한 알고리즘을 위주로 정리하였습니다. Two-stage detector는 성능 측면에서, one-stage detector는 속도 측면에서 각각 이점을 가지기 때문에 목적에 알맞은 접근 방법을 선택하는 것이 좋습니다.

### TODOs

아래 세개만 보고 내용 정리하기

1. https://www.youtube.com/watch?v=jqNCdjOB15s
2. https://lilianweng.github.io/posts/2017-12-31-object-recognition-part-3/
3. https://lilianweng.github.io/posts/2018-12-27-object-recognition-part-4/

### Preliminary

##### Intersection of Union (IoU)



##### Non-Maximum Suppression (NMS)



##### Average Precision (AP) and mean Average Precision (mAP)



### Two-Stage Detector

##### R-CNN[^1]



##### Fast R-CNN[^2]



##### Faster R-CNN[^3]



##### Feature Pyramid Networks (FPN)[^4]

### One-Stage Detector

##### YOLO[^5]



##### Single Shot Multibox Detector (SSD)[^6]



##### RetinaNet[^7]



### References

[^1]:Girshick, Ross, et al. "Rich feature hierarchies for accurate object detection and semantic segmentation." *Proceedings of the IEEE conference on computer vision and pattern recognition*. 2014.
[^2]: Girshick, Ross. "Fast r-cnn." *Proceedings of the IEEE international conference on computer vision*. 2015.
[^3]: Ren, Shaoqing, et al. "Faster r-cnn: Towards real-time object detection with region proposal networks." *Advances in neural information processing systems* 28 (2015).
[^4]: Lin, Tsung-Yi, et al. "Feature pyramid networks for object detection." *Proceedings of the IEEE conference on computer vision and pattern recognition*. 2017.
[^5]: Redmon, Joseph, et al. "You only look once: Unified, real-time object detection." *Proceedings of the IEEE conference on computer vision and pattern recognition*. 2016.
[^6]:Liu, Wei, et al. "Ssd: Single shot multibox detector." *Computer Vision–ECCV 2016: 14th European Conference, Amsterdam, The Netherlands, October 11–14, 2016, Proceedings, Part I 14*. Springer International Publishing, 2016.
[^7]: Lin, Tsung-Yi, et al. "Focal loss for dense object detection." *Proceedings of the IEEE international conference on computer vision*. 2017.
