const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    region: DataTypes.STRING,
    address: DataTypes.STRING,
    phone1: DataTypes.INTEGER,
    phone2: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    occupation: DataTypes.STRING,
    specialty: DataTypes.STRING,
    profilePicturePath: DataTypes.TEXT,
    profilePicturePath: Sequelize.TEXT,
    cvPath: Sequelize.TEXT,
}, {
    tableName: 'EMPLOYEE',
    timestamps: false
});

module.exports = { Employee };