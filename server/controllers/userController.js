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
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    req.flash("flash_message", "User Not Found");
    res.status(404).json({ message: "User Not Found" });
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
