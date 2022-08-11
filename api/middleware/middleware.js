const Users = require("./../users/users-model");
const Posts = require("./../posts/posts-model");

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(req.method, req.originalUrl, new Date());
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC

  Users.getById(req.params.id).then((user) => {
    if (user == null) {
      res.status(404).json({ message: "user not found" });
    } else {
      req.user = user;
      next();
    }
  });
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if (req.body.name == null) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if (req.body.text == null) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    req.body.user_id = req.params.id;
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost };
