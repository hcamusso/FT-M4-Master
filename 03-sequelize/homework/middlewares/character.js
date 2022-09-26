const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();


router.post('/', async (req, res) => {
    const { code, name, age, race, hp, mana} = req.body;
    //falto verificar que mande los parametros obligatorios
    try {
      const newCharacter = await Character.create({
        code, name, age, race, hp, mana
      });
      res.status(201).json(newCharacter.toJSON());
    } catch (error) {
      res.status(404).send(error);
    }
  });

  router.get('/', async (req, res) => {
    const { race } = req.query;
    const condition = race
    ? {where: {race: race}}
    : {};
    try {
      const characters = await Character.findAll({
        condition,
      });
      res.status(201).json(characters);
    } catch (error) {
      res.status(404).send(`El código ${race} no corresponde a un personaje existente`);
    }
  });
module.exports = router;