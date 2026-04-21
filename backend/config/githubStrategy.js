// backend/config/githubStrategy.js

// imports
const { Strategy: GitHubStrategy } = require("passport-github");
const { prisma } = require("../lib/prisma");

const {
  validateUsername,
  validateEmail,
} = require("../helpers/validationHelpers");

const githubAuth = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    // TODO:
    // store accessToken / refreshToken

    // fetch emails from github api if not in profile
    let emails = profile.emails;
    if (!emails || emails.length === 0) {
      try {
        const response = await fetch("https://api.github.com/user/emails", {
          headers: {
            Authorization: `token ${accessToken}`,
            "User-Agent": "odin-book-app",
          },
        });
        const emailData = await response.json();

        // check if got an error response
        if (Array.isArray(emailData)) {
          // find primary email
          const primaryEmail = emailData.find((e) => e.primary);
          if (primaryEmail) {
            emails = [{ value: primaryEmail.email }];
          }
        } else {
          console.error("GitHub email API error:", emailData.message);
        }
      } catch (err) {
        console.error("Error fetching emails:", err);
      }
    }

    // extract github profile information
    const githubId = profile.id;
    const githubUsername = profile.username;
    const githubEmail = emails?.[0]?.value || null;
    const githubAvatar = profile.photos?.[0]?.value || null;
    const githubDisplayName = profile.displayName;

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
          // require email for account creation
          if (!githubEmail) {
            return done(null, false, {
              message: "GitHub account must have a public email address.",
            });
          }

          // validate username and email format
          const usernameErrors = validateUsername(githubUsername);
          const emailErrors = validateEmail(githubEmail);

          if (usernameErrors.length > 0 || emailErrors.length > 0) {
            // github data doesn't meet standards
            return done(null, false, {
              message: "GitHub profile data doesn't meet requirements.",
            });
          }

          // existing user with email not found, check if username is available
          const existingUsername = await prisma.user.findFirst({
            where: {
              usernameNormalized: githubUsername.toLowerCase(),
            },
          });

          if (!existingUsername) {
            // username available, create user
            const newUser = await prisma.user.create({
              data: {
                username: githubUsername,
                usernameNormalized: githubUsername.toLowerCase(),
                email: githubEmail,
                githubId: githubId,
                displayName: githubDisplayName,
                icon: githubAvatar,
              },
            });

            return done(null, newUser);
          } else {
            // username not available
            return done(null, false, { message: "Username taken" });
          }
        }
      }
    } catch (err) {
      console.error("Strategy error:", err);
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
  console.log("DESERIALIZING ID:", id);

  const userId = parseInt(id, 10);

  if (Number.isNaN(userId)) {
    return done(null, false);
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
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

module.exports = {
  githubAuth,
  serializeUser,
  deserializeUser,
};
