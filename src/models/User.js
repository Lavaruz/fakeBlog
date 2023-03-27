module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      nickname: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birth: DataTypes.DATE,
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      img: DataTypes.STRING,
      website: DataTypes.STRING,
      bio: DataTypes.STRING,
      gender: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
  return User;
};
