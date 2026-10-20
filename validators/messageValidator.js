const { body } = require("express-validator");

const validateNewMessageInput = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage(`Message title must contain between 3 to 50 characters`),
  body("messageBody")
    .trim()
    .isLength({ min: 3, max: 250 })
    .withMessage(`Message body must contain between 5 to 250 characters`),
];

module.exports = { validateNewMessageInput };
