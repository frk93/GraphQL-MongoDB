const PostResolvers = require("./posts");
const UserResolvers = require("./users");

module.exports = {
  Query: {
    ...PostResolvers.Query,
  },
  Mutation: {
    ...UserResolvers.Mutation,
  },
};
