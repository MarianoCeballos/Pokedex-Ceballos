const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', require('./Pokemons'));
router.use('/types', require('./Types'));
router.get('/', (req, res) => {
  res.send('Hola');
});

module.exports = router;
