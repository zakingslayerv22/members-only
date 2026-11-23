const { body } = require("express-validator");

const validateNewMessageInput = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 40 })
    .withMessage(`Title must contain 3 to 40 characters.`),
  body("messageBody")
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage(`Body must contain 5 to 100 characters.`),
];

module.exports = { validateNewMessageInput };
