const express = require("express");
const router = express.Router();

// Get
router.route("/").get(async (req, res) => {
  try {
    res.status(200).json();
  } catch (e) {
    res.status(500).json(e);
  }
});

router.route("/create").post(async (req, res) => {
  try {
    res.status(200).json();
  } catch (e) {
    res.status(500).json(e);
  }
});

router.route("/modify").put(async (req, res) => {
  try {
    res.status(200).json();
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;