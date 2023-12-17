// verificando se está autenticado
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next()
  }
  else {return res.status(401).json({ message: 'Unauthorized' });}
};

module.exports = isAuthenticated