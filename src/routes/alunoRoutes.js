const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Aluno = require('../models/aluno');
const db = require('../database/db');


// Rota para criar um aluno
router.post('/', (req, res) => {
  const { nome, matricula, periodo, armario, senha } = req.body;

  // cripto senha usando Bcrypt
  const saltRounds = 10; // Número de salt rounds para aumentar a segurança
  bcrypt.hash(senha, saltRounds, (err, hash) => {
    if (err) {
      console.error('Erro ao criar aluno:', err);
      res.status(500).json({ error: 'Erro ao criar aluno' });
    } else {
      const insertQuery = `INSERT INTO aluno (nome, matricula, periodo, armario, senha) VALUES (?, ?, ?, ?, ?)`;

      db.query(insertQuery, [nome, matricula, periodo, armario, hash], (err, result) => {
        if (err) {
          console.error('Erro ao criar aluno:', err);
          res.status(500).json({ error: 'Erro ao criar aluno' });
        } else {
          const alunoId = result.insertId;
          res.status(201).json({ id: alunoId, message: 'Aluno criado com sucesso' });
        }
      });
    }
  });
});

// Rota para obter todos os alunos
router.get('/', (req, res) => {
  const selectQuery = 'SELECT * FROM aluno';

  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Erro ao obter alunos:', err);
      res.status(500).json({ error: 'Erro ao obter alunos' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Rota para obter um aluno por ID
router.get('/:id', (req, res) => {
  const alunoId = req.params.id; // Obtém o ID do aluno a ser obtido

  const selectQuery = 'SELECT * FROM aluno WHERE id = ?';

  db.query(selectQuery, [alunoId], (err, results) => {
    if (err) {
      console.error('Erro ao obter aluno:', err);
      res.status(500).json({ error: 'Erro ao obter aluno' });
    } else if (results.length === 0) {
      // Se nenhum registro foi encontrado, significa que o aluno com o ID especificado não existe
      res.status(404).json({ error: 'Aluno não encontrado' });
    } else {
      res.status(200).json(results[0]); // Retorna o primeiro resultado (deve ser o único, pois estamos buscando por apenas um ID)
    }
  });
});

// Rota para atualizar um aluno por ID
router.put('/:id', (req, res) => {
  const alunoId = req.params.id; // Obtém o ID do aluno a ser atualizado
  const { nome, matricula, periodo, armario, senha } = req.body;

  const updateQuery = `UPDATE aluno SET nome=?, matricula=?, periodo=?, armario=?, senha=? WHERE id=?`;

  db.query(updateQuery, [nome, matricula, periodo, armario, senha, alunoId], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar aluno:', err);
      res.status(500).json({ error: 'Erro ao atualizar aluno' });
    } else if (result.affectedRows === 0) {
      // Se nenhum registro foi afetado, significa que o aluno com o ID especificado não foi encontrado
      res.status(404).json({ error: 'Aluno não encontrado' });
    } else {
      res.status(200).json({ id: alunoId, message: 'Aluno atualizado com sucesso' });
    }
  });
});

// Rota para excluir um aluno por ID
router.delete('/:id', (req, res) => {
  const alunoId = req.params.id; // Obtém o ID do aluno a ser excluído

  const deleteQuery = 'DELETE FROM aluno WHERE id = ?';

  db.query(deleteQuery, [alunoId], (err, result) => {
    if (err) {
      console.error('Erro ao excluir aluno:', err);
      res.status(500).json({ error: 'Erro ao excluir aluno' });
    } else if (result.affectedRows === 0) {
      // Se nenhum registro foi afetado, significa que o aluno com o ID especificado não foi encontrado
      res.status(404).json({ error: 'Aluno não encontrado' });
    } else {
      res.status(200).json({ id: alunoId, message: 'Aluno excluído com sucesso' });
    }
  });
});

module.exports = router;