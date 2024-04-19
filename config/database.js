const { Pool } = require('pg');
const fs = require('fs');

const database = new Pool({
    user: "postgres",
    host: '0.0.0.0',
    database: 'postgres',
    password: "admin2002",
    port: 5433,
   })

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

async function initializeDatabase() {
    try {
        const sqlFile = await readSQLFile('schema.sql');

        const sqlCommands = sqlFile.split(';').map(command => command.trim()).filter(Boolean);

        await runSQLCommands(sqlCommands);

        console.log('Database initialized successfully.');
    } catch (err) {
        console.error('Error initializing database:', err);
    } finally {
        await database.end();
    }
}

initializeDatabase();

module.exports = database;