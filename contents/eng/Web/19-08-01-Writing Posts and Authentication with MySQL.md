---
title: "Writing Posts and Authentication with MySQL"
date: "2019-08-01"
template: "post"
draft: false
path: "/backend/19-08-01/"
description: "Let's implement a system using Node-Express and MySQL where only properly logged-in users can write posts, and only the owner of a post can edit or delete it. I created a function that checks whether the request object contains a user value, and another that verifies whether the logged-in user matches the post author."
category: "BackEnd"
thumbnail: "nodejs"
---

Let's use Node-Express and MySQL to implement a system where only properly logged-in users can write posts, and only the owner of a post can edit or delete it.

### Creating a User Verification Module

I created a module in a file called auth.js that contains an `isOwner` method to check whether the request object holds a `user` value, and a `sameOwner` method to determine whether the logged-in user matches the post author.

```javascript
module.exports = {
    isOwner: function (request, response) { // Determine if the user is logged in
        if (request.user) {
            console.log('[isOwner] Logged in')
            return true;
        } else {
            console.log('[isOwner] No user')
            return false;
        }
    },
    sameOwner: function (request, author) { // Determine if the logged-in user matches the post author
        if (request.user.username === author) {
            console.log("[sameOwner] Right approach")
            return 1;
        } else {
            console.log("[sameOwner] Cheating")
            return 0;
        }
    }
}
var auth = require('../lib/auth');
```

### Writing a Post

The first snippet handles navigating to the post creation page when a logged-in user clicks the "Write" button. If a user who is not logged in clicks the button, an anonymous file is rendered so that only authenticated users can create posts.

```javascript
router.get('/create', function (req, res, next) {
  if (!auth.isOwner(req, res)) {
    res.render('anonymous', { request: req });
  }
  else {
    res.render('create', { request: req });
  }
});
```

The code that receives the submitted post via a POST request can be implemented in the same manner.

### Editing a Post

The post editing section requires the `sameOwner` method. Only the original author should be able to edit their own post. If a different user attempts to edit the post, a cheat file is rendered to block the unauthorized access.

```javascript
router.get('/update/:id', function (req, res, next) {
  if (!auth.isOwner(req, res)) {
    res.render('anonymous', { request: req });
  }
  else {
    db.query(
      `SELECT * FROM tbl_board`,
      function (error, results) {
        if (error) throw error;
        db.query(
          `SELECT * FROM tbl_board WHERE id=?`,
          [req.params.id],
          function (error2, result) {
            if (error2) throw error2;
            else {
              if (auth.sameOwner(req, result[0].author) === 0) { // Unauthorized access by a different user
                res.render('cheat', { request: req });
              }
              else { // Authorized access by the correct user
                res.render('update', { post: result[0], request: req });
              }
            }
          })
      }
    )
  }
});
```

The post deletion feature can also be implemented in the same manner as the editing feature.
