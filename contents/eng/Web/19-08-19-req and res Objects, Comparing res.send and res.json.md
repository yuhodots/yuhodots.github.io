---
title: "req and res Objects, Comparing res.send and res.json"
date: "2019-08-19"
template: "post"
draft: false
path: "/backend/19-08-19-2/"
description: "The most fundamental things when using Node.js Express are the req object, res object, and the express() function. Since I tend to forget these concepts frequently, I put together a summary referencing the official Express website. req.body holds POST data because the request information is contained in the body of the request rather than in the URL."
category: "BackEnd"
---

The most fundamental things when using Node.js Express are the req object, res object, and the express() function. Since I tend to forget these concepts frequently, I put together a summary referencing the [official Express website](https://expressjs.com/ko/4x/api.html#express).

### req Object

- **req.body:** Holds **POST** data. A package like body-parser is needed for parsing because the request information is contained in the body of the request rather than in the URL.
- **req.query:** Holds **GET** data. In other words, it contains query string parameters sent via the URL.
- **req.params:** Holds named route parameter information.
- **req.headers:** Holds HTTP header information.
- Other properties include req.route, req.cookies, req.acceptedLanguages, req.url, req.protocol, req.host, req.ip, and more.

### res Object

- **res.send:** Sends responses of various types.
- **res.redirect:** Redirects the browser.
- **res.render:** Renders views using the configured template engine.
- **res.json:** Sends a JSON response.
- **res.end:** Terminates the response process.
- Other methods include res.set, res.status, res.type, res.sendFile, res.links, res.cookie, and more.

### Comparing res.send / res.json / res.end

> This section references this [article](https://blog.fullstacktraining.com/res-json-vs-res-send-vs-res-end-in-express/).

#### res.send

The body of res.send([body]) can be a Buffer, String, Object, or Array. The **Content-Type** of the body is automatically defined in the response header. Let's look at the following example.

```javascript
res.send({ name: 'Minsu' })
```

When you send a response with an object containing the key "name" and value "Minsu" in the body, the Content-Type in the response header is automatically defined as JSON (JavaScript Object Notation). Note that this response header can be controlled using the **set method** on the response object. A simple example would be `res.set('Content-Type', 'text/html');`.

#### res.json

res.json sends JSON as the response. You might wonder whether res.json is really necessary since res.send can also send objects as responses. However, res.json has features that are more specialized for transmitting JSON data. To understand this, you should know that while Objects and JSON look similar, they have distinct differences.

JSON supports String, Number, Object, Array, Boolean, and Null, but does not support types like Function, Date, and Undefined. Therefore, if we pass a parameter like `{ x: [10, undefined, function(){}, Symbol('')] }`, since undefined, function(){}, and Symbol('') are types that JSON does not support, a conversion to JSON-compatible types is required. This can be accomplished through the **JSON.stringify() method**.

When you use res.json, it first calls the JSON.stringify() method to convert the parameter into a JSON string, then calls res.send() to send the response. The JSON.stringify() method can take two parameters called replacer and spaces, which can be controlled in Express through the following options. (For an explanation of JSON.stringify(), please refer to [Mozilla](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).)

```javascript
app.set('json replacer', replacer);
app.set('json spaces', 2);
```

#### res.end

As mentioned above, res.end is used to terminate the response process. So do you always need to explicitly include res.end() in your code? The answer can be both "yes" and "no." If you want to end a response without providing any data, you can use res.end(). For example, it can be used for a 404 error page as follows:

```javascript
res.status(404).end();
```

However, when sending response data in a form like res.json or res.send, these methods automatically terminate the response after sending some data, so there is no need to explicitly call res.end().

### express() Function

- **express.json():** Parses incoming requests as JSON data, based on body-parser.
- **express.static():** Serves static files, based on serve-static.
- **express.Router():** Creates a new router object.
- **express.urlencoded():** Parses incoming requests as URL-encoded data, based on body-parser.
