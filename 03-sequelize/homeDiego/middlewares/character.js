const { Router } = require("express");
const { Op, Character, Role, Ability } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  const { code, name, age, race, hp, mana, date_added } = req.body;

  if (!code || !name || !hp || !mana) {
    return res.status(404).send("Falta enviar datos obligatorios");
  }

  try {
    const character = await Character.create({
      code,
      name,
      age,
      race,
      hp,
      mana,
      date_added,
    });

    res.status(201).json(character.toJSON());
  } catch (err) {
    return res.status(404).send("Error en alguno de los datos provistos");
  }
});

router.get("/", async (req, res) => {
  const { name, hp, race, age } = req.query;
  try {
    const where = {};

    if (race) {
      where.race = race;
    }

    if (age) {
      where.age = Number(age);
    }

    let characters = await Character.findAll({
      where,
    });

    res.status(200).json(
      characters.map((character) => {
        if (name === "true" && hp === "true") {
          const { name, hp } = character.toJSON();
          return {
            name,
            hp,
          };
        }
        return character.toJSON();
      })
    );
  } catch {}
});

router.get("/young", async (req, res) => {
  try {
    const characters = await Character.findAll({
      where: {
        age: {
          [Op.lt]: 25,
        },
      },
    });

    res.status(200).json(
      characters.map((character) => {
        return character.toJSON();
      })
    );
  } catch {}
});

router.get("/:code", async (req, res) => {
  const { code } = req.params;
  try {
    const character = await Character.findByPk(code);
    res.status(200).json(character.toJSON());
  } catch (err) {
    return res
      .status(404)
      .send(`El código ${code} no corresponde a un personaje existente`);
  }
});

router.put("/age", async (req, res) => {
  const { value } = req.query;

  try {
    await Character.update({ age: value }, { where: { age: null } });

    res.status(200).send("Personajes actualizados");
  } catch {}
});

router.put("/addAbilities", async (req, res) => {
  const { codeCharacter, abilities } = req.body;

  try {
    const character = await Character.findByPk(codeCharacter);

    for (let ability of abilities) {
      const [{ id }] = await Ability.findOrCreate({
        where: { name: ability.name, mana_cost: ability.mana_cost },
        defaults: { name: ability.name, mana_cost: ability.mana_cost },
      });

      await character.addAbility(id);
    }

    res.status(200).send("Habilidades agregadas");
  } catch {}
});

router.get('/roles/:code', async (req, res) =>{
  const { code } = req.params;
  const character = await Character.findByPk(code, { include: Role})
  res.json(character)
})

module.exports = router;
