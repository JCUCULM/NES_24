'use strict';

module.exports =  {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cargos', [
      {
        nombre: 'Analista',
        descripcion: 'Análisis',
        area_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Admin',
        descripcion: 'Admin',
        area_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cargos', null, {});
  }
};
