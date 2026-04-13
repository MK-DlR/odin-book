// backend/routes/follows.js

const express = require("express");
const router = express.Router();
const followsController = require("../controllers/follows.js");
const { authJWT } = require("../middleware/auth.js");

// routes
// router.post("/URL", authJWT, followsController.FUNCTION_NAME);

module.exports = router;
