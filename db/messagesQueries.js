const pool = require("./pool");

const queries = {
  getMessagesWithSenderNames:
    "SELECT messages.*, users.first_name, users.last_name FROM messages INNER JOIN users ON messages.user_id = users.id ORDER BY messages.created_at DESC LIMIT ($1)",
};

const getNewestMessagesWithSenderNames = async (limit) => {
  const { rows } = await pool.query(queries.getMessagesWithSenderNames, [
    limit,
  ]);
  return rows;
};

module.exports = {
  getNewestMessagesWithSenderNames,
};
