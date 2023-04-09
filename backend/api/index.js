const express = require("express");
const router = express.Router();
const users = require('./users');
const projects = require('./projects');
const documents = require('./documents');

router.use("/users", users);
router.use("/projects", projects);
router.use("/documents", documents);

module.exports = router;