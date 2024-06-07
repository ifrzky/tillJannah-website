const express = require("express");
const router = express.Router();
const { findJadwal } = require("../controllers/jadwalController");

router.get("/", findJadwal);

module.exports = router;
