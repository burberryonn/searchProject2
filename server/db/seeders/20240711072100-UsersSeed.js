'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Users', [
        {
          name: "John Doe",
          email: "ver@test.ru",
          password: "123a",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {});
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Users', null, {});
  }
};
