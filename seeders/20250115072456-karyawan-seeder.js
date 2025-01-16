'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('karyawan', [
      {
        nama: 'John Doe',
        alamat: 'Jl. Raya No. 1',
        no_telp: '081234567890',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nama: 'Jane Smith',
        alamat: 'Jl. Merdeka No. 10',
        no_telp: '082345678901',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('karyawan', null, {});
  }
};
