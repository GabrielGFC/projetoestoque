const { Sequelize, DataTypes, STRING, INTEGER } = require('sequelize');
const sequelize = require('../config/database');
const Cargo = require('./Cargo');

const User = sequelize.define('User', {
    matricula: {
        type: INTEGER(7),
        allowNull: false,
        unique: true,
        primaryKey: true,
        validate: {
            isSevenDigits(value) {
                if (value.toString().length !== 7) {
                    throw new Error('Matrícula deve ter 7 dígitos');
                }
            },
        },
    },
    senha: {
        type: STRING(128),
        allowNull: false,
        validate: { len: [1, 128] },
    },
    email: {
        type: STRING(128),
        allowNull: false,
        validate: { len: [1, 128] },
    },
    box: {
        type: INTEGER(128),
        allowNull: true,
        validate: {
            isTwoDigits(value) {
                if (value.toString().length >128) {
                    throw new Error('Período deve ter no máximo 4 dígitos');
                }
            },
        },
    },
    nome: {
        type: STRING(128),
        allowNull: false,
        validate: { len: [1, 128] },
        },
    periodo: {
        type: INTEGER(2),
        allowNull: false,
        validate: {
            isTwoDigits(value) {
                if (value.toString().length > 2) {
                    throw new Error('Período deve ter no máximo 2 dígitos');
                }
            },
        },
    },
});

User.belongsTo(Cargo, {
    constraints: true,
    foreignKey: 'idCargo',
});

module.exports = User;