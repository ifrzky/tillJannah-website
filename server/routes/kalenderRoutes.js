const express = require("express");
const router = express.Router();
const { findkalender } = require("../controllers/kalenderController");

router.get("/", findkalender);

module.exports = router;
