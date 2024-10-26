'use strict';

module.exports =  {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      nombres: {
        type: Sequelize.STRING,
      },
      apellidos: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      correo: {
        type: Sequelize.STRING,
      },
      rol_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'roles', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT', 
      },
      cargo_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'cargos', 
          key: 'id', 
        },
        onUpdate: 'CASCADE', 
        onDelete: 'RESTRICT',
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
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};
