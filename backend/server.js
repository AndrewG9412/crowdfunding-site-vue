const express = require("express");
const userRouter = require("./api");
//const sqlite3 = require("sqlite3").verbose();
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
//const bcrypt = require("bcryptjs");
var path = require('path');
const session = require("express-session");
var SQLiteStore = require("connect-sqlite3")(session);
//const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//const db = require("./db.js");


const server = express();
const host = "localhost";
const port = process.env.PORT || 3002;
//const env = process.env.NODE_ENV || "development";

//server in ascolto
server.listen(port, () =>
  console.log(`server in esecuzione su ${host}:${port} ...`)
);

server.use(cors()); // allow cors origins requests
server.use(express.json({ limit: "50mb" }));
server.use(express.urlencoded({ limit: "50mb" }));

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
  session({
    secret: "uniupo",
    resave: true,
    saveUninitialized: true,
    store: new SQLiteStore({ db: "db.sqlite", dir: "./" }),
  })
);
// server.use(cors({ origin: `http://localhost:8080`, credentials: true }));
// server.use(cors({origin: true, credentials: true}));
server.use(cookieParser("uniupo"));

server.use(passport.initialize());
server.use(passport.session());
server.use(express.static(path.join(__dirname, 'public')));
server.use(passport.authenticate('session'));
