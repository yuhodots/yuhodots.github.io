---
title: "Variational Autoencoder"
date: "2020-03-31"
template: "post"
draft: true
path: "/deeplearning/20-03-31/"
description: " 딥러닝 생성 모델 중 하나인 variational autoencoder(변이형 오토인코더)에 대해 알아보겠습니다. 'Generative Deep Learning' (O'REILLY) 책을 통해 공부한 내용을 중심으로 포스팅을 작성하였습니다. Additional information 파트를 특히 많이 인용하였습니다."
category: "Deep Learning"
thumbnail: "deeplearning"
---

 딥러닝 생성 모델 중 하나인 variational autoencoder(변이형 오토인코더)에 대해 알아보겠습니다. 'Generative Deep Learning' (O'REILLY) 책을 통해 공부한 내용을 중심으로 포스팅을 작성하였습니다. Additional information 파트를 특히 많이 인용하였습니다. 

### Variational Autoencoder

##### 1. VAE의 목표 

 우리가 VAE를 통해 이루고자하는 궁극적인 목표는 **실제 데이터의 분포**를 알아내는 것 입니다. 만약 '1만 차원의 사람 사진 데이터'를 생성하고 싶다고 한다면, 사람 사진 데이터가 1만 차원 상에서 어떤 점에 위치해 있는지를 이상적인 확률 분포로써 알아내는 것이 우리의 목표입니다. 이 분포를 p(x)로 표현합니다.

##### 2. 데이터의 분포를 어떻게 추정해야 하는가 

 그렇다면 우리는 이 확률분포 p(x)만 잘 찾아낸다면 데이터를 생성할 수 있게됩니다. 하지만 우리는 1만 차원 상에서 사람 사진 데이터가 어떤 점에 위치하고 있는지 추정할 근거가 없습니다. 1만 차원이라는 공간에는 무수히 많은 점들이 존재하기 때문에 이 공간에 점을 하나하나 다 찍어서 데이터가 잘 생성되는지 확인하는 방법도 먹히지 않을 것입니다. 그래서 우리는 이 데이터들의 특성을 잘 표현하는 표현 벡터 **z를 통해 p(x)를 추정**하게 됩니다.  

##### 3. 표현 벡터 z의 분포를 어떻게 추정해야 하는가

 표현 벡터 z를 잘 설정하여 이를 VAE의 decoder에 전달해주면 decoder는 알아서 1만 차원 상에 데이터가 존재하는 점을 우리에게 알려줄 것입니다. 하지만 여기서 또 문제가 생깁니다. 표현 벡터 z가 이상적으로 어떻게 분포하고 있는지 우리는 알 수 없습니다. **표현 벡터 z의 확률 분포 p(z)를 추정**하기 위해 encoder를 통해 원본 데이터를 인코딩을 하면 이를 p(z|x)로 생각할 수 있는데, 우리는 어떤 것이 이상적인 p(z|x)인지 알 수 없습니다. (= True posterior를 알 수 없음) 이 문제를 해결하기 위해 **variational inference**라는 방법을 사용합니다. 

##### 4. Variational inference

 variational inference란, 우리가 이상적인 확률 분포를 모르지만 이를 추정하기 위해서 다루기 쉬운 분포를 가정하고 이 확률분포의 모수(평균, 표준편차)를 바꿔가며, 이상적인 확률분포에 근사하게 만들어 그 확률 분포를 대신 사용하는 방법을 말합니다. VAE에서 우리는 이상적인 p(z|x)를 알지 못하므로, 이에 대해 표준정규분포 q(z|x)를 정의하여 q(z|x)의 모수를 바꿔가며 p(z|x)에 근사시킵니다. 학습이 진행되면 q(z|x)가 p(z|x)에 어느정도 근사되며, 그 결과로 표현벡터 z는 우리가 다룰 수 있는 값이 됩니다.

### VAE를 수식으로 이해

 위의 흐름을 딥러닝 모델로 구현하기 위해서는 먼저 수식으로 loss function을 정의해야 하고, 이후 loss function을 줄이는 방향으로 학습을 진행할 수 있어야 합니다. 일단 우리가 궁극적으로 알고싶은 것은 p(x)이기 때문에 식 전개를 p(x)에 log를 취한 값인 log(p(x))부터 시작합시다. (전개 과정은 [데이터 사이언스 스쿨](https://datascienceschool.net/view-notebook/c5248de280a64ae2a96c1d4e690fdf79/) 포스팅에 상세하게 나와있기 때문에 이를 참고하시길 바랍니다.) 그래서 log(p(x))에 대한 식을 쭉 전개하면 최종적으로는 아래와 같이 도출됩니다. 
$$
log(p(x))=ELBO(\phi)+KL(q_{\phi}(z|x)||p(z))
$$

$$
ELBO(\phi)=\mathbb{E}_{q_{\phi}(z|x)}[log(p(x|z))]-KL(q_{\phi}(z|x)||p(z))
$$

 log(p(x))는 bound 되어있는 값이어서 **KLD를 최소화 한다는 것의 의미는 ELBO를 최대화**한다는 것과 동일합니다. 즉, 확률 분포 p(x)를 알아내는 것은 ELBO를 최대화하는 것입니다. 결론적으로는 loss function을 ELBO를 최대화 하도록 정의하면 됩니다. 하지만 주로 loss function을 정의할 때는 loss를 최소화하는 방향으로 학습이 진행되게 합니다. 그래서 ELBO를 최대화 하는 것이 아닌 -ELBO를 최소화하는 방향으로 학습을 진행되도록 loss를 -ELBO로 정의합니다. 최종 loss는 아래와 같습니다.
$$
\mathcal L_{\theta,\phi;x^i}=-\mathbb E_{q_{\phi}(z|x^i)}[log(p_{\theta}(x^i|z))]+KL(q_{\phi}(z|x^i)||p(z))
$$
 식의 앞단(-E...)은 입력데이터와 출력데이터의 차이에 대한 loss라는 의미에서 **reconstruction error**라고 하고, 식의 뒷단(KL...)은 z의 값이 가우시안 정규분포를 따르도록 강제한다는 의미에서 **regularization error**라고 합니다. 

### Additional information

##### Reparametrization trick 

 z를 샘플링 하는 방법에 대해, 코딩을 통해 backpropagation 알고리즘이 잘 작동하도록 사용할 수 있도록 손 봐준 것이 reparametrization trick입니다. 원래 평균이 mu이고 표준편차가 sigma인 가우시안 정규분포에서 z를 샘플링하는 것은 아래 식으로 표현됩니다.
$$
z^{i,l}\sim N(\mu_i,\sigma_i^2)
$$
 하지만 이렇게 샘플링을 하게 되면 backpropagation이 불가능합니다. 그래서 z 샘플링 방법을 아래와 같이 조금 수정을 합니다. 그러면 z는 원래의 확률적 특성을 보존한 채로 샘플링이 가능하면서 backpropagation 또한 가능하게 됩니다. (epsilon은 N(0,1) 가우시안 정규분포에서 샘플링한 값 입니다.)
$$
z^{i,l}= \mu_i + \sigma_i^2 \odot \epsilon
$$

##### KL Divergence

 KLD는 간단하게 얘기하자면, 한 확률 분포가 다른 분포와 얼마나 다른지 측정하는 도구입니다. 그래서 이는 VAE에서, 평균이 mu이고 분산이 log_var로 추정된 정규분포가 표준 정규분포와 얼마나 다른지 측정할 때 사용됩니다. 손실함수에 KLD를 추가하면 잠재공간에 포인트를 선택할 때 사용할 수 있는 잘 정의된 분포를 가지게 됩니다. 이 분포에서 샘플링 하면 VAE가 바라보고 있는 영역안의 포인트를 선택할 가능성이 매우 높습니다. 그리고 KLD는 모든 인코딩된 분포를 표준 정규 분포에 가깝도록 강제합니다. 이로 인해 포인트 군집 사이에 큰 간격이 생길 가능성이 적습니다.

### Reference

- ratsgo's blog - [Variational Autoencoder](https://ratsgo.github.io/generative model/2018/01/27/VAE/)
- 데이비드 포스터 - Generative Deep Learning (O'REILLY)
- 이활석님 '오토인코더의 모든것' - https://www.youtube.com/watch?v=o_peo6U7IRM
- 데이터 사이언스 스쿨 - https://datascienceschool.net/view-notebook/c5248de280a64ae2a96c1d4e690fdf79/