const db = require("../db/messagesQueries");
const { validationResult } = require("express-validator");

const getNewestMessagesWithSenderNames = async (req, res) => {
  const messagesAndSenderNames = await db.getNewestMessagesWithSenderNames();

  console.log(messagesAndSenderNames);

  res.render("messages/index", {
    messagesAndSenderNames,
    pageTitle: "All Messages",
  });
};

const getNewMessageForm = (req, res) => {
  res.render("messages/create", {
    pageTitle: "Send New Message",
    formActionSubmit: "/messages",
    action: "Send",
  });
};

module.exports = {
  getNewestMessagesWithSenderNames,
  getNewMessageForm,
};
