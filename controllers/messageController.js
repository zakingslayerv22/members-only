const db = require("../db/messagesQueries");

const getNewestMessagesWithSenderNames = async (req, res) => {
  const messagesAndSenderNames = await db.getNewestMessagesWithSenderNames();

  console.log(messagesAndSenderNames);

  res.render("messages/index", {
    messagesAndSenderNames,
    pageTitle: "All Messages",
  });
};

module.exports = {
  getNewestMessagesWithSenderNames,
};
