/**
 * @swagger
 * components:
 *   schemas:
 *     NewUserRequest:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The name of the player (user)
 *         password:
 *           type: string
 *           description: The password
 *       example:
 *         username: Slasher
 *         password: secret
 *     ResultingUser:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           description: The access token
 *       example:
 *         token: eyJhbGciOiJIUzI1NiIsInR5MCwiZXhwIjoxNzQzMDEwODEwfQ.i4Pis6izCbkDetQtDJCj_lOMQtQpc6aeynRLPpmEfI8
 */

/**
 * @swagger
 * tags:
 *   name: Register
 *   description: Player registration
 * /register:
 *   post:
 *     summary: Player registration
 *     tags: [Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUserRequest'
 *     responses:
 *       200:
 *         description: The created access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResultingUser'
 *       500:
 *         description: Server error
 */
const { logger } = require("../logger.js");
const db = require("../db.js");

const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = require("../secret");

router.post("/", (req, res) => {
  /*   const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials");
  } */
});

module.exports = router;
