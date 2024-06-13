const axios = require("axios");

const date = new Date();
const month = date.getMonth() + 1;
const findkalender = async (req, res) => {
  const { month, year } = req.body;
  try {
    const response = await axios.get(
      `https://api.aladhan.com/v1/gToHCalendar/${month}/${year}`
    );
    if (!response.data.status) {
      throw new Error("Network response was not ok");
    }
    res.json({
      data: response.data.data,
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
