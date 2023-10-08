const bcrypt = require("bcrypt");

const { getToken } = require("../utils/getToken");
const User = require("../models/users");

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res
            .status(409)
            .json({ message: "User with this email already exists" });
    }

    if (!password) {
        return res.status(400).json({
            message: "Password must be at least 1 character long",
        });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ name, email, passwordHash });
    await newUser.save();

    res.sendStatus(201);
};

const signin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const passwordCorrect =
        user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.status === "Blocked") {
        return res.status(403).json({ message: "User is blocked" });
    }

    user.lastLogin = Date.now();
    await user.save();

    const id = user._id.toString();
    const token = getToken(id);

    res.json({ id: user.id, name: user.name, token });
};

module.exports = { signup, signin };
