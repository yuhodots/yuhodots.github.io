---
title: "Today I Learned"
date: "2021-04-25"
template: "post"
draft: false
path: "/cheatsheet/21-04-25/"
description: "새롭게 알게 된 지식 중에서 하나의 포스팅으로 만들기에는 부담스러운 내용들을 이곳에 모아둡니다. 매일 공부한 내용을 기록하기보다는 아무때나 업데이트 할 생각입니다! 나중에는 카테고리 포스팅을 나눌 수 있을 정도로 내용이 엄청 많아졌으면 좋겠네요. 나중에는 카테고리 별로 나눌 수 있을 정도로 내용이 엄청 많아졌으면 좋겠네요. (최근에 작성한 내용들이 하단에 위치하도록 배열하였습니다)"
category: "Cheat Sheet"
---

새롭게 알게 된 지식 중에서 하나의 포스팅으로 만들기에는 부담스러운 내용들을 이곳에 모아둡니다. 매일 공부한 내용을 기록하기보다는 아무때나 업데이트 할 생각입니다! 나중에는 카테고리 포스팅을 나눌 수 있을 정도로 내용이 엄청 많아졌으면 좋겠네요 🤓

> 최근에 작성한 내용들이 하단에 위치하도록 배열하였습니다.

##### 🥧 Python

*2021.04.25*

