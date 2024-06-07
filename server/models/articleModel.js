const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  _id: false,
  name: String,
});

const schema = mongoose.Schema(
  {
    date: String,
    thumbnail: String,
    author: {
      type: String,
      required: true,
    },
    title: String,
    categories: [categorySchema],
    content: String,
  },
  {
    versionKey: false, // Set versionKey option to false
  }
);

schema.method("toJSON", function () {
  const { _v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("article", schema);
