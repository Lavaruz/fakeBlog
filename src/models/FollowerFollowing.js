const { User } = require("./User");

module.exports = (sequelize, DataTypes) => {
  const FollowerFollowing = sequelize.define(
    "FollowerFollowing",
    {
      followerId: {
        type: DataTypes.INTEGER,
        references: {
          model: User, // 'Movies' would also work
          key: "id",
        },
      },
      followingId: {
        type: DataTypes.INTEGER,
        references: {
          model: User, // 'Movies' would also work
          key: "id",
        },
      },
    },
    {
      timestamps: false,
    }
  );
  return FollowerFollowing;
};
