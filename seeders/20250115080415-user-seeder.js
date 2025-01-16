'use strict';
// import bcrypt
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id_karyawan: 1, 
        password: bcrypt.hashSync('password',8),
        role: 'admin',
        email: 'kodok@gmail.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id_karyawan: 2, 
        password: bcrypt.hashSync('password',8),
        role: 'user',
        email: 'budi@gmail.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
