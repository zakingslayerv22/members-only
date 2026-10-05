const { Router } = require("express");
const messagesRouter = Router();
const controller = require("../controllers/messageController");

messagesRouter.get("/", controller.getAllMessages);

module.exports = messagesRouter;
