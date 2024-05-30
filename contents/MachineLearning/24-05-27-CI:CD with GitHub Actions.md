---
title: "CI/CD with GitHub Actions"
date: "2024-05-27"
template: "post"
draft: false
path: "/Operations/24-05-27/"
description: "Git workflow 관련 기본 개념과 GitHub Actions을 통해 CI/CD를 하는 방법을 workflow yaml 파일과 함께 기록합니다. 작성중인 게시글이며, 새롭게 알게된 내용이 있을 때 마다 내용을 추가하고 있습니다. 혼자 해보고 싶은 테스트들을 yuhodots/workflows 저장소에서 진행하고 있습니다."
category: "Operations"
thumbnail: "Operations"
---

> Git workflow 관련 기본 개념과 GitHub Actions을 통해 CI/CD를 하는 방법을 workflow yaml 파일과 함께 기록합니다. 작성중인 게시글이며, 새롭게 알게된 내용이 있을 때 마다 내용을 추가하고 있습니다.  

혼자 해보고 싶은 테스트들을 [yuhodots/workflows](https://github.com/yuhodots/workflows) 저장소에서 진행하고 있습니다. 

### GitFlow Workflow

- `master` branch: 배포 가능한 상태의 코드가 존재하는 브랜치. 직접적인 커밋은 거의 이루어지지 않고, 주로 다른 브랜치로부터 병합
- `develop` branch: 개발 중인 기능들을 통합하는 브랜치입. 모든 기능 브랜치(Feature Branch)들이 병합되는 대상
- `feature` branch: 특정 기능이나 개선 작업을 개발하기 위한 브랜치. 주로 develop 브랜치로부터 분기
- `release` branch: 배포 준비가 완료된 상태의 코드를 관리하는 브랜치. 배포 전 테스트 및 버그 수정을 위한 브랜치. 일반적으로 `release/버전-번호` 형식으로 브랜치 이름을 지음. develop 브랜치에서 분기되며, 완료되면 **master 브랜치와 develop 브랜치에 병합**. 이 과정에서 버전 태그를 달아 버전을 관리

<center><img src="../img/24-05-27-1.png"><p><i>Taken from https://nvie.com/posts/a-successful-git-branching-model</i></p></center>

1. 새로운 기능을 개발할 때, Develop 브랜치에서 Feature 브랜치를 분기
2. 기능 개발이 완료되면 Feature 브랜치를 Develop 브랜치에 병합
3. 다음 배포 버전이 준비되면, Develop 브랜치에서 Release 브랜치를 분기
4. Release 브랜치에서 최종 테스트 및 버그 수정을 마치면, Master 브랜치와 Develop 브랜치에 병합. 이 단계에서 GitHub Actions를 적절히 활용하면 CD를 편리하게 가능
5. 배포가 완료되면, Master 브랜치에 버전 태그를 추가

### GitOps Automation with ArgoCD

- GitOps?: 선언형 배포 작업 정의서 / Git을 이용한 배포 버전 관리 / 변경 사항 운영 반영 자동화 / 자가 치유 및 이상 탐지 등의 특징을 가짐
- SSOT?: Single Source of Truth. 데이터베이스, 애플리케이션, 등 모든 데이터에 대해 하나의 출처를 사용하는 개념. 데이터의 정확성, 일관성, 신뢰성을 보장

##### CI Workflow

1. 소스코드 repo, manifest repo를 각각 만들고, manifest repo에 기본적인 helm chart template 제작
2. 소스코드  repo의 .github/worflow에 CI용 yaml 파일 제작
3. 소스코드 repo의 develop 혹은 main branch에 코드를 병합하면 아래 순서대로 CI 과정 수행
   1. 소스코드 repo의 도커파일 빌드
   2. 소스코드 repo 도커파일을 AWS ECR에 업로드
   3. ECR에 업로드된 도커 이미지 tag를 manifest repo의 helm values 파일에 overwrite

##### CD with ArgoCD & Helm Chart

<center><img src="../img/24-05-27-2.png"><p><i>Taken from https://picluster.ricsanfre.com/docs/argocd/</i></p></center>

1. ArgoCD와 manifest repo를 연결
2. Dev / Stage / Prod 분리는 values 활용: manifest repo안에 helm values 파일을 develop 용이랑 production 용으로 각각 제작하고, merge되는 branch 따라서 overwrite되는 values 파일 경로 다르도록 CI yaml 파일 작성
3. ArgoCD에서 sync
4. Secret은 GitHub Secrets, Sealed Secret, Infisical 중에서 선택
