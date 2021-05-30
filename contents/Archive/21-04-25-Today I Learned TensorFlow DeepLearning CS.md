---
title: "Today I Learned: Computer Science & Engineering"
date: "2021-04-25"
template: "post"
draft: true
path: "/cheatsheet/21-04-25-4/"
description: "새롭게 알게 된 지식 중에서 하나의 포스팅으로 만들기에는 부담스러운 내용들을 이곳에 모아둡니다. 다른 테크 블로그들의 TIL 처럼 매일매일 공부한 내용을 기록하기보다는 그냥 제 맘대로 아무때나 업데이트 할 생각입니다! 나중에는 카테고리 별로 나눌 수 있을 정도로 내용이 엄청 많아졌으면 좋겠네요. (최근에 작성한 내용들이 상단에 위치하도록 배열하였습니다)"
category: "Cheat Sheet"
---

> 최근에 작성한 내용들이 하단에 위치하도록 배열하였습니다.

##### 🗓 2021.05.24

[API](https://ko.wikipedia.org/wiki/API)(Application Programming Interfaces)는 응용 프로그램에서 사용할 수 있도록, 운영 체제나 프로그래밍 언어가 제공하는 기능을 제어할 수 있게 만든 인터페이스를 말합니다. 외부와 새로운 연결들을 구축할 필요 없이 내부 기능들이 서로 잘 통합되어 있다는 것이 핵심입니다. API를 사용하면 해당 API의 자세한 작동원리와 구현방식은 알지 못해도, 제품/서비스간 커뮤니케이션이 가능합니다.

웹 API가 늘어나면서 메세지 전달을 위한 표준을 만들고자 개발된 것이 SOAP(Simple Object Access Protocol)입니다. 최근 웹 API에서는 [REST](https://ko.wikipedia.org/wiki/REST)ful API라는 아키텍쳐 스타일이 더 많이 사용되고 있는데, 규정된 프로토콜이 아니라 아키텍쳐 스타일이기 때문에 정해진 표준은 없습니다. 다만 Roy Fielding의 논문에 정의된 아래의 6가지 원칙을 기본으로 합니다. (자세한 설명은 위키피디아 문서 참고)

- `인터페이스 일관성`, `무상태(Stateless)`, `캐시 처리 가능(Cacheable)`, `계층화(Layered System)`, `Code on demand (optional)`, `클라이언트/서버 구조`

[URI](https://ko.wikipedia.org/wiki/%ED%86%B5%ED%95%A9_%EC%9E%90%EC%9B%90_%EC%8B%9D%EB%B3%84%EC%9E%90)는 Uniform Resource Identifier(통합 자원 식별자)의 약자로 특정 자원의 위치를 나타내주는 유일한 주소를 말합니다. RESTful API는 웹 상에서 사용되는 리소스를 HTTP URI로 표현하고, 리소스에 대한 작업들을 HTTP Method로 정의합니다.

##### 🗓 2021.00.00

PNG와 JPG의 차이점은?

https://www.howtogeek.com/howto/30941/whats-the-difference-between-jpg-png-and-gif/

https://undsgn.com/jpg-vs-png/

시간 날 때 읽고 간단 요약만 하기

##### 🗓 2021.00.00

 Dynamic Programming이란?

##### 🗓 2021.00.00

Virtual Memory란?

##### 🗓 2021.00.00

Semaphore란?

##### 🗓 2021.00.00

Cache란?

##### 🗓 2021.00.00

Garbage Collection이란?

##### 🗓 2021.00.00

Database Index 추가의 장단점은?

##### 🗓 2021.00.00

NoSQL의 장단점은?

##### 🗓 2021.00.00

공유기의 원리는?

##### 🗓 2021.00.00

HTTP/2의 특성은?

##### 🗓 2021.00.00

비대칭 암호화란?

##### 🗓 2021.00.00

Node.js의 특징은?

##### 🗓 2021.00.00

HDD, SSD, DRAM 각각의 성능은?

##### 🗓 2021.00.00

Memory Leak 디버깅은?

##### 🗓 2021.00.00

GIT의 장점은?

### References

[^1]: REST. (2021년 4월 28일). 위키백과, . 04:57, 2021년 5월 24일에 확인 https://ko.wikipedia.org/w/index.php?title=REST&oldid=29220143
[^2]: API. (2021년 3월 2일). 위키백과, . 04:58, 2021년 5월 24일에 확인 https://ko.wikipedia.org/w/index.php?title=API&oldid=28891731 
[^3]: 통합 자원 식별자. (2021년 3월 14일). 위키백과, . 05:02, 2021년 5월 24일에 확인 https://ko.wikipedia.org/w/index.php?title=%ED%86%B5%ED%95%A9%EC%9E%90%EC%9B%90%EC%8B%9D%EB%B3%84%EC%9E%90&oldid=28963926