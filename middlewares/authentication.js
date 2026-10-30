const passport = require("passport");

const checkUserAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.session.messages = ["You need to be logged in to view this resource."];
    res.redirect("/users/login");
  }
};

const checkMemberRole = (req, res, next) => {
  if (!req.user.is_club_member) {
    next();
  } else {
    req.session.errors = ["You are already a club member!"];
    res.redirect("/messages");
  }
};

const checkAccessRole = (req, res, next) => {
  if (!req.user.is_admin && req.user.is_club_member) {
    return next();
  }

  req.session.errors = req.user.is_admin
    ? ["You are already an admin!"]
    : ["I can't do that. You don't have the privileges to view this resource."];
  res.redirect("/messages");
};

module.exports = { checkUserAuthentication, checkMemberRole, checkAccessRole };
