---
title: "iOS 앱 개발을 위한 Flutter와 Firebase 설정"
date: "2024-09-29"
template: "post"
draft: false
path: "/mobile/24-09-29/"
description: "Dart는 Google에서 개발한 프로그래밍 언어로, Flutter 앱 개발을 위해 사용됩니다. JavaScript와 유사한 문법을 갖고 있으며, 높은 성능과 생산성을 제공합니다. 특히 클라이언트 측 애플리케이션을 만들기 위해 설계되었으며, UI를 직접 조작할 수 있는 장점이 있습니다."
category: "Mobile"
thumbnail: "flutter"
---

> iOS 앱 개발을 위해 flutter와 firebase를 사용할 때 필요한 과정을 나열식으로 정리합니다.

### Dart Basics

Dart는 Google에서 개발한 프로그래밍 언어로, Flutter 앱 개발을 위해 사용됩니다. JavaScript와 유사한 문법을 갖고 있으며, 높은 성능과 생산성을 제공합니다. 특히 클라이언트 측 애플리케이션을 만들기 위해 설계되었으며, UI를 직접 조작할 수 있는 장점이 있습니다.

- 변수 선언: `var`, `final`, `const`를 사용하여 변수를 선언할 수 있습니다. 
  - Dart는 자료형이 엄격한 언어입니다. Dart는 정적 타입 언어이지만, 변수 선언 시 자료형을 명시하지 않으면 Dart가 자동으로 자료형을 추론합니다. 따라서 `var` 키워드를 사용하면 자료형을 명시하지 않아도, 값에 따라 자료형이 결정됩니다.
  - `var`: 변수를 처음 초기화할 때 할당된 값에 따라 자료형이 결정됩니다. 한 번 자료형이 결정되면, 그 자료형 외의 값은 할당할 수 없습니다.
  - `final`: 키워드는 한 번만 값을 할당할 수 있는 변수를 선언할 때 사용됩니다. 값을 한 번 할당하면 더 이상 변경할 수 없습니다. `final` 변수는 실행 시점에 초기화될 수 있습니다.
  - `const`: 컴파일 시점에 값을 고정시키는 상수를 선언할 때 사용됩니다. `const`는 `final`과 달리, 컴파일 타임에 값을 알고 있어야 하며, 프로그램 실행 중 절대 변경되지 않습니다.
  - 이러한 변수 선언 방법은 Dart의 코드 안정성을 높이고, 의도치 않은 값 변경을 방지하는 데 도움이 됩니다.

- 함수: Dart에서는 함수가 1급 객체로 간주되며, 콜백 함수로 자주 사용됩니다.
  - 함수가 1급 객체인 경우, 고차함수(Higher order function)를 만들 수 있고, 콜백(callback)을 사용할 수 있습니다.

- 클래스: Dart는 객체지향 프로그래밍 언어로, 클래스를 사용하여 객체를 정의할 수 있습니다.
- 비동기 프로그래밍: Dart는 `async`, `await` 키워드를 사용해 비동기 프로그래밍을 쉽게 처리할 수 있습니다.
- Garbage Collection(가비지 컬렉션): Dart는 메모리를 자동으로 관리하는 가비지 컬렉션 기능을 제공합니다. 사용되지 않는 메모리를 자동으로 정리해주므로, 개발자는 메모리 관리에 신경 쓸 필요가 없습니다.
- JIT & AOT 컴파일: Dart는 JIT(Just-In-Time) 컴파일과 AOT(Ahead-Of-Time) 컴파일을 모두 지원합니다. JIT는 개발 중 핫 리로드와 같은 빠른 피드백을 제공하고, AOT는 릴리스 시 최적화된 성능을 제공합니다.

### Flutter Basics

Flutter는 Google이 만든 오픈 소스 UI 소프트웨어 개발 키트(SDK)로, 단일 코드베이스로 iOS와 Android 애플리케이션을 개발할 수 있게 해줍니다. Flutter는 네이티브 앱과 거의 동일한 성능을 제공하면서도, 간단한 코드로 복잡한 UI를 구성할 수 있습니다.

