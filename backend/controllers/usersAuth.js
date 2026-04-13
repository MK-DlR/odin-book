// backend/controllers/usersAuth.js

// imports
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { prisma } = require("../lib/prisma.js");
const e = require("express");

// TODO:
// registration and login
// should be able to use
// passport-oauth2
// to register/login using bsky
// passport-github2
// to register/login using github
// currently: manual registration and login are set up

// registration - inserts new user into schema
const registerPost = async (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).json({
      error: validationErrors.array().map((e) => e.msg),
    });
  }

  let errors = [];

  try {
    const { username, email, password, confirmPassword } = req.body;

    // check if username meets requirements
    function validateUsername(username) {
      const errors = [];

      // check username is between 2 and 32 characters
      if (username.length < 2) {
        errors.push("Username must be at least 2 characters.");
      }
      if (username.length > 32) {
        errors.push("Username must be 32 characters or less.");
      }

      // check valid characters
      const pattern = /^[a-zA-Z0-9._-]+$/;
      if (!pattern.test(username)) {
        errors.push(
          "Username contains invalid characters. Only letters, numbers, periods, and underscores are allowed.",
        );
      }

      return errors;
    }

    const usernameErrors = validateUsername(username);
    errors = errors.concat(usernameErrors);

    // convert username to lowercase
    const lowercaseUser = username.toLowerCase();

    // check if username already exists
    const existingUser = await prisma.user.findUnique({
      where: { usernameNormalized: lowercaseUser },
    });

    if (existingUser) {
      errors.push("Username already taken.");
    }

    // check if email already exists
    const existingEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingEmail) {
      errors.push("Email already in use.");
    }

    // check if email meets requirements
    function validateEmail(email) {
      const errors = [];

      // check email format
      let emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
      if (!emailRegex.test(email)) errors.push("Please enter a valid email.");

      return errors;
    }

    const emailErrors = validateEmail(email);
    errors = errors.concat(emailErrors);

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

// login
const loginPost = async (req, res, next) => {
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
    if (result) {
      // compare password
      const isMatch = await bcrypt.compare(req.body.password, result.password);

      // password correct
      if (isMatch) {
        const token = jwt.sign(
          { id: result.id }, // payload
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN },
        );
        res.status(200).json({ token });
      } else {
        return res.status(401).json({ error: "Invalid credentials." });
      }
    } else {
      // user not found
      return res.status(401).json({ error: "Invalid credentials." });
    }
  } catch (err) {
    return next(err);
  }
};

// guest account login
const guestLoginPost = async (req, res, next) => {
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
  registerPost,
  loginPost,
  guestLoginPost,
};
