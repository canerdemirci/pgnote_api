require('dotenv').config();

const Pool = require('pg').Pool;

const pool = new Pool({
    host: process.env.DEVOLEPMENT ? process.env.DEV_DB_HOST : process.env.DB_HOST,
    user: process.env.DEVOLEPMENT ? process.env.DEV_DB_USER : process.env.DB_USER,
    password: process.env.DEVOLEPMENT ? process.env.DEV_DB_PASSWORD : process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DEVOLEPMENT ? process.env.DEV_DB_NAME : process.env.DB_NAME
});

module.exports = pool;