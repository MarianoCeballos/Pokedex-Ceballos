/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Brunesaur',
  image: 'https://assets.pokemon.com/static2/_ui/img/og-default-image.jpeg',
  attack: 55,
  defense: 40,
  hp: 35,
  speed: 90,
  height: 4,
  weight: 6,
  type: [1, 2],
};
const pokePost = {
  name: 'Christazaur',
  image: 'https://assets.pokemon.com/static2/_ui/img/og-default-image.jpeg',
  attack: 55,
  defense: 40,
  hp: 35,
  speed: 90,
  height: 4,
  weight: 6,
  type: [1, 2],
};

describe('Pokemon routes', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );
  describe('GET /pokemons', () => {
    it('should get 200', () => agent.get('/pokemons').expect(200));
  });
  describe('GET /types', () => {
    it('should get 200', () => agent.get('/types').expect(200));
  });
  describe('GET /pokemons/:idOrName', () => {
    it('should get 200 if id is passed', () =>
      agent.get('/pokemons/1').expect(200));
    it('should get 200 if name is passed', () =>
      agent.get('/pokemons/pikachu').expect(200));
    it("should get 404 if id or name doesn't exist", () =>
      agent
        .get('/pokemons/rodolfo')
        .expect({ message: 'Pokemon not found' })
        .expect(404));
    it('should return CORRECT properties if id or name is passed', () =>
      agent.get('/pokemons/1').expect({
        id: 'A-1',
        name: 'bulbasaur',
        hp: 45,
        attack: 49,
        defense: 49,
        speed: 65,
        height: 7,
        weight: 69,
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
        types: [
          {
            id: 1,
            name: 'grass',
          },
          {
            id: 2,
            name: 'poison',
          },
        ],
      }));
  });

  describe("post '/pokemons'", () => {
    it('should get 201', () =>
      agent.post('/pokemons').send(pokePost).expect(201));
  });
});
