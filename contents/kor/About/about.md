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
  - Designed and implemented an auto-labeling pipeline for art assets using VLMs, including data augmentation, preprocessing, and postprocessing to improve dataset quality
  - Built a unified art resource management platform integrating hybrid search (Postgres FTS, vector retrieval, and metadata filtering) to enable scalable asset discovery and dataset construction across multiple game studios
  - Developed a full-stack AI art generation WebUI for rapid prototyping of in-game asset concepts
  - Developed image generation models tailored for game domain needs, including Text-to-Image, Image-to-Image, Sketch-to-Image, etc.
  - Researched and fine-tuned generative models for image editing tasks (e.g., facial expression and skin editing), achieving performance surpassing Gemini Flash 2.5 and gpt-image-1 on specific domain
  - Built LLM-based workflows for internal process automation, including evaluation, tracing, and LLMOps infrastructure
  - Architected a Talos-based multi-cloud GPU cluster enabling dynamic cross-vendor GPU utilization and highly available infrastructure for AI workloads
  - Built a distributed GPU-accelerated ETL pipeline processing 1M+ assets with CDC-based incremental sync and parallel caption/embedding extraction via Triton Inference Server
- AI Engineer at [Nuvilab Inc.](https://www.nuvilab.com) (2023.02 ~ 2024.10)
  - Research topics: _Active Learning, Outlier Detection, Data Labeling Pipeline, MLOps, Multi-Modal Learning, Instance Segmentation, and Object Detection._
  - Developed AI models for instance segmentation and zero-shot classification tasks, improving AP by 0.13 and AR by 0.12 for segmentation, and achieving a 10% performance increase for zero-shot classification
  - Deployed and operated AI microservices using NVIDIA Triton, VectorDB, GitHub Actions, Gitflow, and ArgoCD
  - Designed a data pipeline using active learning to address class-imbalance in fine-grained datasets, reducing labeling costs by 50% compared to previous methods
  - Built an outlier detection pipeline and an AI service performance monitoring system, reducing 40% outlier data to enhance service quality
  - Developed a data engine with semi-automated labeling capabilities for mask annotations
  - Designed and trained dense prediction models with limited data samples (e.g., hospital foods) [[link](https://medium.com/nuvilab/alexandra-hospital-track-patient-nutrition-intake-733f78209203)]
  - Performed various data engineering tasks, including batch data processing, with Apache Airflow
  - Developed both front-end and back-end components for customizing a data annotation tool
- Language AI Internship at Semantic Knowledge Team, [NAVER Corp.](https://www.navercorp.com) (2021.12 ~ 2022.03)
  - Developed a web-based analyzing/testing tool for the Korean Entity Linking(NED) engine
  - Analyzed existing methods and proposing a suitable model for the Korean Named-Entity Recognition(NER)
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
