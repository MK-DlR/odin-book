// backend/controllers/usersFollow.js

// imports
const { prisma } = require("../../lib/prisma.js");

// fetch user's posts
function addPostsQuery() {
  console.log("TODO: add posts to dashboard");
  // TO DO: prisma query to fetch user's posts
}

const manageFollow = async (req, res, next) => {
  try {
    const followerId = req.user.id;
    const username = req.params.username;

    // Look up the user by username to get their ID
    const userToFollow = await prisma.user.findUnique({
      where: { usernameNormalized: username.toLowerCase() },
    });

    if (!userToFollow) {
      return res.status(404).json({ error: "User not found" });
    }

    const followingId = userToFollow.id;

    if (isNaN(followingId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    if (followerId === followingId) {
      return res.status(400).json({ error: "You can't follow yourself." });
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
      const deleteFollow = await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });

      res.status(201).json({ message: "Unfollowed user", isFollowing: false });
    } else {
      await prisma.follow.create({
        data: { followerId, followingId },
      });

      res.status(201).json({ message: "Followed user", isFollowing: true });

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

module.exports = {
  manageFollow,
};
