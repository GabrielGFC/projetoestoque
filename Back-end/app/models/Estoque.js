const {Sequelize, DataTypes, INTEGER, STRING } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Caixa = require('./Caixa');
const Estoque = sequelize.define('Estoque', {

     idEstoque:{
         type: DataTypes.INTEGER,
         allowNull: false,
         autoIncrement:true,
         primaryKey: true
        },

    },
    {hooks: {
    //     beforeCreate: (estoque, options) => {
    //         // Define a dataEntrada como a data e hora atuais no momento do CREATE
    //         estoque.dataEntrada = new Date();
    //         estoque.dataMovimentacao = new Date()
    //     },

        beforeUpdate: (estoque, options) => {
            // Define a dataMovimentacao como a data e hora atuais no momento do UPDATE
            estoque.dataSaida = new Date();
        }
        }
})

Estoque.belongsTo(Caixa,{
    foreignKey: 'idCaixa'
})

Estoque.belongsTo(User,{
    foreignKey: 'matricula'
})

// Os comentários listados podem ser utilizados futuramente

module.exports = Estoque;