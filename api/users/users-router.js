const express = require("express");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const Users = require("./users-model");
const Posts = require("./../posts/posts-model");

const {
  logger,
  validateUserId,
  validateUser,
  validatePost,
} = require("./../middleware/middleware");

const router = express.Router();

router.get("/", (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get().then((users) => res.json(users));
});

router.get("/:id", validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  res.json(req.user);
  // this needs a middleware to verify user id
});

router.post("/", validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body).then((user) => {
    res.json(user);
  });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body).then((user) => {
    res.json(user);
  });
});

router.delete("/:id", validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.getById(req.params.id).then((user) => {
    Users.remove(req.params.id).then((result) => {
      res.json(user);
    });
  });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Posts.get().then((posts) => {
    res.json(
      posts.filter((post) => {
        return post.user_id === parseInt(req.params.id);
      })
    );
  });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Posts.insert(req.body).then((post) => {
    res.json(post);
  });
});

// do not forget to export the router
module.exports = router;
