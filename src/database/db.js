const mysql = require('mysql2'); 

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tiradentes',
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log(`Conectado ao banco de dados MySQL: ${db.config.database}`);
  }
});

module.exports = db;
