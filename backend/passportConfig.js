const bcrypt = require("bcryptjs");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const db = require("./db.js");
const User = require("./user.js");

module.exports = function (passport) {
  passport.use(
    new localStrategy(function verify(email, password, done) {
      //   db.get(
      //     "SELECT * FROM users WHERE email = ?",
      //     [username],
      //     async function (err, row) {
      //       if (err) {
      //         return done(err);
      //       }
      //       if (!row) {
      //         return done(null, false, {
      //           message: "Incorrect email or password.",
      //         });
      //       }
      //       const validPassword = await bcrypt.compare(password, row.password);
      //       if (validPassword) {
      //       }
      //     }
      //   );
      User.findOne({ email: email }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );
};

passport.serializeUser((user, cb) => {
    cb(null, user.id);
})

passport.deserializeUser((id, cb) => {
    User.findOne({id : id}, (err, user) => {
        cb(err, user);
    })
})
