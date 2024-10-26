'use strict';

module.exports =  {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('areas', [
      {
        nombre: 'Análisis',
        descripcion: 'Análisis',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Diseño',
        descripcion: 'Diseño',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Base de datos',
        descripcion: 'Base de datos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Desarrollo',
        descripcion: 'Desarrollo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Pruebas (QA)',
        descripcion: 'Pruebas QA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Otro',
        descripcion: 'Otro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('areas', null, {});
  }
};
