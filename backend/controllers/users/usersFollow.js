// backend/controllers/usersFollow.js

// imports
const { prisma } = require("../../lib/prisma.js");

// fetch user's posts
function addPostsQuery() {
  console.log("TODO: add posts to dashboard");
  // TO DO: prisma query to fetch user's posts
}

const followUser = async (req, res, next) => {
  try {
    const user = req.user.id;

    if (!user) {
      // if not logged in, return 403
      return res.status(403).json({ message: "User not logged in." });
    } else {
      // TO DO:
      // if logged in
      // query for user
      // add to following list
      // if user tries to follow self
      // do not allow

      // add followed user's posts to dashboard
      addPostsQuery();
    }
  } catch (err) {
    return next(err);
  }
};

// remove posts from dashboard
function removePostsQuery() {
  console.log("TODO: remove posts from dashboard");
  // TO DO: prisma query to remove posts from dashboard
  // this might be unnecessary
}

const unfollowUser = async (req, res, next) => {
  console.log("TODO: add unfollowUser functionality");
  // TO DO:
  // if user is logged in
  // query for user
  // remove from following list
  removePostsQuery();
};

module.exports = {
  followUser,
  unfollowUser,
};
