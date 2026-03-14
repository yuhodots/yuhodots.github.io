---
title: "Today I Learned (CSE)"
date: "2021-04-25"
template: "post"
draft: false
path: "/cheatsheet/21-04-25/"
description: "This is a collection of newly learned knowledge that feels too small for a dedicated post. Rather than recording what I study every day, I update this page irregularly whenever I come across something noteworthy. This post accumulates CSE tech stack topics outside of AI/ML. More recently written entries are placed toward the bottom."
category: "Cheat Sheet"
---

This is a collection of newly learned knowledge that feels too small for a dedicated post. Rather than recording what I study every day, I update this page irregularly whenever I come across something noteworthy. This post accumulates CSE tech stack topics outside of AI/ML. More recently written entries are placed toward the bottom.

##### 🥧 Python

*2021.04.25*

I read the [Python documentation](https://docs.python.org/3/reference/simple_stmts.html#future) on the `future` statement. The `future` statement was created to facilitate easy migration (moving from one operating environment to another) to features from future Python versions. Even if the new feature following the import is a Python 3 feature, it becomes usable in Python 2.

```python
from __future__ import print_function
```

##### 👨‍💻 CS

*2021.05.24*

An [API](https://ko.wikipedia.org/wiki/API) (Application Programming Interfaces)[^2] refers to an interface that allows application programs to control the functionality provided by an operating system or programming language. Internal functions are well-integrated with each other without the need to build new external connections, and using an API enables communication between products/services without needing to know the detailed inner workings or implementation.

As web APIs proliferated, SOAP (Simple Object Access Protocol) was developed to create a standard for message delivery. More recently, [REST](https://ko.wikipedia.org/wiki/REST)ful API, an *architectural style*, has become the more widely used web API approach. Since REST is an architectural style rather than a defined protocol, there is no fixed standard. However, it is based on the following six principles defined in Roy Fielding's dissertation. (See the Wikipedia article[^3] for detailed explanations.)

- `Uniform Interface`, `Stateless`, `Cacheable`, `Layered System`, `Code on demand (optional)`, `Client-Server Architecture`

A [URI](https://ko.wikipedia.org/wiki/%ED%86%B5%ED%95%A9_%EC%9E%90%EC%9B%90_%EC%8B%9D%EB%B3%84%EC%9E%90) stands for Uniform Resource Identifier[^4], a unique address that indicates the location of a specific resource. RESTful APIs represent resources on the web as HTTP URIs and define operations on those resources using HTTP Methods.

##### 🥧 Python

*2021.05.24*

Python objects are classified by their properties as either mutable (values can change) or immutable. (I referenced [this page](https://wikidocs.net/32277) and [this page](https://wikidocs.net/16038).)

- Immutable: numbers, strings, tuples
- Mutable: lists, dictionaries, NumPy arrays (ndarray)

Let me illustrate with an example using int, an immutable type.

```python
x = 1
y = x
y += 3

# results: x = 1, y = 4
```

Up through the second line, both x and y point to the same ***object***, which is 1. The moment y's value is changed on the third line, y points to 4 while x still points to 1.

From the perspective of languages like C/C++, you might understand `y=x` as copying the value. However, in Python, at the point when `y=x` is called, both variables point to the same object, and the separation occurs when the immutable-type y is modified.

##### 🥧 Python

*2021.08.05*

Here are some useful PyCharm shortcuts I recently discovered.

- Find where a variable/function is used: `Find Usages`, `Alt + F7` (`Option + F7`)
- Find the declaration of a variable/function: `Ctrl + Click` (`Command + Click`)

##### 👨‍💻 CS

*2021.08.25*

FLOPS[^7] (FLoating point Operations Per Second) means "the number of floating-point operations per second." It is primarily used to express the performance of computers. When expressing the performance of supercomputers, TFLOPS (1×10^12 FLOPS) is commonly used, and PFLOPS stands for petaFLOPS.

FLOPS and FLOPs have different meanings. FLOPs stands for FLoating point Operations, which means "the number of floating-point operations." FLOPs is used in the deep learning community to express model size and computational cost.

##### 🥧 Python

*2021.09.30*

I'll organize some notes on modules and modularity, referencing the [official Python documentation](https://docs.python.org/ko/3/tutorial/modules.html).

When you want to split a program into multiple files for maintenance purposes, or when you want to use functions across multiple programs without copying them, Python provides a way to put definitions in a file and use them. Such a file is called a module[^8]. In other words, a module is a Python file created so that it can be imported and used by other Python programs.

##### 👨‍💻 CS

*2022.03.30*

Here are some brief notes on naming styles I learned about through friends ([@jiun0](https://github.com/jiun0), [@bwmelon97](https://github.com/bwmelon97)).

- Naming style types: `lowerCamelCase`, `UpperCamelCase (PascalCase)`, `snake_case`, `Train_Case`, `spinal_case`, `UPPER_SNAKE_CASE`, ...
- JavaScript typically uses: lowerCamelCase for variables, functions, and methods / PascalCase for class names / UPPER_SNAKE_CASE for constants
- Python (PEP8) typically uses: snake_case for variables and functions / CamelCase for classes

##### 👨‍💻 CS

*2022.05.11*

- Interpreted[^12] languages: Like Python, the source code of a programming language is executed directly. There is no build time, but runtime speed is slower compared to compiled languages.
- Compiled[^13] languages: Like C/C++, source code written in a specific programming language is translated into another programming language (or machine code) before execution. Build time is required, but runtime execution is fast. The original document is called source code, and the output document is called object code. Object code is typically output in a form convenient for hardware processing, but it can also be translated into human-readable document files or image files.
- In modern times, many interpreters perform real-time compilation using techniques such as JIT (just-in-time) compilation, so the technical distinction between compilers and interpreters is fading. Since Java supports JIT compilation, it can be considered both a compiled language and an interpreted language.

##### 👨‍💻 CS

*2022.08.26*

Here are brief notes on some technology stacks that appear in the book "Machine Learning System Design Patterns" (by Yusuke Shibui).

- ONNX: A type of Intermediate Representation (IR). Various frameworks exist for ML models, including static graph types such as CNTK, Caffe2, Theano, and TensorFlow, as well as dynamic graph types such as PyTorch and Chainer, each with its own strengths. Therefore, choosing the right tool for each development stage is important, and ONNX allows models created in different environments to be converted into a single common format for use.
- Redis: A database and one of the **key-value DB engines**, along with Cassandra DB and DynamoDB. It uses in-memory data structures for very fast performance and is frequently used for caching.
- gRPC (Remote Procedure Calls): An open-source remote procedure call (RPC) system originally developed by Google. RPC[^22] refers to an inter-process communication technology that allows functions or procedures to be executed in a different address space without requiring separate remote control coding.

##### 👨‍💻 CS

*2023.01.14*

Brief notes on Hash Tables.

- A key is fed into a hash function to obtain an index, and the value at that index is accessed.
- Without collisions, the time complexity is $O(1)$, but when collisions occur, linear search is performed within that index, leading to a worst-case time complexity of $O(N)$.

##### 👨‍💻 CS

*2023.02.24*

Brief notes on Data Lakes and Database Catalogs.

- Data lake: A single data store that stores data in its raw form. A centralized repository for storing, processing, and securing large volumes of structured, semi-structured, or unstructured data.
- **Differences between Data lake, Data warehouse, and Data mart**: [link](https://aws.amazon.com/ko/compare/the-difference-between-a-data-warehouse-data-lake-and-data-mart/)
- Articles explaining data lakes: [link 1](https://www.samsungsds.com/kr/insights/big_data_lake.html), [link 2](https://www.redhat.com/ko/topics/data-storage/what-is-a-data-lake), [link 3](https://cloud.google.com/learn/what-is-a-data-lake?hl=ko)
- Database catalog[^18]: "Catalog" translates to "a list (of product data)." An instance within a database consisting of metadata that contains definitions of the database's entities.

##### 👨‍💻 CS

*2023.05.05*

Notes on REST, gRPC, and GraphQL.

- REST
  - Suitable for systems that require HTTP standard representations.
  - However, as resources become more complex, the API can become more complex and responses heavier.
- gRPC (Google Remote Procedure Call)
  - Allows direct method calls on remote systems as if they were local.
  - Uses Protocol Buffers (Protobufs). For data transmission, interface definitions use binary serialized data instead of text-based JSON or XML.
  - Lightweight and requires minimal client-side resources, making it efficient in low-power situations. Its advantages are highlighted when applied to IoT devices.
- GraphQL
  - Focuses on precise requests and delivering exactly what is needed.
  - The client determines the data it wants, the way it wants it, and the format.
  - REST often requires multiple requests to obtain desired data, with each request frequently over-fetching. GraphQL focuses on allowing clients to request data in a specific format for a specific purpose, which is why it's notably used by GitHub.

##### 👨‍💻 CS

*2023.08.12*

Useful references for server Identity Management:

- https://blog.promedius.ai/freeipa-sso-integration/
- https://saramin.github.io/2022-06-30-idm/

##### 👨‍💻 CS

*2023.08.15*

- Latency: Wait time—the time it takes to send and receive information (process a task).
- Throughput: Processing volume—the number of information transmissions (task completions) per unit of time.
- Bandwidth: The amount of information that can be sent and received (processed) per unit of time.

##### 👨‍💻 CS

*2023.09.16*

- What is AWS Redshift?: A data warehouse service. Features include Massive Parallel Processing and Columnar data storage. It is based on PostgreSQL but has several differences ([related link](https://docs.aws.amazon.com/ko_kr/redshift/latest/dg/c_redshift-and-postgres-sql.html)).
- AWS Redshift Query Editor V2: https://aws.amazon.com/ko/blogs/korea/amazon-redshift-query-editor-v2-web-query-authoring/
- View: Think of it as a virtual table. It contains no data, only SQL. When a user accesses the view, the stored SQL is executed to produce results.
- What is an In-memory DB?: A database that holds all data in memory rather than on disk. It is very fast but volatile, so it is primarily used for temporary data where loss due to a server shutdown is acceptable.
- In-memory DB types: Redis, SQLite, AWS ElastiCache

##### 👨‍💻 CS

*2023.11.23*

- Simple Email Service (SES): A service that enables developers to send or receive email from within any application.
- Simple Notification Service (SNS): A managed service that delivers messages from publishers to subscribers. A single message can be processed by multiple services. The fan-out pattern is commonly used, where clients subscribe to SNS topics.
  - For example, SNS receives an event and distributes it to multiple SQS queues, and individual microservices read from their respective SQS queues.
  - This way, even if an individual microservice fails, the SQS queue retains the messages, and the likelihood of cascading failures between different services is reduced.
- Simple Queue Service (SQS): Processes a single message only once.

##### 👨‍💻 CS

*2024.02.17*

Understanding how Python decorators work:

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

The difference between Mock and Stub: Both are types of test doubles (any method used in testing as a substitute for a real object) that replace real objects in unit testing. They differ slightly in terms of purpose and characteristics.

- A Stub is used to provide predefined responses to specific calls during testing. It is generally used to simulate the behavior of real components that the unit test interacts with—for example, returning fixed values or triggering specific code paths.
- A Stub does not track "how" it is used. That is, it does not care about the number of calls or the order of calls; its primary role is to "return" expected results.
- Therefore, stubs are used when the test needs to focus on the unit under test rather than the interactions between components. Stubs help isolate the unit under test and replace non-primary dependencies.

- A Mock is used to verify interactions between the unit under test and its dependencies. It not only provides predefined responses but also records "how" it was called.
- A Mock verifies whether specific methods were called a specific number of times, with specific arguments, in a specific order, and so on.
- Therefore, mocks are used to verify that the unit under test interacts correctly with other components.

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
[^15]: Samsung SDS, 박민영, "빅데이터로 가치를 만드는 호수 '데이터 레이크' 이야기", https://www.samsungsds.com/kr/insights/big_data_lake.html
[^16]: Red hat, "데이터 레이크란 무엇일까요?", https://www.redhat.com/ko/topics/data-storage/what-is-a-data-lake
[^17]: Google Cloud, "데이터 레이크란?", https://cloud.google.com/learn/what-is-a-data-lake?hl=ko
[^18]: 데이터베이스 카탈로그. (2022년 2월 28일). *위키백과,* . 07:59, 2023년 2월 24일에 확인 [https://ko.wikipedia.org/w/index.php?title=%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4_%EC%B9%B4%ED%83%88%EB%A1%9C%EA%B7%B8&oldid=31941199](https://ko.wikipedia.org/w/index.php?title=데이터베이스_카탈로그&oldid=31941199) 에서 찾아볼 수 있음.
