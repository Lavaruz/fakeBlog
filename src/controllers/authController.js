const { User } = require("../models");
const bcrypt = require("bcrypt");
const { createToken } = require("../middlewares/JWT");

async function registerUser(req, res) {
  const { username, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  //   const newUser = await User.create({
  //     username: username,
  //     password: hashPassword,
  //   });
  res.send({
    status: "register",
    username,
    password: hashPassword,
  });
}

async function loginUser(req, res) {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: {
      username: username,
    },
  });
  if (!user) {
    return res.status(400).json({
      msg: "user not found",
    });
  }

  await bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      res.json({
        msg: "wrong username or password!",
      });
    } else {
      const accessToken = createToken(user);
      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 1000,
      });
      res.json({
        status: "login",
        username,
        password,
      });
    }
  });
}

module.exports = {
  loginUser,
  registerUser,
};