[파이썬 도큐먼트](https://docs.python.org/3/reference/simple_stmts.html#future)의 `future` 문에 대한 설명을 읽었습니다. `future` 문은 미래 버전 파이썬의 기능들을 쉽게 마이그레이션(하나의 운영환경에서 다른 운영환경으로 옮기는 것)하기 위해 만들어졌습니다. import 뒤에 따라오는 new feature가 만약 파이썬 3의 기능이라고 하더라도 파이썬 2 버전에서 사용 가능하게 됩니다.

```python
from __future__ import print_function
```

##### 🧩 ML library

*2021.04.25* 

[텐서플로우 공식문서](https://www.tensorflow.org/versions/r1.15/api_docs/python/tf/map_fn)의 `tf.map_fn` 함수에 대한 설명을 읽었습니다. dimension 0에서 unpack된 elems이라는 tensor list의 요소들을 fn에 map합니다. 

```python
tf.map_fn(fn, elems, dtype=None, parallel_iterations=None, back_prop=True,
    	  swap_memory=False, infer_shape=True, name=None)
```

MAML을 구현 할 때 meta-batch에 대한 cross entropy를 병렬적으로 계산하기 위해서 아래와 같은 코드를 사용할 수 있습니다. 여기서 xs의 shape은 [meta-batch size, nway\*kshot, 84\*84\*3] 입니다.

```python
cent, acc = tf.map_fn(lambda inputs: self.get_loss_single(inputs, weights),
					 elems=(xs, ys, xq, yq),
				 	 dtype=(tf.float32, tf.float32),
				 	 parallel_iterations=self.metabatch)
```

##### 🧩  ML library

*2021.04.27*

모델 그래프를 빌드하는 함수에서 for loop를 많이 사용하면 이게 그대로 모델 training 단계에서도 매번 for loop가 적용되어 모델의 학습이 느려지겠구나라고 생각했었는데 곰곰히 생각해보니까 아니더라구요. 

빌드하는 단계에서는 for loop가 여러 번 돌더라도, 그래프의 각 노드들이 연결되고 난 뒤에는 빌드 된 그래프 구조 자체가 중요하지, 빌드 단계에서의 for loop는 관련이 없게 됩니다. 꽤나 오랫동안 아무렇지 않게 착각하고 있었어서 이 곳에 기록합니다. 그럼 map\_fn은 특히 어떤 경우에 메리트를 가질까 궁금하긴 하네요 🧐

##### 🧩  ML library

*2021.05.02*

TensorFlow 1.15로 코드를 짜다가 `softmax_cross_entropy_with_logits`는 loss에 대한 2nd-order 계산을 지원하지만 `sparse_softmax_cross_entropy_with_logits`는 loss에 대한 2nd-order 계산을 지원하지 않는다는걸 알게 되었습니다. 이 둘의 차이는 label이 one-hot 형태로 주어지냐 아니냐의 차이밖에 없는데 이런 결과를 나타냈다는게 이상해서 찾아보다가 tensorflow repository에 [관련 이슈](https://github.com/tensorflow/tensorflow/issues/5876)가 올라왔던 것을 발견했습니다.

요약하자면 일부 indexing 작업에 대한 도함수 계산이 아직 제대로 구현되지 않았거나, 몇 가지 operation에 대해서 2차 미분 계산이 개발자들도 아직 해결하지 못한 오류를 가진다고 말하고 있습니다(구체적인 원인은 모르겠습니다). 0.2 버전에서 1.15 까지 개발이 진행되면서도 TensorFlow 팀이 지속적으로 해결하지 못하고 있는 문제점이 있다는 것이 신기했습니다.

##### 🤖 ML & DL

*2021.05.10*

[PR-317: MLP-Mixer: An all-MLP Architecture for Vision](https://www.youtube.com/watch?v=KQmZlxdnnuY) 영상을 통해 CNN과 MLP가 별로 다르지 않다는 것을 알았습니다. 영상에서 이진원님은 CNN weight이 Fully-Conneted weight과 다른 점 두 가지가 weight sharing과 locally connected라고 설명하고 있습니다. 시각화된 자료만 봐도 이렇게 간단하게 이해되는 내용인데 왜 지금까지 깨닫지 못했을까라는 생각이 들었고, CNN에 몇 개의(사실은 엄청 많은 양이지만) weight을 추가하는 것만으로도 Fully-Connected와 완전히 동일한 구조로 만들수 있다는 것을 이해했습니다.

##### 🧩  ML library

*2021.05.11*

`tf.contrib.layers.batch_norm` 함수를 사용할 때 `is_traning` 아규먼트 설정에 주의해야 합니다. Batch normalization을 사용할 때 학습 상황인지 테스트 상황인지에 따라서 mean과 variance로 사용하는 statistics의 출처가 달라지기 때문에 `is_traning`를 잘못 설정한다면 정확도는 높게 나오더라도 그 실험이 잘못된 결과일 수 있습니다.

`is_training`이 True인 경우에는 moving_mean 텐서와 moving_variance 텐서에 statistics of the moments(미니 배치 평균과 분산)을 exponential moving average 식에 따라 축적합니다. BN 계산에는 미니배치의 평균과 분산을 사용합니다.  `is_training`이 False인 경우에는 그동안 축적하였던 moving_mean 텐서와 moving_variance 텐서 값을 가져와 BN 계산에 사용합니다. 

Few-shot learning setting에서 support set과 query set에 대해서 둘 다 `is_training`을 True로 설정하면 이는 transductive setting이 됩니다. 즉 query를 추정하기 위해서 support 뿐만 아니라 query 분포의 정보까지 사용하겠다는 것을 의미합니다. Few-shot learning에서는 대부분 transductive setting이 non-transductive에 비해 3%정도의 성능 향상을 보이기 때문에 본인의 실험 상황에 알맞게 아규먼트 값을 설정해야 합니다. 

`tf.contrib.layers.group_norm` 같은 instance-based normalization 방식은 미니배치에 대한 running statistics를 사용하지 않기 때문에 `is_trainable` 파라미터가 존재하지 않습니다.

##### 🤖 ML & DL

*2021.05.14*

Moment[^1]는 물리학에서 특정 물리량과 distance의 곱을 통해 물리량이 공간상 어떻게 위치하는지를 나타내며 Force, Torque, Angular momentum 등을 예로 들 수 있습니다. Moment of mass에 대해서 zeroth moment는 total mass, 1st moment는 center of mass, 2nd moment는 moment of inertia를 의미합니다.

수학에서는 함수의 특징을 나타내기위해 moment라는 워딩을 사용합니다. 함수가 확률분포 형태인 경우 first moment는 확률 분포의 기댓값을 의미하며, 이를 moments about zero라고도 말합니다. 또한 second central moment로는 variance, third standardized moment는 skewness(비대칭도),  fourth standardized moment는 kurtosis(첨도, 뾰족한 정도) 등이 있습니다.

##### 👨‍💻 CS

*2021.05.24*

[API](https://ko.wikipedia.org/wiki/API)(Application Programming Interfaces)[^2]는 응용 프로그램에서 사용할 수 있도록, 운영 체제나 프로그래밍 언어가 제공하는 기능을 제어할 수 있게 만든 인터페이스를 말합니다. 외부와 새로운 연결들을 구축할 필요 없이 내부 기능들이 서로 잘 통합되어 있으며, API를 사용하면 해당 API의 자세한 작동원리와 구현방식은 알지 못해도, 제품/서비스간에 커뮤니케이션이 가능합니다.

웹 API가 늘어나면서 메세지 전달을 위한 표준을 만들고자 SOAP(Simple Object Access Protocol)가 개발되었고, 최근 웹 API로는 [REST](https://ko.wikipedia.org/wiki/REST)ful API라는 *아키텍쳐 스타일*이 더 많이 사용되고 있습니다. REST는 규정된 프로토콜이 아니라 아키텍쳐 스타일이기 때문에 정해진 표준은 없습니다. 다만 Roy Fielding의 논문에 정의된 아래의 6가지 원칙을 기본으로 합니다. (자세한 설명은 위키피디아 문서[^3] 참고)

- `인터페이스 일관성`, `무상태(Stateless)`, `캐시 처리 가능(Cacheable)`, `계층화(Layered System)`, `Code on demand (optional)`, `클라이언트/서버 구조`

[URI](https://ko.wikipedia.org/wiki/%ED%86%B5%ED%95%A9_%EC%9E%90%EC%9B%90_%EC%8B%9D%EB%B3%84%EC%9E%90)는 Uniform Resource Identifier(통합 자원 식별자)[^4]의 약자로 특정 자원의 위치를 나타내주는 유일한 주소를 말합니다. RESTful API는 웹 상에서 사용되는 리소스를 HTTP URI로 표현하고, 리소스에 대한 작업들을 HTTP Method로 정의합니다.

##### 🥧 Python

*2021.05.24*

파이썬의 객체는 그 속성이 mutable(값이 변한다)과 immutable로 구분됩니다. ([이곳](https://wikidocs.net/32277)과 [이곳](https://wikidocs.net/16038)을 참고하였습니다.)

- Immutable : 숫자(number), 문자열(string), 튜플(tuple)
- Mutable : 리스트(list), 딕셔너리(dictionary), NumPy의 배열(ndarray)

Immutable 타입인 int에 대해 예를 들어 보겠습니다.

```python
x = 1
y = x
y += 3

# results: x = 1, y = 4
```

두 번째 라인까지는 x와 y가 1이라는 동일한 ***객체***를 가리키고 있습니다. 세 번째에서 y의 값을 변경하는 순간 y는 4를, x는 1을 가리키게 됩니다.

C/C++같은 언어 관점에서 보면 `y=x`가 실행하는 순간 값을 복사하는 것으로 이해할 수 있지만, 파이썬은 `y=x`가 호출되는 시점에는 동일한 객체를 가리키다가 immutable 타입인 y를 변경했을 때 변경됩니다.

##### 🥧 Python

*2021.08.05*

최근에 알게된 유용한 Pycharm 단축키를 정리합니다.

- 변수/함수가 사용된 위치 찾기: `Find Usages`, `Alt + F7` (`Option + F7`)
- 변수/함수 선언부 찾기: `Ctrl + 클릭` (`Command + 클릭`)

##### 👨‍💻 CS 

*2021.08.25*

FLOPS[^9] (FLoating point Operations Per Second)는 '1초 당 부동소수점 연산량'을 의미합니다. 컴퓨터의 성능을 나타낼 때 주로 사용됩니다. 슈퍼 컴퓨터의 성능을 나타낼 경우에는 테라플롭스 TFLOPS(1×1012 플롭스)가 주로 쓰이며 PFLOPS는 페타플롭스를 의미합니다.

FLOPS와 FLOPs의 의미는 다릅니다. FLOPs는 FLoating point Operations의 약자인데, 이는 '부동소수점 연산량'을 의미합니다. FLOPs 같은 경우에는 딥러닝 커뮤니티에서 모델의 크기, 모델의 연산량을 나타내는데 사용됩니다.

##### 🧩 ML library

*2021.09.20*

[PyTorch 공식 문서](https://pytorch.org/docs/stable/generated/torch.unsqueeze.html#torch.unsqueeze)를 참고하여 가장 기본적인 torch Tensor 기능들을 정리합니다.

- squeeze: 차원이 1인 차원을 제거하는 함수입니다. 따로 옵션을 주지 않으면 차원이 1인 모든 차원을 제거합니다.
- unsqueeze: 특정 위치에 1인 차원을 추가하는 함수힙니다.
- view: 텐서의 shape을 변경해주는 함수입니다.

##### 🥧 Python

*2021.09.30*

[Python 공식 문서](https://docs.python.org/ko/3/tutorial/modules.html)를 참고하여 모듈과 모듈성에 대해 정리합니다.

프로그램의 유지/보수를 위해 여러 개의 파일로 나누고 싶거나, 함수를 여러 프로그램에 복사하지 않고도 사용하고 싶은 경우에, 파이썬은 정의들을 파일에 넣고 사용할 수 있는 방법을 제공합니다. 그런 파일을 모듈[^10]이라고 부릅니다. 즉, 다른 파이썬 프로그램에서 불러와 사용할 수 있도록 만든 또 다른 파이썬 파일을 모듈이라고 합니다.

##### 🤖 ML & DL

*2021.11.13*

위키피디아의 Signed Distance Function(SDF)[^12]에 대한 설명을 읽었습니다. 먼저, SDF는 다음과 같이 정의됩니다.

- If $\Omega$ is a subset of a metric space and $b$ is the boundary of $\Omega$ the signed distance function $f$ is defined by

$$
f(x)=
\begin{cases}
d(x, \partial \Omega) & \text{if } x \in \Omega \\
-d(x, \partial \Omega) & \text{if } x \in \Omega^c
\end{cases}
$$

SDF는 어떤 boundary까지의 거리를 표현하는 함수입니다. 만약 어떤 점 $x$가 boundary 안 쪽에 위치하게 되면 function 값은 양수를 갖게 되며, 이 점이 boundary와 점점 가깝게 이동할 수록 function 값은 0에 가까워 지다가, boundary에 위치하는 경우에는 0이 됩니다. 반대로 $x$가 boundary 바깥 쪽에 위치하는 경우에는 function 값이 음수를 갖습니다.

위에서는 SDF 함수의 식에 대해서 boundary 안 쪽인 경우에 양수라고 표기하였지만 boundary 안 쪽을 음수로 두어 반대로 사용하는 경우도 존재합니다. 아래 사진은 DeepSDF[^13]라는 논문에서 가져온 SDF의 예시이며 해당 논문에서는 boundary 안 쪽을 음수로 두었습니다.

![img](../img/21-11-14-2.png)

과거의 surface 추정이나 3D reconstruction 같은 task에서는 주로 voxel, point, mesh를 사용하는 방식으로 접근했다면, 최근에는 SDF 사용하려는 시도가 늘어나고 있는 것 같습니다. 특히 Implicit Neural Representation 연구와 SDF를 결합한 연구 결과들이 흥미로워 보였습니다.

Implicit Neural Representation은 이미지나 3D 데이터를 pixel, voxel 단위의 matrix 형태로 표현하는 것이 아니라, (x, y) 값을 받았을 때 (r, g, b) 값을 출력하는 어떤 함수 하나로써 표현하려는 연구입니다(함수 1개는 데이터 1개를 의미하고, 따라서 학습 입력 1개는 픽셀 값 1개로 주어지게 될 듯 합니다). 데이터를 연속적인 함수의 형태로 표현하기 때문에 자연스럽게 super resolution이 가능하다는 장점이 있는데, 최근에 이 방식과 SDF를 결합하여 최종 output을 매우 매끄럽게 만들어내고자 하는 연구가 많이 진행되고 있습니다.

##### 🤖 ML & DL

*2021.12.02*

지금까지는 아무 생각 없이 continuous distribution에서도 single point에 특정 확률이 존재한다고 생각했습니다. 예를 들어 $\mathcal N (0, 1)$에 대해서 point $x=1$이 관측될 확률이 특정 값으로 존재한다고 잘못 생각하고 있었습니다.

[이 곳](https://www.itl.nist.gov/div898/handbook/eda/section3/eda361.htm)[^14]을 참고하니 continuous probability function은 continuous interval의 무한 points에 대해 정의되기 때문에 single point의 확률은 언제나 0이며, 따라서 continuous probability function에서 확률은 특정 interval에 대해서 측정하고 single point에 대해선 측정하지 않는다고 합니다.

어찌보면 간단한 것이었지만 자세히 생각해보지는 않아서 헷갈렸던 듯 합니다. 추가적으로, 그러면 어떻게 0이 모여 1이 되는 것 인지까지 궁금해지면서 수학을 당장 근본부터 다시 공부해야하나 싶었지만, 시간은 한정되어 있고 할 일은 많으니 길게 보고 천천히 공부하자는 결론으로 돌아왔습니다 🥲

##### 🧩 ML library

*2021.12.08*

PyTorch에 특정 weight만 freeze하는 기능이 구현되어 있는지 살펴보았습니다.

Layer 단위로 freezing 하는 경우에는 `required_grad=False`를 사용해서 구현했었는데, layer 내 특정 weight만 골라서 freeze하는 기능은 따로 본 적이 없는 것 같아 찾아보다가 [해당 링크](https://discuss.pytorch.org/t/how-do-i-freeze-the-specific-weights-in-a-layer/104722/2)를 읽게 되었습니다. 작성자 분이 설명하기로는 아래와 같은 두 가지 임시방편이 있다고 합니다.

- `.step()`를 호출하기 전에 freeze 하고자하는 weight에 대해서 `grad=0` 할당. 다만 momentum, weight decay를 사용하는 optimizer의 경우엔 `grad=0`이더라도 `.step()` 호출 시 weight을 변형하기 때문에 원하는대로 동작하지 않을 수 있음
- Freeze하고 싶은 weight을 미리 copy 해두고 `.step()` 을 호출하여 weight을 업데이트한 뒤에, 복사했던 weight을 업데이트된 weight에 덮어씌우기

##### 🤖 ML & DL

*2022.01.15*

[링크](https://omoindrot.github.io/triplet-loss)[^15]를 참고하여 triplet loss 관련 용어를 숙지하였습니다. 

- Easy triplets: $d(a, p) + \text{margin} < d(a, n)$
- Hard triplets: $d(a,n) < d(a, p)$
- Semi-hard triplets: $d(a, p) < d(a, n) < d(a,p) + \text{margin}$

##### 🧩 ML library

*2022.02.28*

Random seed를 고정할 때 가장 먼저 고려하면 좋을 것들을 기록하였습니다.

```python
random.seed(args.seed)
np.random.seed(args.seed)
torch.manual_seed(args.seed)
torch.cuda.manual_seed_all(args.seed)
```

##### 👨‍💻 CS 

*2022.03.30*

친구([@jiun0](https://github.com/jiun0), [@bwmelon97](https://github.com/bwmelon97))들을 통해 알게 된 네이밍 스타일에 대해서 간단히 기록합니다.

- 네이밍 스타일 종류: `lowerCamelCase`, `UpperCamelCase (PascalCase)`, `snake_case`, `Train_Case`, `spinal_case`, `UPPER_SNAKE_CASE`, ...
- 자바스크립트는 주로: 변수, 함수, 메서드는 lowerCamelCase / 클래스명은 PascalCase / 상수명은 UPPER_SNAKE_CASE
- 파이썬(PEP8)은 주로: 변수, 함수는 snake_case / 클래스는 CamelCase

##### 🤖 ML & DL

*2022.04.10*

연구를 하며, 모델 학습의 안정성에 있어서 residual connection이 유용하다는 경험적인 팁을 얻었습니다. ResNet과 같이 모델 구조에서 residual connection을 활용하는 것 뿐만 아니라, 어떤 값을 조심스럽게 바꾸고 싶을 때 residual connection을 가진 구조가 비교적 높은 성능을 보이는 것을 확인하였습니다.

예를 들어 GNN을 통해 embedding vector를 업데이트하고 싶을 때 $V_{t+1} = G(V_t)$의 형태를 사용하는 것 보다 $V_{t+1} = V_t + G(V_t)$의 형태를 사용하는 것이 좋으며, 현재 실험 중인 것 중에서는 few-shot으로 distribution의 mean을 잘 추정해보려는 내용이 있는데, 이 경우에도 $\hat \mu = f_\theta(\text{few-shot})$ 보다는 $\hat \mu = \text{mean of few-shot} +  f_\theta(\text{few-shot})$ 형태에서 더 좋은 결과를 얻었습니다.

아무래도 일반적으로 parameter가 0에 가까운 가우시안으로 초기화되기 때문에, residual connection을 사용한 경우에 초기 loss가 더 작아져 비교적 학습이 안정적인 것이 아닐까 싶습니다. (*정말로 그런 것인지 찾아보고 내용 추가하기*)

##### 👨‍💻 CS 

*2022.05.11*

- 인터프리터[^18] 언어: Python과 같이, 프로그래밍 언어의 소스 코드를 바로 실행. 빌드 시간이 없지만, runtime에서는 컴파일 언어에 비해 속도가 느림
- 컴파일 언어[^19]: C/C++과 같이, 특정 프로그래밍 언어로 쓰여 있는 문서를 다른 프로그래밍 언어(혹은 기계어)로 번역하여 실행. 빌드 시간이 소요되지만, runtime에서 빠르게 실행 가능. 원래의 문서를 소스 코드(혹은 원시 코드)라고 부르고, 출력된 문서를 목적 코드라고 부름. 목적 코드는 주로 하드웨어가 처리하기에 용이한 형태로 출력되지만 사람이 읽을 수 있는 문서 파일이나 그림 파일 등으로 옮기는 경우도 있음
- 현대에 들어 많은 인터프리터가 JIT(just-in-time) 컴파일 등의 기술로 실시간 컴파일을 수행하므로, 컴파일러와 인터프리터 사이의 기술적 구분은 사라져 가는 추세. Java가 JIT 컴파일을 지원하기 때문에 컴파일 언어인 동시에 인터프리터 언어라고 할 수 있음.

##### 🤖 ML & DL

*2022.05.16*

Moore–Penrose inverse(=Pseudo inverse)[^20]에 대해서 정리합니다.

- $A\mathrm  x =\mathrm b$의 형태의 linear system을 풀 때, $A$가 정방 행렬이 아니라면 아래의 두 가지 상황이 존재.

1. Underdetemined (n < m): 가로로 긴 A. Infinitely many solution given $\mathrm b$ in general
2. Overdetermined (n > m): 세로로 긴 A. Zero solution for given $\mathrm b$ in general

- $A$에 대해서 singular value decomposition을 수행하면 아래와 같이 전개가 가능함

$$
A \mathrm x = b \\
U \Sigma V^\top \mathrm  x =\mathrm b \\
V \Sigma ^{-1} U^\top U \Sigma V^\top \mathrm  x =V \Sigma ^{-1} U^\top \mathrm b \\
\tilde {\mathrm x} = V \Sigma ^{-1} U^\top \mathrm b := A^+ \mathrm  b
$$

- 여기서 $A^+ = V \Sigma ^+ U^\top $를 A의 pseudo inverse라 함
- $\Sigma = \text{diag}_{n,m}(\lambda_1, \cdots, \lambda_{\min\{ n, m \}})$일 때, $\Sigma^+ = \text{diag}_{m,n}(\lambda_1^+, \cdots, \lambda^+_{\min\{ n, m \}})$ where $\lambda^+= 
  \begin{cases}
      \lambda^{-1},& \lambda \neq 0 \\
      0,              & \lambda = 0
  \end{cases}$

Moore–Penrose inverse를 사용하면 선형대수학의 많은 부분을 쉽게 서술 및 증명 가능함

1. Underdetemined(해가 여러 개 존재)에서 $A^+ \mathrm b$는 유클리드 노름 $||\tilde {\mathrm x} ||_2$을 최소화하는 해임
2. Overdetermined에서 $||A \tilde {\mathrm  x} - \mathrm b||_2 = ||A A^+ \mathrm b - \mathrm b||_2$는 최소제곱법의 최적해임

##### 🤖 ML & DL

*2022.05.27*

Linear combination에 대해서 계수가 양수이고 계수의 합이 1인 경우, 이를 convex combination이라고 함

Convex set의 정의와 연관지어 보면, 어떤 집합 C에 속하는 임의의 점들의 convex combination이 C에 속하면 그 집합은 convex set이라고 말할 수 있으며, 마찬가지로 convex set C에 속하는 점들의 convex combination은 항상 C에 속함.

##### 🤖 ML & DL

*2022.05.28*

다양한 Data Augmentation 방법들에 대해서 [이곳](https://cse-study.github.io/ai/2022-05/220527-data-augmentation/)에 정리하였습니다.

##### 🤖 ML & DL

*2022.06.29*

Upper bound, Lower bound, Supremum, Infimum에 대한 수학적 정의를 [이곳](https://web.math.ucsb.edu/~agboola/teaching/2021/winter/122A/rudin.pdf)을 참고하여 정리합니다.

- Upper bound (상계): 어떤 실수 $\beta$가 있을 때, $E$의 모든 원소 $x$에 대해서 $x < \beta$를 만족할 때, $\beta$를 $E$의 upper bound라고 함. 이 때 $E$는 ***bounded above***라고 함. (Lower bound도 동일한 방식으로 정의 됨)
- Supremum, Least upper bound (상한): $\alpha = \sup E$ 이려면, $\alpha$가 $E$의 upper bound이며, $\gamma < \alpha$인 모든 $\gamma$가 $E$의 upper bound가 아니어야 함. 즉, **upper bound 중 least가 supermum**임
- Infimum, Greatest lower bound (하한): $\alpha = \inf E$ 이려면, $\alpha$가 $E$의 lower bound이며,  $\beta > \alpha$인 모든 $\beta$가 $E$의 lower bound가 아니어야 함. 즉, **lower bound 중 greatest가 infimum**임

##### 👨‍💻 CS 

*2022.08.26*

'머신러닝 시스템 디자인 패턴 (시부이 유우스케 지음)' 책에 등장하는 기술 스택에 대해 간단히 정리합니다.

- ONNX[^21]: Intermediate Representation(IR)의 한 종류. ML model에 대해서 static graphs의 형태인 CNTK, Caffe2, Theano, TensorFlow와 dynamic graphs의 형태인 PyTorch, Chainer 등 다양한 프레임워크들이 존재하고, 이들은 각각 그들만의 특장점이 존재함. 따라서 개발 단계에 따라 적합한 도구를 선택하는 것이 요구되는데, 이 때 ONNX를 활용하면 서로 다른 환경에서 만들어진 모델을 하나의 공통된 형태로 변환하여 사용할 수 있음
- Redis: Database 중 하나이며, Cassandra DB, DynamoDB와 같이 **key value DB engine** 중 하나임. in-memory 데이터 구조를 사용하여 매우 빠른 속도를 가지며, 캐싱을 위해 자주 사용됨
- gRPC(Remote Procedure Calls): 구글이 최초로 개발한 오픈 소스 원격 프로시저 호출 (RPC) 시스템. 여기서 RPC[^22]는 별도의 원격 제어를 위한 코딩 없이 다른 주소 공간에서 함수나 프로시저를 실행할 수 있게하는 프로세스 간 통신 기술을 말함. 

##### 🤖 ML & DL

*2022.10.06*

10월 6일에 진행된 AI workshop 내용을 기록합니다. 먼저, Federated Learning과 관련된 내용입니다.

1. Federated Learning (FL)
   - Central server에 client의 data를 업로드할 수 없는 상황에 어떻게 모델을 학습할 수 있을지?
   - Client에서 각자 업데이트된 '모델'을 서버로 올리고, 평균을 취해서 다시 client에게 뿌리는 방식이 제일 일반적 (FedAvg)
   - 하지만 이런 방식은 non-IID setting(heterogeneous)에서 매우 크게 성능이 떨어지게 됨: PFL 연구의 배경
2. Personalized Federated Learning (PFL): Client specific weights이 도입됨
3. PFL via Meta-learning: PFL의 컨셉과 Meta-learning(MAML)의 컨셉이 매우 유사하다는 점에서 고안됨

Imitation learning 관련 내용입니다.

1. Reinforcement Learning (RL)
   - Purpose: Find an optimal policy $\pi*$ that miximize $V$
   - Require domain knowledge for real-world application
   - 드론을 예로 들면, 실제 드론은 매우 쉽게 부숴지므로 Sim2Real learning을 고려해야 하고, 드론 physics에 많은 perturbation이 존재하므로 Robust learning도 고려해야 함
2. Imitation Learning (IL)
   - Behavior cloning (BC), Inverse RL (IRL), IRL + RL 등의 방법이 존재
   - BC는 많은 양의 데이터가 필요하고 compounding error에 취약하므로, 이런 점에서는 IRL이 장점을 가짐
3. Generative Adversariel Imitation Learning (GAIL)
   - Real data로는 expert actions를 제공하고, Fake data로는 policy actions를 제공하여 expert의 policy를 흉내내도록 학슴
   - Limitation: Real envrionment danger와 environment perturbation에 대해서는 잘 모델링하지 않음. 따라서 domain-adpative IL이 필요
4. Simulation-based Learning: Domain Adaptive IL
   - Simulation(source) env.에서 information을 뽑아, target env의 policy에 도움을 주도록, information extraction 과정이 중요

##### 🤖 ML & DL

*2022.10.06*

레딧을 읽다가 "학습이 너무 오래걸리는 경우엔 하이퍼파리미터 튜닝을 어떻게 해야하는가?"에 대한 글이 있어, 글에 달린 코멘트와 개인적인 생각들을 기록합니다.

- 모델 스케일을 줄인 상태로 하이퍼 파라미터 튜닝을 진행하거나, 데이터셋을 일부만 사용한 학습을 통해 하이퍼 파라미터 튜닝을 진행
- e.g., ResNet152라고 한다면 ResNet18 같이 작은 모델 사용하거나, ImageNet이라고 한다면 100개 class만 사용하여 학습 수행
- 이 방법은 당연히 sub-optimal이긴 하겠지만 학습이 너무 오래걸리는 경우에 충분히 활용해 볼만 한 방법이라고 생각했음
- 사실 제일 좋은 것은 GPU 자원을 병렬로 충분히 활용할 수 있게 엔지니어링을 거친 후에 학습하는 것. 왜냐면 big model과 small model 사이에 하이퍼 파라미터에 따른 모델의 동작에 분명히 차이가 존재할 것이기 때문에, 원래 스케일대로 실험하는게 제일 좋음

##### 🤖 ML & DL

*2022.10.14*

ML 분야에서의 "Grokking"이라는 단어의 의미를 기록합니다.

- Overparameterized된 뉴럴넷 모델이, small training dataset에 대해서 overfit 되어 있다가, 매우 많은 시간(optimization step)이 지난 후에 어느 지점에 갑자기 좋은 generalization 성능(validation loss 감소)을 달성하는 현상
- OpenAI의 ["Grokking: Generalization Beyond Overfitting on Small Algorithmic Datasets"](https://mathai-iclr.github.io/papers/papers/MATHAI_29_paper.pdf) 논문에서 명명

##### 🤖 ML & DL

*2022.10.21*

- The stability-plasticity dilemma: 새로운 지식을 얻기 위해 모델의 영구 변형이 요구되면서도, 동시에 기존의 지식을 잊어버리지도 않아야 한다는 점
- Learning in a parallel and distributed system requires plasticity for the integration of new knowledge but also stability in order to prevent the forgetting of previous knowledge.[^23]

### References

[^1]: Wikipedia contributors. (2021, April 12). Moment (mathematics). In Wikipedia, The Free Encyclopedia. Retrieved 12:08, May 24, 2021, from https://en.wikipedia.org/w/index.php?title=Moment_(mathematics)&oldid=1017468752
[^2]: API. (2021년 3월 2일). 위키백과, . 04:58, 2021년 5월 24일에 확인 https://ko.wikipedia.org/w/index.php?title=API&oldid=28891731 
[^3]: REST. (2021년 4월 28일). 위키백과, . 04:57, 2021년 5월 24일에 확인 https://ko.wikipedia.org/w/index.php?title=REST&oldid=29220143
[^4]: 통합 자원 식별자. (2021년 3월 14일). 위키백과, . 05:02, 2021년 5월 24일에 확인 https://ko.wikipedia.org/w/index.php?title=%ED%86%B5%ED%95%A9%EC%9E%90%EC%9B%90%EC%8B%9D%EB%B3%84%EC%9E%90&oldid=28963926
[^ 5]: mutable vs immutable. (2019년 5월 24일). 공학자를 위한 Python, WikiDocs. 2021년 5월 24일에 확인 https://wikidocs.net/32277
[^ 6]: 얕은 복사(shallow copy)와 깊은 복사(deep copy). (2018년 3월 13일). 파이썬 - 기본을 갈고 닦자!, WikiDocs. 2021년 5월 24일에 확인 https://wikidocs.net/16038
[^7]: JinWon Lee - PR-317: MLP-Mixer: An all-MLP Architecture for Vision. https://www.youtube.com/watch?v=KQmZlxdnnuY
[^8]: JoonYoung Yi - Slideshare, Dynamically Expandable Network (DEN). https://www.slideshare.net/ssuser62b35f/180808-dynamically-expandable-network

[^9]: 플롭스. (2021년 2월 3일). *위키백과,* . 13:21, 2021년 8월 25일에 확인 [https://ko.wikipedia.org/w/index.php?title=%ED%94%8C%EB%A1%AD%EC%8A%A4&oldid=28682165](https://ko.wikipedia.org/w/index.php?title=플롭스&oldid=28682165)
[^10]: 6. 모듈. (2021년 9월 30일). Python 3.9.7 문서, https://docs.python.org/ko/3/tutorial/modules.html
[^11]: 모듈성 (프로그래밍). (2019년 4월 16일). 위키백과, . 15:08, 2021년 9월 30일에 확인 https://ko.wikipedia.org/w/index.php?title=%EB%AA%A8%EB%93%88%EC%84%B1_(%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)&oldid=24041546
[^12]: Wikipedia contributors. (2021, August 1). Signed distance function. In *Wikipedia, The Free Encyclopedia*. Retrieved 00:41, November 14, 2021, from https://en.wikipedia.org/w/index.php?title=Signed_distance_function&oldid=1036639454
[^13]: Park, Jeong Joon, et al. "Deepsdf: Learning continuous signed distance functions for shape representation." *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition*. 2019.
[^14]: 1.3.6.1.What is a Probability Distribution., *NIST/SEMATECH e-Handbook of Statistical Methods*, http://www.itl.nist.gov/div898/handbook/, December 2, 2021.

[^ 15]: Olivier Moindrot. "Triplet Loss and Online Triplet Mining in TensorFlow". https://omoindrot.github.io/triplet-loss, Mar 19, 2018.

[^ 16]: Wikipedia contributors. (2021, December 22). Web query. In *Wikipedia, The Free Encyclopedia*. Retrieved 06:04, February 6, 2022, from https://en.wikipedia.org/w/index.php?title=Web_query&oldid=1061542579
[^ 17]: Christina Kopecky. "What is a database query? SQL and NoSQL queries explained". https://www.educative.io/blog/what-is-database-query-sql-nosql#what-is, Aug 31, 2020.
[^18]: 인터프리터. (2022년 3월 3일). *위키백과,* . 14:47, 2022년 5월 10일에 확인 [https://ko.wikipedia.org/w/index.php?title=%EC%9D%B8%ED%84%B0%ED%94%84%EB%A6%AC%ED%84%B0&oldid=32006110](https://ko.wikipedia.org/w/index.php?title=인터프리터&oldid=32006110) 에서 찾아볼 수 있음.
[^19]: 컴파일러. (2022년 3월 15일). *위키백과,* . 15:23, 2022년 5월 10일에 확인 [https://ko.wikipedia.org/w/index.php?title=%EC%BB%B4%ED%8C%8C%EC%9D%BC%EB%9F%AC&oldid=32228964](https://ko.wikipedia.org/w/index.php?title=컴파일러&oldid=32228964) 에서 찾아볼 수 있음.

[^20]: Wikipedia contributors. (2022, April 27). Moore–Penrose inverse. In *Wikipedia, The Free Encyclopedia*. Retrieved 06:08, May 16, 2022, from [https://en.wikipedia.org/w/index.php?title=Moore%E2%80%93Penrose_inverse&oldid=1085006448](https://en.wikipedia.org/w/index.php?title=Moore–Penrose_inverse&oldid=1085006448)
[^21]: https://github.com/onnx/onnx/blob/main/docs/Overview.md
[^22]: 원격 프로시저 호출. (2022년 2월 26일). *위키백과,* . 11:52, 2022년 8월 26일에 확인 [https://ko.wikipedia.org/w/index.php?title=%EC%9B%90%EA%B2%A9_%ED%94%84%EB%A1%9C%EC%8B%9C%EC%A0%80_%ED%98%B8%EC%B6%9C&oldid=31906127](https://ko.wikipedia.org/w/index.php?title=원격_프로시저_호출&oldid=31906127) 에서 찾아볼 수 있음.
[^23]: Mermillod, Martial, Aurélia Bugaiska, and Patrick Bonin. "The stability-plasticity dilemma: Investigating the continuum from catastrophic forgetting to age-limited learning effects." *Frontiers in psychology* 4 (2013): 504.
