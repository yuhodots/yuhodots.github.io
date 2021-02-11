---
title: "MySQL과 Passport를 이용한 인증구현"
date: "2019-07-31"
template: "post"
draft: false
path: "/backend/19-07-31/"
description: "저는 로그인, 회원가입, 인증 기능을 구현하기 위해 express-session, passport.js (local strategy)를 사용하고 있습니다. 이를 위해서는 session store를 만들어야 하고 그래서 mysql을 session store로서 사용하려 합니다. 그렇다면 mysql을 session store로 사용하기 위해서는 어떻게 해야 할까요?"
category: "BackEnd"
thumbnail: "nodejs"
---

>소스코드를 생활코딩 [강좌](https://opentutorials.org/course/2136/12257)에서 참조하였습니다.

저는 로그인, 회원가입, 인증 기능을 구현하기 위해 express-session, passport.js (local strategy)를 사용하고 있습니다. 이를 위해서는 session store를 만들어야 하고 그래서 mysql을 session store로서 사용하려 합니다. 그렇다면 mysql을 session store로 사용하기 위해서는 어떻게 해야 할까요?

### 필요한 모듈

 자 일단 express-session와 passport-local을 사용하기 위해 모듈을 로드 해 줍시다. `npm install express-session --save`, `npm install passport --save`, `npm install passport-local --save`를 통해 미리 모듈들을 설치 해 주는 것도 잊으시면 안됩니다. 아래와 같이 express-session을 사용하면 request 객체에 session이라는 값이 추가됩니다. 

```javascript
var express = require('express');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var app = express();

app.use(session({
  secret: '1234DSFs@adf1234!@#$asd',
  resave: false,
  saveUninitialized: true
	store: new MySQLStore({
    	host: '127.0.0.1',
    	user: 'root',
    	password :'example',
    	database : 'example'
    })
}));
app.use(passport.initialize()); // passport 사용 하도록 세팅
app.use(passport.session()); // passport 사용 시 session을 활용
```

 비밀번호를 암호화 하기 위한 hasher 모듈 또한 로드 해 줍니다. 저는 [pbkdf2-password](https://www.npmjs.com/package/pbkdf2-password) 방식을 사용하였습니다.

```javascript
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
```

### 회원가입 파트

 회원 가입 이후, 가입한 회원의 정보가 mysql 테이블에 저장되기 위해서는 미리 **users**라는 테이블을 만들어 놓아야 합니다. 이 방법에 대해서는 [이전 포스팅](https://uhou.tistory.com/107?category=835403)을 참고하시면 좋을 것 같습니다.

데이터베이스 테이블 까지 만들었다면 기본적인 세팅은 완료되었습니다. 그러면 이제 회원가입 form과, form에 입력한 정보를 post방식으로 받는 라우터 코드를 아래에 작성 해 보겠습니다.

```javascript
h1 Login: register
form(action="/login/register" method="post")
p
  input(type="text" name="username" placeholder="username")
p
  input(type="password" name="password" placeholder="password")
p
  input(type="submit")
router.post('/login/register', function (req, res, next) {
  hasher(
    { password: req.body.password },
    function (err, pass, salt, hash) {
      var user = {
        authId: 'local:' + req.body.username,
        username: req.body.username,
        password: hash,
        salt: salt
      };
      db.query(
        'INSERT INTO users SET ?',
        user, 
        function (err, result) {
          if (error) throw error;
          res.redirect('/');
      });
    }
  );
});
```

 이렇게 생성된 form에 정보를 입력하면 우리의 MySQL에 잘 저장되는 것을 확인 할 수 있습니다.

### 로그인 파트

 일단 아래와 같이 login정보를 받는 라우터 코드를 작성합니다.

```javascript
router.post('/login',
  passport.authenticate(
    'local',
    {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: false
    }
  )
);
```

 이제는 mysql에 저장된 회원 정보와 로그인 form 정보를 비교하여 사용자가 올바른 사용자인지 구별하는 코드를 구현 해 봅시다. 이를 위해서 passport의 LocalStrategy와 관련된 코드를 아래처럼 작성하였습니다.

```javascript
passport.serializeUser(function (user, done) { // 로그인 성공 시 콜백 함수 호출
  console.log('[SerializeUser]', user);
  done(null, user.authId); // 접속한 사용자의 식별 값이, session store에 user.authId로 저장
});

passport.deserializeUser(function (authId, done) { // 로그인 성공한 사용자가 웹 페이지 이동할 때 마다 콜백 함수 호출
  console.log('[DeserializeUser]', authId); // authId 인자에는 serializeUser 메소드에서 보낸 user.authId 값이 담김
  db.query(
    'SELECT * FROM users WHERE authId=?',
    [authId],
    function (err, results) {
      if (err) done(err);
      if (!results[0]) done(err);
      var user = results[0];
      done(null, user);
    });
});
passport.use(new LocalStrategy( // Local 저장 방식을 통한 인증 구현
  function (username, password, done) {
    db.query(
      'SELECT * FROM users WHERE authId=?',
      ['local:' + username],
      function (err, results) {
        if (err) return done(err); // 입력한 유저정보가 mysql 내 존재하지 않는 경우 1
        if (!results[0]) return done(err); // 입력한 유저정보가 mysql 내 존재하지 않는 경우 2
        var user = results[0]; // 적절한 유저정보가 존재하는 경우
        return hasher(
          { password: password, salt: user.salt },
          function (err, pass, salt, hash) {
            if (hash === user.password) { // 사용자의 비밀번호가 올바른지 확인
              console.log('LocalStrategy', user);
              done(null, user); // user 라는 값을 passport.serializeUser의 첫번째 인자로 전송
            }
            else done(null, false);
        });
    });
}));
```

 첫 번째 코드블럭은 serialization, deserialization 관련 코드입니다. 두 번째 코드블럭이 실질적으로 유저를 판단하는 소스코드입니다. 코드가 복잡하니 순서대로 나눠서 설명하겠습니다.

##### passport.use 파트

1. mysql 내에 적절한 유저정보가 존재하는 경우 `if(err) return done('There is no user.')` 문장을 실행시키지 않고 넘어갑니다.
2. mysql 내 저장되어 있는 비밀번호가 입력한 비밀번호와 일치하는 경우 `if(hash === user.password) {...}` 을 실행시킵니다.
3. 유저의 정보를 `passport.serpassport.serializeUser` 메소드의 첫번째 인자로 전송하고 로그인을 완료합니다.

##### passport.serializeUser 파트

1. 로그인이 성공하면 `passport.serializeUser` 메소드의 콜백 함수가 실행됩니다. 
2. `done(null, user.authId)` 함수가 실행되면 접속한 사용자의 식별 값이 session store에 user.authId로 저장됩니다.

##### passport.deserializeUser 파트

1. 로그인 성공한 사용자가 웹 페이지 이동할 때 마다 `passport.deserializeUser` 메소드의 콜백 함수가 호출됩니다.
2. authId 인자에는 `serializeUser` 메소드에서 보낸 user.authId 값이 담깁니다.
3. `db.query(...)` 를 통해서 사용자가 올바르게 로그인 된 상태인지를 확인합니다.

### 로그아웃

 로그아웃 파트 라우터 코드입니다.

```javascript
router.get('/logout', function(req, res){
  req.logout();
  req.session.save(function(){
    res.redirect('/');
  });
});
```

 로그아웃 처리를 하고 session store에 사용자에 대한 정보를 저장 한 뒤, 홈 페이지로 리다이렉트 합니다. 