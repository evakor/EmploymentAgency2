const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: DataTypes.TEXT,
    lastName: DataTypes.TEXT,
    region: DataTypes.TEXT,
    address: DataTypes.TEXT,
    phone1: DataTypes.INTEGER,
    phone2: DataTypes.INTEGER,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    occupation: DataTypes.TEXT,
    specialty: DataTypes.TEXT,
    profilePicturePath: DataTypes.TEXT,
    profilePicturePath: DataTypes.TEXT,
    cvPath: DataTypes.TEXT,
}, {
    tableName: 'EMPLOYEE',
    timestamps: false
});

module.exports = { Employee };