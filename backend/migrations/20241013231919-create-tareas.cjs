'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tareas', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      proyecto_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'proyectos',
          key: 'id',
        },
      },
      area_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'areas',
          key: 'id',
        },
      },
      nombre: {
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
      prueba_doc: {
        type: Sequelize.STRING,
      },
      visto_bueno: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('tareas');
  },
};
