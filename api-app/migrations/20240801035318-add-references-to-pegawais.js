'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addConstraint('Pegawais', {
      fields: ['unitKerjaId'],
      type: 'foreign key',
      name: 'fk_pegawais_unitKerjaId',
      references: {
        table: 'UnitKerjas',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Pegawais', 'fk_pegawais_unitKerjaId')
  }
};
