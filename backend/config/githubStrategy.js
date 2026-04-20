// backend/config/githubStrategy.js

// imports
const { Strategy } = require("passport-github2");
const { prisma } = require("../lib/prisma");

const {
  validateUsername,
  checkUsernameAvailability,
  validateEmail,
  checkEmailAvailability,
} = require("../helpers/validationHelpers");

const githubAuth = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    // TODO:
    // store accessToken / refreshToken
    // profile = username, email, avatar/icon

    // extract github profile information
    const githubId = profile.id;
    const githubUsername = profile.username;
    const githubEmail = profile.emails[0].value;
    const githubAvatar = profile.photos[0].value;

    try {
      // search for user by github username
      const existingGithubUser = await prisma.user.findUnique({
        where: {
          githubId: githubId,
        },
      });

      // search for user by github email
      const existingGithubEmail = await prisma.user.findUnique({
        where: {
          email: githubEmail,
        },
      });

      if (existingGithubUser) {
        // return found user
        return done(null, existingGithubUser);
      } else {
        // check if user with email exists
        if (existingGithubEmail) {
          // existing user with email found, link accounts
          const updatedGithubUser = await prisma.user.update({
            where: {
              email: githubEmail,
            },
            data: {
              githubId: githubId,
            },
          });
          // return linked user
          return done(null, updatedGithubUser);
        } else {
          // existing user with email not found, check if username is available
          const existingUsername = await prisma.user.findFirst({
            where: {
              usernameNormalized: githubUsername,
            },
          });

          if (!existingUsername) {
            // TODO:
            // if available: create user
          } else {
            // TODO:
            // if not available:
            // redirect to where user can pick username
            // return error with message:
            // return done(null, false, { message: "Username taken" })
          }
        }
      }

      // done(null, user) = success, here's the user
      // done(null, false, { message: "Username taken" }) error, passport will handle
      // done(err) = database error
    } catch (err) {
      done(err);
    }
  },
);

// take user object and save ID to session
const serializeUser = (user, done) => {
  done(null, user.id);
};

// take ID from session and look up full user from database
const deserializeUser = async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        usernameNormalized: true,
        email: true,
        displayName: true,
        icon: true,
      },
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
};

// -------------
// when github returns user's info (username, email, avatar/icon)
// GET /auth/github/callback

// check if:
// user with githubId already exists in database

// if yes: log them in
// issue JWT

// if no: create new user with that data
// if github username available:
// use it
// creates user and issues JWT
// if github username not available:
// return error to frontend
// let frontend handle username selection form
// redirect to special route that handles username selection
// user submits new username
// POST /auth/github/choose-username with new username
// creates user and issues JWT

// if email matches existing manual user:
// auto link them

module.exports = {
  githubAuth,
  serializeUser,
  deserializeUser,
};
