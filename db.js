/**
 * ASCard Webservice
 * Database
 */
const { logger } = require('./logger.js');
const mariadb = require("mariadb");

require('dotenv').config()
const {
    DB_HOST = 'host',
    DB_USER = 'user',
    DB_PASSWORD = 'password',
    DATABASE = 'db'
} = process.env

const pool = mariadb.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DATABASE,
    connectionLimit: 100,
});

console.log("Total connections: ", pool.totalConnections());
console.log("Active connections: ", pool.activeConnections());
console.log("Idle connections: ", pool.idleConnections());

async function fetchConn() {
    let conn = await pool.getConnection();
    console.log("Total connections: ", pool.totalConnections());
    console.log("Active connections: ", pool.activeConnections());
    console.log("Idle connections: ", pool.idleConnections());
    return conn;
}

async function get_games() {
    let conn;

    try {
        conn = await fetchConn();
        return await conn.query("SELECT gameid FROM ascard.asc_game");
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) conn.end();
    }
}

module.exports = {
    get_games
}