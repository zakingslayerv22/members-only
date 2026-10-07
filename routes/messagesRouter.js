const { Router } = require("express");
const messagesRouter = Router();
const controller = require("../controllers/messageController");

messagesRouter.get("/", controller.getNewestMessagesWithSenderNames);

module.exports = messagesRouter;
