const express = require("express");
const {
  authUser,
  registerUser,
  updateUserProfile,
  getUserArticles,
} = require("../controllers/userController.js");
const { protect } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.route("/register").post(registerUser);
router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);
router.route("/userArticles").get(protect, getUserArticles);

module.exports = router;
