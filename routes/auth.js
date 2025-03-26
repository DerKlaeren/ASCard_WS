/**
 * @swagger
 * components:
 *   schemas:
 *     LoginData:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user name
 *         password:
 *           type: string
 *           description: The password
 *       example:
 *         username: Slashy
 *         password: secret
 */

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: The ASCard API
 * /login:
 *   post:
 *     summary: Login
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginData'
 *     responses:
 *       200:
 *         description: Login to get token.
 *         content:
 *           string
 *       500:
 *         description: Server error
 */
const { logger } = require("../logger.js");
const db = require("../db.js");

const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_jwt_secret";

const users = [
  { id: 1, username: "user1", password: bcrypt.hashSync("password1", 8) },
];

/* // User registration
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
}); */

// User login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
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
  }
});
