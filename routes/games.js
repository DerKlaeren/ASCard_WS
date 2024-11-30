// https://blog.logrocket.com/documenting-express-js-api-swagger/

/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - owner
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
 *         id:
 *           type: string
 *           description: The auto-generated id of the game
 *         owner:
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
 *         id: 543
 *         owner: 2
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
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 *     responses:
 *       200:
 *         description: The created game.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       500:
 *         description: Server error
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
 *   put:
 *    summary: Update the game by the id
 *    tags: [Games]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The game id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Game'
 *    responses:
 *      200:
 *        description: The game was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Game'
 *      404:
 *        description: The game was not found
 *      500:
 *        description: Server error
 *   delete:
 *     summary: Remove the game by id
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
 *         description: The game was deleted
 *       404:
 *         description: The game was not found
 */

const express = require("express");
const router = express.Router();
const games = require("../util/data");

router.get("/", function (req, res) {
	logger.info("Test of logging in here");
	res.status(200).json(games);
});

router.get("/:id", function (req, res) {
	let game = games.find(function (item) {
		return item.id == req.params.id;
	});

	game ? res.status(200).json(game) : res.sendStatus(404);
});

router.post("/", function (req, res) {
	const { owner, title, background, era, yearInGame, accessCode, locked, scheduled, started, finished } = req.body;

	let game = {
		id: games.length + 1,
		owner: owner,
		title: title,
		background: background,
		era: era,
		yearInGame: yearInGame,
		accessCode: accessCode,
		locked: locked,
		scheduled: scheduled,
		started: started,
		finished: finished !== undefined ? finished : null,
		createdAt: new Date()
	};

	games.push(game);

	res.status(201).json(game);
});

router.put("/:id", function (req, res) {
	let game = games.find(function (item) {
		return item.id == req.params.id;
	});

	if (game) {
		const { owner, title, background, era, yearInGame, accessCode, locked, scheduled, started, finished } = req.body;

		let updated = {
			id: game.id,
			owner: owner !== undefined ? owner : game.owner,
			title: title !== undefined ? title : game.title,
			background: background !== undefined ? background : game.background,
			era: era !== undefined ? era : game.era,
			yearInGame: yearInGame !== undefined ? yearInGame : game.yearInGame,
			accessCode: accessCode !== undefined ? accessCode : game.accessCode,
			locked: locked !== undefined ? locked : game.locked,
			scheduled: scheduled !== undefined ? scheduled : game.scheduled,
			started: started !== undefined ? started : game.started,
			finished: finished !== undefined ? finished : game.finished,
			createdAt: game.createdAt,
		};

		games.splice(games.indexOf(game), 1, updated);

		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
});

router.delete("/:id", function (req, res) {
	let game = games.find(function (item) {
		return item.id == req.params.id;
	});

	if (game) {
		games.splice(games.indexOf(game), 1);
	} else {
		return res.sendStatus(404);
	}

	res.sendStatus(204);
});

module.exports = router;