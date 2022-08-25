const { Router } = require('express');

const {
  createPokemon,
  getAllPokemons,
  deletePokemon,
  modifyPokemon,
  getPokemonByName,
} = require('../controllers/controller');

const router = Router();

router.get('/', async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      let pokemon = await getPokemonByName(name);
      res.json(pokemon);
    } else {
      let pokemon = await getAllPokemons();
      res.json(pokemon);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { search } = req.query;
  try {
    const pokemon = await getPokemonByName(id, search);
    if (pokemon === null) {
      return res
        .status(200)
        .json({ data: pokemon, message: 'Pokemon not found' });
    }
    res.json({ data: pokemon });
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const created = await createPokemon(req.body);
    if (created) {
      res.status(201).json({
        message: `New pokemon created: ${req.body.name.toUpperCase()}`,
        data: created,
      });
    } else {
      res.status(400).send({ message: 'Pokemon already exists' });
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await deletePokemon(id);
  if (deleted === null) {
    return res.status(404).json({ message: 'No pokémon found with id: ' + id });
  }
  res
    .status(200)
    .json({ data: deleted, message: `Pokemon with id ${id} deleted'` });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await modifyPokemon(req.body, id);

    if (updated) res.status(200).send({ message: 'Success', data: updated });
    else res.status(400).send({ message: 'Pokemon already exists' });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
