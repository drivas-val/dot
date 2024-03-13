"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("categories", [
      {
        name: "Horizon",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sample Space 01",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sample Space 02",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sample Space 03",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sample Space 04",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("categories", {}, null);
  },
};
