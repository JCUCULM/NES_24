'use strict';

module.exports =  {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        nombre: 'Administrador',
        descripcion: 'Graficas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Gerente',
        descripcion: 'Gestion de tareas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Empleado',
        descripcion: 'Hacer tareas',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
