---
title: "Flutter and Firebase Setup for iOS App Dev"
date: "2024-09-29"
template: "post"
draft: false
path: "/mobile/24-09-29/"
description: "Dart is a programming language developed by Google, used for Flutter app development. It has syntax similar to JavaScript and offers high performance and productivity. It is specifically designed for building client-side applications and provides the advantage of directly manipulating the UI."
category: "Mobile"
thumbnail: "flutter"
---

> This post provides a step-by-step overview of the setup process for using Flutter and Firebase for iOS app development.

### Dart Basics

Dart is a programming language developed by Google, used for Flutter app development. It has syntax similar to JavaScript and offers high performance and productivity. It is specifically designed for building client-side applications and provides the advantage of directly manipulating the UI.

- Variable declaration: You can declare variables using `var`, `final`, and `const`.
  - Dart is a strictly-typed language. While Dart is a statically-typed language, if you do not specify a type when declaring a variable, Dart automatically infers the type. Therefore, when you use the `var` keyword, the type is determined based on the assigned value without explicitly specifying it.
  - `var`: The type is determined based on the value assigned when the variable is first initialized. Once the type is determined, values of other types cannot be assigned.
  - `final`: Used to declare a variable that can only be assigned a value once. Once a value is assigned, it cannot be changed. A `final` variable can be initialized at runtime.
  - `const`: Used to declare a constant whose value is fixed at compile time. Unlike `final`, `const` requires the value to be known at compile time and never changes during program execution.
  - These variable declaration methods help improve Dart's code stability and prevent unintended value changes.

- Functions: In Dart, functions are treated as first-class objects and are frequently used as callback functions.
  - When functions are first-class objects, you can create higher-order functions and use callbacks.

- Classes: Dart is an object-oriented programming language, and classes are used to define objects.
- Asynchronous programming: Dart makes it easy to handle asynchronous programming using the `async` and `await` keywords.
- Garbage Collection: Dart provides an automatic garbage collection feature for memory management. It automatically cleans up unused memory, so developers don't need to worry about memory management.
- JIT & AOT compilation: Dart supports both JIT (Just-In-Time) and AOT (Ahead-Of-Time) compilation. JIT provides fast feedback during development, such as hot reload, while AOT provides optimized performance for releases.

### Flutter Basics

Flutter is an open-source UI software development kit (SDK) created by Google that allows you to develop iOS and Android applications from a single codebase. Flutter delivers performance nearly identical to native apps while enabling complex UIs to be built with simple code.

- Widgets: Everything in a Flutter app is composed of widgets. Buttons, text, and layouts are all represented as widgets.
- StatelessWidget vs StatefulWidget: Widgets that do not change are defined as `StatelessWidget`, while widgets whose state can change are defined as `StatefulWidget`.
- Layout composition: Complex UIs can be easily composed using `Row`, `Column`, `Stack`, and more.
- Hot Reload: One of Flutter's greatest advantages is the hot reload feature, which allows you to see code changes in the app immediately.

### Flutter .gitignore

When creating a Flutter project, the following elements should be added to the .gitignore file. You can view the complete .gitignore file in [my project repository](https://github.com/yuhodots/flutter/blob/main/.gitignore).

- `firebase_options.dart`: A file containing Firebase configuration information. It includes sensitive information such as Firebase API keys, project IDs, and app IDs.
- `google-services.json` (Android): The Android Firebase configuration file that sets up the connection between the Firebase project and the Android app.
- `GoogleService-Info.plist` (iOS): The iOS Firebase configuration file that sets up the connection between the Firebase project and the iOS app.
- `.env` or environment variable files: Environment variable files may contain API keys, database connection information, secret tokens, etc.
- `.keystore` files (Android): Android signing key files used to sign the app when it is deployed to the Play Store.
  - The `key.properties` file should also be added to `.gitignore` to prevent exposure. This file may contain keystore location and password information.
- `pubspec.lock`: A file containing package version information. While this file itself is not a major security risk, caution is needed in sensitive environments as certain package versions may have vulnerabilities.
- `.flutter_secure_storage` data (if used): If you are using a package like Flutter Secure Storage to encrypt and store important data, this data should also be securely managed.
- Other iOS-related files: These may include provisioning profiles or certificate files. These are used for app signing and distribution and should be kept from exposure.

### Flutter iOS Setup

You can create a Flutter project in Android Studio through the following steps. Alternatively, you can use the `flutter create <project_name>` command.
1. Launch Android Studio and select `New Flutter Project`.
2. Set the Flutter SDK path and create the project.
3. Xcode installation is required to build iOS projects, and you can test the development environment using the iOS simulator.
4. Add required dependencies in the `pubspec.yaml` file (`flutter pub add <dependency>`) and install packages with the `flutter pub get` command.
5. You can build for iOS with the `flutter build ios` command and run the app on a real device or simulator.

You can also connect your iPhone directly to test on a real device.
1. Connect your iPhone to your Mac via USB.
2. Enable Developer Mode on the iPhone (Settings > Privacy > Developer Mode).
3. Verify that the latest version of CocoaPods is installed on your Mac (`pod --version`). To install, use `sudo gem install cocoapods`.
4. Verify that the iPhone is properly connected in Xcode's connected device list.
5. Configure the Apple developer team in Xcode (Runner > Targets > Runner > Signing & Capabilities).
6. Build the app in Xcode and you will see the Flutter app installed on your iPhone.

### Firebase Setup

Firebase is a backend service platform provided by Google that offers databases, authentication, hosting, cloud functions, and more to easily support mobile application development.

- Authentication: Provides various authentication methods including email/password and social login.
- Firestore: A real-time database that enables real-time data synchronization between users.
- Storage: Provides file storage and management features.
- Cloud Messaging: Enables easy implementation of push notifications.

Below is the process for adding Firebase to your app.

1. Go to the [Firebase console](https://console.firebase.google.com/u/0/?hl=ko) website, click the "Create Project" button, and create a project.
2. Install the [Firebase CLI](https://firebase.google.com/docs/cli?hl=ko&authuser=0&_gl=1*56jgyc*_ga*NzUyNDIxMTY4LjE3Mjc1OTQyMDQ.*_ga_CW55HF8NVT*MTcyNzU5NDIzMS4xLjEuMTcyNzU5NDM4MS4xMS4wLjA.#install_the_firebase_cli) and log in with `firebase login`.
   - How to install Firebase CLI on macOS: `curl -sL https://firebase.tools | bash`
3. Install the FlutterFire CLI by running `dart pub global activate flutterfire_cli`.
4. Set the FlutterFire CLI path.
   - `export PATH="$PATH":"$HOME/.pub-cache/bin"`
   - `source ~/.zshrc`
5. On the project page, run `flutterfire configure --project=<ProjectID>` to connect the Firebase project to the Flutter project.
6. Add the firebase_core dependency with `flutter pub add firebase_core`.
7. Install and apply all specified dependencies with `flutter pub get`.
