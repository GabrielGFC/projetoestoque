const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');
const itemRoutes = require('./routes/itemRoutes')
const sequelize = require('./config/database');
const cargoRoutes = require('./routes/cargoRoutes');
const caixaRoutes = require('./routes/caixaRoutes');
const familiaRoutes = require('./routes/familiaRoutes.js');
const pedidoRoutes = require('./routes/pedidoRoutes.js')
const isAuthenticated = require('./middlewares/authenticationMiddleware')
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const registrosIniciais = require('./middlewares/registrosIniciais.js');


const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(express.json());
app.use(session({ secret: 'your-secret-key',
resave: false,
saveUninitialized: false }));

app.use('/auth',  authRoutes);
app.use('/user', userRoutes);
app.use('/estoque', estoqueRoutes);
app.use('/item', itemRoutes);
app.use('/caixa', caixaRoutes);
app.use('/cargo', cargoRoutes);
app.use('/familia',familiaRoutes)
app.use('/pedido', pedidoRoutes)

sequelize
  .sync()
  .then(async() => {

    await registrosIniciais();

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });