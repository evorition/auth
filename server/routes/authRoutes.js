const authRouter = require("express").Router();

const authController = require("../controllers/authController");

authRouter.post("/signup", authController.signup);
authRouter.post("/signin", authController.signin);

module.exports = authRouter;
