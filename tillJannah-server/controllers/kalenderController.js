const axios = require("axios");

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

const findkalender = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.myquran.com/v2/cal/hijr/${date}/adj=-1`
    );
    const response2 = await axios.get(
      `https://api.myquran.com/v2/cal/hijr/${date2}/adj=-1`
    );
    if (!response.data.status && !response2.data.status) {
      throw new Error("Network response was not ok");
    }
    res.json({
      today: response.data.data.date,
      tomorrow: response2.data.data.date,
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

module.exports = {
  findkalender,
};
