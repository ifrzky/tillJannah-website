const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  findAll,
  findDetail,
  createArticle,
} = require("../controllers/articleController");

router.get("/", findAll);
router.get("/:id", findDetail);
router.post("/create", protect, createArticle);

module.exports = router;
