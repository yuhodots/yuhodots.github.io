---
title: "React Lifecycle"
date: "2019-09-15"
template: "post"
draft: false
path: "/frontend/19-09-15/"
description: "리액트의 컴포넌트는 우리가 모니터링하고 조작할수 있는 세 단계의 주요 라이프 사이클을 가지고 있습니다. 이번 포스팅에서는 리액트의 라이프사이클인 Mounting, Updating, Unmounting에 대해 공부해보도록 하겠습니다.들어가기 앞서 기본적으로 알고있어야 하는 DOM에 대해 알아봅시다."
category: "FrontEnd"
thumbnail: "react"
---

리액트의 컴포넌트는 우리가 모니터링하고 조작할수 있는 세 단계의 주요 라이프 사이클을 가지고 있습니다. 이번 포스팅에서는 리액트의 라이프사이클인 **Mounting, Updating, Unmounting**에 대해 공부해보도록 하겠습니다.

 들어가기 앞서 기본적으로 알고있어야 하는 **DOM**에 대해 알아봅시다. DOM은 **Document Object Model**의 약자로 HTML, XML 문서의 프로그래밍 interface를 의미합니다. 그렇다고 해서 내가 작성한 html 코드가 DOM과 동일하다는 것을 의미하지는 않고, 브라우저의 개발자 툴에서 확인한 코드가 DOM이 됩니다. 웹 브라우저에 표출되는 내용은 html 코드 내용에서 자바스크립트와 같은 스크립팅 언어에 의해 변경될 수 있기 때문입니다. 

### Mounting

 **mount**라는 단어는 컴퓨터공학 분야에서 '설치' 또는 '장착'이라는 뜻으로 많이 사용된다고 합니다. [w3school](https://www.w3schools.com/react/react_lifecycle.asp)에서는 mounting에 대해 'putting elements into the DOM' 즉, DOM에 요소를 삽입하는 것이라고 설명하고 있습니다. 쉽게 생각해서 React elements가 DOM에 노출되는 것, 혹은 더 쉽게 컴포넌트를 생성하는 것을 mounting이라고 생각하시면 될것 같습니다. React에는 아래와 같이 컴포넌트를 마운팅할 때 실행되는 4가지의 built-in 메소드가 있습니다.

- constructor()
- render()
- componentDidMount()
- getDerivedStateFromProps()

 컴포넌트가 렌더되기 전에 호출되는 `componentWillMount()` 라는 메소드도 존재했으나 이제는 필요하지 않게 되어 v16.3 이후부터는 사용되지 않거나, 사용되더라도 `UNSAFE_componentWillMount()` 라는 이름으로 사용되니 참고만 하시길 바랍니다. 아래의 순서대로 실행되며 자세한 사용법은 [w3school](https://www.w3schools.com/react/react_lifecycle.asp)을 참고하시길 바랍니다.

1. 컴포넌트가 새로 만들어질 때마다 컴포넌트 생성자 함수 constructor()가 호출됩니다.
2. render()가 호출됩니다.
3. componentDidMount()가 호출됩니다.

#### Updating

 마운팅 이후에는 **props 혹은 state의 변화** 같은 컴포넌트의 업데이트가 진행될 수 있습니다. React에는 아래와 같이 컴포넌트가 업데이트 될 때 실행되는 5가지의 built-in 메소드가 있습니다.

- getDerivedStateFromProps(): props로 받아온 값을 state로 동기화 하는 경우 사용합니다.
- shouldComponentUpdate(): 리액트가 re-rendering을 해야하는 지에 대한 여부를 Boolean 값으로 리턴합니다.
- render()
- getSnapshotBeforeUpdate(): render 이후, 실제 DOM 변화 이전에 실행되는 메소드입니다. 
- componentDidUpdate(): DOM 변화 이후에 실행되는 메소드입니다. 

 `componentWillReceiveProps()` 라는 메소드는 v16.3 이후부터 `UNSAFE_componentWillReceiveProps()` 로 변경되었고, `getDerivedStateFromProps()` 의 경우에는 마운팅과 업데이팅 두 경우 모두에서 호출된다는 점을 참고하시길 바랍니다. 메소드는 아래의 순서로 실행되며 자세한 사용법은 [w3school](https://www.w3schools.com/react/react_lifecycle.asp)을 참고하시길 바랍니다.

1. render()가 호출됩니다.
2. getSnapshotBeforeUpdate()가 호출됩니다. 
3. DOM에 변화가 생깁니다.
4. componentDidUpdate()가 호출됩니다. 

#### Unmounting

 그 다음의 라이프사이클은 Unmounting입니다. 컴포넌트가 DOM에서 제거되거나 리액트로서 언마운트 될 때 호출되며, 오직 한 개의 built-in 메소드가 존재합니다.

- componentWillUnmount()

#### Reference

- [React v16.3 이후 lifecycle API 총 정리(16.3v부터 deprecated된 API도 포함)](https://medium.com/@changmoomoon/react-v16-3-이후-lifecycle-api-총-정리-16-3v부터-deprecated된-api도-포함-37456f843efd)
- [w3school.com - React Lifecycle](https://www.w3schools.com/react/react_lifecycle.asp)
- [velopert - 누구든지 하는 리액트 5편: Lifecycle API](https://velopert.com/3631)
- [velog.io/@godori/DOM이란 무엇인가?](https://velog.io/@godori/DOM이란-무엇인가)