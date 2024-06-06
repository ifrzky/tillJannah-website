const express = require("express");
const router = express.Router();

const {
  findAllSurat,
  findSurat,
  findAyat,
} = require("../controllers/alquranController");

router.get("/", findAllSurat);
router.get("/:numberSurat", findSurat);
router.get("/ayat/:numberSurat", findAyat);

module.exports = router;
