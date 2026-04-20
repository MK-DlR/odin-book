// backend/routes/auth.js

// imports
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/github",
  (req, res, next) => {
    const authURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=http://localhost:3000/auth/github/callback&scope=user`;
    console.log("Expected OAuth URL:", authURL);
    next();
  },
  passport.authenticate("github", { scope: ["user"] }),
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    console.log("User authenticated:", req.user);
    res.redirect("/");
  },
);

module.exports = router;
