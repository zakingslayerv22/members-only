const express = require("express");
const app = express();
const pool = require("./db/pool");

const path = require("node:path");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const usersRouter = require("./routes/usersRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new pgSession({
      pool: pool, // Connection pool
      tableName: "user_sessions", // Use another table-name than the default "session" one
      // Insert connect-pg-simple options here
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);

app.use("/users", usersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) throw error;

  console.log(`We are listening on port ${PORT}! Allez-y!`);
});
