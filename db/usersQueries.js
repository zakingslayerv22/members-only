const pool = require("./pool");

const queries = {
  createUser:
    "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id;",
  selectUserById: "SELECT * FROM users WHERE email = $1",
  selectUserByEmail: "SELECT * FROM users WHERE email = $1",
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

const selectUserById = async (userId) => {
  const { rows } = await pool.query(queries.selectUserById, [userId]);

  console.log(rows);
  return rows[0];
};

const selectUserByEmail = async (userEmail) => {
  const { rows } = await pool.query(queries.selectUserByEmail, [userEmail]);

  // console.log(rows);
  return rows[0];
};

module.exports = { createUser, selectUserById, selectUserByEmail };
