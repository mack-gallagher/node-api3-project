const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const User = require('./users-model');
const Post = require('../posts/posts-model');
const middleware = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
    .then(result => {
      res.status(200).json(result);
    })
});

router.get('/:id', middleware.validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  User.getById(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
});

router.post('/', middleware.validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert(req.body)
    .then(result => {
      res.status(201).json(result);
    })
});

router.put('/:id', middleware.validateUserId, middleware.validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.params.id, req.body)
    .then(result => {
      res.json(result);
    })
});

router.delete('/:id', middleware.validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id

  User.getById(req.params.id)
    .then(result => {
      User.remove(req.params.id)
        .then(result2 => {
          res.status(200).json(result);
          return;
        })
        .catch(err => {
          res.status(500).json(err);
        })
    })
});

router.get('/:id/posts', middleware.validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Post.get()
    .then(result => {
      finalResult = result.reduce((acc, x) => {
        if (x.user_id == req.params.id) {
          acc.push(x);
        }
      return acc;
      },[]);
      res.status(200).json(finalResult);
    })
});

router.post('/:id/posts', middleware.validateUserId, middleware.validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  Post.insert({ user_id: req.params.id, text: req.body.text }) 
    .then(result => {
      res.status(201).json(result);
      return;
    })
 
});


// do not forget to export the router

module.exports = router;
