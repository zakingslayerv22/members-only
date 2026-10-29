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

const checkAdminRole = (req, res, next) => {
  if (!req.user.is_club_member) {
    next();
  } else {
    req.session.errors = ["You are already an admin!"];
    res.redirect("/messages");
  }
};
module.exports = { checkUserAuthentication, checkMemberRole, checkAdminRole };
