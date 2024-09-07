---
title: "Random Topics in Software Development"
date: "2024-09-02"
template: "post"
draft: false
path: "/Operations/24-09-02/"
description: "Software Development 관련 공부한 내용을 아래에 기록합니다. SemVer(Semantic Versioning): {major}.{minor}.{patch}로 의미를 부여한 버저닝 시스템. 가장 일반적으로 사용되는 버저닝 방식. HeadVer: {head}.{yearweek}.{build}로 부여한 버저닝 시스템"
category: "Operations"
thumbnail: "Operations"
---

> Software Development 관련 공부한 내용을 아래에 기록합니다.

### Versioning

- [SemVer(Semantic Versioning)](https://semver.org): `{major}.{minor}.{patch}`로 의미를 부여한 버저닝 시스템. 가장 일반적으로 사용되고 있는 소프트웨어 버저닝 방식
  - `major`: 호환되지 않는 API 변경이 있을 때 증가. 예를 들어, 기존 함수의 시그니처를 바꾸거나, 중요한 기능을 제거하는 등의 변경이 포함될 수 있음. 'breaking change'라는 경고성 의미로 설정
  - `minor`: 기능이 추가되었으나, 하위 호환성은 유지될 때 증가. 예를 들어, 새로운 함수나 옵션이 추가될 경우, 해당 버전 번호가 증가
  - `patch`: 하위 호환성을 유지하는 버그 수정이 있을 때 증가. 기존 기능의 동작을 수정하거나 성능을 개선하는 변경이 포함
  - 예시: 새로운 기능 추가 시 1.3.0 / 버그 수정 시 1.2.4 / 하위 호환성이 없는 변경 시 2.0.0
- [HeadVer](https://techblog.lycorp.co.jp/ko/headver-new-versioning-system-for-product-teams): `{head}.{yearweek}.{build}`로 의미를 부여한 버저닝 시스템. SemVer는 API를 위한 버저닝 시스템이라는 점을 지적하며, 최종 사용자(end-user)를 더 염두에 두고 버저닝한 방식. 한 회사의 모든 앱을 모두가 같은 규칙으로 해석. 이름은 '이 버저닝에서 신경 쓸 것은 Head 밖에 없다. 나머지는 자동이다'라는 의미
  - `head`: SemVer와 달리 첫째 자리를 빠르게 증가시키는 것을 권함. 사용자에게 도달하는 횟수마다 증가하면 좋다고 함
  - `yearweek`: 주 차(week number) 정보. 자동으로 증가하도록 설정
  - `build`: 빌드 번호. 자동으로 증가하도록 설정
- GitHub release: 프로젝트의 특정 버전(e.g., v1.0, v2.1)을 쉽게 배포하고 관리할 수 있는 방법을 제공. 소프트웨어의 특정 상태(일반적으로 주요 버전이나 중요한 업데이트)를 'release'로 정의하고, 해당 시점의 소스 코드와 함께 릴리스 노트, 바이너리 파일 등을 함께 제공

##### Versioning for ML

- Labeling rule versioning: [GitBook](https://www.gitbook.com)과 같은 git 기반 documentation 툴을 사용하여 라벨링 가이드라인 문서를 작성한 뒤에, 해당 라벨링 가이드라인 저장소를 버저닝. 버저닝 시스템은 SemVer 사용하는 것 좋아보임

- Data versioning: Data Version Control (DVC), Delta Lake의 Time Travel등의 기능 활용해볼 수 있을 것 같음

- Model versioning: MLflow Model Registry 활용해서 배포 모델 버저닝 하는 것 좋아보임

### Exception

Exception(예외)은 예기치 않은 오류나 비정상적인 상황을 처리하기 위해 사용하며, 프로그램이 갑작스럽게 중단되는 것을 방지하고, 오류가 발생한 상황을 적절하게 처리하여 프로그램이 안전하게 종료되거나 계속 실행될 수 있도록 돕습니다.

예외는 오류 상황을 처리하기 위한 것이지 일반적인 프로그램의 흐름 제어를 위한 것이 아니기에 흐름 제어에 예외 처리를 사용하지 않는 것이 좋으며, 조건문으로 충분히 처리할 수 있는 상황에서는 예외를 사용하지 않는 것이 좋습니다.

##### Python Exceptions

Python exception 종류에 대해 아래에 기록합니다.

- `Exception`: 특정 예외를 지정하지 않고 모든 예외를 잡아야 하는 경우 사용

- `ArithmeticError`: 모든 산술 계산 오류의 기본 클래스. `ZeroDivisionError`, `OverflowError`, `FloatingPointError` 등의 상위 클래스. 직접적으로 사용되지 않고, 하위 클래스가 주로 사용됨

- `ZeroDivisionError`: 숫자를 0으로 나누려고 할 때 발생

- `ValueError`: 함수나 연산자가 잘못된 값을 받았을 때 발생. 예를 들어, `int()` 함수에 숫자가 아닌 문자열을 전달하면 발생

- `TypeError`: 연산 또는 함수가 잘못된 타입의 객체를 받았을 때 발생

- `IndexError`: 리스트나 튜플 등의 시퀀스에서 잘못된 인덱스를 참조할 때 발생

- `KeyError`: 딕셔너리에서 존재하지 않는 키를 참조할 때 발생

- `AttributeError`: 객체에 존재하지 않는 속성에 접근하려고 할 때 발생

- `ImportError`: 모듈을 가져오려고 할 때, 모듈이 없거나 모듈 내에 존재하지 않는 객체를 참조하려고 할 때 발생

- `FileNotFoundError`: 파일을 열려고 할 때 해당 파일이 존재하지 않으면 발생

- `OSError`: 시스템 관련 에러로, 파일 시스템이나 운영 체제와 상호작용할 때 발생

- `RuntimeError`: 다른 범주에 속하지 않는 일반적인 실행 시 오류를 나타냄. 구체적인 예외로 설명되지 않는 오류가 발생할 때 사용

- `StopIteration`: `next()` 함수가 더 이상 아이템을 반환할 수 없을 때 발생. 주로 반복자의 종료를 알리기 위해 사용

- `KeyboardInterrupt`: 사용자가 프로그램을 강제 종료하려고 Ctrl+C를 입력했을 때 발생

- `MemoryError`: 시스템에서 더 이상 메모리를 할당할 수 없을 때 발생

### Logging

##### Python Log Libraries

- loguru: 사용하기 쉬운 API와 기본 제공되는 강력한 기능들로 빠르게 로깅 시스템을 구축할 수 있음. 표준이 아니기 때문에 의존성을 추가해야 함
- logging: Python의 표준 라이브러리로, 복잡한 요구 사항에 맞는 유연한 설정이 가능하지만, 초기 설정이 복잡할 수 있음
- logbook: `logging`의 복잡성을 줄이면서도 강력한 기능을 제공하는 대안으로, 비동기 로깅이 필요한 경우 유용 (비동기 로깅을 기본적으로 제공하여, 고성능 로깅이 가능)

##### Log Level

loguru 기준으로 살펴본 log level은 아래와 같습니다.

- `TRACE(5)`: 프로그램의 논리 흐름에 대한 저수준 정보
- `DEBUG(10)`: 디버깅 중에 도움이 되는 정보
- `INFO(20)`: 애플리케이션이 예상대로 작동하고 있음을 확인
- `SUCCESS(25)`: 작업이 성공했음을 표시
- `WARNING(30)`: 추후에 애플리케이션에 문제를 일으킬 수 있는 이슈를 표시
- `ERROR(40)`: 즉각적인 주의가 필요하지만 프로그램을 종료시키지 않는 이슈
- `CRITICAL(50)`: OOM과 같이, 프로그램을 종료시킬 수 있는 심각한 이슈

특정 log level 이상만 표출하도록 설정할 수 있어서, 디버깅환경, Dev환경, Prod 환경 등, 환경 별로 다른 log level을 적용하여 log를 확인할 수도 있습니다. 추가적으로 참고하면 좋을 글들의 링크를 첨부합니다

- [향로님 - 1. 효율적으로 로그 모니터링하기 - 로그 레벨 구분하기](https://jojoldu.tistory.com/712)
- [향로님 - 좋은 예외(Exception) 처리](https://jojoldu.tistory.com/734)
- [향로님 - 운영 로그와 디버그 로그 분리하기](https://jojoldu.tistory.com/773)

##### Sentry

Sentry는 애플리케이션의 오류 추적 및 성능 모니터링을 제공하는 오픈 소스 플랫폼입니다. Sentry를 통해 애플리케이션에서 발생하는 오류와 성능 문제를 실시간으로 감지하고 분석할 수 있습니다. 

- Source Map: 배포 환경에서도 에러가 난 소스 코드 위치를 상세하게 파악 가능하게 시각화
- Breadcrumbs: 애플리케이션에서 발생한 중요한 사건(로그, 사용자 액션, 시스템 이벤트 등)을 기록하는 기능. 오류가 발생하기 전과 후의 이벤트를 기록함으로써, 개발자는 문제의 원인을 추적할 수 있게 도움

### Data Libraries

##### Encoding

UTF-8(8-bit Unicode Transformation Format)는 문자 인코딩의 일종으로, 전 세계의 거의 모든 문자를 표현할 수 있는 가변 길이 문자 인코딩 방식입니다. Python에서는 텍스트 데이터를 인코딩하거나 디코딩할 때 `str`과 `bytes` 타입 간에 변환할 때 자주 사용됩니다. 특징은 다음과 같습니다.

- 가변 길이 인코딩: ASCII 문자는 1바이트, 그 외의 문자는 2바이트에서 4바이트까지 사용됨
- 유니코드 호환: UTF-8은 유니코드의 모든 문자를 지원
- 하위 호환성: ASCII와 완벽하게 호환되며, ASCII 문자열은 UTF-8에서도 동일하게 표현됨

##### Compression

blosc2는 고성능의 바이너리 데이터 압축 라이브러리로, 특히 대규모 배열 데이터를 압축하고 압축 해제하는 데 최적화되어 있습니다. 매우 빠르게 데이터 압축을 수행하며, 메모리 사용을 최소화하는 데 중점을 둠. 데이터 분석, 머신 러닝 등의 대규모 데이터를 처리하는 경우 유용합니다. 특징은 다음과 같습니다.

- 스트리밍 압축: 연속적인 데이터 스트림에 대해 효율적으로 압축할 수 있음
- 다양한 압축 코덱 지원: LZ4, Zlib, Zstandard 등의 다양한 코덱을 지원
- 병렬 처리 지원: 멀티코어 CPU를 활용하여 병렬로 데이터를 압축하고 해제할 수 있음

##### Serialization

orjson는 python에서 매우 빠른 JSON 직렬화 및 역직렬화를 제공하는 라이브러리입니다.. 기본 `json` 모듈에 비해 훨씬 빠르게 동작하며, 특히 큰 데이터셋을 처리할 때 유용합니다. 특징은 다음과 같습니다.

- 고성능: JSON 데이터를 매우 빠르게 직렬화(encode) 및 역직렬화(decode)할 수 있음
- 유니코드 지원: UTF-8 인코딩을 기본으로 하여 텍스트 데이터를 처리
- 정확성: 정확한 날짜 및 시간 직렬화, IEEE 754 규격에 맞춘 부동소수점 표현 등을 지원

### Test Code

유닛테스트에서 실제 객체를 대체하여 사용되는 테스트 더블(실제 객체를 대신해서 테스팅에서 사용하는 모든 방법)의 타입에는 mock과 stub 등이 있으며, 이 둘은 목적과 특성 측면에서 조금 차이를 가집니다.

- Dummy Object: 아무 동작도 하지 않으며, 단지 인스턴스가 필요할 때 자리를 채우기 위해 사용. 예를 들어, 메서드 호출 시 파라미터로 객체가 요구되지만 실제로 사용되지 않는 경우에 더미 객체를 사용할 수 있음

- Stub: 미리 정의된 값을 반환하는 객체. 특정 메서드를 호출할 때 예측 가능한 결과를 반환하도록 설정할 수 있음

- Spy: 스텁과 비슷하지만, 스파이는 호출된 메서드나 전달된 인수와 같은 추가적인 정보를 기록하는 기능을 가지고 있음. 이를 통해 테스트 후에 특정 메서드가 얼마나 자주 호출되었는지 또는 어떤 인수가 전달되었는지를 확인할 수 있습니다.

- Mock: 모크는 행동 기반 테스트에 사용됨. 호출되는 메서드와 그 호출 횟수, 호출 순서 등을 미리 설정하고, 테스트가 완료되면 이 모든 조건이 충족되었는지 검증

- Fake: 실제 구현이 아닌 테스트 목적으로 간단하게 구현된 객체. 예를 들어, 실제 데이터베이스 대신 메모리를 사용하는 가짜 데이터베이스를 구현할 수 있으며 이로써 테스트 환경에서 더욱 가볍고 빠르게 테스트할 수 있음

##### Stub and Mock

Stub은 테스트 중에 특정 호출에 대해 미리 정의된 응답을 제공하는데 사용됩니다. (상태 검증)

- 일반적으로 단위 테스트가 상호작용하는 실제 구성 요소의 동작을 시뮬레이트하기 위해 사용됨
- 예를 들어, 고정된 값을 반환하거나 특정 코드 경로를 트리거. '어떻게' 사용되는지에 대해 트래킹은 하지 않음
- 즉, 호출 횟수나 호출 순서에 대해서는 신경쓰지 않고, 기대되는 결과를 '리턴'하는 것이 주요 역할임
- 따라서 stub은 테스트가 단위 테스트의 대상에 집중하고, 구성 요소 간의 상호작용이 아니라 테스트의 초점을 맞출 때 사용

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

Mock은 단위 테스트 대상과 그 의존성 간의 상호작용을 검증하는데 사용됩니다. (행동 검증)

- 미리 정의된 응답을 제공할 뿐만 아니라 '어떻게' 호출되었는지도 기록
- Mock은 특정 메소드가 특정 횟수만큼, 특정 인수로, 특정 순서대로 호출되었는지 등을 확인
- 따라서 mock은 단위 테스트 대상이 다른 구성 요소와 올바르게 상호작용하는지 확인하는데 사용

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

### Branching Strategy

##### GitFlow

GitFlow는 Vincent Driessen이 제안한 모델로, 복잡한 프로젝트에 적합한 매우 구조화된 branching 전략입니다. GitFlow의 핵심은 여러 개의 브랜치를 사용해 코드의 상태를 관리하고, 명확하게 역할을 분담하는 것입니다.

- `main`: 최종적으로 배포된 안정적인 코드를 유지하는 브랜치. 모든 배포 버전은 이 브랜치에서 관리됨

- `develop`: 개발 중인 최신 코드를 유지하는 브랜치. 새 기능이나 수정 사항은 이 브랜치에서 병합되며, 다음 릴리스의 기초가 됨

- `feature`: 새 기능 개발을 위한 브랜치. develop 브랜치에서 분기하여 작업을 진행하고, 완료되면 다시 develop 브랜치에 병합

- `release`: 다음 릴리스를 준비하는 브랜치. develop 브랜치에서 분기하여, 테스트와 버그 수정을 진행한 후 main 브랜치와 develop 브랜치에 병합

- `hotfix`: 배포된 코드에서 발생한 긴급한 버그 수정을 위한 브랜치. main 브랜치에서 분기하여 수정 후, main과 develop 브랜치에 병합

위의 브랜치들을 활용하여 아래와 같은 방식으로 개발이 수행됩니다.

1. 새 기능 개발: `develop` 브랜치에서 새 기능을 위해 `feature` 브랜치를 생성합니다. 기능 개발이 완료되면, `feature` 브랜치를 `develop` 브랜치에 병합합니다.
2. 릴리스 준비: 릴리스를 준비할 때, `develop` 브랜치에서 `release` 브랜치를 생성합니다. 릴리스 브랜치에서는 테스트 및 버그 수정이 진행됩니다. 모든 작업이 완료되면, `release` 브랜치를 `main`과 `develop` 브랜치에 병합하고, `main` 브랜치에서 태그를 생성합니다.
3. 긴급 버그 수정: 배포된 버전에서 심각한 버그가 발생하면, `main` 브랜치에서 `hotfix` 브랜치를 생성하여 버그를 수정합니다. 수정이 완료되면, `hotfix` 브랜치를 `main`과 `develop` 브랜치에 병합하고, `main` 브랜치에서 태그를 생성합니다.

##### Trunk-Based Development (TBD)

Trunk-Based Development(TBD)는 GitFlow와는 대조적으로 단순한 구조를 가진 전략입니다. 이 방식은 모든 개발자가 중앙 브랜치(주로 `main` 브랜치)에 작은 단위로 자주 병합하는 방식입니다.

- 중앙 브랜치(Trunk): `main` 브랜치 또는 `trunk` 브랜치가 유일한 중앙 브랜치로, 모든 코드가 이 브랜치에 병합됨
- 짧은 수명 브랜치: `feature` 브랜치가 존재할 수 있지만, 매우 짧은 기간 동안만 유지되며, 빠르게 `main` 브랜치에 병합됨
- 지속적 통합(CI): TBD에서는 지속적 통합(CI)이 필수적임. 모든 변경 사항은 CI 파이프라인을 통해 자동으로 빌드되고 테스트되며, 병합 전에 코드의 안정성이 확인됨

TBD에서는 아래와 같은 방식으로 개발이 수행됩니다.

1. 새 기능 개발: 기능 개발을 위해 짧은 수명의 `feature` 브랜치를 생성합니다. 기능을 개발한 후, 빠르게 `main` 브랜치에 병합합니다. 병합 시, CI 파이프라인을 통해 자동으로 빌드와 테스트가 수행됩니다.
2. 지속적 병합: 모든 개발자는 변경 사항을 자주 `main` 브랜치에 병합합니다. 병합 주기는 하루나 며칠 단위로 매우 짧습니다. 큰 변경 사항도 작은 단위로 나누어 점진적으로 병합합니다.
3. 배포: `main` 브랜치가 항상 배포 가능한 상태를 유지하므로, 필요할 때 바로 배포할 수 있습니다. 배포는 주기적으로 또는 기능 단위로 이루어집니다.

### Concurrecny and Parallelism

- Concurrency: 동시성은 여러 작업을 동시에 진행하는 것처럼 보이게 만드는 개념입니다. 실제로는 하나의 작업이 조금씩 교차하며 실행되는 방식으로, 작업이 짧은 시간 동안 번갈아 가며 실행됩니다. 즉, 동시에 여러 작업을 시작하지만, 특정 시점에서는 하나의 작업만 실행되고 있을 수 있습니다
- Parallelism: 병렬성은 여러 작업을 정말로 동시에 실행하는 개념입니다. 이는 여러 개의 CPU 코어에서 각각의 작업을 동시에 처리함으로써 이루어집니다. 병렬성은 실제 하드웨어의 지원이 필요하며, 여러 CPU 코어 또는 여러 시스템이 동시에 일을 처리하게 됩니다.

##### Multi-Threading

멀티 스레딩은 하나의 프로세스 내에서 여러 스레드를 생성하여 작업을 동시에 실행하는 방식입니다. GIL(Global Interpreter Lock) 때문에 CPU 바운드 작업에서는 성능 향상이 크지 않지만, I/O 바운드 작업에서는 이점을 얻을 수 있습니다.

```python
import threading
import time

def task(name, delay):
    for i in range(3):
        time.sleep(delay)
        print(f"Task {name} running")

# 스레드 생성
thread1 = threading.Thread(target=task, args=("A", 1))
thread2 = threading.Thread(target=task, args=("B", 2))

# 스레드 시작
thread1.start()
thread2.start()

# 메인 스레드가 다른 스레드들이 끝나기를 기다림
thread1.join()
thread2.join()

print("All tasks completed.")

```

##### Multi-Processing

멀티 프로세싱은 여러 개의 프로세스를 사용하여 병렬로 작업을 실행하는 방식입니다. 멀티 프로세싱은 CPU 바운드 작업에서 성능 이점을 크게 얻을 수 있습니다.

```python
import multiprocessing
import time

def task(name, delay):
    for i in range(3):
        time.sleep(delay)
        print(f"Process {name} running")

if __name__ == '__main__':
    # 프로세스 생성
    process1 = multiprocessing.Process(target=task, args=("A", 1))
    process2 = multiprocessing.Process(target=task, args=("B", 2))

    # 프로세스 시작
    process1.start()
    process2.start()

    # 메인 프로세스가 다른 프로세스들이 끝나기를 기다림
    process1.join()
    process2.join()

    print("All processes completed.")

```

##### Multi-Threading vs. Multi-Processing

GIL로 인해 Python의 스레드는 한 번에 하나의 스레드만 Python 바이트코드를 실행할 수 있습니다. 그러나 I/O 바운드 작업, 예를 들어 네트워크 요청 처리, 파일 입출력 등의 작업에서는 멀티 스레딩이 유용합니다. 이와 다르게 멀티 프로세싱은 GIL의 제약을 받지 않고, 병렬 처리를 수행할 수 있어 CPU 바운드 작업, 예를 들어 계산 집약적인 작업에서 유리합니다.

##### Asyncio

Asyncio는 비동기 프로그래밍을 가능하게 해주는 Python의 라이브러리입니다. 한 번에 하나의 작업을 처리하는 대신, 작업을 잠깐 멈추고(예: I/O 대기) 그 시간 동안 다른 작업을 처리하는 방식입니다. Asyncio는 GIL에 크게 영향을 받지 않으며, 주로 I/O-bound 작업에 적합합니다. 웹 서버, 네트워크 서버, 비동기 파일 처리 등에서 자주 사용됩니다. Asyncio는 일반적으로 단일 스레드에서 작동하며, 많은 수의 작업을 효율적으로 스케줄링하지만, CPU-bound 작업에서는 Multi-Processing만큼 강력하지 않습니다.

### Message Broker

##### RabbitMQ

- 장점 1. 메시지 보장: RabbitMQ는 메시지 전송, 확인, 재시도, TTL(Time-to-Live) 설정 등 메시지 보장 기능이 뛰어남
- 장점 2. 플러그인 및 관리 도구: 다양한 플러그인 및 웹 기반의 관리 도구를 제공하여 사용 및 관리가 편리
- 장점 3. 성숙도: 오래된 프로젝트로, 다양한 커뮤니티 지원과 안정성을 제공

- 단점 1. 높은 지연 시간: Kafka나 RedisQ에 비해 상대적으로 지연 시간이 높을 수 있음
- 단점 2. 복잡성: 다양한 기능을 제공하는 만큼 설정과 사용이 상대적으로 복잡할 수 있음
- 단점 3. 확장성 한계: RabbitMQ는 고도로 확장 가능한 시스템이지만, Kafka에 비해 확장성 면에서 제한적임

##### Kafka

- 장점 1. 확장성: 매우 뛰어난 확장성을 가지고 있어, 수백 테라바이트의 데이터를 처리할 수 있음
- 장점 2. 고성능: 실시간 스트리밍 데이터를 처리하는 데 최적화되어 있어, 높은 처리량을 요구하는 환경에서 탁월
- 장점 3. 내구성: 메시지가 로그에 기록되기 때문에 데이터 손실 가능성이 낮음

- 단점 1. 복잡성: 초기 설정과 운영이 복잡하며, 클러스터 관리가 까다로울 수 있음
- 단점 2. 높은 학습 곡선: Kafka를 효과적으로 사용하기 위해서는 많은 학습과 이해가 필요
- 단점 3. 지연 허용: 매우 낮은 지연이 필요한 경우 RabbitMQ나 RedisQ가 더 적합할 수 있음

##### RedisQ

- 장점 1. 속도: RedisQ는 메모리 기반이기 때문에 매우 빠른 처리 속도를 제공
- 장점 2. 간편성: Redis 자체가 단순하며, 큐를 설정하고 사용하는 데 있어 매우 간편
- 장점 3. 다양한 데이터 구조: Redis는 큐 외에도 여러 데이터 구조를 제공하여 유연하게 사용할 수 있음

- 단점 1. 데이터 지속성 문제: 기본적으로 인메모리 시스템이기 때문에 데이터의 영속성이 보장되지 않으며, 서버가 재시작되면 데이터가 사라질 수 있음
- 단점 2. 확장성 제한: Redis는 수평적 확장이 제한적이며, 데이터가 커질수록 성능이 저하될 수 있음
- 단점 3. 기능 제한: RedisQ는 다른 메시지 브로커에 비해 기능이 제한적임

##### Summary

- RabbitMQ는 다양한 기능을 필요로 하는 애플리케이션에 적합하며, 안정적이고 관리 도구가 풍부하지만, 상대적으로 복잡하고 확장성에 제한이 있음

- Kafka는 높은 처리량과 확장성을 필요로 하는 대규모 데이터 스트리밍 애플리케이션에 적합합니다. 하지만 설정과 운영이 복잡할 수 있음

- RedisQ는 매우 빠른 성능과 단순한 사용을 필요로 하는 경우에 적합하며, 영속성이 중요한 애플리케이션에는 부적합할 수 있음

### Celery

Celery는 Python으로 작성된 분산 작업 큐 시스템으로, 대규모 비동기 작업 처리를 위한 도구입니다. 웹 애플리케이션이나 백엔드 시스템에서 시간이 많이 걸리는 작업을 비동기적으로 처리하고, 여러 작업을 병렬로 실행하거나, 지연된 작업을 예약하는 데 주로 사용됩니다.

- Task: Celery에서 실행할 수 있는 함수. 이 작업은 worker에 의해 비동기적으로 실행됨
- Worker: Celery에서 작업을 실제로 실행하는 프로세스. 일반적으로 여러 개의 워커가 동시에 작동하여 작업을 병렬로 처리
- Broker: 작업을 큐에 넣고, 워커가 이 큐에서 작업을 가져가는 방식으로 동작. 대표적인 브로커로는 Redis, RabbitMQ 등이 있음
- Backend: 작업 결과를 저장하는 데 사용되는 시스템. Redis, RabbitMQ, Memcached, 또는 DB를 백엔드로 사용할 수 있음

### Monitoring

##### Hardware Monitoring

Prometheus는 시스템 모니터링 및 경고를 위해 가장 일반적으로 사용되는 오픈 소스 도구입니다. Prometheus는 각 타겟에서 데이터를 직접 가져오는(Pull) 방식으로 동작합니다. 또한, 자체적으로 다양한 시스템, 애플리케이션 및 서비스에서 메트릭을 수집하기 위해 Exporter를 사용합니다.

Node Exporter는 Prometheus와 함께 사용되는 가장 일반적인 Exporter 중 하나로, 서버의 하드웨어 및 운영체제 관련 메트릭을 수집하는 역할을 합니다. Prometheus가 수집할 수 있는 메트릭에는 CPU 사용량, 메모리 사용량, 디스크 I/O, 네트워크 트래픽 등의 정보가 포함됩니다.

Prometheus, Node Exporter, Grafana를 활용하여 하드웨어 모니터링을 수행하는 방법을 [이곳](https://github.com/yuhodots/monitoring)에 더 자세히 기록하였습니다.


### Deployment

##### ArgoCD

ArgoCD는 Kubernetes 환경에서 GitOps 방식으로 애플리케이션 배포 및 관리를 자동화하는 도구입니다. ArgoCD를 사용하면 Git 리포지토리에 저장된 애플리케이션 정의(Manifest)를 기준으로 Kubernetes 클러스터에 자동으로 애플리케이션을 배포하고, 클러스터 상태를 지속적으로 모니터링하면서 Git의 상태와 일치하지 않는 경우 이를 동기화할 수 있습니다.

- Application 오브젝트: Application은 Git 리포지토리와 Kubernetes 클러스터 간의 연결 고리로, 애플리케이션의 정의와 클러스터에 적용될 리소스, 동기화 정책 등을 포함
- App Controller: Kubernetes 클러스터의 상태와 Git 리포지토리의 상태를 지속적으로 모니터링. 두 상태가 다르면 동기화 작업을 수행하여 클러스터 상태를 Git 상태와 일치시키려 함
- Repository Server: Git 리포지토리에 접근하고 애플리케이션 배포에 필요한 리소스를 읽어오는 역할
- Dex: 인증 서비스로, ArgoCD는 외부 인증 시스템(Google, GitHub, LDAP 등)과 통합하여 사용자 인증 및 권한을 관리

롤백이 필요한 경우엔 ArgoCD UI에서 배포된 애플리케이션의 상태를 확인하고, 특정 히스토리(배포 이력)를 선택하여 해당 버전으로 롤백할 수 있습니다.

