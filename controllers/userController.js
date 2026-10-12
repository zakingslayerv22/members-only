const db = require("../db/usersQueries");
const { validationResult } = require("express-validator");
const userService = require("../services/userService");

const siteTitle = "Members Only Message Board";

const getSignupForm = (req, res) => {
  res.render("users/signup", {
    siteTitle,
    pageTitle: "Sign up!",
    formActionSubmit: `/users`,
    action: "Signup",
  });
};

const createUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.render("users/signup", {
      siteTitle,
      pageTitle: "Sign up!",
      formActionSubmit: `/users`,
      action: "Signup",
      errors: errors.array(),
      user: req.body,
    });
  }

  const { firstName, lastName, email, password } = req.body;

  try {
    // console.log(req.body);
    const newUser = await userService.createUserAccount({
      firstName,
      lastName,
      email,
      password,
    });

    req.session.loginPageData = {
      user: { email },
      action: "Login",
      formActionSubmit: "/users/login",
      successMessage:
        "Registration successful. Login to your account to start sending messages.",
    };

    res.redirect("/users/login");
  } catch (error) {
    console.error("Signup error:", error);

    return res.render("/users/signup", {
      errors: ["Registration failed. Please try again later."],
      user: req.body,
    });
  }
};

const getLoginForm = (req, res) => {
  //Grab the data from the session or set defaults if they visited the page directly

  const errorMessages = req.session.messages;
  const flashData = req.session.loginPageData || {};

  // Clear these session variables immediately
  delete req.session.loginPageData;
  delete req.session.messages;

  res.render("users/login", {
    siteTitle,
    pageTitle: "Log In",
    user: flashData.user || null,
    formActionSubmit: flashData.formActionSubmit || "/users/login",
    action: flashData.action || "Login",
    errors: errorMessages || "",
    successMessage: flashData.successMessage || null,
  });
};

const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/users/login");
  });
};

module.exports = {
  getSignupForm,
  createUser,
  getLoginForm,
  logoutUser,
};
