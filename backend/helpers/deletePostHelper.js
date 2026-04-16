// backend/helpers/deletePostHelper.js

// imports
const { prisma } = require("../lib/prisma.js");

// normal posts
const deletePostHelper = async ({ postId }) => {
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

  // determine post type
  let type = "normal";
  if (parentId) type = "reply";
  if (quotedId) type = "quote";

  // TODO: run appropriate transaction/delete
  // TODO: return success indicator

  /*
  return prisma.post.create({
    data: {
      authorId: author,
      content,
      parentId: null,
      wasReply: false,
    },
    ...postWithAuthor,
  });
  */
};

module.exports = {
  deletePostHelper,
};
