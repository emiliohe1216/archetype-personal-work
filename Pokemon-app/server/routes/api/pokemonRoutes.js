const router = require('express').Router();
const pokemonController = require('../../controllers/pokemonController');
const withAuth = require('../../middleware/auth');
const validatePokemon = require('../../middleware/validatePokemon');

// All routes are protected by authentication middleware
router.use(withAuth);

// GET /api/pokemons - Get all pokemons for the authenticated user
router.get('/', pokemonController.getUserPokemons);

// GET /api/pokemons/stats - Get pokemon statistics
router.get('/stats', pokemonController.getPokemonStats);

// GET /api/pokemons/:id - Get a specific pokemon
router.get('/:id', pokemonController.getPokemonById);

// POST /api/pokemons - Create a new pokemon
router.post('/', validatePokemon, pokemonController.createPokemon);

// PUT /api/pokemons/:id - Update a pokemon
router.put('/:id', validatePokemon, pokemonController.updatePokemon);

// DELETE /api/pokemons/:id - Delete a pokemon
router.delete('/:id', pokemonController.deletePokemon);

module.exports = router;