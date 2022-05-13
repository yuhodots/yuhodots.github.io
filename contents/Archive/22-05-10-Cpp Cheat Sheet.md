---
title: "C++ Cheat Sheet"
date: "2022-05-10"
template: "post"
draft: true
path: "/cheatsheet/22-05-10/"
description: ""
category: "Cheat Sheet"
---

> - [모두의 코드](https://modoocode.com/335) 공부내용 기록장 (draft=true)
> - 기본적인 문법 익히고, 익힌 내용들 바탕으로 백준 [단계별로 풀어보기](https://www.acmicpc.net/step) 문제풀이


### Basics

- namespace: 개체를 구분할 수 있는 범위를 나타내는 말로, 하나의 이름 공간에서는 하나의 이름이 단 하나의 개체만을 가리킴
- std: C++ 표준 라이브러리의 함수, 객체 등이 정의된 namespace
- using namespace std: std namespace를 사용하겠다고 선언하는 것. 만약 std에 이미 존재하는 이름을 추가적으로 만들게 된다면 오류 발생하기에, `std::`를 직접 붙이는 것 권장
- CmakeLists.txt: 프로그램 빌드시 사용. 자세한 내용은 [이곳](https://www.jetbrains.com/help/clion/cmakelists-txt-file.html) 참고
- reference ($): type 뒤에 \$를 붙임으로써 사용 가능. 예를 들어 `int& A = a;`와 같이 사용 시에 동일한 메모리를 가리키는 두 개의 이름이 존재하게 됨. 반드시 어떤 것의 참조인지를 명시해야 하므로 `int& a;`는 불가능
- static: 자신이 선언된 범위를 벗어나더라도 소멸하지 않고, 프로그램이 종료될 때 소멸. class 내에 선언하면 모든 객체들이 공유하여, 하나의 static 멤버 변수 사용. class에선 `int T::value= 0;` 형태로 초기화 해야함
- new, delete: alloc, malloc: 
- arrow operator(->): `a -> b`는 `(*a).b`와 동일 
- $ 연산자: 단항 `&` 연산자는 피연산자의 주소값을 불러 옴. `&a`의 형태
- \* 연산자: 단항 `*` 연산자는, 해당 포인터에 저장된 주소값에 위치한 데이터 불러옴

```C++
int a;
a = 1;
int* b = &a;  // 여기서 *b 와 a는 동일
```

- operator overloading: `(리턴 타입) operator(연산자) (연산자가 받는 인자)`의 형태로 정의. `bool MyString::operator==(MyString& str)`
- throw, try, catch: 

### Object

- member variable, member function: 클래스의 변수, 함수
- instance: 클래스를 이용해서 만들어진 객체
- instance variable, instance method: 객체의 변수, 함수
- default constructor: 컴파일러가 자동으로 추가하는 생성자. `T() = default;` 형태로 명시 가능
- copy constructor:  `T(const T& a);` 형태로 정의하고, `T t2(t1);` 혹은 `T t3 = t2;` 형태로 사용. 복사 생성자는 오직 생성 시에 호출되기에 `t3 = t2;`는 복사 생성자가 호출되지 않음
  - shallow copy 시에 하나의 객체가 소멸될 때 다른 객체의 내부 변수가 해제된 메모리를 가리키게 되는 경우 존재하므로, 메모리를 새로 할당해서 내용을 복사하는 deep copy가 요구됨
- destructor: 객체가 소멸 될 때 실행되는 함수. new로 할당했던 메모리를 이 곳에서 delete
- initializer list: `: var1(arg1), var2(arg2) {}`의 형태로 생성자 코드를 간소화
- this: 객체 자신을 내부에서 가리키는 포인터. `this->data`는 `(*this).data` 를 의미함
- friend: 다른 클래스나 함수들을 friend 로 정의하여, 원래 클래스의 private 로 정의된 변수나 함수들에 접근 가능

### Inheritance

- 상속: 다른 클래스의 정보를 물려 받아서 사용

```C++
class Derived : public Base {
 public:
  Derived() : Base() {}
};
```

- private: 상속받는 클래스에서도 접근 불가
- protected: 상속받는 클래스에서는 접근 가능 
- public: 누구나 접근 가능
- virtual: 만약 function이 virtual인 경우엔, Base 객체인 경우엔 Base에서 선언된 function을 호출하고, Derived 객체인 경우엔 Derived에서 선언된 function을 호출. 컴파일 시에 어떤 함수가 실행될 지 정해지지 않고 런타임 시에 정해지는 일을 가리켜서 **동적 바인딩(dynamic binding)** 이라고 부름. Python에서는 현재 객체 내에서 먼저 호출된 함수를 찾고, 만약에 현재 객체에 해당 함수가 없으면 상속받은 클래스에서 함수를 찾는 식으로 동적 바인딩 됨
  - 상속 시에, 소멸자를 가상함수(virtual function)로 만들어야 된다는 점도 중요함
  - 파이썬 처럼 모든 함수를 virtual화 하는 것도 좋지만, 가상 함수를 사용하게 되면 약간의 오버헤드 (overhead) 가 존재하기 때문에 C++에서는 사용자가 직접 virtual 로 선언하도록 하였음

- polymorphism: 하나의 메소드를 호출했음에도 불구하고 여러가지 다른 작업들을 하는 것을 바로 다형성(polymorphism) 이라고 부름. 여러개를 의미하는 그리스어 'poly' 와, 모습, 모양을 뜻하는 그리스어 'morphism' 에서 온 단어로 '여러가지 형태' 라는 의미

### File and Stream I/O

- stream buffer: 데이터를 내보내거나 받아들이기 전에 임시로 저장하는 곳. 예를 들어서 우리가 하드디스크에서 파일을 하나 읽는다고 할 때, 프로그램은 1 byte 씩 읽는 것이 아니라 실제로는 한 뭉터기 (예를 들어서 512 바이트) 를 한꺼번에 읽어서 스트림 버퍼에 잠시 저장해 놓은 뒤에 사용자가 요청할 때 마다 1 바이트 씩 꺼내는 것. 이렇게 수행하는 이유는, 하드디스크에서 읽어오는 작업이 매우 느리기 때문에, 한 번 읽을 때 1 바이트 읽으면 엄청난 딜레이가 발생
  - 모든 입출력 객체들은 이에 대응되는 스트림 객체를 가지고 있게 됨. 따라서 C++ 의 입출력 라이브러리에는 이에 대응되는 스트림 버퍼 클래스 `streambuf`도 존재
- ios_base: C++ 의 모든 입출력 클래스는 ios_base 를 기반. 스트림의 입출력 형식 관련 데이터를 처리. 실수 형을 출력할 때 정밀도를 어떤 식으로 할 것인지에 대해, 혹은 정수형을 출력 시에 10진수로 할지 16진수로 할지 등
- ios: 스트림 버퍼를 초기화. 그 외에도, 현재 입출력 작업의 상태를 처리. 예를 들어, 파일을 읽다가 끝에 도달했는지 안했는지 확인하려면 eof 함수를 호출
- istream:실제로 입력을 수행하는 클래스. 대표적으로 우리가 항상 사용하던 operator>> 가 이 istream 클래스에 정의되어 있는 연산자임. 또, cin 은 istream 클래스의 객체 중 하나임
- ostream, iostream도 있음
- fstream: 파일 스트림은 기본적인 istream 이나 ostream 클래스 보다 더 지원하는 기능이 더 많기 때문에 이를 상속 받아서 작성되었으며, 각각을 상속 받은 것이 ifstream 과 ofstream임. 이들 클래스를 모두 포함하는 라이브러리로 fstream 을 사용하면 됨
- sstream에는 std::istringstream 이 정의되어 있는데 이는 마치 문자열을 하나의 스트림이라 생각하게 해주는 가상화 장치. 데이터를 출력할 수 있는 std::ostringstream도 있음

### Template

- template: 사용자가 원하는 타입을 넣어주면 그에 맞게 코드를 찍어내는 틀. `Vector<int> int_vec;`와 같이 `<>`안에 전달하려는 타입 명시

```C++
template <typename T>	//template <class T>도 동일한 뜻. typename 키워드 사용 권장
class Vector {
  T* data;
  int capacity;
  // ...
```

- template specialization: 일부 경우에 대해서 따로 처리하는 것. 전달하는 템플릿 인자가 없더라도 특수화 하고 싶다면 `template<>`  남겨줘야 함

```c++
template <typename T>
class Vector {
  T* data;
  int capacity;
  // ...
  
template <>
class Vector<bool> {
  unsigned int* data;
  // ...
```

- functor: 함수는 아니지만 함수 인 척을 하는 객체를 함수 객체 (Function Object), 혹은 줄여서 Functor라고 함. 
- variadic template: 임의의 개수의 인자를 받는 템플릿. typename뒤에 ... 으로 오는 것을 템플릿 파리미터 팩(parameter pack) 이라고 부름 

```C++
template <typename T, typename... Types>
void print(T arg, Types... args) {
  std::cout << arg << ", ";
  print(args...);
}
// ...
```

- generic programming: 템플릿을 통해서 타입이 마치 인자 인것 처럼 사용하는 것

### Standard Template Library

- container: 임의 타입의 객체를 보관
  - sequence container: 객체들을 순차적으로 보관하는 컨테이너
  - associative container: 키를 바탕으로 대응되는 값을 찾아주는 컨테이너
- sequence container: vector, list, deque 이렇게 3 개가 정의되어 있음
  - vector: 가변길이 배열
    - 임의의 위치 원소 접근 ([], at) : $O(1)$
    - 맨 뒤에 원소 추가 및 제거 (push_back/pop_back) : amortized $O(1)$ (평균적으로 $O(1)$ 이지만 최악의 경우$ O(n)$)
    - 임의의 위치 원소 추가 및 제거 (insert, erase) : $O(n)$
  - list: 양방향 연결 구조를 가진 자료형
  - deque(double ended queue): 실행 속도를 위해 메모리를 (많이) 희생하는 컨테이너. 덱은 벡터와 비슷하게 $O(1)$ 으로 임의의 위치의 원소에 접근할 수 있으며 맨 뒤에 원소를 추가/제거 하는 작업도 $O(1)$으로 수행가능. 뿐만아니라 벡터와는 다르게 맨 앞에 원소를 추가/제거 하는 작업 까지도 $O(1)$으로 수행 가능.임의의 위치에 있는 원소를 제거/추가 하는 작업은 벡터와 마찬가지로 $O(n)$ 으로 수행 가능
- iterator: 컨테이너에 원소에 접근할 수 있는 포인터와 같은 객체
- range-based for loop: elem에 vec의 원소들이 매 루프 마다 복사되서 들어가게 됨

```c++
for (int elem : vec) {
  std::cout << "원소 : " << elem << std::endl;
}
```

- associative container: 시퀀스 컨테이너들은 원소 자체를 보관하지만, 연관 컨테이너는 시퀀스 컨테이너와는 다르게 키(key) - 값(value) 구조를 가짐. 물론 템플릿 라이브러리 이기 때문이 키와 값 모두 임의의 타입의 객체가 될 수 있음
  - set: 특정 키가 연관 컨테이너에 존재하는지 유무
    - 셋에는 find 함수가 제공되며, 이 find 함수를 통해 이 셋에 원소가 존재하는지 아닌지 확인. 만일 해당하는 원소가 존재한다면 이를 가리키는 반복자를 리턴하고 (std::set<>::iterator 타입입니다) 만일 존재하지 않는다면 s.end() 를 리턴
    - 만일 벡터였다면 원소가 존재하는지 아닌지 확인하기 위해 벡터의 처음 부터 끝 까지 하나씩 비교해가면서 찾았어야 해서 $O(N)$. 하지만 셋의 경우 내부적으로 원소들이 정렬된 상태를 유지하기 때문에 $O(logN)$
  - map: 특정 키에 대응되는 값이 무엇인지 질의. 셋의 경우 키만 보관했지만, 맵의 경우 키에 대응되는 값(value) 까지도 같이 보관
  - multiset, multimap: 셋과 맵 모두 중복된 원소를 허락하지 않음. 만일, 이미 원소가 존재하고 있는데 insert 를 하였으면 무시됨. 하지만 멀티셋과 멀티맵은 중복된 원소를 허락. 맵 과는 다르게, 한 개의 키에 여러개의 값이 대응되기 때문에 `[]` 연산자를 멀티맵의 경우 사용할 수 없음

### Advanced topics

- thread
  - process: 운영체제에서 실행되는 프로그램의 최소 단위. 1 개의 프로그램을 가리킬 때 보통 1 개의 프로세스 를 의미하는 경우가 많음
  - thread: CPU 코어에서 돌아가는 프로그램 단위. 즉, CPU 의 코어 하나에서는 한 번에 한 개의 쓰레드의 명령을 실행
  - 한 개의 프로세스는 최소 한 개 쓰레드로 이루어져 있으며, 여러 개의 쓰레드로 구성될 수 있음. 이렇게 여러개의 쓰레드로 구성된 프로그램을 멀티 쓰레드 (multithread) 프로그램 이라 함.
  - 프로세스들은 서로 메모리를 공유하지 않는데 비해, 쓰레드는 서로 메모리를 공유함. 즉, 한 프로세스 안에 쓰레드 1 과 쓰레드 2 가 있다면, 서로 같은 메모리를 공유
  - 이전에 싱글 코어 CPU 에서 아무리 멀티 쓰레드 프로그램이라 하더라도 결국에는 한 번에 한 쓰레드만 실행할 수 있었겠지만, 멀티 코어 CPU 에서는 여러개의 코어에 각기 다른 쓰레드들이 들어가 동시에 여러개의 쓰레드들을 효율적으로 실행할 수 있음. 최근에는 기본 8 core이므로 멀티쓰레드 프로그래밍 중요해짐
  - 이전에는 C++ 표준에 쓰레드가 없어서, 각 플랫폼 마다 다른 구현을 사용해야 했음. (예를 들어서 윈도우즈에서는 `CreateThread` 로 쓰레드를 만들지만 리눅스에서는 `pthread_create` 로 만듭니다) 하지만 C++ 11 에서부터 표준에 쓰레드가 추가되면서, 쓰레드 사용이 매우 편리해졌음. 자세한 내용은 [이곳](https://modoocode.com/269#page-heading-6) 참고
  - 서로 다른 쓰레드들이 동일한 자원을 사용할 때 발생하는 문제를 **경쟁 상태(race condtion)**이라 부름
  
- mutex
  
  ```c++
  m.lock();		// std::mutex m;을 선언했다고 가정
  result += 1;
  m.unlock();
  ```
  
  - mutual exclusion에서 따온 단어
  - 한 번에 한 쓰레드에서만 m 의 사용 권한을 가짐.m 을 소유한 쓰레드가 m.unlock() 을 통해 m 을 반환할 때 까지, 다른 쓰레드들이 무한정 기다리게 됨. 이렇게 m.lock() 과 m.unlock() 사이에 한 쓰레드만이 유일하게 실행할 수 있는 코드 부분을 **임계 영역(critical section)** 이라고 부름
  
- deadlock: 뮤텍스를 취득한 쓰레드가 unlock 을 하지않아 아무 쓰레드도 연산을 진행하지 못하게되는 상황. [이곳](https://modoocode.com/270#page-heading-3)과 [이곳](https://ko.wikipedia.org/wiki/교착_상태)을 보면 어느 상황에서 데드락이 발생하는지 예시 파악 가능함
  
  - starvation: 데드락을 해결하기 위한 한 가지 방법으로는 한 쓰레드에게 우선권을 주는 것임. 교차로의 자동차 그림으로 보자면 초록색 차가 노란색 차보다 항상 먼저 지나가도록 우선권을 주는 것. 하지만 한 쓰레드가 다른 쓰레드에 비해 우위를 갖게 된다면, 한 쓰레드만 열심히 일하고 다른 쓰레드는 일할 수 없는 기아 상태(starvation)가 발생할 수 있음
  - *C++ Concurrency In Action* 이란 책에선 데드락 상황을 피하기 위해 다음과 같은 가이드라인을 제시하고 있음
    - 중첩된 Lock 을 사용하는 것을 피해라: 모든 쓰레드들이 최대 1 개의 Lock 만을 소유한다면 (일반적인 경우에) 데드락 상황이 발생하는 것을 피할 수 있음. 또한 대부분의 디자인에서는 1 개의 Lock 으로도 충분. 만일 여러개의 Lock 을 필요로 한다면 정말 필요로 하는지 를 되물어보는 것이 좋음
    - Lock 을 소유하고 있을 때 유저 코드를 호출하는 것을 피해라: 유저 코드에서 Lock 을 소유할 수 도 있기에 중첩된 Lock 을 얻는 것을 피하려면 Lock 소유시 유저 코드를 호출하는 것을 지양
    - Lock 들을 언제나 정해진 순서로 획득해라: 만일 여러 개의 Lock 들을 획득해야 할 상황이 온다면, 반드시 이 Lock 들을 정해진 순서로 획득해야 함. 우리가 앞선 [예제](https://modoocode.com/270#page-heading-3)에서 데드락이 발생했던 이유 역시, worker1 에서는 m1, m2 순으로 lock 을 하였지만 worker2 에서는 m2, m1 순으로 lock 을 하였기 때문. 만일 worker2 에서 역시 m1, m2 순으로 lock 을 하였다면 데드락은 발생하지 않았을 것임
  
- 생산자(Producer) 와 소비자(Consumer) 패턴: 멀티 쓰레드 프로그램에서 등장하는 용어

  - 생산자의 경우, 무언가 처리할 일을 받아오는 쓰레드를 의미.  예를 들어서, 여러분이 인터넷에서 페이지를 긁어서 분석하는 프로그램을 만들었다고 생각해봅시다. 이 경우 페이지를 긁어 오는 쓰레드가 바로 생산자가 됨
  - 소비자의 경우, 받은 일을 처리하는 쓰레드를 의미. 앞선 예제의 경우 긁어온 페이지를 분석하는 쓰레드가 해당 역할

- 꼭 읽어보면 좋을 내용: https://modoocode.com/335

- compile, linking, make, lambda function 관련 게시글도 시간날 때 읽어보기

### References

- <a href="https://www.flaticon.com/free-icons/c-" title="c++ icons">C++ icons created by Freepik - Flaticon</a>
- 헤더 파일. (2022년 2월 5일). *위키백과,* . 07:18, 2022년 5월 10일에 확인 [https://ko.wikipedia.org/w/index.php?title=%ED%97%A4%EB%8D%94_%ED%8C%8C%EC%9D%BC&oldid=31513868](https://ko.wikipedia.org/w/index.php?title=헤더_파일&oldid=31513868) 에서 찾아볼 수 있음.
- 이름공간. (2022년 3월 3일). *위키백과,* . 07:28, 2022년 5월 10일에 확인 [https://ko.wikipedia.org/w/index.php?title=%EC%9D%B4%EB%A6%84%EA%B3%B5%EA%B0%84&oldid=32001870](https://ko.wikipedia.org/w/index.php?title=이름공간&oldid=32001870) 에서 찾아볼 수 있음.
- [모두의 코드, 씹어먹는 C++](https://modoocode.com/135)
- [C 언어 코딩 도장](https://dojang.io/course/view.php?id=2)
- [AnthonyCalandra/modern-cpp-features](https://github.com/AnthonyCalandra/modern-cpp-features)
- [자바와 C++의 비교, 위키피디아](https://ko.wikipedia.org/wiki/자바와_C%2B%2B의_비교)
- [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html#Variable_Names)
