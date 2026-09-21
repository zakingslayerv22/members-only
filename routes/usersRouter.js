const { Router } = require("express");
const usersRouter = Router();
const controller = require("../controllers/userController");

usersRouter.post("/", controller.createUser);
usersRouter.get("/signup", controller.getSignupForm);

module.exports = usersRouter;
