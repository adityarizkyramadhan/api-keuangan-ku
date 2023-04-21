const { Sequelize } = require('sequelize');

const dotenv = require('dotenv');
const driver = process.env

var opts = {
    define: {
        freezeTableName: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

const sequelize = new Sequelize(`postgres://postgres:${driver.DB_PASSWORD}@${driver.DB_HOST}:${driver.DB_PORT}/postgres`, opts)

module.exports = {
    sequelize
}
