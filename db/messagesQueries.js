const pool = require("./pool");

const queries = {
  getMessagesWithSenderNames:
    "SELECT messages.*, users.first_name, users.last_name FROM messages INNER JOIN users ON messages.user_id = users.id ORDER BY messages.created_at DESC LIMIT ($1)",
  createMessage:
    "INSERT INTO messages (msg_title, msg_body, user_id) VALUES ($1, $2, $3) RETURNING id;",
  deleteMessageById: "DELETE FROM messages WHERE id = ($1)",
};

const getNewestMessagesWithSenderNames = async (limit) => {
  const { rows } = await pool.query(queries.getMessagesWithSenderNames, [
    limit,
  ]);
  return rows;
};

const createMessage = async (newMessageObject) => {
  const { title, messageBody, userId } = newMessageObject;

  const { rows } = await pool.query(queries.createMessage, [
    title,
    messageBody,
    userId,
  ]);

  return rows[0];
};

const deleteMessageById = async (id) => {
  await pool.query(queries.deleteMessageById, [id]);
};

module.exports = {
  getNewestMessagesWithSenderNames,
  createMessage,
  deleteMessageById,
};
