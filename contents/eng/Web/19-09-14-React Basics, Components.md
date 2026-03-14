---
title: "React Basics: Components"
date: "2019-09-14"
template: "post"
draft: false
path: "/frontend/19-09-14/"
description: "Install the create-react-app module globally. Create a project using the create-react-app command. Run the app and verify it works at localhost:3000. The most fundamental concept in React is the component."
category: "FrontEnd"
thumbnail: "react"
---

### Creating a Project

1. Install the create-react-app module globally.

```
npm install -g create-react-app
```

2. Create a project using the create-react-app command.

```
create-react-app your-project-name
```

3. Run the app and verify it works at localhost:3000.

```
npm start
```

### Component Basics

The most fundamental concept in React is the **component**. React is often described as a "component-based library," meaning that instead of treating a web page as a single block of HTML code, it divides the page into smaller units called components.

Let's start by getting a feel for what a component looks like! The code below is what I wrote in the src/App.js file of my React project.

```javascript
import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Compo />
      </div>
    );
  }
}

class Compo extends React.Component {
  render() {
    return (
      <div>
        <p> Compoent test! </p>
      </div>
    );
  }
}

export default App;
```

![img](../../img/19-09-14-1.png)

This code contains two components: App and Compo. Let's take a quick look and find the commonalities between the two components:

1. They follow the **class - extends React.Component** pattern.
2. They call a **render** method inside the class.
3. Inside render, they call **return**.
4. Inside return, there is content wrapped in a **container element** `<div>`.

### Declaring Variables in Components

Let's look at an example that adds just a bit more to the basic component structure above. I wanted to insert a variable into the HTML content inside return, so I wrote the following code:

```javascript
import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Compo />
      </div>
    );
  }
}

class Compo extends React.Component {
  render() {
    let text = 'Compoent test!';
    return (
      <div>
        <p> {text} </p>
      </div>
    );
  }
}

export default App;
```

In the Compo class, you can see the line `let text = ...`. In ES6, it is recommended to use **let**, which has **block scope**, when declaring variables. So I declared the variable 'Component test!' using let. To use a variable inside the HTML code within return, simply wrap it in **curly braces { }** as shown above.

### props, propTypes & state

The most common ways to handle data within a component are props and state. Props are used for handling **immutable data** within a component, while State is used for handling **mutable, dynamic data**. You can also validate prop types to reduce errors or display error logs.

- **this.props.name**: Used in the form `<Compo name="value"/>`.
- **this.props.children**: Used in the form `<Compo> value </Compo>`.
- **defaultProps (setting defaults)**: After the component definition, use the form `Comp.defaultProps = { name: value }`.

```javascript
import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Compo test="Hello world!"> Children test </Compo>
      </div>
    );
  }
}

class Compo extends React.Component {
  render() {
    return (
      <div>
        <p>propsName: {this.props.test}</p>
        <p>chiledren: {this.props.children}</p>
      </div>
    );
  }
}

export default App;
```

- **propTypes**: After the component definition, use the form `Comp.propTypes = { name: type }`.

```javascript
Comp.propTypes = {
	value: React.PropTypes.string,
	secondeValue: React.PropTypes.number
	thirdValue: React.PropTypes.any.isRequired
}
```

- **this.state** (before rendering): State requires an initial value. You must set it using `this.state = { }` inside the constructor.
- **this.setState** (after rendering): To modify the state value, use `this.setState({ ... })`.

### Reference

- [React Basics: Understanding Components](https://medium.com/little-big-programming/react의-기본-컴포넌트를-알아보자-92c923011818)
- [Learning React from Scratch, Part 1](https://medium.com/wasd/기초부터-배우는-react-js-1531b18f7bb2)
- [velopert - React for Everyone #4: props and state](https://velopert.com/3629)
