const db = require("../db/messagesQueries");

const getNewestMessagesWithSenderNames = async (req, res) => {
  const messagesAndSenderNames = await db.getNewestMessagesWithSenderNames();

  console.log(messagesAndSenderNames);

  res.render("messages/index", {
    messagesAndSenderNames,
    pageTitle: "All Messages",
  });
};

const getNewMessageForm = (req, res) => {
  res.render("messages/newMessage", { pageTitle: "Create New Message" });
};

module.exports = {
  getNewestMessagesWithSenderNames,
};
