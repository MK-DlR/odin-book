// backend/controllers/posts.js

// imports
const { prisma } = require("../lib/prisma.js");

// posts/replies
const createPost = async (req, res, next) => {
  try {
    const { content, parentId } = req.body;
    const author = req.user.id;

    const isReply = !!parentId;

    const newPostData = {
      authorId: author,
      content,
      parentId: isReply ? parentId : null,
      wasReply: isReply,
    };

    // verify parentId exists
    const parentPost = parentId
      ? await prisma.post.findUnique({ where: { id: parentId } })
      : null;

    if (parentId && !parentPost) {
      return res.status(404).json({ error: "Parent post not found." });
    }

    // guard against empty posts
    if (!content) {
      return res.status(400).json({ error: "Posts must have content." });
    }

    if (!isReply) {
      // create normal post
      const newPost = await prisma.post.create({
        data: newPostData,
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
      const [replyPost] = await prisma.$transaction([
        prisma.post.create({
          data: newPostData,
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

        // increment replyCount
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

// WIP: deletePost
const deletePost = async (req, res, next) => {
  try {
    const postId = Number(req.params.id);

    // find post parentId if applicable
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { parentId: true },
    });

    const parentId = post?.parentId;

    if (!parentId) {
      // delete normal post
      // TODO: make sure reposts are deleted
      // should be functional, but need repost functionality to test
      await prisma.post.delete({
        where: { id: postId },
      });

      res.status(200).json({ message: "Post successfully deleted." });
    } else {
      // delete reply post
      await prisma.$transaction([
        prisma.post.delete({
          where: { id: postId },
        }),

        // decrement replyCount
        prisma.post.update({
          where: { id: parentId },
          data: { replyCount: { decrement: 1 } },
        }),
      ]);

      res.status(200).json({ message: "Post successfully deleted." });
    }
  } catch (err) {
    return next(err);
  }
};

// reposts
// WIP: manageRepost
const manageRepost = async (req, res, next) => {
  try {
    const postId = Number(req.params.id);
    const userId = req.user.id;

    const existing = await prisma.repost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    // if already reposted, remove repost
    if (existing) {
      await prisma.$transaction([
        prisma.repost.delete({
          where: {
            userId_postId: {
              userId,
              postId,
            },
          },
        }),

        // decrement repostCount
        prisma.post.update({
          where: { id: postId },
          data: { repostCount: { decrement: 1 } },
        }),
      ]);

      res.status(201).json({ message: "Repost removed", isReposted: false });
    } else {
      // if not reposted, create repost
      await prisma.$transaction([
        prisma.repost.create({
          data: {
            userId,
            postId,
          },
        }),

        // increment repostCount
        prisma.post.update({
          where: { id: postId },
          data: { repostCount: { increment: 1 } },
        }),
      ]);

      res.status(201).json({ message: "Repost created", isReposted: true });
    }

    // TODO: figure out how to handle quote reposts
    // might need to update schema
  } catch (err) {
    return next(err);
  }
};

// likes
const manageLike = async (req, res, next) => {
  try {
    const postId = Number(req.params.id);
    const userId = req.user.id;

    const existing = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    // if already liked, unlike
    if (existing) {
      await prisma.$transaction([
        prisma.like.delete({
          where: {
            userId_postId: {
              userId,
              postId,
            },
          },
        }),

        // decrement likeCount
        prisma.post.update({
          where: { id: postId },
          data: { likeCount: { decrement: 1 } },
        }),
      ]);

      res.status(201).json({ message: "Unliked post", isLiked: false });
    } else {
      // if not liked, add like
      await prisma.$transaction([
        prisma.like.create({
          data: {
            userId,
            postId,
          },
        }),

        // increment likeCount
        prisma.post.update({
          where: { id: postId },
          data: { likeCount: { increment: 1 } },
        }),
      ]);

      res.status(201).json({ message: "Liked post", isLiked: true });
    }
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
