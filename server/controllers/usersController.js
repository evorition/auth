const User = require("../models/users");

const updateStatusField = (value) => {
    return async (req, res) => {
        const idsToUpdate = req.body;
        await User.updateMany(
            { _id: { $in: idsToUpdate } },
            { $set: { status: value } }
        );
        res.sendStatus(200);
    };
};

const getUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};

const deleteUsers = async (req, res) => {
    const idsToDelete = req.body;
    await User.deleteMany({ _id: { $in: idsToDelete } });
    res.sendStatus(200);
};

module.exports = { getUsers, updateStatusField, deleteUsers };
