// backend/controllers/posts.js

// imports
const { prisma } = require("../lib/prisma.js");

// posts/replies
// TODO: createPost
const createPost = async (req, res, next) => {
  try {
    // adds post to database
    // adds post to list of user's posts
    // note about replies:
    // can see list of who replied to the post
    // and the reply itself
  } catch (err) {
    return next(err);
  }
};

// TODO: deletePost
const deletePost = async (req, res, next) => {
  try {
    // delete post from database
    // removes post from list of user's posts
    // deletes any reposts/likes
    // orphans any replies
  } catch (err) {
    return next(err);
  }
};

// reposts
// TODO: manageRepost
const manageRepost = async (req, res, next) => {
  try {
    // adds repost to list of user's posts
    // removes repost from list of user's posts
  } catch (err) {
    return next(err);
  }
};

// likes
// TODO: manageLike
const manageLike = async (req, res, next) => {
  try {
    // adds post to user's likes list
    // removes post from user's likes list
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  // createPost,
  // deletePost,
  // manageRepost,
  // manageLike,
};
