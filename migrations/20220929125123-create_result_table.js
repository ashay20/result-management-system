'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("results", {
      rollNo: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    dob: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    marks: {
        type: Sequelize.INTEGER,
    }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("results");
  }
};
