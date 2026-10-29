const { Router } = require("express");
const passport = require("../config/passport");
const usersRouter = Router();
const {
  validateUserSignupInput,
  validateUserAnswerInput,
} = require("../validators/userValidator");
const controller = require("../controllers/userController");

const auth = require("../middlewares/authentication");

usersRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/messages",
    failureRedirect: "/users/login",
    failureMessage: true,
  })
);

usersRouter.get(
  "/join-admins",
  auth.checkAdminRole,
  controller.getJoinAdminsForm
);

usersRouter.post(
  "/join-club",
  validateUserAnswerInput,
  controller.updateUserToMember
);

usersRouter.get("/join-club", auth.checkMemberRole, controller.getJoinClubForm);

usersRouter.get("/logout", controller.logoutUser);

usersRouter.get("/login", controller.getLoginForm);
usersRouter.post("/signup", validateUserSignupInput, controller.createUser);
usersRouter.get("/signup", controller.getSignupForm);

module.exports = usersRouter;
