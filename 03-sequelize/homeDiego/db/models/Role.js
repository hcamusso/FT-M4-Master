const { DataTypes, Model } = require("sequelize");

class Role extends Model {}

module.exports = (sequelize) => {
  return Role.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    { sequelize, modelName: "Role" }
  );
};
