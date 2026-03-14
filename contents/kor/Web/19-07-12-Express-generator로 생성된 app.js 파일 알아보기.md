---
title: "Express-generator로 생성된 app.js 파일 알아보기"
date: "2019-07-12"
template: "post"
draft: false
path: "/backend/19-07-12/"
description: "Express-generator로 생성한 웹 애플리케이션 프로젝트의 app.js 파일을 살펴보면 40줄 정도의 코드가 있습니다. 오늘은 이 코드들이 각각 무엇을 의미하는 지에 대해 공부 해 보도록 하겠습니다. 일단 먼저 아래에 app.js 파일의 소스코드를 첨부하였습니다."
category: "BackEnd"
thumbnail: "nodejs"
---

Express-generator로 생성한 웹 애플리케이션 프로젝트의 app.js 파일을 살펴보면 40줄 정도의 코드가 있습니다. 오늘은 이 코드들이 각각 무엇을 의미하는 지에 대해 공부 해 보도록 하겠습니다. 일단 먼저 아래에 app.js 파일의 소스코드를 첨부하였습니다. 

```javascript
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
```

 위의 코드를 **모듈 선언, 서버 설정, 미들웨어 등록** 크게 세 파트로 나누어 살펴봅시다.

### 모듈 선언

- `var createError = require('http-errors')`: 에러에 대한 처리 [모듈](https://www.npmjs.com/package/http-errors) 
- `var path = require('path')`: 경로와 관련된 [모듈](http://chromeextension.kr/2016/08/node-js-path/). 예를 들어 path.join(path1, path2…) 의 경우, 파라미터로 전달받은 경로를 이어서 하나의 경로로 만듭니다.
- `var cookieParser = require('cookie-parser')`: req, res 객체에 cookies 프로퍼티와 cookie() 메소드를 추가하는 모듈
- `var logger = require('morgan')`: 로그 기록을 남기는 [모듈](https://www.npmjs.com/package/morgan). 예를 들어 app.use(logger('dev')) 의 경우, 서버에 접속을 시도하면 그에 대한 정보가 남습니다. 
- `var indexRouter = require('./routes/index')`: HTTP GET / 요청에 대한 작업 처리 모듈
- `var usersRouter = require('./routes/users')`: HTTP GET /users 요청에 대한 작업 처리 모듈

### 환경 설정

\__dirname 은 **현재 파일의 위치**를 의미합니다. 즉, app.js의 위치를 말합니다. 그래서 `path.join(__dirname, 'views')` 결과는 **'현재 디렉토리/views'** 라는 경로입니다. 

- `app.set('views', path.join(__dirname, 'views'))`: 기본 views 폴더를 path.join(__dirname, 'views') 로 설정
- `app.set('view engine', 'jade')`: 기본 템플릿 엔진은 jade 형식으로 설정

### 미들웨어 등록

- `app.use(logger('dev'))`: 서버에 접속을 시도하면 로그 남김
- `app.use(express.json())`: json 형태의 http request body를 파싱
- `app.use(express.urlencoded({ extended: false }))`: 영어가 아닌 (예를 들어 한글) url 을 인코딩
- `app.use(cookieParser())`: req, res 객체에 cookies 프로퍼티와 cookie() 메소드를 추가
- `app.use(express.static(path.join(__dirname, 'public')))`: path.join(__dirname, 'public') 내용을 웹 서버 루트 폴더에 업로드
- `app.use('/', indexRouter)`: HTTP GET / 요청에 대한 작업 처리
- `app.use('/users', usersRouter)`: HTTP GET /users 요청에 대한 작업 처리

나머지 제일 아래의 코드들은 에러 핸들링과 관련된 코드 들입니다.