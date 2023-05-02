const express = require("express");
const router = express.Router();
const db = require("../db.js");

// Get
router.route("/").get(async (req, res) => {
  db.serialize(function () {
    db.all(`SELECT * FROM document`, function (err, tables) {
      if (err) throw err;
      else {
        console.log(tables);
        res.status(200).json(tables);
      }
    });
  });
});

router.route("/document/:id").get(async (req, res) => {
  db.serialize(function () {
    const documentId = req.params.id;
    db.all(`SELECT * FROM document WHERE id = "${documentId}"`, function (err, tables) {
      if (err) throw err;
      else {
        console.log(tables);
        res.status(200).json(tables);
      }
    });
  });
});

//GET condizionato da projectId
router.route("/:project_id").get(async (req, res) => {
  const projectId = req.params.project_id;
  db.serialize(function () {
    db.all(`SELECT * FROM document where project_id = "${projectId}" ORDER BY data`, function (err, tables) {
      if (err) throw err;
      else {
        console.log(tables);
        res.status(200).json(tables);
      }
    });
  });
})


//GET di documento acquistato da userId
router.route("/document/:id/userId/:user").get(async (req, res) => {
  const documentId = req.params.id;
  const userId = req.params.user;
  db.serialize(function () {
    db.all(`SELECT * FROM possesso WHERE id_documento = "${documentId}" AND id_utente = "${userId}"`, function (err, tables) {
      if (err) throw err;
      else {
        console.log(tables);
        if (tables.length == 1) res.status(200).json({risultato : true});
        else res.status(200).json({risultato : false});
      }
    });
  });
})  


// POST creazione del documento
router.route("/:create").post(async (req, res) => {
  const titolo = req.body.titolo;
  const descrizione = req.body.descrizione;
  const data = req.body.data;
  const tipo = req.body.tipo;
  const prezzo = req.body.prezzo;
  const project_id = req.body.project_id;
  var sql =
    "INSERT INTO document (titolo, descrizione, data, tipo, prezzo, project_id) VALUES (?,?,?,?,?,?)";
  var params = [titolo, descrizione, data, tipo, prezzo, project_id];
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

//PATCH modifica documento
router.route("/edit/:documentId").patch(async (req, res) => {
  const documentId = req.params.documentId;
  const titolo = req.body.titolo;
  const descrizione = req.body.descrizione;
  const tipo = req.body.tipo
  const prezzo = req.body.prezzo
  var sql = `UPDATE document SET titolo = ?, descrizione = ?, tipo = ?, prezzo = ? WHERE id = "${documentId}"`;
  var params = [
    titolo,
    descrizione,
    tipo,
    prezzo
  ];
  db.run(sql,params , function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({
      message: "success"
    })
  });  
});

module.exports = router;
