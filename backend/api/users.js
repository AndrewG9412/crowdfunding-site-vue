const express = require("express");
const router = express.Router();
const db = require("../db.js");
const bcrypt = require("bcryptjs");
const passport = require("../passportConfig.js");
//const User = require("../sequelize");

// Get
router.route("/").get(async (req, res) => {
  try {
    res.status(200).json("ok");
  } catch (e) {
    res.status(500).json(e);
  }
});

//login
router.post(
  "/login/:login", 
  //passport.authenticate('local'),
  async (req, res, next) => {
    const email = req.body.email;
    const clear_password = req.body.password;
    db.serialize(function () {
      db.all(`SELECT * FROM user WHERE email = '${email}'`, function (err, tables) {
          if(err) throw err;
          else {
            const element = tables[0];
            const salt = element.salt;
            const crypted_pass = element.password;
            const hash = bcrypt.hashSync(clear_password, salt).toString();
            if(crypted_pass === hash) {
              res.status(200).json({id: element.id, name: element.name, surname: element.surname, role: element.role, email: element.email});
            }
            else {
              res.status(500).json("wrong password");
            }
          }
      });
    });
  }
);

//registrazione
router.route("/:register").post(async (req, res, next) => {
  var errors = [];
  if (!req.body.password) {
    errors.push("Nessuna password specificata");
  }
  if (!req.body.email) {
    errors.push("Nessuna mail specificata");
  }
  if (errors.length) {
    res.status(400).json({ error: errors.join(",") });
    return;
  }
  var salt = bcrypt.genSaltSync(10);
  var hash = (await bcrypt.hash(req.body.password, salt)).toString();
  var data = {
    role: req.body.role,
    surname: req.body.surname,
    name: req.body.name,
    salt: salt,
    email: req.body.email,
    passwordCript: hash,
  };
  var sql = "INSERT INTO user (name, surname, email, password, role, salt) VALUES (?,?,?,?,?,?)";
  var params = [
    data.name,
    data.surname,
    data.email,
    data.passwordCript,
    data.role,
    data.salt,
  ];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});

module.exports = router;
