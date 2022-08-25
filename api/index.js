const server = require('./src/app.js');
const { Pokemon, Type } = require('./src/db');
const {
  getPokemonsApi,

  getPokemonsTypes,
} = require('./src/controllers/controller.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT, async () => {
    const pokemons = await Pokemon.findAll();
    const types = await Type.findAll();
    if (types.length) {
      console.log('Types table already filled');
    } else {
      await getPokemonsTypes();
    }
    if (pokemons.length) {
      console.log('Pokemons table already filled');
    } else {
      await getPokemonsApi();
    }
    console.log(`%s listening at ${process.env.PORT}`);
  });
});
