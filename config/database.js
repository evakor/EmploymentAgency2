const { Pool } = require('pg');

const database = new Pool({
    user: "postgres",
    host: 'postgres',
    database: 'employment-agency',
    password: "admin2002",
    port: 5432,
   })

module.exports = database;