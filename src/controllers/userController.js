const { User, Post, FollowerFollowing } = require("../models");

User.hasMany(Post);
Post.belongsTo(User);

User.belongsToMany(User, {
  as: "follower",
  foreignKey: "followerId",
  through: FollowerFollowing,
});
User.belongsToMany(User, {
  as: "following",
  foreignKey: "followingId",
  through: FollowerFollowing,
});

async function addUser(req, res) {
  const data = req.body;
  const newUser = await User.create({
    username: data.username,
    password: data.password,
    nickname: data.nickname || null,
    phone: data.phone || null,
    email: data.email || null,
    birth: date || null,
    img: data.img || null,
    website: data.website || null,
    bio: data.bio || null,
    gender: data.gender || null,
  });
  res.send(newUser);
}

async function getAllUser(req, res) {
  const user = await User.findAll({
    attributes: { exclude: ["password"] },
    include: [
      {
        model: User,
        as: "follower",
        attributes: ["id", "username"],
        through: {
          attributes: [],
        },
      },
      {
        model: User,
        as: "following",
        attributes: ["id", "username"],
        through: {
          attributes: [],
        },
      },
      {
        model: Post,
        attributes: ["id", "title"],
      },
    ],
  });
  res.send(user);
}

async function getUserByUsername(req, res) {
  const { username } = req.params;
  const user = await User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      username: username,
    },
    include: [{ all: true }],
  });
  res.send(user);
}

async function updateUserByUsername(req, res) {
  const { username } = req.params;

  //   const date = new Date(Date.UTC(2001, 10 - 1, 18));
  //   console.log(date);

  const user = await User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      username: username,
    },
  });
  const data = req.body;
  const updateUser = await User.update(
    {
      nickname: data.nickname || user.nickname,
      phone: data.phone || user.phone,
      email: data.email || user.email,
      birth: data.birth || user.birth,
      img: data.img || user.img,
      website: data.website || user.website,
      bio: data.bio || user.bio,
      gender: data.gender || user.gender,
    },
    {
      where: {
        username: username,
      },
    }
  );
  res.json({
    updateStatus: updateUser[0],
    user: user,
  });
}

async function addFollowing(req, res) {
  const userMain = await User.findOne({
    where: {
      username: req.params.username,
    },
  });
  const userAim = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  userMain.addFollowing(userAim);
  res.send(userMain);
}

module.exports = {
  getAllUser,
  addUser,
  updateUserByUsername,
  getUserByUsername,
  addFollowing,
};
