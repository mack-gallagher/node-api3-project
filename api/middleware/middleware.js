const User = require('../users/users-model');
const Post = require('../posts/posts-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  const date = new Date();
  console.log(`Timestamp: ${date.toISOString()}`);

  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  Post.getById(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).json(result);
      }
    })

  next();
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = { logger, validateUserId, validateUser, validatePost }
