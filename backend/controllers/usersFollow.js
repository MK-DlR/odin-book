// backend/controllers/usersFollow.js

// imports
const { prisma } = require("../lib/prisma.js");

// TODO: add follow functionality
const followPost = async (req, res, next) => {
  console.log("TODO: add followUser functionality");
  // adds user to logged in user's following list
  // TO DO: prisma query to add posts to dashboard
  function queryPosts() {
    console.log("TODO: add posts to dashboard");
    // add posts to dashboard
  }
  queryPosts();
};

// TODO: add unfollow functionality
const followDelete = async (req, res, next) => {
  console.log("TODO: add unfollowUser functionality");
  // removes user from logged in user's following list
  // TO DO: prisma query to remove posts from dashboard
  function queryPosts() {
    console.log("TODO: remove posts from dashboard");
    // add posts to dashboard
  }
  queryPosts();
};

module.exports = {
  followPost,
  followDelete,
};
