const bcrypt = require("bcryptjs");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const db = require("./db.js");


passport.use(
  "local",
  new localStrategy(function verify(email, password, done) {
    db.get(
      "SELECT * FROM user WHERE email = ?",
      [email],
      async function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: "Incorrect email.",
          });
        }
        const salt = user.salt;
        const crypted_pass = user.password;
        const hash = bcrypt.hashSync(password, salt).toString();
        if (hash !== crypted_pass) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      }
    );
  })
);

passport.serializeUser((user, done) => {
  done(null, { id: user.id, email: user.email, role: user.role });
});

passport.deserializeUser((id, done) => {
  db.get("SELECT * FROM user WHERE id = ?", [id], (err, user) => {
    if (user) return done(null, user);
  });
});

module.exports = passport;
