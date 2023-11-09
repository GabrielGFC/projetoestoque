const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Colaborador = require('../models/colaborador');
const db = require('../database/db');

// Rota para criar um colaborador
router.post('/', (req, res) => {
  const { nome, cpf, senha } = req.body;

  // Criptografe a senha usando Bcrypt
  const saltRounds = 10; // Número de salt rounds para aumentar a segurança
  bcrypt.hash(senha, saltRounds, (err, hash) => {
      if (err) {
          console.error('Erro ao criar colaborador:', err);
          res.status(500).json({ error: 'Erro ao criar colaborador' });
      } else {
          const insertQuery = `INSERT INTO colaborador (nome, cpf, senha) VALUES (?, ?, ?)`;

          db.query(insertQuery, [nome, cpf, hash], (err, result) => {
              if (err) {
                  console.error('Erro ao criar colaborador:', err);
                  res.status(500).json({ error: 'Erro ao criar colaborador' });
              } else {
                  const colaboradorId = result.insertId;
                  res.status(201).json({ id: colaboradorId, message: 'Colaborador criado com sucesso' });
              }
          });
      }
  });
});


  // Rota para obter todos os colaboradores
router.get('/', (req, res) => {
  const selectQuery = 'SELECT * FROM colaborador';

  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Erro ao obter colaboradores:', err);
      res.status(500).json({ error: 'Erro ao obter colaboradores' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Rota para obter um colaborador por ID
router.get('/:id', (req, res) => {
  const colaboradorId = req.params.id; // Obtém o ID do colaborador a ser obtido

  const selectQuery = 'SELECT * FROM colaborador WHERE id = ?';

  db.query(selectQuery, [colaboradorId], (err, results) => {
    if (err) {
      console.error('Erro ao obter colaborador:', err);
      res.status(500).json({ error: 'Erro ao obter colaborador' });
    } else if (results.length === 0) {
      // Se nenhum registro foi encontrado, significa que o colaborador com o ID especificado não existe
      res.status(404).json({ error: 'Colaborador não encontrado' });
    } else {
      res.status(200).json(results[0]); // Retorna o primeiro resultado (deve ser o único, pois estamos buscando por apenas um ID)
    }
  });
});

// Rota para atualizar um colaborador por ID
router.put('/:id', (req, res) => {
  const colaboradorId = req.params.id; // Obtém o ID do colaborador a ser atualizado
  const { nome, cpf, senha } = req.body;

  const updateQuery = `UPDATE colaborador SET nome=?, cpf=?, senha=? WHERE id=?`;

  db.query(updateQuery, [nome, cpf, senha, colaboradorId], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar colaborador:', err);
      res.status(500).json({ error: 'Erro ao atualizar colaborador' });
    } else if (result.affectedRows === 0) {
      // Se nenhum registro foi afetado, significa que o colaborador com o ID especificado não foi encontrado
      res.status(404).json({ error: 'Colaborador não encontrado' });
    } else {
      res.status(200).json({ id: colaboradorId, message: 'Colaborador atualizado com sucesso' });
    }
  });
});

// Rota para deletar um colaborador por ID
router.delete('/:id', (req, res) => {
  const colaboradorId = req.params.id; // Obtém o ID do colaborador a ser excluído

  const deleteQuery = 'DELETE FROM colaborador WHERE id = ?';

  db.query(deleteQuery, [colaboradorId], (err, result) => {
    if (err) {
      console.error('Erro ao excluir colaborador:', err);
      res.status(500).json({ error: 'Erro ao excluir colaborador' });
    } else if (result.affectedRows === 0) {
      // Se nenhum registro foi afetado, significa que o colaborador com o ID especificado não foi encontrado
      res.status(404).json({ error: 'Colaborador não encontrado' });
    } else {
      res.status(200).json({ id: colaboradorId, message: 'Colaborador excluído com sucesso' });
    }
  });
});


module.exports = router;
