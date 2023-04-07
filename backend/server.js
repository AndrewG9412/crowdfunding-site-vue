const express = require("express");
const userRouter = require("./api");
const sqlite3 = require("sqlite3").verbose();
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const session = require("express-session");
//const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./db.js");
//import User from "./sequelize";

const server = express();
const host = "localhost";
const port = process.env.PORT || 3002;
const env = process.env.NODE_ENV || "development";

//server in ascolto
server.listen(port, () =>
  console.log(`server in esecuzione su ${host}:${port} ...`)
);

server.use(cors()); // user cors
server.use(express.json());

//middleware
server.use("/api", userRouter);
// server.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
//   res.setHeader("Access-Control-Allow-Headers", "*" );
//   next();
// // });
// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: false }));
server.use(
  session({ secret: "uniupo", resave: true, saveUninitialized: true })
);
// server.use(cors({ origin: `http://localhost:8080`, credentials: true }));
// server.use(cors({origin: true, credentials: true}));
server.use(cookieParser("uniupo"));

server.use(passport.initialize());
server.use(passport.session());

// //route

// server.get("/", (req, res, next) => {
//   res.json({ message: "Benvenuto" });
// });



// server.get("/users", (req, res, next) => {
//   var sql = "select * from user";
//   var params = [];
//   db.all(sql, params, (err, rows) => {
//     if (err) {
//       res.status(400).json({ errore: err.message });
//       return;
//     }
//     res.json({
//       message: "successo",
//       data: rows,
//     });
//   });
// });

// server.get("/users/:id", (req, res, next) => {
//   var sql = "select * from user where id = ?";
//   var params = [req.params.id];
//   db.get(sql, params, (err, row) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: "successo",
//       data: row,
//     });
//   });
// });



// server.patch("/users/:id", async (req, res) => {
//   const id = await db.updateUser(req.params.id, req.body);
//   res.status(200).json({ id });
// });

// server.put("/projects/:id", async (req, res) => {
//   //aggiungi documento
// });

// server.get("/projects", async (req, res) => {
//   //scarica progetti
// });

// passport.use(
//   new passportLocal(function (email, password, done) {
//     done.getUser(email).then((user) => {
//       if (!user) {
//         return done(null, false, { message: "Email sbagliata" });
//       }
//       if (!user.checkPassword(password)) {
//         return done(null, false, { message: "password sbagliata" });
//       }
//       return done(null, user);
//     });
//   })
// );
