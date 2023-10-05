require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

module.exports = { PORT, MONGODB_URL, COOKIE_SECRET };
