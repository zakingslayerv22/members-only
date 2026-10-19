const db = require("../db/messagesQueries");

const displayHomepageGet = async (req, res) => {
  const messagesAndSenderNames = await db.getNewestMessagesWithSenderNames(20);

  res.render("messages/index", {
    messagesAndSenderNames,
    pageTitle: "Latest Messages",
  });
};

module.exports = { displayHomepageGet };
