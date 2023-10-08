const usersRouter = require("express").Router();

const verifyToken = require("../middlewares/verifyToken");
const checkUserStatus = require("../middlewares/checkUserStatus");
const usersController = require("../controllers/usersController");

usersRouter.get("/", [verifyToken, checkUserStatus], usersController.getUsers);
usersRouter.post(
    "/delete",
    [verifyToken, checkUserStatus],
    usersController.deleteUsers
);
usersRouter.put(
    "/block",
    [verifyToken, checkUserStatus],
    usersController.updateStatusField("Blocked")
);
usersRouter.put(
    "/unblock",
    [verifyToken, checkUserStatus],
    usersController.updateStatusField("Active")
);

module.exports = usersRouter;
