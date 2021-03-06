'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Usuario', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: true
      },
      foto: {
        type: Sequelize.STRING,
        allowNull: true
      },
      is_social_user: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Usuario')
  }
};
