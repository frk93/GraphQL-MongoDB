module.exports.validate = (username, password, confirmPassword, email) => {
  const err = {};
  if (username.trim() === "") {
    err.username = "username cannot be empty";
  }
  if (email.trim() === "") {
    err.email = "email cannot be empty";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      err.email = "Email is not a valid email";
    }
  }
  if (password === "") {
    err.password = "Password cannot be empty";
  } else if (password !== confirmPassword) {
    err.password = "Password must match";
  }

  return {
    err,
    valid: Object.keys(err).length < 1,
  };
};

module.exports.validateLogin = (username, password) => {
  const err = {};
  if (username.trim() === "") {
    err.username = "username cannot be empty";
  }
  if (password === "") {
    err.password = "Password cannot be empty";
  }

  return {
    err,
    valid: Object.keys(err).length < 1,
  };
};
