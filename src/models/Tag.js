module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    "Tag",
    {
      tag: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return Tag;
};
