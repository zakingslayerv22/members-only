const db = require("../db/messagesQueries");

const getAllMessages = async (req, res) => {
  const messages = await db.getAllMessages();

  res.render("messages/index", {
    messages,
    pageTitle: "All Messages",
  });
};

module.exports = {
  getAllMessages,
};
