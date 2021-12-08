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

`tf.contrib.layers.group_norm` 같은 instance-based normalization 방식은 미니배치에 대한 running statistics를 사용하지 않기 때문에 `is_tranable` 파라미터가 존재하지 않습니다.

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
d(x, \partial\ohm) & \mbox{if } x \in \ohm \\
-d(x, \partial\ohm) & \mbox{if } x \in \ohm^c
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

