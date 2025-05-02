const withAuth = (req, res, next) => {
  // Check if user is logged in
  if (!req.session.user_id) {
    return res.status(401).json({ 
      error: 'Unauthorized',
      message: 'You must be logged in to access this resource' 
    });
  }
  
  next();
};

module.exports = withAuth;