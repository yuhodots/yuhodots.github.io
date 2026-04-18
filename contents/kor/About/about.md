---
title: "about"
date: "2021-01-30"
template: "about"
draft: true
path: "/about/"
description: "none"
category: "about"
---

## 안녕하세요 🙋‍♂️

안녕하세요! 블로그에 방문해주셔서 감사합니다. AI Engineer 정유호라고 합니다.

저는 대학원에서 `Meta-Learning`, `Continual Learning`, `Open-World Learning`과 같이, 한정된 데이터를 사용한 학습을 통해 그 외의 데이터까지 일반화가 가능한 알고리즘들에 대해 연구했습니다. 이 과정에서 real-world에 AI 기술을 서비스할 때 겪을 수 있는 문제 상황들과 한계점, 그리고 이를 극복할 수 있는 방법에 대해서 자주 고민하곤 했습니다. 이런 경험을 바탕으로 현재는 산업계에서 실제 서비스를 위한 AI 기술을 개발하고 있습니다.

문제 정의를 중요하게 여기고, 문제 상황에 대한 해결 방법을 모델링에 한정짓지 않고 다양한 지점에서 찾으려 노력하고 있습니다. 연구적 성과에서 그치는 것이 아니라 실제로 세상에 영향을 줄 수 있는 기술들에 관심이 많으며, 여러 AI 파이프라인 설계에 관심을 가지고 공부하고 있습니다. 궁금한 점이나 조언해주실 내용에 대해, 이메일이나 LinkedIn을 통해 연락주시는 것은 언제든지 환영합니다.

마지막으로, 요즘엔 제가 직접 공부하고 정리한 글 보다 AI에게 위임한 글이 훨씬 기술적 퀄리티가 높다고 느끼고 있습니다. 따라서 2026년 이후의 글들은 상당수가 AI에게 작성 위임한 글로 구성되어있으며 관련해서 각 포스팅 내에도 간단히 언급해두었으니 참고 부탁드립니다.

---

### Contact

- Email: <yuho8437@gmail.com>
- LinkedIn: <https://www.linkedin.com/in/yuho-jeong-b9423a19b/>

### Education

