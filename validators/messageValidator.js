const { body } = require("express-validator");

const validateNewMessageInput = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage(`Title must contain 3 to 50 characters.`),
  body("messageBody")
    .trim()
    .isLength({ min: 3, max: 250 })
    .withMessage(`Body must contain 5 to 250 characters.`),
];

module.exports = { validateNewMessageInput };
