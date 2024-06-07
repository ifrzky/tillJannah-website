const mongoose = require("mongoose");
const colors = require("colors");
const Surat = require("../models/suratModel");
const Article = require("../models/articleModel");
const Jadwal = require("../models/jadwalModel");

const connectDB = async () => {
  try {
    process.env.TZ = "Asia/Jakarta";

    const conn = await mongoose.connect(
      "mongodb+srv://mevn-store:6R6M1bktghFc4xqv@mevn-store.gfsrlin.mongodb.net/tillJannah?retryWrites=true&w=majority&appName=mevn-store",
      {}
    );
    console.log(`MongoDB Connected`.cyan.underline.bold);

    // Inisialisasi model Surat
    await new Surat();
    await new Article();
    await new Jadwal();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
