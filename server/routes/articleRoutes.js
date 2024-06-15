const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  findAll,
  findDetail,
  createArticle,
  deleteArticles,
  updateArticle,
} = require("../controllers/articleController");

router.get("/", findAll);
router.get("/:id", findDetail);
router.post("/create", protect, createArticle);
router.put("/update/:id", protect, updateArticle);
router.delete("/delete", protect, deleteArticles);

module.exports = router;
