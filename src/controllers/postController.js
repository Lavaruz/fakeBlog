const { User, Post, Tag } = require("../models");

User.hasMany(Post);
Post.belongsTo(User);

Post.belongsToMany(Tag, { through: "PostTag" });
Tag.belongsToMany(Post, { through: "PostTag" });

async function addPost(req, res) {
  const { title, body, tag } = req.body;

  const newPost = await Post.create({
    title: title,
    body: body,
  });
  const user = await User.findOne({
    where: {
      id: req.userId,
    },
  });
  const newTag = await Tag.create({
    tag: tag,
  });
  newPost.addTag(newTag);
  user.addPost(newPost);
  res.send(newPost);
}

async function getAllPost(req, res) {
  const posts = await Post.findAll({
    attributes: { exclude: "UserId" },
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
      {
        model: Tag,
        through: {
          attributes: [],
        },
      },
    ],
  });
  res.send(posts);
}

async function getPostByPk(req, res) {
  const { pk } = req.params;
  const post = await Post.findByPk(pk, {
    include: [
      {
        model: User,
        attributes: ["id", "username"],
      },
      {
        model: Tag,
        through: {
          attributes: [],
        },
      },
    ],
  });

  res.send(post);
}

async function updatePostByPk(req, res) {
  const { pk } = req.params;
  const { title, body } = req.body;
  const newPost = await Post.update(
    {
      title,
      body,
    },
    {
      where: {
        id: pk,
        UserId: req.userId,
      },
    }
  );
  res.json({
    status: newPost[0] ? "new update" : "no change in this post",
  });
}

async function getPostByProfile(req, res) {
  const user = await User.findByPk(req.userId, {
    attributes: [],
    include: {
      model: Post,
    },
  });
  res.send(user);
}

module.exports = {
  addPost,
  getAllPost,
  getPostByPk,
  updatePostByPk,
  getPostByProfile,
};
