"use strict";

const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const items = generateFakeItems(100);

    await queryInterface.bulkInsert("Products", items, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {});
  },
};

function generateFakeItems(rowsCount) {
  //generate code for fake data

  const data = [];

  for (let k = 0; k < rowsCount; k++) {
    const newItems = {
      name: faker.commerce.productName(),
      description: `This is product ${k + 1}.`,
      amount: faker.commerce.price(),
      status: faker.random.arrayElement(["active", "inactive"]),
    };
    data.push(newItems);
  }
  return data;
}
