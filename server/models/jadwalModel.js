const mongoose = require("mongoose");

const waktuSchema = new mongoose.Schema(
  {
    tanggal: { type: String, required: true },
    subuh: { type: String, required: true },
    terbit: { type: String, required: true },
    dhuha: { type: String, required: true },
    dzuhur: { type: String, required: true },
    ashar: { type: String, required: true },
    maghrib: { type: String, required: true },
    isya: { type: String, required: true },
    date: { type: String, required: true },
  },
  { versionKey: false }
);

waktuSchema.method("toJSON", function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const jadwalSholatSchema = new mongoose.Schema(
  {
    today: { type: waktuSchema, required: true },
    tomorrow: { type: waktuSchema, required: true },
  },
  { versionKey: false }
);

jadwalSholatSchema.method("toJSON", function () {
  const { _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const JadwalSholat = mongoose.model("JadwalSholat", jadwalSholatSchema);

module.exports = JadwalSholat;
