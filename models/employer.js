const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Employer = sequelize.define('Employer', {
    id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    region: Sequelize.STRING,
    address: Sequelize.STRING,
    phone1: Sequelize.INTEGER,
    phone2: Sequelize.INTEGER,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    companyName: Sequelize.TEXT,
    companyDesc: Sequelize.TEXT,
    profilePicturePath: Sequelize.TEXT,
}, {
    tableName: 'EMPLOYER',
    timestamps: false
});

module.exports = { Employer };