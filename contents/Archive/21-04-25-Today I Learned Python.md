---
title: "Today I Learned: Python"
date: "2021-04-25"
template: "post"
draft: true
path: "/cheatsheet/21-04-25/"
description: "새롭게 알게 된 지식 중에서 하나의 포스팅으로 만들기에는 부담스러운 내용들을 이곳에 모아둡니다. 다른 테크 블로그들의 TIL 처럼 매일매일 공부한 내용을 기록하기보다는 그냥 제 맘대로 아무때나 업데이트 할 생각입니다! 나중에는 카테고리 별로 나눌 수 있을 정도로 내용이 엄청 많아졌으면 좋겠네요. (최근에 작성한 내용들이 상단에 위치하도록 배열하였습니다)"
category: "Cheat Sheet"
---

> 최근에 작성한 내용들이 하단에 위치하도록 배열하였습니다.

##### 🗓 2021.04.25

[파이썬 도큐먼트](https://docs.python.org/3/reference/simple_stmts.html#future)의 `future` 문에 대한 설명을 읽었습니다. `future` 문은 미래 버전 파이썬의 기능들을 쉽게 마이그레이션(하나의 운영환경에서 다른 운영환경으로 옮기는 것)하기 위해 만들어졌습니다. import 뒤에 따라오는 new feature가 만약 파이썬 3의 기능이라고 하더라도 파이썬 2 버전에서 사용 가능하게 됩니다.

```python
from __future__ import print_function
```

##### 🗓 2021.05.24

C/C++에서는 int 변수에 0이라는 값을 할당하면 int 크기 만큼의 메모리 공간(4byte)에 0이라는 값을 저장합니다. 이는 변수가 메모리의 주소를 나타내고, 그 주소에는 변수의 값이 저장되어있다는걸 의미합니다.

파이썬은 이와 다르게 우리가 변수라고 부르는 **모든 것이 객체**입니다. C/C++에서는 `y=x`라는 것을 값의 복사로 이해할 수 있지만, 파이썬에서 할당의 의미는 값의 복사가 아닙니다. 데이터가 담긴 객체에 이름을 붙이는 것입니다.

```python
a = 5
b = a
```

간단한 예시를 들자면, 위 코드에서 5를 타이핑함으로써 5라는 값을 가지는 정수 객체를 생성하고, 변수 a와 변수 b가 정수 5 객체의 주소를 참조하게 됩니다.

파이썬의 객체는 그 속성이 mutable(값이 변한다)과 immutable로 구분됩니다.

- Immutable : 숫자(number), 문자열(string), 튜플(tuple)
- Mutable : 리스트(list), 딕셔너리(dictionary), NumPy의 배열(ndarray)

Immutable 타입인 int에 대해 예를 들어 보겠습니다.

```python
x = 1
y = x
y += 3

# results: x = 1, y = 4
```

두 번째 라인까지는 x와 y가 1이라는 동일한 객체를 가르키고 있습니다. 세 번째에서 y의 값을 변경하는 순간 y는 4를, x는 1을 가르키게 됩니다. C/C++같은 언어 관점에서 보면 `y=x`가 실행하는 순간 값을 복사하는 것으로 이해할 수 있지만, 파이썬은 `y=x`가 호출되는 시점에는 동일한 객체를 가르키다가 immutable 타입인 y를 변경했을 때 변경됩니다.

Mutable 타입에 대한 예시와, shallow copy, deep copy에 대한 추가적인 설명은 [이곳](https://wikidocs.net/32277)과 [이곳](https://wikidocs.net/16038)을 참고하시면 좋습니다. 

### References

[^ 1]: mutable vs immutable. (2019년 5월 24일). 공학자를 위한 Python, WikiDocs. 2021년 5월 24일에 확인 https://wikidocs.net/32277
[^ 2]: 얕은 복사(shallow copy)와 깊은 복사(deep copy). (2018년 3월 13일). 파이썬 - 기본을 갈고 닦자!, WikiDocs. 2021년 5월 24일에 확인 https://wikidocs.net/16038
[^ 3]: [기초 파이썬] 파이썬의 모든 것은 Object이다 (정수편). (2017년 05월 01일). Tech Blog for Everyone(LEARN & SHARE), AHRA CHO님. 2021년 5월 24일에 확인 https://ahracho.github.io/posts/python/2017-05-01-everything-in-python-is-object-integer/
