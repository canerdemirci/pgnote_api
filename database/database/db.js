require('dotenv').config();

const Pool = require('pg').Pool;

const pool;

if (process.env.DATABASE_URL) {
    pool = new Pool({
        ssl: true,
        connectionString: process.env.DATABASE_URL
    });
} else {
    pool = new Pool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME
    });
}

module.exports = pool;