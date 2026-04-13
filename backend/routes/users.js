// backend/routes/users.js

const express = require("express");
const router = express.Router();
const usersAuthController = require("../controllers/usersAuth.js");
const usersProfilesController = require("../controllers/usersProfiles.js");
const { authJWT } = require("../middleware/auth.js");

// registration
router.post("/register", usersAuthController.registerPost);

// login
router.post("/login", usersAuthController.loginPost);

// guest login
router.post("/guest-login", usersAuthController.guestLoginPost);

// fetch and return current user's data
router.get("/me", authJWT, usersProfilesController.profileGetMe);

// get all users
router.get("/all-users", usersProfilesController.usersGet);

// view profiles
router.get("/:username", usersProfilesController.profileGet);

// edit own profile
router.put("/:username", authJWT, usersProfilesController.profilePut);

module.exports = router;
