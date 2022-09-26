const { Router } = require("express");
const { Ability } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  const { name, mana_cost, description } = req.body;

  if (!name || !mana_cost) {
    res.status(404).send("Falta enviar datos obligatorios");
  }

  try {
    const ability = await Ability.create({
      name,
      mana_cost,
      description,
    });

    res.status(201).json(ability.toJSON());
  } catch (err) {}
});

router.put('/setCharacter', async (req, res) => {
  const { idAbility, codeCharacter } = req.body;

  try {
    const ability = await Ability.findByPk(idAbility);
    await ability.setCharacter(codeCharacter);
    return res.status(200).json(ability.toJSON());
  } catch (err) {
    return res.status(500).send(err);
  }
})

module.exports = router;
