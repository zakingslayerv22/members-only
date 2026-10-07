const passport = require("passport");

const checkUserAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.session.messages = ["You need to be logged in to view this resource."];
    res.redirect("/users/login");
  }
};

module.exports = checkUserAuthentication;
