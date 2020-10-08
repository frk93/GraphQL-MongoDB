const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../../config");

module.exports = {
  Mutation: {
    // args is the input from what we defined in the tyoeDefs files
    async registerUser(
      Parent,
      { registerInput: { username, password, confirmPassword, email } },
      context,
      info
    ) {
      // TODO: Validate user
      // TODO: Make sure user doesn't exist
      // TODO: Hash Password
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        password,
        email,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
