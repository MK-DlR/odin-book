// backend/routes/users.js

// imports
const express = require("express");
const router = express.Router();

const usersAuthController = require("../controllers/usersAuth.js");
const usersProfilesController = require("../controllers/usersProfiles.js");
const usersFollowsController = require("../controllers/usersFollow.js");

const { authJWT } = require("../middleware/auth.js");

// auth routes
router.post("/register", usersAuthController.registerPost);
router.post("/login", usersAuthController.loginPost);
router.post("/guest-login", usersAuthController.guestLoginPost);

// profile routes
router.get("/me", authJWT, usersProfilesController.profileGetMe);
router.get("/all-users", usersProfilesController.usersGet);
router.get("/:username", usersProfilesController.profileGet);
router.put("/:username", authJWT, usersProfilesController.profilePut);

// follow routes
// TODO: implement follow/unfollow functionality
router.post("/:username/follow", authJWT, usersFollowsController.followPost);
router.delete(
  "/:username/follow",
  authJWT,
  usersFollowsController.followDelete,
);

module.exports = router;
