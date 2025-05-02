const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

module.exports = router;