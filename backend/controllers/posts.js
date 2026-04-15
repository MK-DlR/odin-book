// backend/controllers/posts.js

// imports
const { prisma } = require("../lib/prisma.js");

// posts/replies
const createPost = async (req, res, next) => {
  try {
    const { content, parentId } = req.body;
    const author = req.user.id;

    // guard against empty posts
    if (!content) {
      return res.status(400).json({ error: "Post must have content." });
    }

    if (!parentId) {
      // create normal post
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
    } else {
      // create reply post
      // TODO: should increment parentId post's replyCount
      const [replyPost] = await prisma.$transaction([
        prisma.post.create({
          data: { authorId: author, content: content, parentId: parentId },
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
        }),

        prisma.post.update({
          where: { id: parentId },
          data: { replyCount: { increment: 1 } },
        }),
      ]);

      res.status(200).json({ posts: replyPost });
    }
  } catch (err) {
    return next(err);
  }
};

// TODO: deletePost
const deletePost = async (req, res, next) => {
  try {
    console.log("deletePost in progress");
    // delete post from database
    // deletes any reposts/likes
    // orphans any replies
    // if reply: decrements parentId post's replyCount
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
    // should increment/decrement original post's repostCount

    // TODO: figure out how to handle quote reposts
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
    // should increment/decrement original post's likeCount
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
