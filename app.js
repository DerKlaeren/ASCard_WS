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

var homepage = '';
homepage = homepage + '<html>';
homepage = homepage + '    <body>';
homepage = homepage + '        <h1>ASCard WS</h1>';
homepage = homepage + '        <ul>';
homepage = homepage + '            <li><a href="https://www.ascard.net/app/login.php" target="_BLANK">ASCard-App</a></li>';
homepage = homepage + '            <li><a href="https://ws.ascard.net/api-docs" target="_BLANK">api-docs</a></li>';
homepage = homepage + '            <li><a href="https://ws.ascard.net/log/consolelog.txt" target="_BLANK">consolelog.txt</a> (synched every 2 minutes, passenger.log)</li>';
homepage = homepage + '        </ul>';
homepage = homepage + '    </body>';
homepage = homepage + '</html>';
homepage = homepage + '';

// Routes
app.get('/', (req, res) => { res.send(homepage); });
app.use("/games", require("./routes/games"));

app.listen(port, () => { logger.info(`Web service listening at http://localhost:${port}`); });