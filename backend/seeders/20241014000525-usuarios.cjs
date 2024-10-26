'use strict';

const bcrypt = require('bcrypt');

module.exports =  {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      {
        id: 1,
        nombres: 'Administrador',
        apellidos: 'Pérez',
        password: await bcrypt.hash('password123', 10),
        correo: 'admin@example.com',
        rol_id: 1, 
        cargo_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
