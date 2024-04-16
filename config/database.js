const { Pool } = require('pg');

const database = new Pool({
    user: "username",
    host: 'localhost',
    database: 'books',
    password: "password",
    port: 5432,
   })

module.exports = database;