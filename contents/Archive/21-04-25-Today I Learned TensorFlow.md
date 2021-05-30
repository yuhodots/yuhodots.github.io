---
title: "Today I Learned: TensorFlow"
date: "2021-04-25"
template: "post"
draft: true
path: "/cheatsheet/21-04-25-2/"
description: "새롭게 알게 된 지식 중에서 하나의 포스팅으로 만들기에는 부담스러운 내용들을 이곳에 모아둡니다. 다른 테크 블로그들의 TIL 처럼 매일매일 공부한 내용을 기록하기보다는 그냥 제 맘대로 아무때나 업데이트 할 생각입니다! 나중에는 카테고리 별로 나눌 수 있을 정도로 내용이 엄청 많아졌으면 좋겠네요. (최근에 작성한 내용들이 상단에 위치하도록 배열하였습니다)"
category: "Cheat Sheet"
---

> 최근에 작성한 내용들이 하단에 위치하도록 배열하였습니다.

##### 🗓 2021.04.25

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

##### 🗓 2021.04.27

모델 그래프를 빌드하는 함수에서 for loop를 많이 사용하면 이게 그대로 모델 training 단계에서도 매번 for loop가 적용되어 모델의 학습이 느려지겠구나라고 생각했었는데 곰곰히 생각해보니까 아니더라구요. 

빌드하는 단계에서는 for loop가 여러 번 돌더라도, 그래프의 각 노드들이 연결되고 난 뒤에는 빌드 된 그래프 구조 자체가 중요하지, 빌드 단계에서의 for loop는 관련이 없게 됩니다. 꽤나 오랫동안 아무렇지 않게 착각하고 있었어서 이 곳에 기록합니다. 그럼 map\_fn은 특히 어떤 경우에 메리트를 가질까 궁금하긴 하네요 🧐

##### 🗓 2021.05.02

TensorFlow 1.15로 코드를 짜다가 `softmax_cross_entropy_with_logits`는 loss에 대한 2nd-order 계산을 지원하지만 `sparse_softmax_cross_entropy_with_logits`는 loss에 대한 2nd-order 계산을 지원하지 않는다는걸 알게 되었습니다. 이 둘의 차이는 label이 one-hot 형태로 주어지냐 아니냐의 차이밖에 없는데 이런 결과를 나타냈다는게 이상해서 찾아보다가 tensorflow repository에 [관련 이슈](https://github.com/tensorflow/tensorflow/issues/5876)가 올라왔던 것을 발견했습니다.

요약하자면 일부 indexing 작업에 대한 도함수 계산이 아직 제대로 구현되지 않았거나, 몇 가지 operation에 대해서 2차 미분 계산이 개발자들도 아직 해결하지 못한 오류를 가진다고 말하고 있습니다(구체적인 원인은 모르겠습니다). 0.2 버전에서 1.15 까지 개발이 진행되면서도 TensorFlow 팀이 지속적으로 해결하지 못하고 있는 문제점이 있다는 것이 신기했습니다.

##### 🗓 2021.05.11

`tf.contrib.layers.batch_norm` 함수를 사용할 때 `is_traning` 아규먼트 설정에 주의해야 합니다. Batch normalization을 사용할 때 학습 상황인지 테스트 상황인지에 따라서 mean과 variance로 사용하는 statistics의 출처가 달라지기 때문에 `is_traning`를 잘못 설정한다면 정확도는 높게 나오더라도 그 실험이 잘못된 결과일 수 있습니다.

`is_training`이 True인 경우에는 moving_mean 텐서와 moving_variance 텐서에 statistics of the moments(미니 배치 평균과 분산)을 exponential moving average 식에 따라 축적합니다. BN 계산에는 미니배치의 평균과 분산을 사용합니다.  `is_training`이 False인 경우에는 그동안 축적하였던 moving_mean 텐서와 moving_variance 텐서 값을 가져와 BN 계산에 사용합니다. 

Few-shot learning setting에서 support set과 query set에 대해서 둘 다 `is_training`을 True로 설정하면 이는 transductive setting이 됩니다. 즉 query를 추정하기 위해서 support 뿐만 아니라 query 분포의 정보까지 사용하겠다는 것을 의미합니다. Few-shot learning에서는 대부분 transductive setting이 non-transductive에 비해 3%정도의 성능 향상을 보이기 때문에 본인의 실험 상황에 알맞게 아규먼트 값을 설정해야 합니다. 

`tf.contrib.layers.group_norm` 같은 instance-based normalization 방식은 미니배치에 대한 running statistics를 사용하지 않기 때문에 `is_tranable` 파라미터가 존재하지 않습니다.

### References