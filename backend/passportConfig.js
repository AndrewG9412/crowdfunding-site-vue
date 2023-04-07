const bcrypt = require("bcryptjs");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const db = require("./db.js");

module.exports = function (passport) {
  passport.use(
    new localStrategy(function verify(username, password, done) {
      db.get(
        "SELECT * FROM users WHERE email = ?",
        [username],
        async function (err, row) {
          if (err) {
            return done(err);
          }
          if (!row) {
            return done(null, false, {
              message: "Incorrect email or password.",
            });
          }
          const validPassword = await bcrypt.compare(password, row.password);
          if (validPassword) {
          }
        }
      );
    })
  );
};
