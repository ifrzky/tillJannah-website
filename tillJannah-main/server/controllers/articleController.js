const axios = require("axios");
const article = require("../models/articleModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const now = new Date();
const day = String(now.getDate()).padStart(2, "0");
const month = String(now.getMonth() + 1).padStart(2, "0");
const year = now.getFullYear();

const findAll = (req, res) => {
  article
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error fetching data", error: err.message });
    });
};

const findDetail = (req, res) => {
  const { id } = req.params;
  article
    .findOne({ _id: id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error fetching data", error: err.message });
    });
};

const createArticle = asyncHandler(async (req, res) => {
  const { title, thumbnail, categories, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error("Title and content are required");
  }

  // Mengambil nama pengguna dari objek req.user
  const author = req.user.name;
  const date = `${day}-${month}-${year}`;

  const newArticle = new article({
    date,
    thumbnail,
    author,
    title,
    categories,
    content,
  });

  const createdArticle = await newArticle.save();

  await User.findByIdAndUpdate(
    req.user._id,
    { $push: { ownArticle: createdArticle._id } },
    { new: true }
  );
  res.status(201).json(createdArticle);
});

module.exports = {
  findAll,
  findDetail,
  createArticle,
};
