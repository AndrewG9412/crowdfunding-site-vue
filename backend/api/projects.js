const express = require("express");
const router = express.Router();
const db = require("../db.js");

// Get
router.route("/").get(async (req, res) => {
  db.serialize(function () {
    db.all(`SELECT * FROM project`, function (err, tables) {
        if(err) throw err;
        else {
          res.status(200).json(tables);
        }
    });
  });
});

// GET condizionato dell' id del progetto
router.route("/project/:id").get(async (req, res) => {
  const id = req.params.id;
  db.serialize(function () {
    db.all(`SELECT * FROM project WHERE id = ${id}`, function (err, tables) {
        if(err) throw err;
        else {
          res.status(200).json(tables);
        }
    });
  });
});

//GET in base a chiave ricercata
router.route("/project/search/:keyword").get(async (req,res) => {
  const keyword = req.params.keyword;
  console.log(keyword);
  db.serialize(function (){
    db.all(`SELECT * FROM project WHERE titolo LIKE "%${keyword}%" OR descrizione LIKE "%${keyword}%"`, function (err, tables){
      if (err) throw err;
      else {
        console.log(tables);
        res.status(200).json(tables);
      }
    });
  });
});

//GET per ricerca avanzata
router.route("/advsearch/:keyword/category/:cat").get(async (req,res) => {
  const keyword = req.params.keyword;
  const category = req.params.cat;
  db.serialize(function (){
    db.all(`SELECT * FROM project WHERE categoria = "${category}" AND (titolo LIKE "%${keyword}%" OR descrizione LIKE "%${keyword}%")`, function (err, tables){
      if (err) throw err;
      else {
        res.status(200).json(tables);
      }
    });
  });
});


//GET condizionato dell'id dell'utente
router.route("/id/:id*").get(async (req, res) => {
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
  db.serialize(function () {
    db.all(`DELETE FROM project WHERE id='${id}'`, function (err, tables) {
        if(err) throw err;
        else {
          res.status(200).json('deleted');
        }
    });
  });
});

//GET progetti in base alla categoria
router.route("/:category").get(async (req, res) => {
  const category = req.params.category;
  console.log(category);
  db.serialize(function () {
    db.all(`SELECT * FROM project WHERE categoria = '${category}'`, function (err, tables) {
        if(err) throw err;
        else {
          console.log(tables);
          res.status(200).json(tables);
        }
    });
  });
});

//POST creazione progetto
router.route("/create").post(async (req, res) => {
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


//PATCH modifica progetto
router.route("/edit/:projectId").patch(async (req, res) => {
    const projectId = req.params.projectId;
    const titolo = req.body.titolo;
    const categoria = req.body.categoria;
    const nome_creatore = req.body.nome_creatore;
    const descrizione = req.body.descrizione;
    const immagine = req.body.file_immagine
    var sql = `UPDATE project SET titolo = ?, categoria = ?, descrizione = ?, immagine = ?, nome_creatore = ? WHERE id = "${projectId}"`;
    //var sql = `UPDATE project SET titolo = ${titolo}, categoria = ${categoria}, descrizione = ${descrizione}, immagine = ${immagine} , nome_creatore = ${nome_creatore} WHERE id = '${projectId}' `;
    var params = [
      titolo,
      categoria,
      descrizione,
      immagine,
      nome_creatore,
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

//POST follow progetto
router.route("/project/:id/follow").post(async (req, res) => {
  const id = req.params.id;
  const utente = req.body.utente;
  var sql = "INSERT INTO follow (progetto_id, utente_id) VALUES (?,?)";
  var params = [
    id,
    utente,
  ];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({
      message: "success",
    });
  });
});

module.exports = router;