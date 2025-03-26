/**
 * ASCard Webservice
 * Main
 */
const express = require("express");

const { logger } = require("./logger.js");
const { specs } = require("./swagger.js");

const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3000;

const expHbs = require("express-handlebars");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = require("./secret");
const verifyToken = require("./auth");

logger.info("Starting up ASCard Webservice...");

// Mock User Data
const users = [
  { id: 1, username: "user1", password: bcrypt.hashSync("password1", 8) },
];

var handlebars = expHbs.create({
  defaultLayout: "main-layout",
  extname: ".handlebars",
  layoutsDir: path.join(__dirname, "views", "layouts"),
  helpers: {
    substr: function (length, context, options) {
      if (context.length > length) {
        return context.substring(0, length) + "...";
      } else {
        return context;
      }
    },
  },
});
app.engine(".handlebars", handlebars.engine);
app.set("view engine", ".handlebars");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
//app.use("/players", require("./routes/players"));
app.use("/games", require("./routes/games"));
//app.use("/units", require("./routes/units"));

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: The ASCard API, Login to get a token
 * /login:
 *   post:
 *     summary: Login user
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
 */
app.post("/login", (req, res) => {
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

/* app.get("/protected", verifyToken, (req, res) => {
  res.send(`Hello ${req.user.username}, you have accessed a protected route!`);
}); */

app.use("/", (req, res) => {
  res.render("home.handlebars", {
    pageTitle: "ASCard Webservice",
    activeHome: true,
    navCSS: true,
    // layout: false
  });
});

app.listen(port, () => {
  logger.info(`Web service listening at http://localhost:${port}`);
});
