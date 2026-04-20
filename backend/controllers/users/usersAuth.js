// backend/controllers/usersAuth.js

// imports
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { prisma } = require("../../lib/prisma.js");
const e = require("express");

const {
  validateUsername,
  checkUsernameAvailability,
  validateEmail,
  checkEmailAvailability,
} = require("../../helpers/validationHelpers.js");

// TODO:
// registration and login
// should be able to use
// passport-oauth2
// to register/login using bsky
// passport-github2
// to register/login using github
// currently: manual registration and login are set up

// registration
const registerUser = async (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({
      error: validationErrors.array().map((e) => e.msg),
    });
  }

  let errors = [];

  try {
    const { username, email, password, confirmPassword } = req.body;
    const lowercaseUser = username.toLowerCase();

    // check if username meets requirements
    const usernameErrors = validateUsername(username);
    errors = errors.concat(usernameErrors);

    // check if username is available
    const usernameAvailabilityErrors =
      await checkUsernameAvailability(username);
    errors = errors.concat(usernameAvailabilityErrors);

    // check if email meets requirements
    const emailErrors = validateEmail(email);
    errors = errors.concat(emailErrors);

    // check if email is available
    const emailAvailabilityErrors = await checkEmailAvailability(email);
    errors = errors.concat(emailAvailabilityErrors);

    // check if password meets requirements
    function validatePassword(password) {
      const errors = [];

      // check password length
      if (password.length < 6)
        errors.push("Password must be at least 6 characters.");

      // check valid characters
      if (!/[A-Z]/.test(password))
        errors.push("Password must contain at least one uppercase letter.");
      if (!/[a-z]/.test(password))
        errors.push("Password must contain at least one lowercase letter.");
      if (!/[0-9]/.test(password))
        errors.push("Password must contain at least one number.");

      return errors;
    }

    const passwordErrors = validatePassword(password);
    errors = errors.concat(passwordErrors);

    if (password !== confirmPassword) {
      errors.push("Passwords do not match.");
    }

    // return all errors at once
    if (errors.length > 0) {
      return res.status(400).json({ error: errors });
    }

    // hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        usernameNormalized: lowercaseUser,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    return next(err);
  }
};

// login as user
const loginUser = async (req, res, next) => {
  try {
    // extract username and password
    const { username, password } = req.body;

    // convert username to lowercase
    const lowercaseUser = username.toLowerCase();

    // search for user by username
    const result = await prisma.user.findUnique({
      where: {
        usernameNormalized: lowercaseUser,
      },
    });

    if (!result) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // check if user has a password
    if (!result.password) {
      return res.status(400).json({
        error:
          "This account uses OAuth login. Please use GitHub or Bluesky to sign in.",
      });
    }

    const isMatch = await bcrypt.compare(password, result.password);

    if (isMatch) {
      const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      res.status(200).json({ token });
    } else {
      // user not found
      return res.status(401).json({ error: "Invalid credentials." });
    }
  } catch (err) {
    return next(err);
  }
};

// login as guest
const loginGuest = async (req, res, next) => {
  try {
    // search for user by username
    const result = await prisma.user.findUnique({
      where: {
        usernameNormalized: "guest",
      },
    });
    if (result) {
      const token = jwt.sign(
        { id: result.id }, // payload
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
      );
      res.status(200).json({ token });
    } else {
      // guest user not found - indicates a setup problem
      return res.status(500).json({
        error: "Guest account not configured. Please contact support.",
      });
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  loginGuest,
};
