'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
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
  return Eselon;
};