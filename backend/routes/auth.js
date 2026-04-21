// backend/routes/auth.js

// imports
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  },
);

module.exports = router;
