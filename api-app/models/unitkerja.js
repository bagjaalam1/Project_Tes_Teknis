'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
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
  return UnitKerja;
};