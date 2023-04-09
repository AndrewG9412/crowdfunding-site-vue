const express = require("express");
const router = express.Router();
const db = require("../db.js");

// Get
router.route("/").get(async (req, res) => {
  db.serialize(function () {
    db.all(`SELECT * FROM document`, function (err, tables) {
        if(err) throw err;
        else {
          console.log(tables);
          res.status(200).json(tables);
        }
    });
  });
});

// POST creazione del documento

router.route("/:create").post(async (req, res) => {
    const titolo = req.body.titolo;
    const descrizione = req.body.descrizione;
    const data = req.body.data;
    const tipo = req.body.tipo;
    const prezzo = req.body.prezzo;
    var sql = "INSERT INTO document (titolo, descrizione, data, tipo, prezzo, project_id) VALUES (?,?,?,?,?)";
    var params = [
      titolo,
      descrizione,
      data,
      tipo,
      prezzo,      
    ];
    db.run(sql, params, function (err, result) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(200).json({
        message: "success",
        data: params,
        id: this.lastID,
      });
    });
});
