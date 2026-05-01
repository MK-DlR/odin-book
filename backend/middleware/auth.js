// backend/middleware/auth.js

// imports
const jwt = require("jsonwebtoken");

const authJWT = (req, res, next) => {
  // get auth header value
  const bearerHeader = req.headers["authorization"];

  // check if bearer is not undefined
  if (typeof bearerHeader !== "undefined") {
    // split at space
    const bearer = bearerHeader.split(" ");
    // get token from array
    const bearerToken = bearer[1];

    // verify token
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, authData) => {
      if (err) {
        res.status(401).json({ error: "Invalid or expired token." });
      } else {
        req.user = authData;
        next();
      }
    });
  } else {
    res.status(401).json({ error: "No token provided." });
  }
};

const authEither = (req, res, next) => {
  // try JWT first
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, authData) => {
      if (!err) {
        // JWT is valid
        req.user = authData;
        return next();
      }
      // JWT failed, try session below
    });
  }

  // no JWT or JWT failed - check session
  if (req.isAuthenticated && req.isAuthenticated()) {
    // session is valid (passport sets req.user automatically)
    return next();
  }

  // neither worked
  res.status(401).json({ error: "Not authenticated." });
};

module.exports = { authJWT, authEither };
