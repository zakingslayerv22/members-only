const { Router } = require("express");
const passport = require("../config/passport");
const usersRouter = Router();
const { validateUserSignupInput } = require("../validators/userValidator");
const controller = require("../controllers/userController");

usersRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/messages",
    failureRedirect: "/users/login",
    failureMessage: true,
  })
);

usersRouter.get("/logout", controller.logoutUser);

usersRouter.get("/login", controller.getLoginForm);
usersRouter.post("/", validateUserSignupInput, controller.createUser);
usersRouter.get("/signup", controller.getSignupForm);

module.exports = usersRouter;
