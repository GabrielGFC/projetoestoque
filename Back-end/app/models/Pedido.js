const {Sequelize, DataTypes, INTEGER, STRING, BOOLEAN } = require('sequelize');
const sequelize = require('../config/database');
const Caixa = require('./Caixa');
const User = require('./User');

const Pedido =sequelize.define('Pedido', {
 
    idPedido:{
        type: INTEGER(3),
        allowNull:false,
        unique : true,
        primaryKey: true,
        autoIncrement: true
        },

    aprovacao:{
        type: BOOLEAN,
        allowNull:false,
        },
                
})


Pedido.belongsTo(Caixa,{
    constraints: true,
    foreignKey: 'idCaixa'
})

Pedido.belongsTo(User,{
    constraints: true,
    foreignKey: 'matricula'
})

module.exports = Pedido;