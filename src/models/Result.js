const Sequelize = require('sequelize');
const sequelize = require('../connection');

module.exports = sequelize.define("results", {
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