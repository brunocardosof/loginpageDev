const bcrypt = require('bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Usuario',[{
      nome: 'admin',
      email: 'admin@admin.com.br',
      telefone: '51999999999',
      password: bcrypt.hashSync('123456', 8),
      is_social_user: 0,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Usuario', null, {});
  }
};
