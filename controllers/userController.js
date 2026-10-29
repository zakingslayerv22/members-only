const db = require("../db/usersQueries");
const { validationResult } = require("express-validator");
const userService = require("../services/userService");

const getSignupForm = (req, res) => {
  res.render("users/signup", {
    pageTitle: "Sign up!",
    formActionSubmit: `/users/signup`,
    action: "Signup",
  });
};

const createUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.render("users/signup", {
      pageTitle: "Sign up!",
      formActionSubmit: `/users/signup`,
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
      pageTitle: "Sign up!",
      formActionSubmit: `/users/signup`,
      action: "Signup",
      user: req.body,
      errors: ["Registration failed. Please try again later."],
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

const getJoinClubForm = (req, res) => {
  res.render("users/joinClub", {
    pageTitle: "Join The Club",
    formActionSubmit: `/users/join-club`,
    action: "Join Club",
  });
};

const updateUserToMember = async (req, res) => {
  const { answer } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.render("users/joinClub", {
      pageTitle: "Join The Club",
      formActionSubmit: `/users/join-club`,
      action: "Join Club",
      previousAnswer: answer,
      errors: errors.array(),
    });
  }

  if (answer !== "altruism") {
    return res.render("users/joinClub", {
      pageTitle: "Join The Club",
      formActionSubmit: `/users/join-club`,
      action: "Join Club",
      previousAnswer: answer,
      errors: [
        "Errr..Nice try but that isn't the quality we're seeking. Try again.",
      ],
    });
  }

  try {
    await db.updateUserToMemberById(req.user.id);

    req.session.successMessage = "Awesome! You are now a club member!";

    res.redirect("/messages");
  } catch (error) {
    console.error("Error joining club:", error);

    return res.render("users/joinClub", {
      pageTitle: "Join The Club",
      formActionSubmit: `/users/join-club`,
      action: "Join Club",
      errors: ["Err....There was an error joining the club. Try again later."],
      previousAnswer: req.body,
    });
  }
};

const getJoinAdminsForm = (req, res) => {
  res.render("users/joinAdmins", {
    pageTitle: "Join The Admins",
    formActionSubmit: `/users/join-admins`,
    action: "Join Admins",
  });
};

const updateMemberToAdmin = async (req, res) => {
  const { answer } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.render("users/joinAdmins", {
      pageTitle: "Join The Admins",
      formActionSubmit: `/users/join-admins`,
      action: "Join Admins",
      previousAnswer: answer,
      errors: errors.array(),
    });
  }

  if (answer !== "pacifism") {
    return res.render("users/joinAdmins", {
      pageTitle: "Join The Admins",
      formActionSubmit: `/users/join-admins`,
      action: "Join Admins",
      previousAnswer: answer,
      errors: [
        "Errr..Nice try but that isn't the principle we're seeking. Try again.",
      ],
    });
  }

  try {
    await db.updateMemberToAdminById(req.user.id);

    req.session.successMessage = "Awesome! You are now an admin!";

    res.redirect("/messages");
  } catch (error) {
    console.error("Error joining admins:", error);

    return res.render("users/joinAdmins", {
      pageTitle: "Join The Admins",
      formActionSubmit: `/users/join-admins`,
      action: "Join Admins",
      errors: [
        "Err....There was an error joining the admins. Try again later.",
      ],
      previousAnswer: req.body,
      club,
    });
  }
};

module.exports = {
  getSignupForm,
  createUser,
  getLoginForm,
  logoutUser,
  getJoinClubForm,
  updateUserToMember,
  getJoinAdminsForm,
  updateMemberToAdmin,
};
