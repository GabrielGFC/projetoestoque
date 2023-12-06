const validateLogin = (req, res, next) => {
  const { matricula, senha } = req.body;

  if (!matricula || !senha) {
    return res.status(400).json({ message: 'Matrícula e senha são obrigatórias' });
  }

  next();
};

module.exports = validateLogin;
