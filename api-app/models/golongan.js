'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Golongan extends Model {
    static associate(models) {
      Golongan.hasMany(models.Pegawai, {
        foreignKey: 'golonganId',
        as: 'pegawai'
      })
    }
  }
  Golongan.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Golongan',
  });
  return Golongan;
};