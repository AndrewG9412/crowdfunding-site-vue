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
    db.all(
      `SELECT * FROM document WHERE id = "${documentId}"`,
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

//GET condizionato da projectId
router.route("/:project_id").get(async (req, res) => {
  const projectId = req.params.project_id;
  db.serialize(function () {
    db.all(
      `SELECT * FROM document where project_id = "${projectId}" ORDER BY data`,
      function (err, tables) {
        if (err) throw err;
        else {
          res.status(200).json(tables);
        }
      }
    );
  });
});

//GET in base a chiave ricercata
router.route("/document/search/:keyword").get(async (req, res) => {
  const keyword = req.params.keyword;
  console.log(keyword);
  db.serialize(function () {
    db.all(
      `SELECT * FROM document WHERE titolo LIKE "%${keyword}%" OR descrizione LIKE "%${keyword}%"`,
      function (err, tables) {
        if (err) throw err;
        else {
          res.status(200).json(tables);
        }
      }
    );
  });
});

//GET ricerca avanzata con categoria
router.route("/advsearch/:keyword/category/:cat").get(async (req, res) => {
  const keyword = req.params.keyword;
  const category = req.params.cat;
  db.serialize(function () {
    db.all(
      `SELECT document.id, document.titolo, document.descrizione, document.data, document.tipo, document.prezzo FROM document LEFT JOIN project ON document.project_id=project.id WHERE project.categoria = "${category}" AND (document.titolo LIKE "%${keyword}%" OR document.descrizione LIKE "%${keyword}%")`,
      function (err, tables) {
        if (err) throw err;
        else {
          res.status(200).json(tables);
        }
      }
    );
  });
});

//GET ricerca avanzata senza categoria
router.route("/advsearch/:keyword/withoutCat").get(async (req, res) => {
  const keyword = req.params.keyword;
  db.serialize(function () {
    db.all(
      `SELECT * FROM document WHERE titolo LIKE "%${keyword}%" OR descrizione LIKE "%${keyword}%"`,
      function (err, tables) {
        if (err) throw err;
        else {
          res.status(200).json(tables);
        }
      }
    );
  });
});


//GET di documento acquistato da userId
router.route("/document/:id/userId/:user").get(async (req, res) => {
  const documentId = req.params.id;
  const userId = req.params.user;
  db.serialize(function () {
    db.all(
      `SELECT * FROM possesso WHERE id_documento = "${documentId}" AND id_utente = "${userId}"`,
      function (err, tables) {
        if (err) throw err;
        else {
          console.log(tables);
          if (tables.length == 1) res.status(200).json({ risultato: true });
          else res.status(200).json({ risultato: false });
        }
      }
    );
  });
});

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
  const tipo = req.body.tipo;
  const prezzo = req.body.prezzo;
  var sql = `UPDATE document SET titolo = ?, descrizione = ?, tipo = ?, prezzo = ? WHERE id = "${documentId}"`;
  var params = [titolo, descrizione, tipo, prezzo];
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

//DELETE documento
router.route("/document/:id/delete",).delete(async (req, res) => {
  const id = req.params.id;
  db.serialize(function () {
    db.all(`DELETE FROM document WHERE id='${id}'`, function (err, tables) {
        if(err) res.status(400);
        else {
          res.status(200).json('deleted');
        }
    });
  });
});

//POST acquisto documento
router.route("/document/buydoc").post(async (req, res) => {
  const docId = req.body.docId;
  const userId = req.body.userId;
  var sql = `INSERT INTO possesso (id_documento, id_utente) VALUES (?,?)`;
  var params = [docId, userId];
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

//POST commento
router.route("/document/:id/comment").post(async (req, res) => {
  const id = req.params.id;
  const autore = req.body.autore;
  const commento = req.body.commento;
  const user = req.body.id_user;
  var sql = `INSERT INTO commento (id_documento, autore, commento, id_autore) VALUES (?, ?, ?, ?)`;
  var params = [id, autore, commento, user];
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

//GET commenti di un documento
router.route("/document/comments/:id").get(async (req, res) => {
  const id = req.params.id;
  db.serialize(function () {
    db.all(
      `SELECT * FROM commento WHERE id_documento = "${id}"`,
      function (err, tables) {
        if (err) res.status(400);
        else {
          res.status(200).json(tables);
        }
      }
    );
  });
});

//GET specifico commento
router.route("/document/comment/:id").get(async (req, res) => {
  const id = req.params.id;
  db.serialize(function () {
    db.all(
      `SELECT * FROM commento WHERE id = "${id}"`,
      function (err, tables) {
        if (err) res.status(400);
        else {
          res.status(200).json(tables);
        }
      }
    );
  });
});

//PATCH modifica commento 
router.route("/document/editComment/:id").patch(async (req, res) => {
  const idCommento = req.params.id;
  const autore = req.body.autore;
  const commento = req.body.commento;
  var sql = `UPDATE commento SET autore = ?, commento = ? WHERE id = "${idCommento}"`;
  var params = [autore, commento];
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


//GET commenti in base a documento
router.route("/document/:id/comments").get(async (req, res) => {
  const id = req.params.id;
  db.serialize(function () {
    db.all(
      `SELECT * FROM commento WHERE id_documento = "${id}"`,
      function (err, tables) {
        if (err) res.status(400);
        else {
          res.status(200).json(tables);
        }
      }
    );
  });
});

//DELETE commento in base a id
router.route("/document/comment/:id/delete").delete(async (req, res) => {
  const id = req.params.id;
  db.serialize(function () {
    db.all(`DELETE FROM commento WHERE id='${id}'`, function (err, tables) {
        if(err) res.status(400);
        else {
          res.status(200).json('deleted');
        }
    });
  });
})

//GET ifFavorite
router.route("/document/:id/favorite/:user").get(async (req, res) => {
  const id = req.params.id;
  const utente = req.params.user;
  db.serialize(function () {
    db.all(
      `SELECT * FROM favorite WHERE id_documento = "${id}" AND id_utente = "${utente}"`
    ,
      function (err, tables) {
        console.log(tables);
        if (err) res.status(400);
        if (tables.length > 0) {
          res.status(200).json({ favorite: true });
          
        }
        res.status(200).json({ favorite: false });
      });
  });
});

//POST documento preferito
router.route("/document/:id/favorite").post(async (req, res) => {
  const id = req.params.id;
  const utente = req.body.utente;
  var sql = "INSERT INTO favorite (id_documento, id_utente) VALUES (?,?)";
  var params = [id, utente];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json("favorite");
  });
});

//DELETE (unfollow) progetto
router.route("/document/:id/unfavorite/:user").delete(async (req, res) => {
  const id_prog = req.params.id;
  const id_user = req.params.user;
  db.serialize(function () {
    db.all(
      `DELETE FROM favorite WHERE id_documento ='${id_prog}' AND id_utente ='${id_user}'`,
      function (err, tables) {
        if (err) throw err;
        else {
          res.status(200).json("deleted");
        }
      }
    );
  });
});

//GET documenti preferiti da utente
router.route("/favorites/:id").get(async (req, res) => {
  const user = req.params.id;
  db.serialize(function () {
    db.all(
      `SELECT document.titolo, document.descrizione, document.id FROM document LEFT JOIN favorite ON document.id=favorite.id_documento WHERE favorite.id_utente = "${user}"`
    ),
      function (err, tables) {
        if (err) res.status(400);
        res.status(200).json(tables);
      };
  });
});

//GET documenti acquistati da utente
router.route("/buyed/:id").get(async (req, res) => {
  const user = req.params.id;
  db.serialize(function () {
    db.all(
      `SELECT document.titolo, document.descrizione, document.id FROM document LEFT JOIN possesso ON document.id=possesso.id_documento WHERE possesso.id_utente = "${user}"`
    ),
      function (err, tables) {
        if (err) res.status(400);
        res.status(200).json(tables);
      };
  });
});


module.exports = router;
