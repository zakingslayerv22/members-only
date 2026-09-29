const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/usersQueries");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Match your form/input field
    },
    async (email, password, done) => {
      try {
        const user = await db.selectUserByEmail(email);

        if (!user) {
          return done(null, false, { message: "Incorrect Email" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          return done(null, false, { message: "Incorrect Password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.selectUserById(id);

    done(null, user);
  } catch (err) {
    done(err);
  }
});
