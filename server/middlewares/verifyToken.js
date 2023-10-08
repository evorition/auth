const jwt = require("jsonwebtoken");

const { SECRET } = require("../utils/config");

const verifyToken = (req, res, next) => {
    const authorization = req.get("authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).send({ message: "No token provided" });
    }

    const token = authorization.replace("Bearer ", "");

    try {
        const decodedToken = jwt.verify(token, SECRET);
        req.userId = decodedToken.id;
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }

    next();
};

module.exports = verifyToken;
