"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "RequestHistories",
      [
        {
          userId:1,
          goodRequest:"hi",
          badRequest:"bye",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("RequestHistories", null, {});
  },
};
