const { User, Post, FollowerFollowing } = require("../models");
const bcrypt = require("bcrypt");

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
    where: {
      username: username,
    },
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

async function getUser(req, res) {
  const user = await User.findByPk(req.userId, {
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

async function updateUser(req, res) {
  const user = await User.findByPk(pk, {
    attributes: ["id", "username"],
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
        id: req.userId,
      },
    }
  );
  res.json({
    updateStatus: updateUser[0] ? "new update" : "no change in this user",
    user: user,
  });
}

async function addFollowing(req, res) {
  const { idUser } = req.body;
  const userMain = await User.findByPk(req.userId);
  const userAim = await User.findOne({
    where: {
      id: idUser,
    },
  });

  userMain.addFollowing(userAim);
  res.send(userMain);
}

module.exports = {
  getAllUser,
  updateUser,
  addFollowing,
  getUserByUsername,
  getUser,
};
