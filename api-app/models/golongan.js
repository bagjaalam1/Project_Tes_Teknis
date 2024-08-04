'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const sequelize = require('../config/database')
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

  module.exports = Golongan

