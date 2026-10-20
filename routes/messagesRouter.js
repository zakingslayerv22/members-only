const { Router } = require("express");
const messagesRouter = Router();
const controller = require("../controllers/messageController");

messagesRouter.get("/new", controller.getCreateMessageForm);
messagesRouter.get("/", controller.getNewestMessagesWithSenderNames);

module.exports = messagesRouter;
