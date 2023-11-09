const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// Configurar o body-parser para analisar solicitações JSON
app.use(bodyParser.json());

// Rotas aqui
const alunoRoutes = require('./src/routes/alunoRoutes');
const colaboradorRoutes = require('./src/routes/colaboradorRoutes');

app.use('/alunos', alunoRoutes);
app.use('/colaboradores', colaboradorRoutes);


// Rota test
app.get('/', (req, res) => {
  res.send('Test msg!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
});
