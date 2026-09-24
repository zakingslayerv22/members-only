const { Router } = require("express");
const usersRouter = Router();
const { validateUserSignupInput } = require("../validators/userValidator");
const controller = require("../controllers/userController");

usersRouter.post("/", validateUserSignupInput, controller.createUser);
usersRouter.get("/signup", controller.getSignupForm);

module.exports = usersRouter;
