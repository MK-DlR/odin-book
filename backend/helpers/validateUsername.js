// backend/helpers/validateUsername.js

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

module.exports = {
  validateUsername,
};
