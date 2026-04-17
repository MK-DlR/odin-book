// backend/controllers/posts.js

// imports
const { prisma } = require("../lib/prisma.js");

const {
  createNormalPost,
  createQuotePost,
  createReplyPost,
} = require("../helpers/createPostHelpers.js");
const { deletePostHelper } = require("../helpers/deletePostHelper.js");
const { toggleRelation } = require("../helpers/toggleRelation.js");

// create post/quote/reply
const createPost = async (req, res, next) => {
  try {
    const { content, parentId, quotedId } = req.body;
    const author = req.user.id;

    const isReply = !!parentId;
    const isQuote = !!quotedId;

    // guard against empty posts
    if (!content) {
      return res.status(400).json({ error: "Posts must have content." });
    }

    // verify parentId exists
    const parentPost = parentId
      ? await prisma.post.findUnique({ where: { id: parentId } })
      : null;

    if (parentId && !parentPost) {
      return res.status(404).json({ error: "Parent post not found." });
    }

    // verify quotedId exists
    const quotedPost = quotedId
      ? await prisma.post.findUnique({ where: { id: quotedId } })
      : null;

    if (quotedId && !quotedPost) {
      return res.status(404).json({ error: "Quoted post not found." });
    }

    // guard against posts being a reply and a quote
    if (parentId && quotedId) {
      return res
        .status(400)
        .json({ error: "Post cannot be both a reply and a quote." });
    }

    // create normal post
    if (!isReply && !quotedId) {
      const newPost = await createNormalPost({ author, content });
      return res.status(200).json({ posts: newPost });
    }

    // create quote repost
    if (!isReply) {
      const quotePost = await createQuotePost({ author, content, quotedId });
      return res.status(200).json({ posts: quotePost });
    }

    // create reply post
    if (isReply) {
      const replyPost = await createReplyPost({ author, content, parentId });
      return res.status(200).json({ posts: replyPost });
    }
  } catch (err) {
    return next(err);
  }
};

// delete post/reply/repost
const deletePost = async (req, res, next) => {
  try {
    const postId = Number(req.params.id);

    await deletePostHelper(postId);

    return res.status(200).json({ message: "Post successfully deleted." });
  } catch (err) {
    return next(err);
  }
};

// reposts
const manageRepost = async (req, res, next) => {
  try {
    const postId = Number(req.params.id);
    const userId = req.user.id;

    const isReposted = await toggleRelation(
      userId,
      postId,
      "repost",
      "repostCount",
    );

    return res.status(201).json({
      message: isReposted ? "Created reposted post" : "Deleted reposted post",
      isReposted,
    });
  } catch (err) {
    return next(err);
  }
};

// likes
const manageLike = async (req, res, next) => {
  try {
    const postId = Number(req.params.id);
    const userId = req.user.id;

    const isLiked = await toggleRelation(userId, postId, "like", "likeCount");

    return res.status(201).json({
      message: isLiked ? "Liked post" : "Unliked post",
      isLiked,
    });
  } catch (err) {
    return next(err);
  }
};

// get posts to populate feed
const getFeed = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { limit = 20, cursor } = req.query; // cursor for pagination

    // get user's following list
    const following = await prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });

    const followingIds = following.map((f) => f.followingId);
    followingIds.push(userId); // include own posts

    // fetch posts from user and people they follow
    const posts = await prisma.post.findMany({
      where: {
        authorId: { in: followingIds },
        parentId: null, // exclude replies from main feed
      },
      include: {
        author: true,
        repost: { where: { userId } }, // check if current user reposted
        like: { where: { userId } }, // check if current user liked
        _count: { select: { replies: true, repost: true, like: true } },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      ...(cursor && { skip: 1, cursor: { id: parseInt(cursor) } }),
    });

    return res.status(200).json({ posts });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createPost,
  deletePost,
  manageRepost,
  manageLike,
  getFeed,
};
