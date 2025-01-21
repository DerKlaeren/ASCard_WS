/**
 * ASCard Webservice
 * Main
 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

const { logger } = require('./logger.js');
const { specs } = require('./swagger.js');

logger.info('Starting up ASCard Webservice...');

app.use(bodyParser.urlencoded({ extended: true, }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
app.use("/games", require("./routes/games"));
//app.use("/players", require("./routes/players"));

app.use('/', (req, res) => { res.sendFile(path.join(__dirname, "views", "home.html")); });

app.listen(port, () => { logger.info(`Web service listening at http://localhost:${port}`); });