const express = require("express");
const router = express.Router();
const db = require("../db.js");

// Get
router.route("/").get(async (req, res) => {
  db.serialize(function () {
    db.all(`SELECT * FROM project`, function (err, tables) {
      if (err) throw err;
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
      if (err) throw err;
      else {
        res.status(200).json(tables);
      }
    });
  });
});

//GET in base a chiave ricercata
router.route("/project/search/:keyword").get(async (req, res) => {
  const keyword = req.params.keyword;
  console.log(keyword);
  db.serialize(function () {
    db.all(
      `SELECT * FROM project WHERE titolo LIKE "%${keyword}%" OR descrizione LIKE "%${keyword}%"`,
      function (err, tables) {
        if (err) throw err;
        else {
          console.log(tables);
          res.status(200).json(tables);
        }
      }
    );
  });
});

//GET per ricerca avanzata con categoria
router.route("/advsearch/:keyword/category/:cat").get(async (req, res) => {
  const keyword = req.params.keyword;
  const category = req.params.cat;
  db.serialize(function () {
    db.all(
      `SELECT * FROM project WHERE categoria = "${category}" AND (titolo LIKE "%${keyword}%" OR descrizione LIKE "%${keyword}%")`,
      function (err, tables) {
        if (err) throw err;
        else {
          res.status(200).json(tables);
        }
      }
    );
  });
});

//GET per ricerca avanzata senza categoria
router.route("/advsearch/:keyword/withoutCat").get(async (req, res) => {
  const keyword = req.params.keyword;
  db.serialize(function () {
    db.all(
      `SELECT * FROM project WHERE titolo LIKE "%${keyword}%" OR descrizione LIKE "%${keyword}%"`,
      function (err, tables) {
        if (err) throw err;
        else {
          res.status(200).json(tables);
        }
      }
    );
  });
});

//GET condizionato dell'id dell'utente
router.route("/id/:id*").get(async (req, res) => {
  const id = req.params.id;
  db.serialize(function () {
    db.all(
      `SELECT * FROM project WHERE creatore_id = '${id}'`,
      function (err, tables) {
        if (err) throw err;
        else {
          res.status(200).json(tables);
        }
      }
    );
  });
});

// DELETE condizionato dell'id del progetto
router.route("/:id").delete(async (req, res) => {
  const id = req.params.id;
  db.serialize(function () {
    db.all(`DELETE FROM project WHERE id='${id}'`, function (err, tables) {
      if (err) throw err;
      else {
        res.status(200).json("deleted");
      }
    });
  });
});

//GET progetti in base alla categoria
router.route("/:category").get(async (req, res) => {
  const category = req.params.category;
  console.log(category);
  db.serialize(function () {
    db.all(
      `SELECT * FROM project WHERE categoria = '${category}'`,
      function (err, tables) {
        if (err) throw err;
        else {
          console.log(tables);
          res.status(200).json(tables);
        }
      }
    );
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
  var sql =
    "INSERT INTO project (titolo, categoria, creatore_id, descrizione, immagine, nome_creatore) VALUES (?,?,?,?,?,?)";
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
  const immagine = req.body.file_immagine;
  var sql = `UPDATE project SET titolo = ?, categoria = ?, descrizione = ?, immagine = ?, nome_creatore = ? WHERE id = "${projectId}"`;
  //var sql = `UPDATE project SET titolo = ${titolo}, categoria = ${categoria}, descrizione = ${descrizione}, immagine = ${immagine} , nome_creatore = ${nome_creatore} WHERE id = '${projectId}' `;
  var params = [titolo, categoria, descrizione, immagine, nome_creatore];
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

//POST donazione
router.route("/donation/:id").post(async (req, res) => {
  const id_progetto = req.params.id;
  const donatore = req.body.nome;
  const importo = req.body.importo;
  var sql =
    "INSERT INTO donazioni (id_progetto, donatore, importo) VALUES (?,?,?)";
  var params = [id_progetto, donatore, importo];
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

//GET donazioni
router.route("/project/:id/donation").get(async (req, res) => {
  const id_progetto = req.params.id;
  db.serialize(function () {
    db.all(
      `SELECT * FROM donazioni WHERE id_progetto = "${id_progetto}"`,
      function (err, tables) {
        if (err) throw err;
        else {
          let totale = 0;
          let lista = [];
          for (row of tables) {
            totale += row.importo;
            lista.push(row.donatore);
          }

          res.status(200).json({
            importo: totale,
            donatori: lista,
          });
        }
      }
    );
  });
});

//GET ifFollower
router.route("/project/:id/follow/:user").get(async (req, res) => {
  const id = req.params.id;
  const utente = req.params.user;
  db.serialize(function () {
    db.all(
      `SELECT * FROM follow WHERE progetto_id = "${id}" AND utente_id = "${utente}"`
    ),
      function (err, tables) {
        if (err) res.status(400);
        if (tables.length > 0) {
          res.status(200).json({ follow: true });
        } else res.status(200).json({ follow: false });
      };
  });
});

//POST follow progetto
router.route("/project/:id/follow").post(async (req, res) => {
  const id = req.params.id;
  const utente = req.body.utente;
  var sql = "INSERT INTO follow (progetto_id, utente_id) VALUES (?,?)";
  var params = [id, utente];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json("follow");
  });
});

//DELETE (unfollow) progetto
router.route("/project/:id/unfollow/:user").delete(async (req, res) => {
  const id_prog = req.params.id;
  const id_user = req.params.user;
  db.serialize(function () {
    db.all(
      `DELETE FROM follow WHERE progetto_id ='${id_prog}' AND utente_id ='${id_user}'`,
      function (err, tables) {
        if (err) throw err;
        else {
          res.status(200).json("deleted");
        }
      }
    );
  });
});

module.exports = router;
