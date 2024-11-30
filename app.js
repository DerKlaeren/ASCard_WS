/**
 * ASCard Webservice
 * Main
 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const { logger } = require('./logger.js');
const { specs } = require('./swagger.js');

logger.info('Starting up ASCard Webservice...');

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
app.use(bodyParser.urlencoded({ extended: true, }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => { res.send('ASCard WS - Check https://ws.ascard.net/api-docs'); });
app.use("/games", require("./routes/games"));




















// DB
require('dotenv').config()

const {
  DB_HOST = 'host',
  DB_USER = 'user',
  DB_PASSWORD = 'password',
  DATABASE = 'db'
} = process.env

logger.info('Connected to database: %s', DATABASE);

const mariadb = require("mariadb");

// Main function
async function main() {
  let conn;

  try {
    conn = await mariadb.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DATABASE
    });

    // Use Connection to get contacts data
    var rows = await get_contacts(conn);

    //Print list of contacts
    for (i = 0, len = rows.length; i < len; i++) {
      console.log('selected');
      console.log(`${rows[i].gameid} ${rows[i].gameid} <${rows[i].gameid}>`);
    }
  } catch (err) {
    // Manage Errors
    console.log(err);
  } finally {
    // Close Connection
    if (conn) conn.close();
  }
}

//Get list of contacts
function get_contacts(conn) {
  return conn.query("SELECT gameid FROM ascard.asc_game");
}


























app.listen(port, () => {
  logger.info(`Web service listening at http://localhost:${port}`);
});