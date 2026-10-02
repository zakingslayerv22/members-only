const pool = require("./pool");

const queries = {
  getAllMessages: "SELECT * FROM messages ORDER BY created_at DESC;",
  getNewestMessages:
    "SELECT * FROM messages ORDER BY created_at DESC LIMIT ($1);",
};

const getAllMessages = async () => {
  const { rows } = await pool.query(queries.getAllMessages);
  return rows;
};

const getNewestMessages = async (limit) => {
  const { rows } = await pool.query(queries.getNewestMessages, [limit]);
  return rows;
};

module.exports = { getAllMessages, getNewestMessages };
