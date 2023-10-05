const usersRouter = require("express").Router();

const verifyToken = require("../middlewares/verifyToken");
const checkIfUserBlocked = require("../middlewares/checkIfUserBlocked");
const usersController = require("../controllers/usersController");

usersRouter.get(
    "/",
    [verifyToken, checkIfUserBlocked],
    usersController.getUsers
);
usersRouter.delete(
    "/",
    [verifyToken, checkIfUserBlocked],
    usersController.deleteUsers
);
usersRouter.put(
    "/block",
    [verifyToken, checkIfUserBlocked],
    usersController.updateStatusField("Blocked")
);
usersRouter.put(
    "/unblock",
    [verifyToken, checkIfUserBlocked],
    usersController.updateStatusField("Active")
);

module.exports = usersRouter;
