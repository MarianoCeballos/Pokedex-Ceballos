const { Router } = require('express');
const { Pokemon, Type } = require('../db.js');
const { getPokemonsTypes } = require('../controllers/controller.js');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const type = await getPokemonsTypes();

    res.json(type);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
