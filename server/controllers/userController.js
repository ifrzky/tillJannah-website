const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const generateToken = require("../utils/generateToken.js");
const Article = require("../models/articleModel.js");

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // Perbarui waktu login pengguna
    user.timeLogin = new Date();
    await user.save();

    req.session.user_id = user._id;

    const message = "Login successful";
    req.flash("flash_message", message);
    res.json({
      _id: user._id,
      name: user.name,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth.toISOString().split("T")[0], // Format dateOfBirth
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
      flash_message: message,
    });
  } else {
    const message = "Invalid Email or Password";
    req.flash("flash_message", message);
    res.status(401).json({ message });
  }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, gender, dateOfBirth, email, password, pic } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    const message = "User already exists";
    req.flash("flash_message", message);
    return res.status(404).json({ message });
  }

  let profilePic = pic;
  if (!pic) {
    if (gender === "Laki-laki") {
      profilePic = "https://cdn-icons-png.flaticon.com/128/4264/4264711.png";
    } else if (gender === "Perempuan") {
      profilePic = "https://cdn-icons-png.flaticon.com/128/7923/7923856.png";
    }
  }

  const user = await User.create({
    name,
    gender,
    dateOfBirth,
    email,
    password,
    pic: profilePic,
  });

  if (user) {
    req.session.user_id = user._id; // Set user_id in session
    const message = "Registration successful";
    req.flash("flash_message", message);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth.toISOString().split("T")[0], // Format dateOfBirth
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
      flash_message: message,
    });
  } else {
    const message = "User not found";
    req.flash("flash_message", message);
    res.status(400).json({ message });
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const userID = req.user._id;
  const updateData = {};
  if (req.body.name) updateData.name = req.body.name;
  if (req.body.email) updateData.email = req.body.email;
  if (req.body.gender) updateData.gender = req.body.gender;
  if (req.body.dateOfBirth) updateData.dateOfBirth = req.body.dateOfBirth;
  const updateUser = await User.findByIdAndUpdate(userID, updateData, {
    new: true,
  });
  if (updateUser) {
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      gender: updateUser.gender,
      dateOfBirth: updateUser.dateOfBirth.toISOString().split("T")[0],
      pic: updateUser.pic,
      token: generateToken(updateUser._id),
    });
  } else {
    req.flash("flash_message", "User not found");
    res.status(404).json({ message: "User not found" });
  }
});

// @desc    GET user articles
// @route   GET /api/users/articles
// @access  Private
const getUserArticles = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("ownArticle");
  const article = await Article.find({ _id: { $in: user.ownArticle } });

  if (user) {
    res.json(article);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { authUser, updateUserProfile, registerUser, getUserArticles };
