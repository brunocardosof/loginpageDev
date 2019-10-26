const bcrypt = require('bcryptjs')
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users',[{
      nome: 'admin',
      email: 'admin@admin.com.br',
      password_hash: bcrypt.hashSync('123123',8),
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
