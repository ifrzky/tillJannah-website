const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(?=.*[A-Z])(?=.*\W).{8,}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid password! Password must be at least 8 characters long, contain at least one uppercase letter and one symbol.`,
      },
    },
    gender: {
      type: String,
      required: true,
      enum: ["Laki-laki", "Perempuan"],
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    pic: {
      type: String,
      required: true,
      default: "https://icon-library.com/icon/male-icon-5.html",
    },
    ownArticle: [
      {
        type: String,
        default: [], // default value is an empty array
      },
    ],
    timeCreated: {
      type: Date,
      default: Date.now,
    },
    timeLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        // Format dateOfBirth as YYYY-MM-DD
        if (ret.dateOfBirth) {
          ret.dateOfBirth = ret.dateOfBirth.toISOString().split("T")[0];
        }
        return ret;
      },
    },
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// will encrypt password everytime its saved
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
