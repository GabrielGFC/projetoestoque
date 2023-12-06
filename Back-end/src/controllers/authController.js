const users = require('../database/db');
const User = require('../models/userModel');

const loginUser = (req, res) => {
  const { matricula, senha } = req.body;

  // Verifica se o usuário existe
  const user = users.find(u => u.matricula === matricula && u.senha === senha);

  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  // Redireciona com base no tipo de usuário
  if (user.tipo === 'Aluno') {
    return res.json({ message: 'Login bem-sucedido como Aluno' });
  } else if (user.tipo === 'Colaborador') {
    return res.json({ message: 'Login bem-sucedido como Colaborador' });
  }
};

module.exports = { loginUser };
