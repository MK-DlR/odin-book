// backend/routes/users.js

// imports
const express = require("express");
const router = express.Router();

const usersAuthController = require("../controllers/users/usersAuth.js");
const usersProfilesController = require("../controllers/users/usersProfiles.js");
const usersFollowsController = require("../controllers/users/usersFollow.js");

const { authJWT } = require("../middleware/auth.js");

// auth routes
router.post("/register", usersAuthController.registerUser);
router.post("/login", usersAuthController.loginUser);
router.post("/guest-login", usersAuthController.loginGuest);

// profile routes
router.get("/me", authJWT, usersProfilesController.getSelf);
router.get("/all-users", usersProfilesController.getAllUsers);
router.get("/:username", usersProfilesController.getProfile);
router.put("/:username", authJWT, usersProfilesController.editProfile);

// follow routes
// TODO: implement follow/unfollow functionality
router.post("/:username/follow", authJWT, usersFollowsController.followUser);
router.delete(
  "/:username/follow",
  authJWT,
  usersFollowsController.unfollowUser,
);

module.exports = router;
