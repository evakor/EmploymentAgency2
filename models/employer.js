const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Employer = sequelize.define('Employer', {
    id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    firstName: Sequelize.TEXT,
    lastName: Sequelize.TEXT,
    region: Sequelize.TEXT,
    address: Sequelize.TEXT,
    phone1: Sequelize.INTEGER,
    phone2: Sequelize.INTEGER,
    email: Sequelize.TEXT,
    password: Sequelize.TEXT,
    companyName: Sequelize.TEXT,
    companyDesc: Sequelize.TEXT,
    profilePicturePath: Sequelize.TEXT,
}, {
    tableName: 'EMPLOYER',
    timestamps: false
});

module.exports = { Employer };