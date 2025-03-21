/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - ownerPlayerId
 *         - title
 *         - background
 *         - era
 *         - yearInGame
 *         - accessCode
 *         - locked
 *         - scheduled
 *         - started
 *         - finished
 *       properties:
 *         gameid:
 *           type: string
 *           description: The auto-generated id of the game
 *         ownerPlayerId:
 *           type: string
 *           description: The player this game is assigned to
 *         title:
 *           type: string
 *           description: The title of the game
 *         background:
 *           type: string
 *           description: Background to this game
 *         era:
 *           type: string
 *           description: One of the eras STAR LEAGUE, SUCCESSION WARS, CLAN INVASION, CIVIL WAR, JIHAD, DARK AGE, ILCLAN
 *         yearInGame:
 *           type: string
 *           description: The year in the BTU timeline
 *         accessCode:
 *           type: string
 *           description: Access code
 *         locked:
 *           type: boolean
 *           description: Whether the game is locked (no one can join anymore)
 *         scheduled:
 *           type: string
 *           format: date
 *           description: When the game will start
 *         started:
 *           type: string
 *           format: date
 *           description: Whether the game has been finished
 *         finished:
 *           type: string
 *           format: date
 *           description: Whether the game has been finished
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the game was added
 *       example:
 *         gameid: 543
 *         ownerPlayerId: 2
 *         title: Northwind Planetary Assault
 *         background: The planetary assault on Northwind by Clan Snow Raven
 *         era: CLAN INVASION
 *         yearInGame: 3052
 *         accessCode: xxx
 *         locked: true
 *         scheduled: 2024-12-06T08:00:00.000Z
 *         started: 2024-12-06T08:00:00.000Z
 *         finished: null
 *         createdAt: 2024-11-29T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Game
 *   description: The ASCard API
 * /games:
 *   get:
 *     summary: Lists all games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: The list of all games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 * /games/{id}:
 *   get:
 *     summary: Get the game by id
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The game id
 *     responses:
 *       200:
 *         description: The game response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: The game was not found

 */
const { logger } = require("../logger.js");
const db = require("../db.js");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
    const games = await db.pool.query("SELECT * FROM asc_game");
    logger.info("List of all games requested from ip: " + ip);

    res.status(200).send(games);
  } catch (err) {
    throw err;
  }
});

router.get("/:id", async (req, res) => {
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;
  const games = await db.pool.query("SELECT * FROM asc_game");
  logger.info("Game with id " + req.params.id + " requested from ip: " + ip);

  let game = games.find(function (item) {
    return item.gameid == req.params.id;
  });

  game ? res.status(200).json(game) : res.sendStatus(404);
});

module.exports = router;
