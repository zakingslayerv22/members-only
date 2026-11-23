const db = require("../db/messagesQueries");
const { validationResult } = require("express-validator");

const getNewestMessagesWithSenderNames = async (req, res) => {
  const messagesAndSenderNames = await db.getNewestMessagesWithSenderNames();

  const successMessage = req.session.successMessage ?? null;
  const errors = req.session.errors ?? null;

  delete req.session.successMessage;
  delete req.session.errors;

  console.log(messagesAndSenderNames);

  res.render("messages/index", {
    messagesAndSenderNames,
    pageTitle: "All Messages",
    successMessage,
    errors,
  });
};

const getCreateMessageForm = (req, res) => {
  res.render("messages/create", {
    pageTitle: "New Message",
    formActionSubmit: "/messages/new",
    action: "Send",
  });
};

const createMessagePost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).render("messages/create", {
      pageTitle: "New Message",
      formActionSubmit: `/messages/new`,
      action: "Send",
      errors: errors.array(),
      oldData: req.body,
    });
  }

  const { title, messageBody } = req.body;

  try {
    await db.createMessage({ title, messageBody, userId: req.user.id });

    req.session.successMessage = "Message successfully sent.";
    res.redirect("/messages");
  } catch (error) {
    console.error("Error Sending Message:", error);

    return res.render("/users/signup", {
      pageTitle: "Send new Message",
      formActionSubmit: `/messages/new`,
      action: "Send",
      errors: ["Message sending failed. Please try again later."],
      oldData: req.body,
    });
  }
};

const deleteMessagePost = async (req, res) => {
  const { id } = req.params;
  try {
    await db.deleteMessageById(id);

    req.session.successMessage = "Message successfully deleted.";
    res.redirect("/messages");
  } catch (error) {
    console.error(error);

    req.session.errorMessage = [
      "Message deleting failed. Contact admin if this issue persists.",
    ];
    res.redirect("/messages");
  }
};

module.exports = {
  getNewestMessagesWithSenderNames,
  getCreateMessageForm,
  createMessagePost,
  deleteMessagePost,
};
