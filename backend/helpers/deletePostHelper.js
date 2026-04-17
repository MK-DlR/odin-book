// backend/helpers/deletePostHelper.js

// imports
const { prisma } = require("../lib/prisma.js");

// normal posts
const deletePostHelper = async (postId) => {
  // find post
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      parentId: true,
      quotedId: true,
    },
  });

  const parentId = post?.parentId;
  const quotedId = post?.quotedId;

  // delete normal post
  if (!parentId && !quotedId) {
    await prisma.post.delete({ where: { id: postId } });
  }

  // delete reply post
  if (parentId) {
    await prisma.$transaction([
      prisma.post.delete({ where: { id: postId } }),
      prisma.post.update({
        where: { id: parentId },
        data: { replyCount: { decrement: 1 } },
      }),
    ]);
  }

  // delete quote post
  if (quotedId) {
    await prisma.$transaction([
      prisma.post.delete({ where: { id: postId } }),
      prisma.post.update({
        where: { id: quotedId },
        data: { repostCount: { decrement: 1 } },
      }),
    ]);
  }
};

module.exports = {
  deletePostHelper,
};
