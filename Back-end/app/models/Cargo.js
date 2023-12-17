const { Sequelize, DataTypes, STRING, NUMBER } = require('sequelize');
const sequelize = require('../config/database');
const Item = require('./Item');
const Familia = require('./Familia');

const Cargo = sequelize.define('cargo', {

    idCargo:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey: true},
    
    cargo: {
        type: STRING(11),
        allowNull: false,
        unique: true,
    }
});


module.exports = Cargo;
