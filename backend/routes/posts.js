// backend/routes/posts.js

const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts.js");
const { authJWT } = require("../middleware/auth.js");

// routes

module.exports = router;
