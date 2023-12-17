const { Sequelize, DataTypes, STRING, INTEGER } = require('sequelize');
const sequelize = require('../config/database');

const Familia = sequelize.define('Familia', {
    idFamilia: {
        type: INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
    },
    nome: {
        type: STRING(128),
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    descricao: {
        type: STRING(128),
        allowNull: false,
    },
    quantMin: {
        type: STRING(128),
        allowNull: false,
    },
    quantMax: {
        type: STRING(128),
        allowNull: false,
    }
});

module.exports = Familia;