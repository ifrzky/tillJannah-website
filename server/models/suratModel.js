const mongoose = require("mongoose");

const schema = mongoose.Schema({
  audio_url: String,
  name_en: String,
  name_id: String,
  name_long: String,
  name_short: String,
  number: String,
  number_of_verses: String,
  revelation: String,
  revelation_en: String,
  revelation_id: String,
  sequence: String,
  tafsir: String,
  translation_en: String,
  translation_id: String,
});

schema.method("toJSON", function () {
  const { _v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("surat", schema);
