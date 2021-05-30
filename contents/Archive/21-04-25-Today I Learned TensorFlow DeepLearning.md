---
title: "Today I Learned: Deep Learning"
date: "2021-04-25"
template: "post"
draft: true
path: "/cheatsheet/21-04-25-3/"
description: "새롭게 알게 된 지식 중에서 하나의 포스팅으로 만들기에는 부담스러운 내용들을 이곳에 모아둡니다. 다른 테크 블로그들의 TIL 처럼 매일매일 공부한 내용을 기록하기보다는 그냥 제 맘대로 아무때나 업데이트 할 생각입니다! 나중에는 카테고리 별로 나눌 수 있을 정도로 내용이 엄청 많아졌으면 좋겠네요. (최근에 작성한 내용들이 상단에 위치하도록 배열하였습니다)"
category: "Cheat Sheet"
---

> 최근에 작성한 내용들이 하단에 위치하도록 배열하였습니다.

##### 🗓 2021.05.10

[PR-317: MLP-Mixer: An all-MLP Architecture for Vision](https://www.youtube.com/watch?v=KQmZlxdnnuY) 영상을 통해 CNN과 MLP가 별로 다르지 않다는 것을 알았습니다. 영상에서 이진원님은 CNN weight이 Fully-Conneted weight과 다른 점 두 가지가 weight sharing과 locally connected라고 설명하고 있습니다. 시각화된 자료만 봐도 이렇게 간단하게 이해되는 내용인데 왜 지금까지 깨닫지 못했을까라는 생각이 들었고, CNN에 몇 개의(사실은 엄청 많은 양이지만) weight을 추가하는 것만으로도 Fully-Connected와 완전히 동일한 구조로 만들수 있다는 것을 이해했습니다.

##### 🗓 2021.05.14

**Moment**는 물리학에서 특정 물리량과 distance의 곱을 통해 물리량이 공간상 어떻게 위치하는지를 나타내며 Force, Torque, Angular momentum 등을 예로 들 수 있습니다. Moment of mass에 대해서 zeroth moment는 total mass, 1st moment는 center of mass, 2nd moment는 moment of inertia를 의미합니다.

수학에서는 함수의 특징을 나타내기위해 moment라는 워딩을 사용합니다. 함수가 확률분포 형태인 경우 first moment는 확률 분포의 기댓값을 의미하며, 이를 moments about zero라고도 말합니다. 또한 second central moment로는 variance, third standardized moment는 skewness(비대칭도),  fourth standardized moment는 kurtosis(첨도, 뾰족한 정도) 등이 있습니다.

##### 🗓 2021.05.24

~~Encoder(Feature extractor) 뒷 단의 classifier가 fully-connected layer인 경우와 metric-based classifier weight인 경우에 대해 각각의 의미를 고민해보았습니다.~~

### References

[^1]: Wikipedia contributors. (2021, April 12). Moment (mathematics). In Wikipedia, The Free Encyclopedia. Retrieved 12:08, May 24, 2021, from https://en.wikipedia.org/w/index.php?title=Moment_(mathematics)&oldid=1017468752