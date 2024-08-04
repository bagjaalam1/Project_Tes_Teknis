'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const sequelize = require('../config/database')
  class Eselon extends Model {
    static associate(models) {
      Eselon.hasMany(models.Pegawai, {
        foreignKey: 'golonganId',
        as: 'pegawai'
      })
    }
  }
  Eselon.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Eselon',
  });
  
module.exports = Eselon