const { DataTypes, Model } = require("sequelize");

class Ability extends Model {}

module.exports = (sequelize) => {
  return Ability.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "name_mana_cost_unique",
      },
      description: {
        type: DataTypes.TEXT,
      },
      mana_cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: "name_mana_cost_unique",
        validate: {
          min: 10.0,
          max: 250.0,
        },
      },
      summary: {
        type: DataTypes.VIRTUAL,
        get() {
          // 'Thunderbolt (210 points of mana) - Description: An incredibly powerful thunderbolt'
          return `${this.name} (${this.mana_cost} points of mana) - Description: ${this.description}`;
        },
      },
    },
    { sequelize, modelName: "Ability" }
  );
};
