---
title: "Authentication with MySQL and Passport"
date: "2019-07-31"
template: "post"
draft: false
path: "/backend/19-07-31/"
description: "I'm using express-session and passport.js (local strategy) to implement login, registration, and authentication features. This requires creating a session store, and I plan to use MySQL as the session store."
category: "BackEnd"
thumbnail: "nodejs"
---

> Source code referenced from the Life Coding [course](https://opentutorials.org/course/2136/12257).

I'm using express-session and passport.js (local strategy) to implement login, registration, and authentication features. This requires creating a session store, and I plan to use MySQL as the session store. So how do we use MySQL as a session store?

### Required Modules

First, let's load the modules needed to use express-session and passport-local. Don't forget to install the modules beforehand using `npm install express-session --save`, `npm install passport --save`, and `npm install passport-local --save`. When you use express-session as shown below, a session property is added to the request object.

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
app.use(passport.initialize()); // Set up passport
app.use(passport.session()); // Use sessions with passport
```

We also need to load a hasher module for password encryption. I used the [pbkdf2-password](https://www.npmjs.com/package/pbkdf2-password) method.

```javascript
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
```

### Registration

After registration, for the registered user's information to be stored in a MySQL table, you need to have a **users** table created in advance. For instructions on how to do this, please refer to a [previous post](https://uhou.tistory.com/107?category=835403).

Once the database table is set up, the basic configuration is complete. Now let's write the registration form and the router code that receives the form data via post.

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

Once you enter information into the form created this way, you can confirm that it is properly stored in your MySQL database.

### Login

First, write the router code that receives login information as follows.

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

Now let's implement the code that compares the user information stored in MySQL with the login form data to determine whether the user is valid. For this, I wrote the following code related to Passport's LocalStrategy.

```javascript
passport.serializeUser(function (user, done) { // Callback called on successful login
  console.log('[SerializeUser]', user);
  done(null, user.authId); // The user's identifier is saved in the session store as user.authId
});

passport.deserializeUser(function (authId, done) { // Callback called every time a logged-in user navigates to a page
  console.log('[DeserializeUser]', authId); // authId contains the user.authId value sent from serializeUser
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
passport.use(new LocalStrategy( // Authentication using Local strategy
  function (username, password, done) {
    db.query(
      'SELECT * FROM users WHERE authId=?',
      ['local:' + username],
      function (err, results) {
        if (err) return done(err); // Case 1: user info doesn't exist in MySQL
        if (!results[0]) return done(err); // Case 2: user info doesn't exist in MySQL
        var user = results[0]; // Valid user info exists
        return hasher(
          { password: password, salt: user.salt },
          function (err, pass, salt, hash) {
            if (hash === user.password) { // Check if the password is correct
              console.log('LocalStrategy', user);
              done(null, user); // Send user value as the first argument to passport.serializeUser
            }
            else done(null, false);
        });
    });
}));
```

The first code block handles serialization and deserialization. The second code block is the actual source code that validates users. Since the code is complex, let me explain it step by step.

##### passport.use Section

1. If valid user information exists in MySQL, the `if(err) return done('There is no user.')` statement is skipped.
2. If the password stored in MySQL matches the entered password, `if(hash === user.password) {...}` is executed.
3. The user's information is sent as the first argument to the `passport.serializeUser` method, completing the login.

##### passport.serializeUser Section

1. When login is successful, the callback function of `passport.serializeUser` is executed.
2. When `done(null, user.authId)` is called, the logged-in user's identifier is saved in the session store as user.authId.

##### passport.deserializeUser Section

1. Every time a successfully logged-in user navigates to a page, the callback function of `passport.deserializeUser` is called.
2. The authId argument contains the user.authId value sent from the `serializeUser` method.
3. `db.query(...)` verifies that the user is properly logged in.

### Logout

Here is the router code for the logout section.

```javascript
router.get('/logout', function(req, res){
  req.logout();
  req.session.save(function(){
    res.redirect('/');
  });
});
```

It processes the logout, saves the user's information in the session store, and then redirects to the home page.
