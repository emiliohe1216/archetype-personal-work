const validatePokemon = (req, res, next) => {
  const { title, status, priority } = req.body;
  
  // Title validation (required for creation, optional for updates)
  if (req.method === 'POST' && !title) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Title is required',
    });
  }
  
  if (title && typeof title !== 'string') {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Title must be a string',
    });
  }
  
  if (title && (title.length < 1 || title.length > 100)) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Title must be between 1 and 100 characters',
    });
  }
  
  // Status validation
  const validStatuses = ['pending', 'in_progress', 'completed'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({
      error: 'Validation Error',
      message: `Status must be one of: ${validStatuses.join(', ')}`,
    });
  }
  
  // Priority validation
  const validPriorities = ['low', 'medium', 'high'];
  if (priority && !validPriorities.includes(priority)) {
    return res.status(400).json({
      error: 'Validation Error',
      message: `Priority must be one of: ${validPriorities.join(', ')}`,
    });
  }
  
  // Due date validation
  if (req.body.due_date) {
    const dueDate = new Date(req.body.due_date);
    if (isNaN(dueDate.getTime())) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Invalid due date format',
      });
    }
  }
  
  next();
};

module.exports = validatePokemon;