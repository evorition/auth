const jwt = require("jsonwebtoken");

const { COOKIE_SECRET } = require("../utils/config");

const verifyToken = (req, res, next) => {
    const token = req.session.token;

    if (!token) {
        return res.status(401).send({ message: "No token provided!" });
    }

    try {
        const decodedToken = jwt.verify(token, COOKIE_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Tokens are different" });
    }
};

module.exports = { verifyToken };
