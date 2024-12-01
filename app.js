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
app.get('/', (req, res) => { res.send('<html><body><p>ASCard WS<br>- <a href="https://ws.ascard.net/api-docs" target="_BLANK">api-docs</a><br>- <a href="https://ws.ascard.net/log/consolelog.txt" target="_BLANK">consolelog.txt (synched every 2 minutes from the passenger.log)</a></p></body></html>'); });
app.use("/games", require("./routes/games"));

app.listen(port, () => { logger.info(`Web service listening at http://localhost:${port}`); });