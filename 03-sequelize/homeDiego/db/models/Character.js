const { DataTypes, Model } = require("sequelize");

class Character extends Model {}

module.exports = (sequelize) => {
  return Character.init(
    {
      code: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        validate: {
          notHenry: (value) => {
            if (value.toUpperCase() === "HENRY") {
              throw new Error("No puedes crear un personaje con el nombre Henry");
            }
          }
        }
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notIn: ["Henry", "SoyHenry", "Soy Henry"],
        },
      },
      age: {
        type: DataTypes.INTEGER,
        get() {
          const age = this.getDataValue("age");
          return age === null ? age : age + " years old";
        },
      },
      race: {
        type: DataTypes.ENUM(
          "Human",
          "Elf",
          "Machine",
          "Demon",
          "Animal",
          "Other"
        ),
        defaultValue: "Other",
      },
      hp: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      mana: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      date_added: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
    },
    { sequelize, modelName: "Character", timestamps: false }
  );
};
