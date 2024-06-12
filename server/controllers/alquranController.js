const axios = require("axios");
const surat = require("../models/suratModel");

const findAllSurat = (req, res) => {
  surat
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

const findSurat = async (req, res) => {
  const { numberSurat } = req.params;

  surat
    .findOne({ number: numberSurat })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Error fetching data", error: err.message });
    });
};

const findAyat = async (req, res) => {
  const { numberSurat } = req.params;

  try {
    // Dapatkan informasi surat terlebih dahulu dari database
    const suratInfo = await surat.findOne({ number: numberSurat });
    if (!suratInfo) {
      return res.status(404).json({ message: "Surat not found" });
    }

    const numberOfVerses = parseInt(suratInfo.number_of_verses, 10);

    // Variabel untuk menyimpan semua ayat
    let allAyat = [];

    // Loop untuk mengambil semua ayat dalam batch 30 ayat
    for (let i = 1; i <= numberOfVerses; i += 30) {
      const batchSize = Math.min(30, numberOfVerses - i + 1);
      const ayatResponse = await axios.get(
        `https://api.myquran.com/v2/quran/ayat/${numberSurat}/${i}/${batchSize}`
      );
      if (!ayatResponse.data.status) {
        throw new Error("Network response was not ok");
      }

      allAyat = allAyat.concat(ayatResponse.data.data);
    }

    res.json(allAyat);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

module.exports = {
  findAllSurat,
  findSurat,
  findAyat,
};
