'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const sequelize = require('../config/database')

  class Pegawai extends Model {
    static associate(models) {
      Pegawai.belongsTo(models.UnitKerja, {
        foreignKey: 'unitKerjaId',
        as: 'unitKerja'
      })
    }
  }
  Pegawai.init({
    nip: DataTypes.STRING,
    nama: DataTypes.STRING,
    tempatLahir: DataTypes.STRING,
    alamat: DataTypes.STRING,
    tanggalLahir: DataTypes.DATE,
    jenisKelamin: DataTypes.STRING,
    golongan: DataTypes.STRING,
    eselon: DataTypes.STRING,
    tempatTugas: DataTypes.STRING,
    agama: DataTypes.STRING,
    unitKerjaId: DataTypes.INTEGER,
    noHp: DataTypes.STRING,
    npwp: DataTypes.STRING,
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pegawai',
  });

  module.exports = Pegawai