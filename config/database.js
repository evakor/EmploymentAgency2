const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres' // or another supported database
});

module.exports = sequelize;