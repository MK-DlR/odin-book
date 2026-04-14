// backend/routes/posts.js

// imports
const express = require("express");
const router = express.Router();

const postsController = require("../controllers/posts.js");

const { authJWT } = require("../middleware/auth.js");

// post routes
router.post("/new-post", authJWT, postsController.createPost);
router.delete("/delete/:id", authJWT, postsController.deletePost);

// repost routes
router.post("/repost/:id", authJWT, postsController.manageRepost);

// like routes
router.post("/like/:id", authJWT, postsController.manageLike);

module.exports = router;
