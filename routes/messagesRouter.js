const { Router } = require("express");
const messagesRouter = Router();
const { validateNewMessageInput } = require("../validators/messageValidator");
const controller = require("../controllers/messageController");

messagesRouter.post("/", validateNewMessageInput, controller.createMessagePost);
messagesRouter.get("/new", controller.getCreateMessageForm);
messagesRouter.get("/", controller.getNewestMessagesWithSenderNames);

module.exports = messagesRouter;
