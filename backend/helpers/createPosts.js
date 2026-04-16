// backend/helpers/createPosts.js

// imports
const { prisma } = require("../lib/prisma.js");

// basic post data
const postWithAuthor = {
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
};

// normal posts
const createNormalPost = async ({ author, content }) => {
  return prisma.post.create({
    data: {
      authorId: author,
      content,
      parentId: null,
      wasReply: false,
    },
    ...postWithAuthor,
  });
};

// quote posts
const createQuotePost = async ({ author, content, quotedId }) => {
  const [quotePost] = await prisma.$transaction([
    prisma.post.create({
      data: {
        authorId: author,
        content,
        quotedId,
        wasReply: false,
      },
      ...postWithAuthor,
    }),

    // increment repost count
    prisma.post.update({
      where: { id: quotedId },
      data: { repostCount: { increment: 1 } },
    }),
  ]);

  return quotePost;
};

// reply posts
const createReplyPost = async ({ author, content, parentId }) => {
  const [replyPost] = await prisma.$transaction([
    prisma.post.create({
      data: {
        authorId: author,
        content,
        parentId,
        wasReply: true,
      },
      ...postWithAuthor,
    }),

    // increment reply count
    prisma.post.update({
      where: { id: parentId },
      data: { replyCount: { increment: 1 } },
    }),
  ]);

  return replyPost;
};

module.exports = {
  createNormalPost,
  createQuotePost,
  createReplyPost,
};
