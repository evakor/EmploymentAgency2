const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Applies = sequelize.define('Applies', {
    employeeId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true },
    jobId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true },
    applicationDate: DataTypes.DATE,
}, { 
    tableName: 'Applies',
    timestamps: false 
});

module.exports = { Applies };