// backend/helpers/validationHelpers.js

// imports
const { prisma } = require("../lib/prisma.js");

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

async function checkUsernameAvailability(username) {
  const errors = [];

  try {
    // convert username to lowercase
    const lowercaseUser = username.toLowerCase();

    // check if username already exists
    const existingUser = await prisma.user.findUnique({
      where: { usernameNormalized: lowercaseUser },
    });

    if (existingUser) {
      errors.push("Username already taken.");
    }

    return errors;
  } catch (err) {
    throw err;
  }
}

function validateEmail(email) {
  const errors = [];

  // check email format
  let emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  if (!emailRegex.test(email)) errors.push("Please enter a valid email.");

  return errors;
}

async function checkEmailAvailability(email) {
  const errors = [];

  try {
    // check if email already exists
    const existingEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingEmail) {
      errors.push("Email already in use.");
    }

    return errors;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  validateUsername,
  checkUsernameAvailability,
  validateEmail,
  checkEmailAvailability,
};
