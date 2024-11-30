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
const db = require('./db.js');

logger.info('Starting up ASCard Webservice...');

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
app.use(bodyParser.urlencoded({ extended: true, }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => { res.send('<html><body><p>ASCard WS - Check <a href="https://ws.ascard.net/api-docs">api-docs</a></p></body></html>'); });
app.use("/games", require("./routes/games"));

app.get('/testdb', async (req, res) => {
    try {
        const result = await db.pool.query("select * from asc_game");
        res.send(result);
    } catch (err) {
        throw err;
    }
});

app.listen(port, () => { logger.info(`Web service listening at http://localhost:${port}`); });