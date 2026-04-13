// backend/controllers/usersProfiles.js

// imports
const { prisma } = require("../lib/prisma.js");

// check if user is guest
const isGuestUser = (user) => user.usernameNormalized === "guest";

// fetch and return current user's data
const profileGetMe = async (req, res, next) => {
  try {
    // extract user's id
    const id = req.user.id;

    // search for user by id
    const userData = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        icon: true,
        banner: true,
        bio: true,
        authoredPosts: true,
        reposts: true,
        likes: true,
        followers: true,
        following: true,
      },
    });
    if (userData) {
      // return user
      res.status(200).json({ userData });
    } else {
      // user not found
      return res.status(404).json({ error: "User not found." });
    }
  } catch (err) {
    return next(err);
  }
};

// get all users
const usersGet = async (req, res, next) => {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        displayName: true,
        icon: true,
        banner: true,
        bio: true,
        authoredPosts: true,
        reposts: true,
        likes: true,
        followers: true,
        following: true,
      },
      orderBy: { username: "asc" },
    });
    res.status(200).json({ users: allUsers });
  } catch (err) {
    return next(err);
  }
};

// view profile
const profileGet = async (req, res, next) => {
  try {
    // extract username
    const { username } = req.params;

    // search for user by username
    const result = await prisma.user.findUnique({
      where: {
        usernameNormalized: username.toLowerCase(),
      },
      select: {
        id: true,
        username: true,
        displayName: true,
        icon: true,
        banner: true,
        bio: true,
        authoredPosts: true,
        reposts: true,
        likes: true,
        followers: true,
        following: true,
      },
    });
    if (result) {
      // return user
      res.status(200).json({ result });
    } else {
      // user not found
      return res.status(404).json({ error: "User not found." });
    }
  } catch (err) {
    return next(err);
  }
};

// edit own profile if not guest
const profilePut = async (req, res, next) => {
  try {
    // fetch user to check if guest
    const currentUser = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { usernameNormalized: true },
    });

    // if guest, deny update
    if (isGuestUser(currentUser)) {
      return res.status(403).json({
        error: "Guest accounts cannot be edited.",
      });
    }

    // extract fields to update
    const { displayName, icon, banner, bio } = req.body;

    // update fields
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { displayName, icon, banner, bio },
      select: {
        username: true,
        displayName: true,
        icon: true,
        banner: true,
        bio: true,
      },
    });

    // return user
    res.status(200).json({ user });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  profileGetMe,
  usersGet,
  profileGet,
  profilePut,
};
