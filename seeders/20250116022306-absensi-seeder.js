'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('absensi', [
      {
        nama: 'John Doe',
        role: 'admin',
        jam_absensi: new Date(),
        foto: 'foto_john_doe.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nama: 'Jane Smith',
        role: 'user',
        jam_absensi: new Date(),
        foto: 'foto_jane_smith.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nama: 'Alice Johnson',
        role: 'user',
        jam_absensi: new Date(),
        foto: 'foto_alice_johnson.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nama: 'Bob Brown',
        role: 'admin',
        jam_absensi: new Date(),
        foto: 'foto_bob_brown.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
