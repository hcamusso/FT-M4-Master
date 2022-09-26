const { Sequelize, Op } = require("sequelize");
const modelCharacter = require("./models/Character.js");
const modelAbility = require("./models/Ability.js");
const modelRole = require("./models/Role.js");

const db = new Sequelize(
  "postgres://postgres:postgres@localhost:5432/henry_sequelize",
  {
    logging: false,
  }
);

const Character = modelCharacter(db),
  Ability = modelAbility(db),
  Role = modelRole(db);

Character.hasMany(Ability);
Ability.belongsTo(Character);

Character.belongsToMany(Role, { through: "Character_Role" });
Role.belongsToMany(Character, { through: "Character_Role" });

module.exports = {
  Character,
  Ability,
  Role,
  db,
  Op,
};
