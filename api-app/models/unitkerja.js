'use strict';
const {
  Model, DataTypes
} = require('sequelize');
  const sequelize = require('../config/database')
  class UnitKerja extends Model {
    static associate(models) {
      UnitKerja.hasMany(models.Pegawai, {
        foreignKey: 'unitKerjaId',
        as: 'pegawai'
      })
    }
  }
  UnitKerja.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UnitKerja',
  });

module.exports = UnitKerja 
