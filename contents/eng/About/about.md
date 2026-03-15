---
title: "about"
date: "2021-01-30"
template: "about"
draft: true
path: "/about/"
description: "none"
category: "about"
---

## Hello 🙋‍♂️

Hello! Thank you for visiting my blog. I'm Yuho Jeong, an AI Engineer.

In graduate school, I researched algorithms capable of generalizing to unseen data through learning with limited data, such as `Meta-Learning`, `Continual Learning`, and `Open-World Learning`. During this journey, I often contemplated the challenges and limitations encountered when deploying AI technologies in real-world services, as well as ways to overcome them. Based on this experience, I currently develop AI technologies for real-world services in industry.

I value problem definition and strive to find solutions from various perspectives rather than limiting them to modeling alone. I'm deeply interested in technologies that can actually make an impact in the real world, not just produce research results, and I'm studying various AI pipeline designs. Feel free to reach out via email or LinkedIn with any questions or advice—you are always welcome.

Lastly, I've been noticing that articles delegated to AI tend to have much higher technical quality than those I study and write myself. Therefore, many posts from 2026 onward have been delegated to AI for writing, and I've noted this briefly within each respective post for your reference. Additionally, all posts on this site are translated into English using AI.

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
- ROK Naval Education Command, Instructor Training: Convolutional Neural Network Hands-on Lecture (2021.06.05)
- CoreAI Seminar, "Bootstrap Your Own Latent." (2021.04.02) [[slides](https://slack-files.com/T017E9YJDU0-F01TUCCPNV6-54c6e3fb59)] [[post](https://yuhodots.github.io/deeplearning/21-04-04/)]
- CoreAI Seminar, "Learning to Propagate Labels: Transductive Propagation Network for Few-shot Learning." (2021.03.06) [[slides](https://slack-files.com/T017E9YJDU0-F01PZ1RKUQP-9675e49bb9)] [[post](https://yuhodots.github.io/deeplearning/21-03-04/)]
- UNIST AI Innovation Park, AI Novatus Academia: AI Fundamentals Hands-on Lecture (2021.02, 2021.07)

### Projects

- Personal project - Web: BackEnd development at the online thrift store, [Uitda](https://github.com/yuhodots/uitda) (2019.02 ~ 2020.06)
- Course project: [pacman](https://github.com/yuhodots/pacman), [handpose](https://github.com/yuhodots/handpose), [covid-correlation](https://yuhodots.github.io/covid-correlation/), [mav-simulation](https://github.com/yuhodots/mav-simulation), [pintos](https://github.com/yuhodots/pintos), [uav-control](https://github.com/yuhodots/uav-control)
- Research repositories: [cl-research](https://github.com/cl-research), [ncd-research](https://github.com/ncd-research), [ner-research](https://github.com/ner-research), [toolkits](https://github.com/yuhodots/toolkits)
- Study group: <https://cse-study.github.io/home/>
