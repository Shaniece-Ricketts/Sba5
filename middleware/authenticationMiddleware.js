const authenticationMiddleware = (req, res, next) => {

    const isAuthenticated = true;
  
    if (!isAuthenticated) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    next();
  };
  
  module.exports = authenticationMiddleware;
  