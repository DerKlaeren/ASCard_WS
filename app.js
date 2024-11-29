const express = require('express');
const app = express();
const port = 3000;


















// Logger
const winston = require('winston');
require('winston-daily-rotate-file');

const fileRotateCombinedTransport = new winston.transports.DailyRotateFile({
  filename: './log/combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

const fileRotateErrorTransport = new winston.transports.DailyRotateFile({
  filename: './log/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

const { createLogger, format, transports } = require("winston");
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.align(),
		format.splat(),
        format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    defaultMeta: { service: 'ascard-service' },
    transports: [ fileRotateCombinedTransport, fileRotateErrorTransport ]
});

// Examples for logging

logger.log({
  level: 'info',
  message: 'Pass an object and this works',
  additional: 'properties',
  are: 'passed along'
});

logger.info({
  message: 'Use a helper method if you want',
  additional: 'properties',
  are: 'passed along'
});

logger.log('info', 'Pass a message and this works', {
  additional: 'properties',
  are: 'passed along'
});

logger.info('Use a helper method if you want', {
  additional: 'properties',
  are: 'passed along'
});

logger.log('info', 'test message %s', 'my string');
logger.log('info', 'test message %d', 123);
logger.log('info', 'test message %s, %s', 'first', 'second', { number: 123 });
logger.info('Found %s at %s', 'error', new Date());
logger.info('Found %s at %s', 'error', new Error('chill winston'));
logger.info('Found %s at %s', 'error', /WUT/);
logger.info('Found %s at %s', 'error', true);
logger.info('Found %s at %s', 'error', 100.00);
logger.info('Found %s at %s', 'error', ['1, 2, 3']);

logger.warn(new Error('Error passed as info'));
logger.log('error', new Error('Error passed as message'));

logger.warn('Maybe important error: ', new Error('Error passed as meta'));
logger.log('error', 'Important error: ', new Error('Error passed as meta'));

logger.error(new Error('Error as info'));






// routes
const bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");


app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/games", require("./routes/games"));





















// DB

require('dotenv').config()

const {
  DB_HOST = 'host',
  DB_USER = 'user',
  DB_PASSWORD = 'password',
  DATABASE = 'db'
} = process.env

logger.info(DATABASE);

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


















// Swagger
// https://blog.logrocket.com/documenting-express-js-api-swagger/

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "ASCard Web API",
      version: "0.1.0",
      description:
        "Access game data from ASCard games",
      license: {
        name: "Apache 2.0",
        url: "https://spdx.org/licenses/Apache-2.0.html",
      },
      contact: {
        name: "ASCard.net",
        url: "https://www.ascard.net",
        email: "info@ascard.net",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);







app.listen(port, () => {
  console.log(`Web service listening at http://localhost:${port}`);
});