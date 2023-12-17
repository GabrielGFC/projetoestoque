const { Sequelize, DataTypes, STRING, INTEGER } = require('sequelize');
const sequelize = require('../config/database');

const Item = sequelize.define('Item', {
    idItem: {
        type: INTEGER(3),
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },
    
    nome: {
        type: STRING(128),
        allowNull: false,
        validate: { len: [1, 128] },
    },

    quantidade: {
        type: INTEGER(3),
        allowNull: false,
        validate: {
            isThreeDigits(value) {
                if (value.toString().length > 3) {
                    throw new Error('A quantidade deve ter no máximo 3 dígitos');
                }
            },
        },
    },
    descricao: {
        type: STRING(500),
        allowNull: false,
        validate: { len: [1, 500] },
    },
});

module.exports = Item;