const express = require("express");
const router = express.Router();
const db = require("../db.js");

// Get
router.route("/").get(async (req, res) => {
  try {
    res.status(200).json();
  } catch (e) {
    res.status(500).json(e);
  }
});

// GET condizionato dell'id dell'utente
router.route("/:id*").get(async (req, res) => {
  const id = req.params.id;
  db.serialize(function () {
    db.all(`SELECT * FROM project WHERE creatore_id = '${id}'`, function (err, tables) {
        if(err) throw err;
        else {
          res.status(200).json(tables);
        }
    });
  });
});

// DELETE condizionato dell'id del progetto
router.route("/:id").delete(async (req, res) => {
  const id = req.params.id;
  console.log('hello?', id);
  db.serialize(function () {
    db.all(`DELETE FROM project WHERE id='${id}'`, function (err, tables) {
        if(err) throw err;
        else {
          res.status(200).json('deleted');
        }
    });
  });
});

router.route("/create/:create").post(async (req, res) => {
    const titolo = req.body.titolo;
    const categoria = req.body.categoria;
    const nome_creatore = req.body.nome_creatore;
    const creatore_id = req.body.creatore_id;
    const descrizione = req.body.descrizione;
    const immagine = req.body.file_immagine;
    var sql = "INSERT INTO project (titolo, categoria, creatore_id, descrizione, immagine, nome_creatore) VALUES (?,?,?,?,?,?)";
    var params = [
      titolo,
      categoria,
      creatore_id,
      descrizione,
      immagine,
      nome_creatore,
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

router.route("/edit/:edit").put(async (req, res) => {
  try {
    res.status(200).json();
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;