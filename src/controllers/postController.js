const { User, Post } = require("../models");

User.hasMany(Post);
Post.belongsTo(User);

async function addPost(req, res) {
  const { title, body } = req.body;
  const newPost = await Post.create({
    title: title,
    body: body,
  });
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  user.addPost(newPost);
  res.send(newPost);
}

async function getAllPost(req, res) {
  const posts = await Post.findAll({
    include: { all: true },
  });
  res.send(posts);
}

module.exports = {
  addPost,
  getAllPost,
};
