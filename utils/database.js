const { Sequelize } = require('sequelize');
const pg = require('pg');
const driver = process.env


const sequelize = new Sequelize(`postgres://postgres:${driver.DB_PASSWORD}@${driver.DB_HOST}:${driver.DB_PORT}/postgres`, {
    define: {
        freezeTableName: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectModule : pg
})

module.exports = {
    sequelize
}
