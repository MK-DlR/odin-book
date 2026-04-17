// backend/helpers/toggleRelation.js

// imports
const { prisma } = require("../lib/prisma.js");

const toggleRelation = async (userId, postId, modelName, countField) => {
  // check if relation exists
  const existing = await prisma[modelName].findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  // if exists, delete it and decrement counter
  if (existing) {
    await prisma.$transaction([
      prisma[modelName].delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      }),

      // decrement countField
      prisma.post.update({
        where: { id: postId },
        data: { [countField]: { decrement: 1 } },
      }),
    ]);
  } else {
    // if doesn't exist, create it and increment counter
    await prisma.$transaction([
      prisma[modelName].create({
        data: {
          userId,
          postId,
        },
      }),

      // increment countField
      prisma.post.update({
        where: { id: postId },
        data: { [countField]: { increment: 1 } },
      }),
    ]);
  }

  return !existing;
};

module.exports = {
  toggleRelation,
};
