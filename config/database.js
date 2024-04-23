require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');

//TODO Get credentials from .env file
const database = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function readSQLFile(filePath) {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        return data;
    } catch (err) {
        throw err;
    }
}

async function runSQLCommands(sqlCommands) {
    const client = await database.connect();
    try {
        await client.query('BEGIN');

        for (const sqlCommand of sqlCommands) {
            await client.query(sqlCommand);
        }

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

async function deleteDummyEntries() {
    let deleteQuery = `DELETE FROM "Applies" WHERE EXTRACT(YEAR FROM "applicationDate") = 2023`;
    await database.query(deleteQuery);
    deleteQuery = `DELETE FROM "Submits" WHERE EXTRACT(YEAR FROM "creationDate") = 2023`;
    await database.query(deleteQuery);
    deleteQuery = `DELETE FROM "JOB" WHERE "title" LIKE '%DUMMY%'`;
    await database.query(deleteQuery);
    deleteQuery = `DELETE FROM "EMPLOYER" WHERE "firstName" LIKE '%DUMMY%'`;
    await database.query(deleteQuery);
    deleteQuery = `DELETE FROM "EMPLOYEE" WHERE "firstName" LIKE '%DUMMY%'`;
    await database.query(deleteQuery);
    console.log('Dummy entries deleted successfully.');
}

async function initializeDatabase(fillWithDummyData) {
    try {
        const sqlFile = await readSQLFile('schema.sql');

        const sqlCommands = sqlFile.split(';').map(command => command.trim()).filter(Boolean);

        await runSQLCommands(sqlCommands);

        console.log('Database initialized successfully.');

        if (fillWithDummyData === true){
            await deleteDummyEntries();

            const sqlFile = await readSQLFile('dummyData.sql');

            const sqlCommands = sqlFile.split(';').map(command => command.trim()).filter(Boolean);
    
            await runSQLCommands(sqlCommands);
    
            console.log('Database filled with dummy data successfully.');
        }
        
    } catch (err) {
        console.error('Error initializing database:', err);
    }
}

initializeDatabase(true);

module.exports = database;