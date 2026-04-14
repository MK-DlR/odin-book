// backend/controllers/posts.js

// imports
const { prisma } = require("../lib/prisma.js");

// posts/replies
const createPost = async (req, res, next) => {
  try {
    const { content } = req.body;
    const author = req.user.id;

    // create post
    const newPost = await prisma.post.create({
      data: { authorId: author, content: content },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            displayName: true,
            icon: true,
          },
        },
      },
    });
    res.status(200).json({ posts: newPost });

    // TODO: reply posts
    // can see list of who replied to the post
    // and the reply itself

    // TODO: empty posts
    // don't let empty posts be created
  } catch (err) {
    return next(err);
  }
};

// TODO: deletePost
const deletePost = async (req, res, next) => {
  try {
    console.log("deletePost in progress");
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
    console.log("manageRepost in progress");
    // adds repost to list of user's posts
    // removes repost from list of user's posts
    // figure out how to handle quote reposts
    // might need to update schema
  } catch (err) {
    return next(err);
  }
};

// likes
// TODO: manageLike
const manageLike = async (req, res, next) => {
  try {
    console.log("manageLike in progress");
    // adds post to user's likes list
    // removes post from user's likes list
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createPost,
  deletePost,
  manageRepost,
  manageLike,
};
