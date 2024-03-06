"use strict";

const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert(
    //   "Categories",
    //   [
    //     {
    //       name: "Chocolates",
    //       status: 1,
    //     },
    //     {
    //       name: "Cookies",
    //       status: 0,
    //     },
    //     {
    //       name: "Cakes",
    //       status: 0,
    //     },
    //     {
    //       name: "Coffee",
    //       status: 1,
    //     },
    //   ],
    //   {}
    // );

    const items = generateFakeItems(150);

    await queryInterface.bulkInsert("Categories", items, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null, {});
  },
};

function generateFakeItems(rowsCount) {
  //generate fake items

  const data = [];

  for (let k = 0; k < rowsCount; k++) {
    const newItems = {
      name: faker.commerce.department(),
      categoryImage: faker.image.image(),
      status: faker.random.arrayElement([1, 0]),
    };
    data.push(newItems);
  }
  return data;
}
