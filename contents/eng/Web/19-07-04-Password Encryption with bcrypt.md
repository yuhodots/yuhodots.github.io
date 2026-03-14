---
title: "Password Encryption with bcrypt"
date: "2019-07-04"
template: "post"
draft: false
path: "/backend/2019-07-04/"
description: "Making a web application work well is important, but even more important is protecting the personal information of users from being leaked by anonymous attackers. While there are countless attack methods for stealing personal information, let's look at one of the most fundamental protections: bcrypt."
category: "BackEnd"
---

> This post is a summary of [lectures](https://opentutorials.org/course/3411/22097) by Egoing from 'OpenTutorials - Life Coding'.

Making a web application work well is important, but even more important is protecting the personal information of users from being leaked by anonymous attackers. While there are countless attack methods for stealing personal information, let's look at one of the most fundamental protections: bcrypt.

To protect users' personal information, it must be encrypted so that anonymous attackers cannot read it. Moreover, even the developer who built the web application should not be able to read users' personal information. For example, if a user enters '111111' as their password, it gets encrypted through bcrypt into something unreadable like '$I1287s72&829(5+wld'. Because of this, neither attackers nor developers can figure out what the original password was.

Later, when the user enters '111111' again to log in, this password is once again encrypted through bcrypt into '$I1287s72&829(5+wld'. Since this matches the previously stored encrypted information, the developer can allow the user to log in without ever knowing the actual password value.

### Applying bcrypt

If you search "bcrypt npm" on Google, you'll find the [bcrypt npm](https://www.npmjs.com/package/bcrypt) library. Click the link and install the bcrypt npm library. Enter `npm install -s bcrypt` in the terminal to proceed with installation.

```javascript
const bcrypt = require('bcrypt');
const saltRounds = 10;
const temp1 = 's0/\/\P4$$w0rD';
const temp2 = 'not_bacon';

bcrypt.hash(temp1, saltRounds, function(err, hash) {
  bcrypt.compare(temp1, hash, function(err, result) {
  	console.log('my password', result);
  })
  bcrypt.compare(temp2, hash, function(err, result) {
  	console.log('other password', result);
  })
});
```

Let me explain the code above.

- `const bcrypt = require('bcrypt')`: Loads the bcrypt module.
- `const saltRounds = 10`: Sets a noise value to make it harder for attackers to crack.
- `bcrypt.hash(temp1, saltRounds, function(err, hash) {...}`: The password passed as temp1 is encrypted into the hash value.
- `bcrypt.compare(temp1, hash, function(err, result) { console.log('my password', result); })`: Outputs true.
- `bcrypt.compare(temp2, hash, function(err, result) { console.log('my password', result); })`: Outputs false.

Now let's apply this to the login section of our web application:

```javascript
bcrypt.hash(pwd, 10, function (err, hash) {
        var user = {
          id: shortid.generate(),
          email: email,
          password: hash,
          displayName: displayName
        };
        db.get('users').push(user).write();
        request.login(user, function (err) {
          console.log('redirect');
          return response.redirect('/');
        })
      }
```

You can modify it like this to store the hash value instead of the actual password as the password's value. (The code above is only a portion of the full code. You mainly need to pay attention to the first and fifth lines.)
