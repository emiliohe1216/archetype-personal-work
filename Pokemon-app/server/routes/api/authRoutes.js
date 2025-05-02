const router = require('express').Router();
const { User } = require('../../models');

// POST /api/auth/register - Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Username, email, and password are required',
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email }
    });
    
    if (existingUser) {
      return res.status(409).json({
        error: 'Conflict',
        message: 'Email already registered',
      });
    }
    
    // Create new user
    const user = await User.create({
      username,
      email,
      password,
    });
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: 'Validation Error',
        message: error.errors.map(err => err.message).join(', '),
      });
    }
    
    res.status(500).json({
      error: 'Server Error',
      message: 'An error occurred during registration',
    });
  }
});

// POST /api/auth/login - Login a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({
        error: 'Authentication Failed',
        message: 'Invalid email or password',
      });
    }
    
    const validPassword = await user.validatePassword(password);
    
    if (!validPassword) {
      return res.status(401).json({
        error: 'Authentication Failed',
        message: 'Invalid email or password',
      });
    }
    
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      
      res.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        message: 'Login successful',
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Server Error',
      message: 'An error occurred during login',
    });
  }
});

// POST /api/auth/logout - Logout a user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.json({ 
        success: true,
        message: 'Logout successful' 
      });
    });
  } else {
    res.status(404).json({
      error: 'Not Found',
      message: 'No active session found',
    });
  }
});

// GET /api/auth/status - Check authentication status
router.get('/status', (req, res) => {
  if (req.session.logged_in) {
    res.json({
      success: true,
      logged_in: true,
      user_id: req.session.user_id,
    });
  } else {
    res.json({
      success: true,
      logged_in: false,
    });
  }
});

module.exports = router;