- 위젯: Flutter 앱은 모든 것이 위젯으로 구성됩니다. 버튼, 텍스트, 레이아웃 모두 위젯으로 표현됩니다.
- StatelessWidget vs StatefulWidget: 변화가 없는 위젯은 `StatelessWidget`으로, 상태가 변경될 수 있는 위젯은 `StatefulWidget`으로 정의합니다.
- 레이아웃 구성: `Row`, `Column`, `Stack` 등을 사용하여 복잡한 UI를 손쉽게 구성할 수 있습니다.
- 핫 리로드(Hot Reload): Flutter의 가장 큰 장점 중 하나는 코드 변경 후 앱을 바로 확인할 수 있는 핫 리로드 기능입니다.

### Flutter .gitignore

Flutter 프로젝트를 만들 때 ignore 처리해야하는 요소들은 다음과 같습니다. 전체 .gitignore 파일을 [제 프로젝트 저장소](https://github.com/yuhodots/flutter/blob/main/.gitignore)에서 확인하실 수 있습니다. 

- `firebase_options.dart`: Firebase 설정 정보를 담고 있는 파일입니다. Firebase API 키, 프로젝트 ID, 앱 ID 등 민감한 정보가 포함되어 있습니다.
- `google-services.json` (Android): Android Firebase 설정 파일로, Firebase 프로젝트와 Android 앱 간의 연결을 설정하는 파일입니다.
- `GoogleService-Info.plist` (iOS): iOS Firebase 설정 파일로, Firebase 프로젝트와 iOS 앱 간의 연결을 설정하는 파일입니다.
- `.env` 또는 환경 변수 파일: 환경 변수 파일에는 API 키, DB 연결 정보, 비밀 토큰 등이 포함될 수 있습니다.
- `.keystore` 파일 (Android): Android 서명 키 파일로, 앱이 Play Store에 배포될 때 서명에 사용됩니다.
  - `key.properties` 파일도 노출되지 않도록 `.gitignore`에 추가해야 합니다. 이 파일에는 keystore 위치와 암호 정보가 포함될 수 있습니다.
- `pubspec.lock`: 패키지 버전 정보가 포함된 파일입니다. 이 파일 자체는 큰 위험 요소는 아니지만, 특정 패키지 버전과 관련된 취약점이 있을 수 있기 때문에 민감한 환경에서는 주의할 필요가 있습니다.
- `.flutter_secure_storage` 데이터 (사용 시): 만약 Flutter Secure Storage 같은 패키지를 사용하여 중요한 데이터를 암호화해서 저장하고 있다면, 이 데이터 역시 안전하게 관리되어야 합니다.
- 그 외 iOS 관련: provisioning profiles이나 certificate 파일 등이 포함될 수 있습니다. 이들은 앱 서명과 배포에 사용되므로 노출되지 않도록 관리해야 합니다.

### Flutter iOS 설정

Android Studio에서 Flutter 프로젝트는 아래와 같은 절차를 통해 생성할 수 있습니다. 혹은 `flutter create <project_name>` 명령어를 사용할 수도 있습니다.
1. Android Studio를 실행한 후, `New Flutter Project`를 선택합니다.
2. Flutter SDK 경로를 설정한 후 프로젝트를 생성합니다.
3. iOS 프로젝트를 빌드할 수 있도록 Xcode 설치가 필요하며, iOS 시뮬레이터를 사용해 개발 환경을 테스트할 수 있습니다.
4. `pubspec.yaml` 파일에서 필요한 의존성을 추가(`flutter pub add <dependency>`)하고, `flutter pub get` 명령어로 패키지를 설치합니다.
5. `flutter build ios` 명령어로 iOS 빌드를 진행할 수 있으며, 앱을 실제 기기나 시뮬레이터에서 실행할 수 있습니다.

사용중인 iPhone을 직접 연결하여 실제 디바이스에서 테스트해볼 수도 있습니다.
1. 사용 중인 iPhone을 USB로 Mac에 연결합니다.
2. iPhone의 개발자 모드를 켭니다 (Settings > Privacy > Developer Mode)
3. CocoaPods 최신 버전이 Mac에 설치되어있는지 확인합니다(`pod --version`). 설치하려면 `sudo gem install cocoapods` 명령어를 사용합니다.
4. Xcode의 연결된 기기 내역에서 iPhone이 제대로 연결되어있는지 확인합니다. 
5. Xcode에서 Apple developer team 설정을 합니다. (Runner > Targets > Runner > Signing & Capabilities)
6. Xcode 상에서 앱을 빌드하면 iPhone에 flutter 앱이 생성된 것을 확인할 수 있습니다.

### Firebase 설정

Firebase는 Google이 제공하는 백엔드 서비스 플랫폼으로, 데이터베이스, 인증, 호스팅, 클라우드 기능 등을 제공해 모바일 애플리케이션 개발을 쉽게 지원합니다.

- Authentication: 이메일/패스워드, 소셜 로그인 등의 다양한 인증 방식 제공.
- Firestore: 실시간 데이터베이스로 사용자 간 실시간 데이터 동기화가 가능.
- Storage: 파일 저장 및 관리 기능을 제공.
- Cloud Messaging: 푸시 알림을 쉽게 구현할 수 있음

앱에 Firebase를 추가하는 과정을 아래에 기록합니다.

1. [Firebase console](https://console.firebase.google.com/u/0/?hl=ko) 사이트에서 프로젝트 만들기 버튼을 클릭하고 프로젝트를 생성합니다.
2. [Firebase CLI](https://firebase.google.com/docs/cli?hl=ko&authuser=0&_gl=1*56jgyc*_ga*NzUyNDIxMTY4LjE3Mjc1OTQyMDQ.*_ga_CW55HF8NVT*MTcyNzU5NDIzMS4xLjEuMTcyNzU5NDM4MS4xMS4wLjA.#install_the_firebase_cli)를 설치하고 `firebase login`으로 로그인 합니다.
   - MacOS에서의 Firebase CLI 설치 방법: `curl -sL https://firebase.tools | bash`
3. FlutterFire CLI를 설치하기 위해 `dart pub global activate flutterfire_cli` 명령어를 입력합니다.
4. FlutterFire CLI의 경로를 설정합니다. 
   - `export PATH="$PATH":"$HOME/.pub-cache/bin"`
   - `source ~/.zshrc`
5. 프로젝트 페이지에서 `flutterfire configure --project=<ProjectID>` 명령어를 입력하여 Firebase 프로젝트를 Flutter 프로젝트에 연결합니다.
6. `flutter pub add firebase_core`를 통해 firebase_core 의존성을 추가합니다.
7. `flutter pub get`을 통해 명시된 의존성을 모두 설치하고 적용합니다.

### App 개발하기

Flutter에서 Firebase를 활용한 앱 개발은 다음과 같은 방식으로 시작할 수 있습니다. 

1. 해당 저장소의 `lib` 디렉토리 내 코드를 참고하여 코드를 작성합니다.
2. 해당 저장소의 res/api 내 저장소의 데이터를 다운받고, pubspec.yaml의 asset 항목에 추가합니다.
3. firebase_analytics, firebase_database, firebase_remote_config, firebase_crashlytics, connectivity_plus 패키지를 `flutter pub add`를 통해 추가합니다.
4. `flutter pub get`을 통해 프로젝트에 패키지를 설치합니다.
5. Firebase에서 필요한 세팅들을 마칩니다. (Remote config, Realtime Database 등)
6. Rub main.dart 버튼을 눌러 프로젝트를 빌드합니다.
   - Multidex support 에러 발생시: `android/app/build.gradle` 파일의 defaultConfig에 `multiDexEnabled true`를 추가해주고, dependencies에 `implementation 'com.android.support:multidex:2.0.1'`를 추가

