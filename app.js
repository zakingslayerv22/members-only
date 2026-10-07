const express = require("express");
const app = express();
const pool = require("./db/pool");

const path = require("node:path");

const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("./config/passport");

const usersRouter = require("./routes/usersRouter");
const messagesRouter = require("./routes/messagesRouter");

const checkUserAuthentication = require("./middlewares/authentication");

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

app.use(passport.session());

app.use((req, res, next) => {
  res.locals.siteTitle = "Members Only Message Board";
  next();
});

app.use("/users", usersRouter);
app.use("/messages", checkUserAuthentication, messagesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) throw error;

  console.log(`We are listening on port ${PORT}! Allez-y!`);
});
