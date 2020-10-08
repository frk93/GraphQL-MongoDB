const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const { SECRET_KEY } = require("../../config");
const { validate, validateLogin } = require("../../utils/validators");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
};

module.exports = {
  Mutation: {
    async loginUser(Parent, { username, password }) {
      const { err, valid } = validateLogin(username, password);

      if (!valid) {
        throw new UserInputError("Error", {
          err,
        });
      }

      const user = await User.findOne({ username });
      if (!user) {
        err.loginuser = "User not found";
        throw new UserInputError("User not found", {
          err,
        });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        err.loginpass = "Incorrect Password";
        throw new UserInputError("Incorrect Password", {
          err,
        });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      }
    },
    // args is the input from what we defined in the tyoeDefs files
    async registerUser(
      Parent,
      { registerInput: { username, password, confirmPassword, email } },
      context,
      info
    ) {
      //  Validate user
      const { err, valid } = validate(
        username,
        password,
        confirmPassword,
        email
      );

      if (!valid) {
        throw new UserInputError("Error", {
          err,
        });
      }

      //  Make sure user doesn't exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "Username is taken",
          },
        });
      }

      // Hash Password
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        password,
        email,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
