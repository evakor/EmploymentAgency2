const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Submits = sequelize.define('Submits', {
    employerId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true },
    jobId: { 
        type: DataTypes.INTEGER, 
        primaryKey: true },
    creationDate: DataTypes.DATE,
}, { 
    tableName: 'Submits',
    timestamps: false 
});

module.exports = { Submits };