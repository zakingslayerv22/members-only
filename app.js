const express = require("express");
const app = express();
const pool = require("./db/pool");

const path = require("node:path");

const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("./config/passport");

const homeRouter = require("./routes/homeRouter");
const usersRouter = require("./routes/usersRouter");
const messagesRouter = require("./routes/messagesRouter");

const auth = require("./middlewares/authentication");

const NotFoundError = require("./errors/NotFoundError");

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
  res.locals.siteTitle = "members-only";
  res.locals.currentUser = req.user;
  next();
});

app.use("/", homeRouter);
app.use("/users", usersRouter);
app.use("/messages", auth.checkUserAuthentication, messagesRouter);

app.use((req, res, next) => {
  next(new NotFoundError("Not all those who wander are lost!"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).render("404", {
    pageTitle:
      statusCode === 404 ? "404 - Page not found" : "500 - Server Error",
    errorMessage: err.message || "An unexpected error occured.",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) throw error;

  console.log(`We are listening on port ${PORT}! Allez-y!`);
});