- M.S. in Artificial Intelligence at [Machine Intelligence and Information Learning Lab](https://sites.google.com/view/swyoon89/research-interests?authuser=0), UNIST (2021.03 ~ 2023.02)
  - Meta-learning and Few-shot classification algorithms
  - Class-incremental learning algorithms
  - Open-world learning (e.g., Category discovery)

- B.S. in Mechanical Aerospace Engineering, UNIST (2016.03 ~ 2021.02)
- B.S. in Computer Science Engineering, UNIST (2016.03 ~ 2021.02)

### Experience

- ML Engineer at [Devsisters](https://www.devsisters.com/en) (2024.10 ~ current)
  - Research topics: _Image Captioning, Multi-Modal to Image Generation (Image Editing), Generative Models, MLOps, LLM, etc._
  - Full-text search, vector search, metadata filtering 등의 hybrid search를 지원하는 통합 아트 리소스 검색 플랫폼을 구축하였습니다. 여러 게임 스튜디오에서 확장성 있게 에셋 탐색이 가능하며 AI 학습을 위한 빠른 데이터셋 구축에도 기여하고 있습니다.
  - 컨셉 아트 프로토타이핑을 돕는 사내 이미지 생성/편집 WebUI를 개발하였습니다. 기획, 프론트엔드, 백엔드 등 모든 영역을 맡아 진행하였고, 배포 및 운영 작업까지 담당하고 있습니다.
  - 게임 도메인 요구사항에 맞추어 Text-to-Image, Image-to-Image, Sketch-to-Image 등 다양한 이미지 생성 모델과 파이프라인들을 개발하고 서빙하였습니다.
  - 게임 캐릭터 얼굴 표정 편집, 스킨 편집 등 이미지 편집을 위한 생성형 모델을 리서치하고 fine-tuning 하였습니다. Gemini Flash 2.5, gpt-image-1 대비 더 높은 성능을 달성하였습니다.
  - VLM 기반 아트 에셋 auto-labeling 파이프라인을 설계 및 구현하였습니다. 데이터 증강, 전처리, 후처리 과정을 함께 고도화하여 데이터셋 품질 향상에 기여하였습니다.
  - 사내 업무 자동화를 목적으로 다양한 LLM 워크플로우를 개발하였습니다. MLFlow 기반 evaluation, tracing, monitoring 등 visibility 확보에 힘쓰며 개발을 진행하고 있습니다.
  - Talos 기반 GPU 클러스터를 구축한 경험이 있고, 이 과정에서 Linode, GKE, EKS 등 cross-vendor GPU를 유연하게 활용할 수 있도록 구조를 설계하여 AI 워크로드를 위한 고가용성 인프라를 구축하는데 기여하였습니다.
  - 100만 건 이상의 이미지 에셋을 AI 기반으로 태깅, 캡셔닝, 분류하여 DB로 적재하는 데이터 파이프라인을 구축하였습니다. CDC 기반 증분 동기화, Trition & API 서버와 KEDA를 접목한 병렬 처리등을 고려하여 설계 및 구현하였습니다.
- AI Engineer at [Nuvilab Inc.](https://www.nuvilab.com) (2023.02 ~ 2024.10)
  - Research topics: _Active Learning, Outlier Detection, Data Labeling Pipeline, MLOps, Multi-Modal Learning, Instance Segmentation, and Object Detection._
  - 음식 검출 및 분류를 위한 instance segmentation 모델과 zero-shot classification 모델을 개발 및 학습하였습니다. Segmentation의 경우 이전 모델 대비 AP 0.13, AR 0.12 개선, zero-shot classification의 경우 10% 성능 향상을 달성하였습니다.
  - NVIDIA Triton 서버, VectorDB, Gitflow 기반 ArgoCD 등을 활용하여 여러 AI 마이크로서비스들을 배포 및 운영하였습니다.
  - Class-imbalanced fine-grained datasets를 위한 active learning 기반의 데이터 샘플링 파이프라인을 설계하여 기존 방식(random sampling) 대비 라벨링 비용을 50% 절감하였습니다.
  - AI 음식 사진 분석 결과에 대해 사후 이상치 탐지 파이프라인과 서비스 성능 모니터링 체계를 구축하였습니다. 약 40%의 이상치 데이터를 검출 및 제거하여 서비스 품질 향상에 기여하였습니다.
  - Mask annotation에 대해 semi-automated labeling이 가능한 라벨링 엔진을 개발하여 비용 절감에 기여하였습니다.
  - 한정된 데이터 샘플로도 고성능을 낼 수 있는 dense prediction 모델을 설계하고 학습하여 병원식 도메인에 배포 및 서비스하였습니다. [[link](https://medium.com/nuvilab/alexandra-hospital-track-patient-nutrition-intake-733f78209203)]
  - 대규모 음식 사진 데이터에 대한 airflow 기반의 준실시간 AI 배치처리 파이프라인을 개발하였고, 이 외에도 다양한 데이터 엔지니어링 업무를 수행하였습니다.
  - 오픈소스 데이터 라벨링 도구인 CVAT을 사내 목적에 맞게 커스터마이징하기 위해 프론트엔드 및 백엔드 개발을 수행하였습니다.
- Language AI Internship at Semantic Knowledge Team, [NAVER Corp.](https://www.navercorp.com) (2021.12 ~ 2022.03)
  - Entity Linking(NED) 엔진 분석 및 테스트를 위한 웹 기반 툴을 개발하였습니다.
  - 한국어 개체명 인식(Named Entity Recognition, NER) 문제를 풀기에 적합한 모델과 방법론을 제안하였습니다.
- Research internship at [Machine Intelligence and Information Learning Lab](https://sites.google.com/view/swyoon89/research-interests?authuser=0) (2020.07 ~ 2021.02)
- Research internship at [Autonomous System Lab](https://sites.google.com/site/aslunist/news) (2019.12 ~ 2020.02)

### Publications

- Solang Kim, Yuho Jeong, Joon Sung Park and Sung Whan Yoon, "MICS: Midpoint Interpolation to Learn Compact and Separated Representations for Few-Shot Class-Incremental Learning," accepted to IEEE/CVF Winter Conference on Applications of Computer Vision (WACV), Hawaii, U.S., 2024.
  - _Master's Thesis in UNIST AI Graduate School_

### Presentation

- CoreAI Seminar, "Generalized Category Discovery." (2022.10.07) [[video](https://youtu.be/pNoYt0bzG-s?t=450)] [[slides](https://drive.google.com/file/d/1QRFtVonBzZiiba73F-vYVPRib1Z1avOb/view?usp=sharing)] [[post](https://yuhodots.github.io/deeplearning/22-10-07/)]
- CoreAI Seminar, "NeRF in the Wild: Neural Radiance Fields for Unconstrained Photo Collections." (2022.03.04) [[video](https://www.youtube.com/watch?v=HDwkXyQjecQ)] [[slides](https://drive.google.com/file/d/1O4Af9vq_q_1BRdYxZBCw-PKEq0cqYSNM/view)] [[post](https://yuhodots.github.io/deeplearning/22-03-05/)]
- 해군교육사령부, 교관양성 교육: 합성곱 신경망 파트 실습 강의 (2021.06.05)
- CoreAI Seminar, "Bootstrap Your Own Latent." (2021.04.02) [[slides](https://slack-files.com/T017E9YJDU0-F01TUCCPNV6-54c6e3fb59)] [[post](https://yuhodots.github.io/deeplearning/21-04-04/)]
- CoreAI Seminar, "Learning to Propagate Labels: Transductive Propagation Network for Few-shot Learning." (2021.03.06) [[slides](https://slack-files.com/T017E9YJDU0-F01PZ1RKUQP-9675e49bb9)] [[post](https://yuhodots.github.io/deeplearning/21-03-04/)]
- UNIST AI Innovation Park, AI 노바투스 아카데미아: 인공지능 기초 파트 실습 강의 (2021.02, 2021.07)

### Projects

- Personal project - Web: BackEnd development at the online thrift store, [Uitda](https://github.com/yuhodots/uitda) (2019.02 ~ 2020.06)
- Course project: [pacman](https://github.com/yuhodots/pacman), [handpose](https://github.com/yuhodots/handpose), [covid-correlation](https://yuhodots.github.io/covid-correlation/), [mav-simulation](https://github.com/yuhodots/mav-simulation), [pintos](https://github.com/yuhodots/pintos), [uav-control](https://github.com/yuhodots/uav-control)
- Research repositories: [cl-research](https://github.com/cl-research), [ncd-research](https://github.com/ncd-research), [ner-research](https://github.com/ner-research), [toolkits](https://github.com/yuhodots/toolkits)
- Study group: <https://cse-study.github.io/home/>
