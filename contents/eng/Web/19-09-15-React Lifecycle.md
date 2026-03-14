---
title: "React Lifecycle"
date: "2019-09-15"
template: "post"
draft: false
path: "/frontend/19-09-15/"
description: "React components have three main lifecycle phases that we can monitor and manipulate. In this post, we will study React's lifecycle phases: Mounting, Updating, and Unmounting. Before diving in, let's first learn about the DOM, a prerequisite concept."
category: "FrontEnd"
thumbnail: "react"
---

React components have three main lifecycle phases that we can monitor and manipulate. In this post, we will study React's lifecycle phases: **Mounting, Updating, and Unmounting**.

Before diving in, let's first learn about the **DOM**. DOM stands for **Document Object Model** and refers to the programming interface for HTML and XML documents. This doesn't mean that the HTML code you write is identical to the DOM -- rather, the code you see in your browser's developer tools is the DOM. This distinction exists because the content displayed in a web browser can be modified from the original HTML by scripting languages such as JavaScript.

### Mounting

The word **mount** is commonly used in computer science to mean "install" or "attach." [w3school](https://www.w3schools.com/react/react_lifecycle.asp) describes mounting as "putting elements into the DOM" -- that is, inserting elements into the DOM. Put simply, you can think of mounting as the process of React elements being exposed to the DOM, or even more simply, as creating a component. React has the following four built-in methods that are called when mounting a component:

- constructor()
- render()
- componentDidMount()
- getDerivedStateFromProps()

There used to be a method called `componentWillMount()` that was called before the component rendered, but it is no longer needed. Since v16.3, it has been deprecated or renamed to `UNSAFE_componentWillMount()`, so keep that in mind. The methods execute in the following order -- for detailed usage, refer to [w3school](https://www.w3schools.com/react/react_lifecycle.asp).

1. The constructor() function is called every time a new component is created.
2. render() is called.
3. componentDidMount() is called.

### Updating

After mounting, components may undergo updates such as **changes in props or state**. React has the following five built-in methods that are called when a component is updated:

- getDerivedStateFromProps(): Used when you need to synchronize state with values received from props.
- shouldComponentUpdate(): Returns a Boolean value indicating whether React should re-render.
- render()
- getSnapshotBeforeUpdate(): A method that executes after render but before the actual DOM changes.
- componentDidUpdate(): A method that executes after the DOM has changed.

Note that `componentWillReceiveProps()` was renamed to `UNSAFE_componentWillReceiveProps()` since v16.3, and `getDerivedStateFromProps()` is called during both mounting and updating. The methods execute in the following order -- for detailed usage, refer to [w3school](https://www.w3schools.com/react/react_lifecycle.asp).

1. render() is called.
2. getSnapshotBeforeUpdate() is called.
3. The DOM is updated.
4. componentDidUpdate() is called.

### Unmounting

The next phase in the lifecycle is Unmounting. It is called when a component is removed from the DOM, or unmounted in React terms. There is only one built-in method for this phase:

- componentWillUnmount()

### Reference

- [Complete Summary of React Lifecycle API after v16.3 (including deprecated APIs)](https://medium.com/@changmoomoon/react-v16-3-이후-lifecycle-api-총-정리-16-3v부터-deprecated된-api도-포함-37456f843efd)
- [w3school.com - React Lifecycle](https://www.w3schools.com/react/react_lifecycle.asp)
- [velopert - React for Everyone #5: Lifecycle API](https://velopert.com/3631)
- [velog.io/@godori - What is DOM?](https://velog.io/@godori/DOM이란-무엇인가)
