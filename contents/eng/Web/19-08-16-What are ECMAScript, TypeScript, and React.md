---
title: "What are ECMAScript, TypeScript, and React?"
date: "2019-08-16"
template: "post"
draft: false
path: "/frontend/19-08-16/"
description: "When starting to study frontend development, ECMAScript, TypeScript, and React are among the most frequently mentioned topics. Wikipedia describes ECMAScript as a standardized scripting programming language defined in the ECMA-262 technical specification by Ecma International."
category: "FrontEnd"
thumbnail: 'javascript'
---

When starting to study frontend development, ECMAScript, TypeScript, and React are among the most frequently mentioned topics. Let's organize what each of these is.

### ECMAScript

Wikipedia describes ECMAScript as follows:

>  ECMAScript is a standardized scripting programming language defined in the ECMA-262 technical specification by Ecma International. In March 1996, Netscape began supporting JavaScript with the release of Netscape Navigator 2.0. Netscape submitted the JavaScript technical specification to Ecma International for standardization, and work on this specification began in November 1996 under the name ECMA-262. The first edition of ECMA-262 was adopted by the ECMA General Assembly in June 1997.
>
>  ECMAScript is the name of the language standardized by ECMA-262. Both JavaScript and JScript aim for compatibility with ECMAScript while providing extended features not included in the ECMA specification.

- **Ecma International** refers to an international standards organization for information and communication systems.
- **ECMA-262** refers to the specification where Ecma International defined the standard for scripting languages.
- **Scripting programming language** refers to a programming language that can be executed without compiling the source code.

In other words, **ECMAScript** is a scripting programming language defined by the ECMA-262 standard, created by Ecma International. And JavaScript, which we are all familiar with, is a general-purpose scripting language built on the ECMAScript standard.

### TypeScript

Wikipedia describes TypeScript as follows:

>  TypeScript is an open-source programming language that is a superset of JavaScript. It is developed and maintained by Microsoft and supports strict syntax. It can be used for both client-side and server-side development.
>
>  TypeScript is a language designed to enable the development of large-scale applications while using the JavaScript engine. Since it is a superset of JavaScript, programs written in JavaScript also work as TypeScript programs. When you define your desired types and program in TypeScript, it is compiled into JavaScript for execution.
>

Put simply, TypeScript is a language that extends JavaScript. As such, it follows the characteristics of JavaScript and adheres to the latest ECMA standards. However, while JavaScript is an interpreted language, TypeScript is a compiled language that checks types at the code level in advance.

Therefore, **type specification** can be considered the most significant feature of TypeScript. Unlike JavaScript, which originally only used `var`, TypeScript enhances code stability by using `string`, `number`, `let`, and other type annotations. This has allowed TypeScript to replace JavaScript's shortcomings when it comes to implementing large-scale applications.

### React.js

React is a **JavaScript library** used for building user interfaces. It is maintained by Facebook (Meta) and a community of individual developers and companies. It can be said to be the most widely used library in the frontend space today, and its distinguishing feature is that it is **component-based**.

When doing frontend development, it is possible to create web pages using only HTML and CSS. However, such web pages are merely simple static screens and have the drawback of not being able to operate dynamically in response to user events. This is where React comes in, allowing you to more easily create dynamic UIs that interact with users.

For other libraries and frameworks that aid frontend development, such as **Vue.js and Angular**, the [Naver D2 Blog](https://d2.naver.com/helloworld/3259111) provides excellent explanations, so I recommend checking it out. Additionally, for the conceptual differences between libraries and frameworks, [this blog](https://webclub.tistory.com/458) (Kim Jaehee's WEBCLUB) provides a great explanation.

Personally, I keep it simple by thinking of a framework as "a workspace for getting things done" and a library as "a code library where you pick and use what you need."
