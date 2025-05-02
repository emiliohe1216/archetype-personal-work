const router = require('express').Router();
const pokemonRoutes = require('./pokemonRoutes');
const authRoutes = require('./authRoutes');

router.use('/pokemon', pokemonRoutes);
router.use('/auth', authRoutes);

module.exports = router;