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

const deleteArticles = asyncHandler(async (req, res) => {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    res.status(400);
    throw new Error(
      "Invalid input: ids is required and must be an array of IDs"
    );
  }

  try {
    const result = await article.deleteMany({ _id: { $in: ids } });
    res
      .status(200)
      .json({ message: `${result.deletedCount} articles deleted.` });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting articles", error: err.message });
  }
});

const updateArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, categories, thumbnail } = req.body;

  try {
    const updatedArticle = await article.findByIdAndUpdate(
      id,
      { title, content, categories, thumbnail },
      { new: true }
    );

    if (!updatedArticle) {
      res.status(404);
      throw new Error("Article not found");
    }

    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500);
    throw new Error("Error updating article: " + error.message);
  }
});

module.exports = {
  findAll,
  findDetail,
  createArticle,
  deleteArticles,
  updateArticle,
};
