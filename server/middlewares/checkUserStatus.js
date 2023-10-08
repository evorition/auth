const User = require("../models/users");

const checkUserStatus = async (req, res, next) => {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User has been deleted" });
    } else if (user.status === "Blocked") {
        return res.status(403).json({ message: "User is blocked" });
    }
    next();
};

module.exports = checkUserStatus;
