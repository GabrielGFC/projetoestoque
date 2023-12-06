const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
const validateLogin = require('./src/middleware/validateLogin');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Middleware de validação para a rota de login
app.post('/login', validateLogin);

// Rotas de autenticação
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
