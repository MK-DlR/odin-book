// backend/routes/auth.js

// imports
const express = require("express");
const jwt = require("jsonwebtoken");
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
    // user is authenticated via session (req.user is set by passport)

    // generate JWT for this user
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // redirect to frontend with token in URL
    const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontendURL}/auth/callback?token=${token}`);
  },
);

module.exports = router;
