'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt')
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Users', [
        {
          name: "John Doe",
          email: "ver@test.ru",
          password: await bcrypt.hash('123', 10)
        },
      ],
      {});
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Users', null, {});
  }
};
