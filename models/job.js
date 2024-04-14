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
    title: DataTypes.STRING,
    extendedDescr: DataTypes.TEXT,
    creationDate: DataTypes.DATE,
    companyName: DataTypes.TEXT,
    occupation: DataTypes.STRING,
    specialty: DataTypes.STRING,
}, { 
    tableName: 'JOB',
    timestamps: false 
});

module.exports = { Job };