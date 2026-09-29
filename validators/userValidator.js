const { body } = require("express-validator");
const db = require("../db/usersQueries");

const lengthErr = "must contain 3 to 30 characters.";
const alphabetErr = "must contain alphabets only";

const validateUserSignupInput = [
  body("firstName")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage(`Firstname ${lengthErr}`)
    .isAlpha()
    .withMessage(`Firstname ${alphabetErr}`),
  body("lastName")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage(`Lastname ${lengthErr}`)
    .isAlpha()
    .withMessage(`Lastname ${alphabetErr}`),
  body("email", "Email must be valid")
    .trim()
    .isEmail()
    .normalizeEmail()
    .custom(async (email) => {
      const existingUser = await db.selectUserByEmail(email);
      if (existingUser)
        throw new Error("Email has been taken already. Pick another email.");
    }),
  body("password", "Password must be at least 8 characters long.").isLength({
    min: 8,
  }),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Both passwords must match."),
];

module.exports = { validateUserSignupInput };
