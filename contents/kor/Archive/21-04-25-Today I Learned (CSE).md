---
title: "Today I Learned (CSE)"
date: "2021-04-25"
template: "post"
draft: false
path: "/cheatsheet/21-04-25/"
description: "새롭게 알게 된 지식 중에서 하나의 포스팅으로 만들기에는 부담스러운 내용들을 이곳에 모아둡니다. 매일 공부한 내용을 기록하기보다는 아무때나 비정기적으로 내용을 업데이트 하고 있습니다. 본 포스팅에서는 AI/ML 외의 CSE 기술스택 내용을 쌓고 있습니다. 최근에 작성한 내용들이 하단에 위치하도록 배열하였습니다."
category: "Cheat Sheet"
---

새롭게 알게 된 지식 중에서 하나의 포스팅으로 만들기에는 부담스러운 내용들을 이곳에 모아둡니다. 매일 공부한 내용을 기록하기보다는 아무때나 비정기적으로 내용을 업데이트 하고 있습니다. 본 포스팅에서는 AI/ML 외의 CSE 기술스택 내용을 쌓고 있습니다. 최근에 작성한 내용들이 하단에 위치하도록 배열하였습니다.

##### 🥧 Python

*2021.04.25*

[파이썬 도큐먼트](https://docs.python.org/3/reference/simple_stmts.html#future)의 `future` 문에 대한 설명을 읽었습니다. `future` 문은 미래 버전 파이썬의 기능들을 쉽게 마이그레이션(하나의 운영환경에서 다른 운영환경으로 옮기는 것)하기 위해 만들어졌습니다. import 뒤에 따라오는 new feature가 만약 파이썬 3의 기능이라고 하더라도 파이썬 2 버전에서 사용 가능하게 됩니다.

```python
from __future__ import print_function
```

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

FLOPS[^7] (FLoating point Operations Per Second)는 '1초 당 부동소수점 연산량'을 의미합니다. 컴퓨터의 성능을 나타낼 때 주로 사용됩니다. 슈퍼 컴퓨터의 성능을 나타낼 경우에는 테라플롭스 TFLOPS(1×1012 플롭스)가 주로 쓰이며 PFLOPS는 페타플롭스를 의미합니다.

FLOPS와 FLOPs의 의미는 다릅니다. FLOPs는 FLoating point Operations의 약자인데, 이는 '부동소수점 연산량'을 의미합니다. FLOPs 같은 경우에는 딥러닝 커뮤니티에서 모델의 크기, 모델의 연산량을 나타내는데 사용됩니다.

##### 🥧 Python

*2021.09.30*

[Python 공식 문서](https://docs.python.org/ko/3/tutorial/modules.html)를 참고하여 모듈과 모듈성에 대해 정리합니다.

프로그램의 유지/보수를 위해 여러 개의 파일로 나누고 싶거나, 함수를 여러 프로그램에 복사하지 않고도 사용하고 싶은 경우에, 파이썬은 정의들을 파일에 넣고 사용할 수 있는 방법을 제공합니다. 그런 파일을 모듈[^8]이라고 부릅니다. 즉, 다른 파이썬 프로그램에서 불러와 사용할 수 있도록 만든 또 다른 파이썬 파일을 모듈이라고 합니다.

##### 👨‍💻 CS 

*2022.03.30*

친구([@jiun0](https://github.com/jiun0), [@bwmelon97](https://github.com/bwmelon97))들을 통해 알게 된 네이밍 스타일에 대해서 간단히 기록합니다.

- 네이밍 스타일 종류: `lowerCamelCase`, `UpperCamelCase (PascalCase)`, `snake_case`, `Train_Case`, `spinal_case`, `UPPER_SNAKE_CASE`, ...
- 자바스크립트는 주로: 변수, 함수, 메서드는 lowerCamelCase / 클래스명은 PascalCase / 상수명은 UPPER_SNAKE_CASE
- 파이썬(PEP8)은 주로: 변수, 함수는 snake_case / 클래스는 CamelCase

##### 👨‍💻 CS 

*2022.05.11*

- 인터프리터[^12] 언어: Python과 같이, 프로그래밍 언어의 소스 코드를 바로 실행. 빌드 시간이 없지만, runtime에서는 컴파일 언어에 비해 속도가 느림
- 컴파일 언어[^13]: C/C++과 같이, 특정 프로그래밍 언어로 쓰여 있는 문서를 다른 프로그래밍 언어(혹은 기계어)로 번역하여 실행. 빌드 시간이 소요되지만, runtime에서 빠르게 실행 가능. 원래의 문서를 소스 코드(혹은 원시 코드)라고 부르고, 출력된 문서를 목적 코드라고 부름. 목적 코드는 주로 하드웨어가 처리하기에 용이한 형태로 출력되지만 사람이 읽을 수 있는 문서 파일이나 그림 파일 등으로 옮기는 경우도 있음
- 현대에 들어 많은 인터프리터가 JIT(just-in-time) 컴파일 등의 기술로 실시간 컴파일을 수행하므로, 컴파일러와 인터프리터 사이의 기술적 구분은 사라져 가는 추세. Java가 JIT 컴파일을 지원하기 때문에 컴파일 언어인 동시에 인터프리터 언어라고 할 수 있음.

##### 👨‍💻 CS 

*2022.08.26*

'머신러닝 시스템 디자인 패턴 (시부이 유우스케 지음)' 책에 등장하는 기술 스택에 대해 간단히 정리합니다.

- ONNX: Intermediate Representation(IR)의 한 종류. ML model에 대해서 static graphs의 형태인 CNTK, Caffe2, Theano, TensorFlow와 dynamic graphs의 형태인 PyTorch, Chainer 등 다양한 프레임워크들이 존재하고, 이들은 각각 그들만의 특장점이 존재함. 따라서 개발 단계에 따라 적합한 도구를 선택하는 것이 요구되는데, 이 때 ONNX를 활용하면 서로 다른 환경에서 만들어진 모델을 하나의 공통된 형태로 변환하여 사용할 수 있음
- Redis: Database 중 하나이며, Cassandra DB, DynamoDB와 같이 **key value DB engine** 중 하나임. in-memory 데이터 구조를 사용하여 매우 빠른 속도를 가지며, 캐싱을 위해 자주 사용됨
- gRPC(Remote Procedure Calls): 구글이 최초로 개발한 오픈 소스 원격 프로시저 호출 (RPC) 시스템. 여기서 RPC[^22]는 별도의 원격 제어를 위한 코딩 없이 다른 주소 공간에서 함수나 프로시저를 실행할 수 있게하는 프로세스 간 통신 기술을 말함. 

##### 👨‍💻 CS

*2023.01.14*

Hash Table에 대해 간단히 정리합니다.

- Key를 hash function에 넣어 index를 얻고, 해당 index의 value에 접근하는 방식
- Collision이 없는 경우에는 $O(1)$의 시간복잡도를 가지지만, collision이 존재하는 경우에는 해당 index 내에서 선형 탐색을 하기 때문에 최악의 경우 $O(N)$의 시간복잡도를 가짐

##### 👨‍💻 CS

*2023.02.24*

Data lake와 Database catalog에 대해 간단히 정리합니다.

- Data lake: 데이터를 원시 형태(raw data)로 저장하는 단일한 데이터 저장소. 구조화되거나 반구조화되거나 구조화되지 않은 대량의 데이터를 저장, 처리, 보호하기 위한 중앙 집중식 저장소
- **Data lake, Data warehouse, Data mart의 차이점**: [링크](https://aws.amazon.com/ko/compare/the-difference-between-a-data-warehouse-data-lake-and-data-mart/)
- Data lake에 대해 설명되어 있는 글들: [링크1](https://www.samsungsds.com/kr/insights/big_data_lake.html), [링크2](https://www.redhat.com/ko/topics/data-storage/what-is-a-data-lake), [링크3](https://cloud.google.com/learn/what-is-a-data-lake?hl=ko)
- Database catalog[^18]: Catalog는 번역하면 '(상품자료의) 목록'을 의미함. 데이터베이스의 개체들에 대한 정의를 담고 있는 메타데이터들로 구성된 데이터베이스 내의 인스턴스

##### 👨‍💻 CS

*2023.05.05*

REST, gRPC, GraphQL에 대해 기록합니다

- REST
  - HTTP 표준 표현이 필요한 시스템에 적합
  - 다만 리소스가 복잡할 수록, API 복잡해지거나 응답 무거울 수 있음
- gRPC (Google Remote Procedure Call)
  - 원격 시스템에 대해 마치 로컬처럼 직접 메소드를 호출 가능
  - 프로토콜 버퍼(Protobufs)를 사용. 데이터 전송과 관련하여, 텍스트 기반의 JSON, XML이 아닌 바이너리로 직렬화된 데이터로 인터페이스 정의
  - 가벼우며 클라이언트측의 리소스가 거의 필요하지 않아, 전력 부족한 상황에서 효율적. IoT 장치에 적용하면 장점 부각됨
- GraphQL
  - 정확한 요청에 초점을 맞추고 필요한 것을 정확히 전달하기 위한 방식
  - 클라이언트가 원하는 데이터, 원하는 방식, 형식 결정
  - REST는 원하는 데이터를 얻기 위해 여러 요청을 해야 하고 각 요청에서 데이터를 과도하게 가져와야 하는 경우가 많은데, GraphQL은 클라이언트가 특정 용도를 위해 특정 형식의 데이터를 요청할 수 있다는 점에 초점을 뒀기 때문에, 대표적으로 Github에서 활용중

##### 👨‍💻 CS

*2023.08.12*

서버 Identity Management을 위해 참고하면 좋을 글들

- https://blog.promedius.ai/freeipa-sso-integration/
- https://saramin.github.io/2022-06-30-idm/

##### 👨‍💻 CS

*2023.08.15*

- Latency: 대기시간. 즉, 정보 송수신(작업 처리)에 걸리는 시간
- Throughput: 처리량. 즉, 단위 시간 당 정보 송수신(작업 처리) 수
- Bandwidth: 대역폭. 즉, 단위 시간 당 정보 송수신(작업 처리) 가능한 정보량

##### 👨‍💻 CS

*2023.09.16*

- AWS Redshift란?: 데이터 웨어하우스 서비스. Massive Parallel Processing(대규모 병렬 처리), Columnar data storage 등의 특징 가짐. PostgreSQL을 기반으로 하지만 몇 가지 차이점들 존재 ([관련 링크](https://docs.aws.amazon.com/ko_kr/redshift/latest/dg/c_redshift-and-postgres-sql.html))
- AWS Redshift Query Editor V2: https://aws.amazon.com/ko/blogs/korea/amazon-redshift-query-editor-v2-web-query-authoring/
- View: 가상의 테이블이라고 생각하면 됨. 데이터는 없고 SQL만 저장함. 사용자가 view에 접근할 때 저장되어있던 SQL이 수행되어 결과도출
- In-memory DB란?: 디스크가 아닌 메모리에 모든 데이터를 보유하고 있는 DB. 매우 빠르지만 휘발성이라 서버가 꺼져서 날아가도 상관 없는 임시 데이터에 주로 사용
- In-memory DB 종류: Redis, SQLite, AWS ElasticCahe

##### 👨‍💻 CS

*2023.11.23*

- Simple Email Service (SES): 개발자가 모든 애플리케이션 내에서 이메일을 보내거나 받을 수 있는 서비스. 
- Simple Notification Service (SNS): 게시자에서 구독자로 메시지를 전송하는 관리형 서비스. 하나의 메세지를 여러 서비스에서 처리. 클라이언트가 SNS 주제를 구독하는 방식으로 fan out pattern 자주 활용됨
  - 예를 들어, 어떤 이벤트를 SNS가 받아서 여러 개의 SQS로 뿌리고, 각각의 마이크로 서비스가 해당 SQS를 읽는 방식
  - 그러면 개별 마이크로 서비스에 장애가 나더라도 SQS가 queue를 보관하고 있고, 서로 다른 서비스 끼리도 교차 장애 발생 케이스 줄어듦
- Simple Queue Service (SQS): 하나의 메세지를 한번만 처리

##### 👨‍💻 CS

*2024.02.17*

Python decorator 동작에 대한 이해

```python
def print_result_decorator(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        print(result)
    return wrapper

class PrintResultDecorator:
    def __init__(self, func):
        self.func = func
    def __call__(self, *args, **kwargs):
        result = self.func(*args, **kwargs)
        print(result)

@print_result_decorator
def add(a, b):
    return a + b

@PrintResultDecorator
def subtract(a, b):
    return a - b

if __name__ == '__main__':
    add(2, 3)   # print 5
    subtract(5, 3)  # print 2
```

##### 👨‍💻 CS

*2024.07.03*

Mock과 Stub의 차이: 유닛테스트에서 실제 객체를 대체하여 사용되는 테스트 더블(실제 객체를 대신해서 테스팅에서 사용하는 모든 방법)의 타입임. 이 둘은 목적과 특성 측면에서 조금 차이를 가짐

- Stub은 테스트 중에 특정 호출에 대해 미리 정의된 응답을 제공하는데 사용됨. 일반적으로 단위 테스트가 상호작용하는 실제 구성 요소의 동작을 시뮬레이트하기 위해 사용됨. 예를 들어, 고정된 값을 반환하거나 특정 코드 경로를 트리거
- Stub은 '어떻게' 사용되는지에 대해 트래킹은 하지 않음. 즉, 호출 횟수나 호출 순서에 대해서는 신경쓰지 않고, 기대되는 결과를 '리턴'하는 것이 주요 역할임.
- 따라서 stub은 테스트가 단위 테스트의 대상에 집중하고, 구성 요소 간의 상호작용이 아니라 테스트의 초점을 맞출 때 사용됨. 스텁은 테스트 대상 단위를 격리시키고 주요 대상이 아닌 다른 의존성을 대체하는 데 도움을 줌

- Mock은 단위 테스트 대상과 그 의존성 간의 상호작용을 검증하는데 사용. 미리 정의된 응답을 제공할 뿐만 아니라 '어떻게' 호출되었는지도 기록
- Mock은 특정 메소드가 특정 횟수만큼, 특정 인수로, 특정 순서대로 호출되었는지 등을 확인
- 따라서 mock은 단위 테스트 대상이 다른 구성 요소와 올바르게 상호작용하는지 확인하는데 사용

```python
class UserRepositoryStub:
    def get_user(self, user_id):
        return {"id": user_id, "name": "John Doe"}

def test_get_user():
    user_repo_stub = UserRepositoryStub()
    user_service = UserService(user_repo_stub)
    user = user_service.get_user(1)
    assert user == {"id": 1, "name": "John Doe"}
```

```python
from unittest.mock import Mock

def test_get_user():
    user_repo_mock = Mock()
    user_repo_mock.get_user.return_value = {"id": 1, "name": "John Doe"}
    user_service = UserService(user_repo_mock)
    user = user_service.get_user(1)
    user_repo_mock.get_user.assert_called_once_with(1)
    assert user == {"id": 1, "name": "John Doe"}
```

### References

[^1]: Wikipedia contributors. (2021, April 12). Moment (mathematics). In Wikipedia, The Free Encyclopedia. Retrieved 12:08, May 24, 2021, from https://en.wikipedia.org/w/index.php?title=Moment_(mathematics)&oldid=1017468752
[^2]: API. (2021년 3월 2일). 위키백과, . 04:58, 2021년 5월 24일에 확인 https://ko.wikipedia.org/w/index.php?title=API&oldid=28891731 
[^3]: REST. (2021년 4월 28일). 위키백과, . 04:57, 2021년 5월 24일에 확인 https://ko.wikipedia.org/w/index.php?title=REST&oldid=29220143
[^4]: 통합 자원 식별자. (2021년 3월 14일). 위키백과, . 05:02, 2021년 5월 24일에 확인 https://ko.wikipedia.org/w/index.php?title=%ED%86%B5%ED%95%A9%EC%9E%90%EC%9B%90%EC%8B%9D%EB%B3%84%EC%9E%90&oldid=28963926
[^ 5]: mutable vs immutable. (2019년 5월 24일). 공학자를 위한 Python, WikiDocs. 2021년 5월 24일에 확인 https://wikidocs.net/32277
[^ 6]: 얕은 복사(shallow copy)와 깊은 복사(deep copy). (2018년 3월 13일). 파이썬 - 기본을 갈고 닦자!, WikiDocs. 2021년 5월 24일에 확인 https://wikidocs.net/16038
[^7]: 플롭스. (2021년 2월 3일). *위키백과,* . 13:21, 2021년 8월 25일에 확인 [https://ko.wikipedia.org/w/index.php?title=%ED%94%8C%EB%A1%AD%EC%8A%A4&oldid=28682165](https://ko.wikipedia.org/w/index.php?title=플롭스&oldid=28682165)
[^8]: 6. 모듈. (2021년 9월 30일). Python 3.9.7 문서, https://docs.python.org/ko/3/tutorial/modules.html
[^9]: 모듈성 (프로그래밍). (2019년 4월 16일). 위키백과, . 15:08, 2021년 9월 30일에 확인 https://ko.wikipedia.org/w/index.php?title=%EB%AA%A8%EB%93%88%EC%84%B1_(%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)&oldid=24041546
[^10]: Wikipedia contributors. (2021, December 22). Web query. In *Wikipedia, The Free Encyclopedia*. Retrieved 06:04, February 6, 2022, from https://en.wikipedia.org/w/index.php?title=Web_query&oldid=1061542579
[^ 11]: Christina Kopecky. "What is a database query? SQL and NoSQL queries explained". https://www.educative.io/blog/what-is-database-query-sql-nosql#what-is, Aug 31, 2020.
[^12]: 인터프리터. (2022년 3월 3일). *위키백과,* . 14:47, 2022년 5월 10일에 확인 [https://ko.wikipedia.org/w/index.php?title=%EC%9D%B8%ED%84%B0%ED%94%84%EB%A6%AC%ED%84%B0&oldid=32006110](https://ko.wikipedia.org/w/index.php?title=인터프리터&oldid=32006110) 에서 찾아볼 수 있음.
[^13]: 컴파일러. (2022년 3월 15일). *위키백과,* . 15:23, 2022년 5월 10일에 확인 [https://ko.wikipedia.org/w/index.php?title=%EC%BB%B4%ED%8C%8C%EC%9D%BC%EB%9F%AC&oldid=32228964](https://ko.wikipedia.org/w/index.php?title=컴파일러&oldid=32228964) 에서 찾아볼 수 있음.

[^14]: 원격 프로시저 호출. (2022년 2월 26일). *위키백과,* . 11:52, 2022년 8월 26일에 확인 [https://ko.wikipedia.org/w/index.php?title=%EC%9B%90%EA%B2%A9_%ED%94%84%EB%A1%9C%EC%8B%9C%EC%A0%80_%ED%98%B8%EC%B6%9C&oldid=31906127](https://ko.wikipedia.org/w/index.php?title=원격_프로시저_호출&oldid=31906127) 에서 찾아볼 수 있음.
[^15]: Samsung SDS, 박민영, "빅데이터로 가치를 만드는 호수 ‘데이터 레이크’ 이야기", https://www.samsungsds.com/kr/insights/big_data_lake.html
[^16]: Red hat, "데이터 레이크란 무엇일까요?", https://www.redhat.com/ko/topics/data-storage/what-is-a-data-lake
[^17]: Google Cloud, "데이터 레이크란?", https://cloud.google.com/learn/what-is-a-data-lake?hl=ko
[^18]: 데이터베이스 카탈로그. (2022년 2월 28일). *위키백과,* . 07:59, 2023년 2월 24일에 확인 [https://ko.wikipedia.org/w/index.php?title=%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4_%EC%B9%B4%ED%83%88%EB%A1%9C%EA%B7%B8&oldid=31941199](https://ko.wikipedia.org/w/index.php?title=데이터베이스_카탈로그&oldid=31941199) 에서 찾아볼 수 있음.
