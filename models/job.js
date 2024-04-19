const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Job = sequelize.define('Job', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    imagePath: DataTypes.TEXT,
    description: DataTypes.TEXT,
    title: DataTypes.TEXT,
    extendedDescr: DataTypes.TEXT,
    creationDate: DataTypes.DATE,
    companyName: DataTypes.TEXT,
    occupation: DataTypes.TEXT,
    specialty: DataTypes.TEXT,
}, { 
    tableName: 'JOB',
    timestamps: false 
});

module.exports = { Job };