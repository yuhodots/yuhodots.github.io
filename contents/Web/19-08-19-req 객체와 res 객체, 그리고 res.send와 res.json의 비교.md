---
title: "req 객체와 res 객체, 그리고 res.send와 res.json의 비교"
date: "2019-08-19"
template: "post"
draft: false
path: "/backend/19-08-19-2/"
description: "node.js express를 사용하는 데에 있어서 가장 기본적인 것은 req객체, res객체, express()함수를 사용하는 것입니다. 하지만 매번 까먹곤 하는 내용이어서 Express 공식 홈페이지를 참고하여 정리 해 보았습니다. req.body는 POST 정보를 가집니다. 요청 정보가 url에 들어있는 것이 아니라 Request의 본문에 들어있기 때문입니다. "
category: "BackEnd"
---

 node.js express를 사용하는 데에 있어서 가장 기본적인 것은 req객체, res객체, express()함수를 사용하는 것입니다. 하지만 매번 까먹곤 하는 내용이어서 [Express 공식 홈페이지](https://expressjs.com/ko/4x/api.html#express)를 참고하여 정리 해 보았습니다.

### req 객체

- **req.body :** **POST** 정보를 가집니다. 파싱을 위해서 body-parser와 같은 패키지가 필요합니다. 요청 정보가 url에 들어있는 것이 아니라 Request의 본문에 들어있기 때문입니다. 
- **req.query :** **GET** 정보를 가집니다. 즉, url로 전송된 쿼리 스트링 파라미터를 담고 있습니다.
- **req.params :** 내가 이름 붙인 라우트 파라미터 정보를 가집니다.
- **req.headers :** HTTP의 Header 정보를 가집니다.
- 이 외에도 req.route, req.cookies, req.acceptedLanguages, req.url, req.protocol, req.host, req.ip 등이 존재합니다. 

### res 객체

- **res.send :** 다양한 유형의 응답을 전송합니다.
- **res.redirect :** 브라우저를 리다이렉트 합니다. 
- **res.render :** 설정된 템플릿 엔진을 사용해서 views를 렌더링합니다.
- **res.json :** JSON 응답을 전송합니다.
- **res.end :** 응답 프로세스를 종료합니다.
- 이 외에도 res.set, res.status, res.type, res.sendFile, res.links, res.cookie 등이 존재합니다. 

### res.send / res.json / res.end 비교

> 이 파트는 이 [자료](https://blog.fullstacktraining.com/res-json-vs-res-send-vs-res-end-in-express/ )를 참고하였습니다.

#### res.send

 res.send([body])의 body에는 Buffer, String, Object, Array가 올 수 있습니다. 그리고 response Header에는 Body의 **Content-Type**이 자동으로 정의됩니다. 아래의 예시를 살펴보겠습니다.

```javascript
res.send({ name: 'Minsu' })
```

 key는 name, value는 'Minsu'라는 object를 body에 넣어서 response 응답을 전달하면, response Header 내 Content-Type은 자동으로 json(JavaScript Object Notation)으로 정의됩니다. 참고로 이 response Header는 response 객체 내 **set메소드**로 제어가 가능합니다. 간단한 예로 res.set('Content-Type', 'text/html'); 같은 형태를 들 수 있습니다.

#### res.json

 res.json은 JSON을 응답으로 보냅니다. 여기서 res.send도 Object를 응답으로 보낼 수 있으니까 res.json이 굳이 필요할까 라는 의문이 들 수 있는데, res.json은 JSON 정보를 전달하는데 더 특화된 기능을 가지고 있습니다. 일단 이를 이해하기 위해서는 Object와 JSON은 비슷하게 생기긴 했지만 확연한 차이점을 가지고 있다는 점을 알고계셔야 합니다. 

  JSON은 String, Number, Object, Array, Boolean, Null을 지원하지만, Function, Date, Undefined 등과 같은 타입은 지원하지 않습니다. 그렇기 때문에 우리가 { x: [10, undefined, function(){}, Symbol('')] } 같은 파라미터를 입력하면 undefined, function(){}, Symbol(") 는 JSON이 지원하지 않는 타입이기에 JSON이 지원하는 타입으로 바꾸는 작업이 요구됩니다. 이는 **JSON.stringfy() 메소드**를 통해 구현할 수 있습니다. 

 res.json을 사용하면 JSON.stringfy() 메소드를 호출하여 파라미터를 JSON string 형태로 먼저 변환 한 뒤, res.send()를 호출하여 응답을 내보냅니다. JSON.stringfy() 메소드는 replacer와 spaces라는 두 가지 파라미터를 가질 수 있는데 이를 Express에서는 아래와 같은 옵션을 통해 제어 가능합니다. (JSON.stringfy()에 대한 설명은 [Mozilla](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)에서 참고하시길 바랍니다.)

```javascript
app.set('json replacer', replacer);
app.set('json spaces', 2);
```

#### res.end

 res.end는 위에서 언급한 것 처럼 응답 프로세스를 종료하는 데 사용됩니다. 그렇다면 res.end()를 굳이 코드 내 명시해줘야 할까요? 이에 대한 대답은 '맞다'가 될 수도 있고 '아니다'가 될 수도 있습니다. 데이터를 제공하지 않고 응답을 끝내려면 res.end()를 사용할 수 있습니다. 예를 들어 아래와 같이 404오류 페이지에 활용 될 수 있습니다.

```javascript
res.status(404).end();
```

 하지만 응답 데이터를 res.json이나 res.send 같은 형태로 전송하는 경우에는 이들이 일부 데이터를 보낸 뒤에 자동으로 응답 종료처리를 하기 때문에 굳이 res.end()를 호출 할 필요가 없습니다. 

### express() 함수

- **express.json()** : 들어오는 request를 JSON 데이터로 파싱하며, body-parser를 기반으로 합니다.
- **express.static()** : 정적 파일을 제공하며, serve-static를 기반으로 합니다. 
- **express.Router()** : 새 router 객체를 생성합니다. 
- **express.urlencoded()** : 들어오는 request를 urlencoded 데이터로 파싱하며, body-parser를 기반으로 합니다.