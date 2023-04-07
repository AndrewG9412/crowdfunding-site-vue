const express = require("express");
const router = express.Router();
const db = require("../db.js");
const bcrypt = require("bcryptjs");

const User = require("../sequelize");

// Get
router.route("/").get(async (req, res) => {
  try{
    res.status(200).json("ok");
  }
  catch(e){
    res.status(500).json(e);
  }
});

//login
router.post(
  "/login",
  //passport.authenticate("local"),
  async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    db.post(
      `select * from users where email = '${email}' and password = '${password}'`,
      (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
          res.send({ validation: true });
        } else {
          res.send({ validation: false });
        }
      }
    );
  }
);

//registrazione
router.route("/:register").post(async (req, res, next) => {
  var errors = [];
  console.log("sono il body dentro la route", req.body);
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
  var hash = (await bcrypt.hash(req.body.password, 10)).toString();
  var data = {
    role: req.body.role,
    surname: req.body.surname,
    name: req.body.name,
    email: req.body.email,
    passwordCript: hash,
  };
  User.findOne({
    where: {
      email: data.email,
    }
  });
  var sql =
    "INSERT INTO user (name,surname, email, password, role) VALUES (?,?,?,?,?)";
  var params = [
    data.name,
    data.surname,
    data.email,
    data.passwordCript,
    data.role,
  ];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});

module.exports = router;