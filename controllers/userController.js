const db = require("../db/usersQueries");
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
  const { firstName, lastName, email, password } = req.body;

  try {
    console.log(req.body);
    const newUser = await userService.createUserAccount({
      firstName,
      lastName,
      email,
      password,
    });
    console.log(newUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getSignupForm,
  createUser,
};
