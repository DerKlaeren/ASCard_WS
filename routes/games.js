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
 *         - description
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
 *         description:
 *           type: string
 *           description: Description of the game
 *         era:
 *           type: string
 *           description: One of the eras ('STAR LEAGUE','SUCCESSION WARS','CLAN INVASION','CIVIL WAR','JIHAD','DARK AGE','ILCLAN')
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
 *         description: The planetary assault on Northwind by Clan Snow Raven
 *         era: CLAN INVASION
 *         yearInGame: 3052
 *         accessCode: *****
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
 *   description: The ASCard game scoreboard API
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

const books = require("../util/data");

router.get("/", function (req, res) {
	res.status(200).json(books);
});

router.get("/:id", function (req, res) {
	let book = books.find(function (item) {
		return item.id == req.params.id;
	});

	book ? res.status(200).json(book) : res.sendStatus(404);
});

router.post("/", function (req, res) {
	const { title, author, finished } = req.body;

	let book = {
		id: books.length + 1,
		title: title,
		author: author,
		finished: finished !== undefined ? finished : false,
		createdAt: new Date(),
	};

	books.push(book);

	res.status(201).json(book);
});

router.put("/:id", function (req, res) {
	let book = books.find(function (item) {
		return item.id == req.params.id;
	});

	if (book) {
		const { title, author, finished } = req.body;

		let updated = {
			id: book.id,
			title: title !== undefined ? title : book.title,
			author: author !== undefined ? author : book.author,
			finished: finished !== undefined ? finished : book.finished,
			createdAt: book.createdAt,
		};

		books.splice(books.indexOf(book), 1, updated);

		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
});

router.delete("/:id", function (req, res) {
	let book = books.find(function (item) {
		return item.id == req.params.id;
	});

	if (book) {
		books.splice(books.indexOf(book), 1);
	} else {
		return res.sendStatus(404);
	}

	res.sendStatus(204);
});

module.exports = router;