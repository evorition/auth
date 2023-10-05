const User = require("../models/users");

const checkIfUserBlocked = async (req, res, next) => {
    const userId = req.userId;
    const user = await User.findById(userId);
    console.log(user);
    if (user.status === "Blocked") {
        req.session = null;
        return res.status(403).json({ message: "User is blocked" });
    }
    next();
};

module.exports = checkIfUserBlocked;
