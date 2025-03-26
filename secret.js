require("dotenv").config();
const { SECRET = "secret" } = process.env;

module.exports = SECRET;
