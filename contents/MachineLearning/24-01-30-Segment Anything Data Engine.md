---
title: "Segment Anything Data Engine"
date: "2024-01-30"
template: "post"
draft: false
path: "/deeplearning/24-01-30/"
description: "Meta AI Research의 Segment Anything 논문의 Data Engine 파트와 Appendix F 파트를 정리하며 mask annotation 자동화 과정에서 고려할 점들이 무엇인지 파악합니다. 제일 처음 단계에서는 사람이 직접 mask annotation 만들었음. 모델 도움도 일부 받음. 처음에는 SAM을..."
category: "Deep Learning"
thumbnail: "deeplearning"
---

> Meta AI Research의 Segment Anything 논문의 Data Engine 파트와 Appendix F 파트를 정리하며 mask annotation 자동화 과정에서 고려할 점들이 무엇인지 파악합니다.

### Data Engine

##### 1. Assisted-Manual Stage

제일 처음 단계에서는 사람이 직접 mask annotation 만들었음. 모델 도움도 일부 받음

- 처음에는 SAM을 public segmentation dataset으로 학습함
- Browser-based interactive segmentation tool 기반으로 SAM 도움 받아 foreground/background 클릭하면서 mask 작업 수행. 이 때, 'brush'와 'eraser' 기능이 내부 툴에 존재해서 mask 수정 쉽게 가능했음
- Label은 그저 'stuff'와 'things'로 annotator들이 자유롭게 라벨링 하도록 두었음
- 데이터를 충분히 취득하면 SAM을 다시 학습하고(이 과정을 6회 반복), 모델도 ViT-B에서 ViT-H로 키워갔음. 
- 하나의 mask 라벨링에 대해 30초 정도의 속도를 권장하였고, 처음에는 34초에서 시작해서 모델이 좋아진 뒤에는 14초까지 줄었음
- 이 단계에서 총 12만 이미지에 대해 430만 mask를 수집했음

##### 2. Semi-Automatic Stage

그 다음 단계에서는, 모델 기반으로 confident mask를 미리 만들어 준 뒤에 나머지 영역을 사람이 annotation 수행함

- Annotator들이 덜 두드러진 영역만 신경쓰면 되도록, 모델 기반으로 confident mask를 미리 만들어주고 mask가 만들어지지 않은 영역에 대해서만 annotation 수행하도록 했음
- Confident mask 검출을 위해서는, first stage에서 만들어진 모든 mask 데이터를 활용하여 'object' class 가진 bounding box detector를 학습시켰음 (이와 관련해서 *BoxTeacher*나 *SIM* 같은 weakly-supervised segmentation method 같이 확인해보면 좋을듯)
- (1)단계에서처럼 모델을 재학습(5회 반복)하는 과정을 거쳤고 automatic mask를 제외한 mask에 대해 평균 34초 정도 소요됨 
- 이 단계에서 총 18만 이미지에 대해 590만 mask를 수집했음 (1단계와 합치면 1020만 mask)

##### 3. Fully Automatic Stage

마지막 단계에서는 annotation 완전 자동화를 수행함

- 32x32 grid point를 모델에 입력하고, 각 포인트 마다 object에 대한 mask 출력
- SAM 모델은 subpart, part, whole object에 대한 mask를 모두 뱉게 되는데, 여기서 IoU prediction module로 confident mask를 선택
- 그리고 이 중에서 오직 stable mask만 선정: probability map을 0.5-a와 0.5+a로 변경해 보았을 때 비슷한 mask인 경우를 stable로 여김
- 만들어진 전체 confident & stable mask들에 NMS 적용하여 중복 제거
- 작은 mask 퀄리티 향상 위해서 multiple overlapping zoomed-in Image crops 등도 적용했는데, 자세한 내용은 Appendix B 확인
- 이 단계에서 총 1100만 이미지에 대해 11억 mask를 수집했음

##### Example Data Format

- `counts` key: COCO run-length encoded(RLE) mask

```json
{
    "image": {
        "image_id": 560,
        "width": 2250,
        "height": 1500,
        "file_name": "sa_560.jpg"
    },
    "annotations": [
        {
            "bbox": [1167.0, 157.0, 107.0, 129.0],
            "area": 7948,
            "segmentation": {
                "size": [1500, 2250],
                "counts": "hf]e1>W^19L4J7K7I4L4L4L3N2M2O2N2N2N1O2N1O2O1N1N2O2N1O2N1O1N3N1O0O10J5O2N110O01O1N200O101N1O1O2N101N2N2O101N1O10001N101N1O2O0O100O10000O101O1O1O0001O2N2N4L1N3N1O001O001N2O1O3M3iMSdNY1R\\1^NSdN`1f\\1O1O2N2N3L5L4L4L2N1O1O1O0O2N1N2O2M2N2N3M3L5Lfoc\\1"
            },
            "predicted_iou": 0.8973201513290405,
            "point_coords": [[1233.9375, 177.1875]],
            "crop_box": [998, 0, 755, 567],
            "id": 1103484716,
            "stability_score": 0.9846441745758057
        },
        ...
    ]
}
```

### Data Annotation Card

##### Task Formulation

- Task의 주관적인 영역은 무엇이었는지?: Segmentation 작업 자체가 내재적으로 주관적임. 동일한 신발 object에 대해 신발 켤레를 하나의 mask로 segment 할 수도 있고, 신발 한 짝 마다 각각의 mask로 segment 할 수도 있음. Mask의 완벽함보다는 다양성에 중점을 두고 segment 했기에 이렇게 하는 것이 상관없었음
- Annotator와 관련된 가정: Full time으로 일하며, 인원 감축을 크게 하지 않음. 작업 목적에 대한 확인한 이해와 명확한 가이드라인(시각/비디오 자료), 그리고 OKR 공유와 작업자들의 주간 미팅 참여가 annotation의 양과 질을 높이는데 기여했음
- Instruction의 명확성을 검증하기 위해 어떤 작업을 거쳤는지?: 리서치 팀이 annotation tool을 사용해서 30개 정도의 annotation task를 직접 작업하면서 복잡한 케이스를 확인하거나 가이드라인을 수정함. 또한, 리서치팀이 annotator들과 주간 피드백 세션을 가짐
- 얼마나 자세한 instruction을 제공했는지?: 오직 '주어진 이미지에 대해, 모든 가능한 object를 segment 하는 것이 목적'이라는 high-level instruction만 제공함. 내부 interactive segmentation tool을 사용하여 foreground/background 클릭을 통해 mask를 추가하거나 삭제할 수 있고, bounding box를 그릴수도 있음. 또한 pixel-precise tool을 통해 mask 수정도 가능 (CVAT 같은 툴 생각하면 될듯)

##### Platform and Infrastructure

- Annotators 인원: 130명 정도의 Kenya annotators와 작업함
- Annotation에 사용한 플랫폼: proprietary annotation platform 사용함 (내부 플랫폼 사용한 것으로 해석하였음)
- Annotators와의 커뮤니케이션 방법: Annotation QA team과는 daily로 피드백 주고받고, 리서치팀과는 weekly로 피드백 주고받았으며, 스프레드시트나 chat group 통해 주기적으로 소통했음. 이 과정이 데이터 생산의 양과 질을 매우 높일 수 있었음

### Reference

- Segment Anything: https://arxiv.org/abs/2304.02643
- SA-1B Dataset: https://ai.meta.com/datasets/segment-anything-downloads/
