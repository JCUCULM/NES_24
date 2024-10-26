'use strict';

module.exports =  {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('proyectos', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
      },
      empresa: {
        type: Sequelize.STRING,
      },
      tipo: {
        type: Sequelize.STRING,
      },
      descripcion: {
        type: Sequelize.STRING,
      },
      estado: {
        type: Sequelize.STRING,
      },
      usuario_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'usuarios',
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('proyectos');
  },
};
