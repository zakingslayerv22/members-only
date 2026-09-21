const pool = require("./pool");

const queries = {
  createUser:
    "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id;",
};

const createUser = async (userObject) => {
  const { firstName, lastName, email, password } = userObject;

  const { rows } = await pool.query(queries.createUser, [
    firstName,
    lastName,
    email,
    password,
  ]);

  return rows[0];
};

module.exports = { createUser };
