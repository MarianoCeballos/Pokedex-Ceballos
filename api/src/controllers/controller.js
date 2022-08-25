const axios = require('axios');
const { Op } = require('sequelize');
const { Pokemon, Type } = require('../db');
const limit = 100;
let offset = 0;

let PokemonModel = {
  //GET_API_POKEMONS------------------------------------------------------
  getPokemonsApi: async function () {
    try {
      for (let i = 0; offset <= 1100; i++) {
        let api = (
          await axios.get(
            `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
          )
        ).data;

        await PokemonModel.insertPokemonsDB(api);
        offset = offset + 100;
      }
    } catch (error) {
      console.error(error)
    }
  },

  //GET_DB_POKEMONS------------------------------------------------------
  insertPokemonsDB: async function (api) {
    api.results.map(async (p) => {
      try {
        const res = (await axios.get(p.url)).data;
        let pokemon = {
          name: res.name,
          hp: res.stats[0].base_stat,
          attack: res.stats[1].base_stat,
          defense: res.stats[2].base_stat,
          speed: res.stats[3].base_stat,
          height: res.height,
          weight: res.weight,
          image: res.sprites.other.dream_world.front_default
            ? res.sprites.other.dream_world.front_default
            : 'https://assets.pokemon.com/static2/_ui/img/og-default-image.jpeg',
          api: true,
        };
        const typesArr = [];
        res.types.map((t) =>
          typesArr.push(parseInt(t.type.url.substring(31).replace('/', '')))
        );
        const poke = await Pokemon.create(pokemon);
        await poke.addTypes(typesArr);
      } catch (error) {
        console.error(error)
      }
    })
     
  },

  //GET_ALL_POKEMONS------------------------------------------------------

  getAllPokemons: async function () {
    try {
      const pokemonDb = await Pokemon.findAll({ include: Type });
      return pokemonDb.sort((a, b) => a.dataValues.id - b.dataValues.id);
    } catch (error) {
      console.error(error)
    }
  },
  //GET_POKEMON_BY_PARAM------------------------------------------------------

  getPokemonByName: async function (name, search) {
    try {
      if (!search) {
        const pokemon = await Pokemon.findOne({
          where: {
            name,
          },
          include: Type,
        });
  
        return pokemon;
      } else {
        const pokemon = await Pokemon.findAll({
          where: {
            name: {
              [Op.iLike]: '%' + name + '%',
            },
          },
          include: Type,
        });
        return pokemon;
      }
    } catch (error) {
      console.error(error)
    }
    
  },

  //--------------------TYPES--------------------

  getPokemonsTypes: async function () {
    try {
      let response = (await axios.get(`https://pokeapi.co/api/v2/type`)).data
      .results;
    let arrayTypes = response.map((type, index) => {
      return {
        id: index + 1,
        name: type.name,
      };
    });

    for (let i = 0; i < arrayTypes.length; i++) {
      await Type.findOrCreate({
        where: arrayTypes[i],
      });
    }
    return arrayTypes;
    } catch (error) {
     console.error(error) 
    }
 
  },

  //CREATE_POKEMON ---------------------
  createPokemon: async function (pokemon) {
    pokemon.image === '' || pokemon.image === null
      ? (pokemon.image =
          'https://assets.pokemon.com/static2/_ui/img/og-default-image.jpeg')
      : pokemon.image;
    const exist = await Pokemon.findOne({
      where: { name: pokemon.name.toLowerCase() },
    });

    if (exist) return undefined;
    try {
      const createdPokemon = await Pokemon.create({
        name: pokemon.name.toLowerCase(),
        image: pokemon.image,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        speed: pokemon.speed,
        height: pokemon.height,
        weight: pokemon.weight,
        api: false,
      });

      await createdPokemon.addType(pokemon.type);
      const result = await Pokemon.findOne({
        where: { name: createdPokemon.name },
        include: Type,
      });

      return result;
    } catch (error) {
      console.error(error)
    }
  },

  deletePokemon: async function (id) {
    try {
      const pokemon = await Pokemon.findByPk(id);
      if (pokemon === null) {
        return null;
      }
      await pokemon.destroy();
      return pokemon;
    } catch (error) {
      return null;
    }
  },

  modifyPokemon: async function (changes, id) {
    changes.image === '' || changes.image === null
      ? (changes.image =
          'https://assets.pokemon.com/static2/_ui/img/og-default-image.jpeg')
      : changes.image;

    try {
      const pokemon = await Pokemon.findByPk(id);
      if (pokemon === null) {
        return null;
      }
      await pokemon.update(changes);
      return pokemon;
    } catch (error) {
      console.error(error)
    }
  },
};

module.exports = PokemonModel;
