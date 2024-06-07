const axios = require("axios");
const JadwalSholat = require("../models/jadwalModel"); // sesuaikan dengan path model Anda

const id = 1301;

const findJadwal = async (req, res) => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const date = `${year}-${month}-${day}`;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const tomorrow_day = String(tomorrow.getDate()).padStart(2, "0");
  const tomorrow_month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const tomorrow_year = tomorrow.getFullYear();
  const date2 = `${tomorrow_year}-${tomorrow_month}-${tomorrow_day}`;

  try {
    const [responseToday, responseTomorrow] = await Promise.all([
      axios.get(`https://api.myquran.com/v2/sholat/jadwal/${id}/${date}`),
      axios.get(`https://api.myquran.com/v2/sholat/jadwal/${id}/${date2}`),
    ]);

    if (!responseToday.data.status || !responseTomorrow.data.status) {
      throw new Error("Network response was not ok");
    }

    const todayData = responseToday.data.data.jadwal;
    const tomorrowData = responseTomorrow.data.data.jadwal;

    const jadwalData = {
      today: {
        tanggal: todayData.tanggal,
        subuh: todayData.subuh,
        terbit: todayData.terbit,
        dhuha: todayData.dhuha,
        dzuhur: todayData.dzuhur,
        ashar: todayData.ashar,
        maghrib: todayData.maghrib,
        isya: todayData.isya,
        date: todayData.date,
      },
      tomorrow: {
        tanggal: tomorrowData.tanggal,
        subuh: tomorrowData.subuh,
        terbit: tomorrowData.terbit,
        dhuha: tomorrowData.dhuha,
        dzuhur: tomorrowData.dzuhur,
        ashar: tomorrowData.ashar,
        maghrib: tomorrowData.maghrib,
        isya: tomorrowData.isya,
        date: tomorrowData.date,
      },
    };

    // Cek apakah data untuk hari ini sudah ada di database
    const existingData = await JadwalSholat.findOne({ "today.date": date });

    if (existingData) {
      // Update data existing
      await JadwalSholat.updateOne({ "today.date": date }, jadwalData);
    } else {
      // Insert new data
      const newJadwal = new JadwalSholat(jadwalData);
      await newJadwal.save();
    }

    res.json(jadwalData);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

module.exports = {
  findJadwal,
};
