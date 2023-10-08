const jwt = require("jsonwebtoken");

const { SECRET } = require("./config");

const getToken = (id) => {
    return jwt.sign({ id }, SECRET);
};

module.exports = { getToken };
