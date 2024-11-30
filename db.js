// Use the MariaDB Node.js Connector
var mariadb = require('mariadb');

require('dotenv').config()
const {
    DB_HOST = 'host',
    DB_USER = 'user',
    DB_PASSWORD = 'password',
    DATABASE = 'db'
} = process.env

// Create a connection pool
var pool =
    mariadb.createPool({
        host: DB_HOST,
        port: 3306,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DATABASE
    });

// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
    pool: pool
});