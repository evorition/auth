const jwt = require("jsonwebtoken");

const { COOKIE_SECRET } = require("./config");

const getToken = (id) => {
    jwt.sign({ id }, COOKIE_SECRET);
};

module.exports = { getToken };
