// backend/routes/users.js

// imports
const express = require("express");
const router = express.Router();

const usersAuthController = require("../controllers/users/usersAuth.js");
const usersProfilesController = require("../controllers/users/usersProfiles.js");
const usersFollowsController = require("../controllers/users/usersFollow.js");

const { authJWT, authEither } = require("../middleware/auth.js");

// auth routes
router.post("/register", usersAuthController.registerUser);
router.post("/login", usersAuthController.loginUser);
router.post("/guest-login", usersAuthController.loginGuest);

// profile routes
router.get("/me", authEither, usersProfilesController.getSelf);
router.get("/all-users", usersProfilesController.getAllUsers);
router.get("/:username", usersProfilesController.getProfile);
router.put("/:username", authEither, usersProfilesController.editProfile);

// follow routes
router.post(
  "/:username/follow",
  authEither,
  usersFollowsController.manageFollow,
);

module.exports = router;
