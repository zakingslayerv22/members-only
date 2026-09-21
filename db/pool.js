require("dotenv").config();
const { Pool } = require("pg");

// If DATABASE_URL exists (live), use it. Otherwise, construct it locally.
const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}`;

module.exports = new Pool({
  connectionString: connectionString,
});
