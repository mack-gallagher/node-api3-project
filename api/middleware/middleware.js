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

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  await User.getById(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'not found' });
        return;
      }

      next();
    })
    .catch(err => {
      res.status(404).json({ message: 'not found' });
      return;
    })

}

function validateUser(req, res, next) {
  if (!(Object.keys(req.body).length === 1 && Object.keys(req.body)[0] === 'name')) {
    res.status(400).json({ message: 'missing required name' });
    return;
  }

  next(); 
}

function validatePost(req, res, next) {

  if (Object.keys(req.body).indexOf('text') === -1) {
    res.status(400).json({ message: 'missing required text' });
    return;
  }

  next();
}
// do not forget to expose these functions to other modules

module.exports = { logger, validateUserId, validateUser, validatePost }
