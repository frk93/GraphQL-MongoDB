const User = require("../../models/User");

module.exports = {
  Mutation: {
    // args is the input from what we defined in the tyoeDefs files
    registerUser(
      Parent,
      { registerInput: { username, password, confirmPassword, email } },
      context,
      info
    ) {
      // TODO: Validate user
      // TODO: Make sure user doesn't exist
      // TODO: Hash Password
    },
  },
};
