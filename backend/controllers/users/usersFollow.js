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
    const followerId = req.user.id;
    const followingId = req.params.id;

    if (!user) {
      // if not logged in, return 403
      return res.status(403).json({ message: "User not logged in." });
    } else {
      if (followerId === followingId) {
        return res.status(400).json({ error: "You can't follow yourself" });
      }

      const existing = await prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });

      // if already following, unfollow
      if (existing) {
        unfollowUser();
      }

      await prisma.follow.create({
        data: { followerId, followingId },
      });

      res.status(201).json({ message: "Followed user" });

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
