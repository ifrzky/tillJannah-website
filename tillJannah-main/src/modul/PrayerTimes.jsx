import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaRegSun,
  FaRegMoon,
  FaSun,
  FaCloudSun,
  FaCloudMoon,
} from "react-icons/fa";

const PrayerTimes = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/sholat/")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const prayerData = [
    {
      date: { readable: data.today.tanggal },
      timings: {
        Fajr: { time: data.today.subuh, icon: <FaRegMoon /> },
        Sunrise: { time: data.today.terbit, icon: <FaRegSun /> },
        Dhuhr: { time: data.today.dzuhur, icon: <FaSun /> },
        Asr: { time: data.today.ashar, icon: <FaCloudSun /> },
        Maghrib: { time: data.today.maghrib, icon: <FaCloudMoon /> },
        Isha: { time: data.today.isya, icon: <FaRegMoon /> },
      },
    },
    {
      date: { readable: data.tomorrow.tanggal },
      timings: {
        Fajr: { time: data.tomorrow.subuh, icon: <FaRegMoon /> },
        Sunrise: { time: data.tomorrow.terbit, icon: <FaRegSun /> },
        Dhuhr: { time: data.tomorrow.dzuhur, icon: <FaSun /> },
        Asr: { time: data.tomorrow.ashar, icon: <FaCloudSun /> },
        Maghrib: { time: data.tomorrow.maghrib, icon: <FaCloudMoon /> },
        Isha: { time: data.tomorrow.isya, icon: <FaRegMoon /> },
      },
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Prayer Times</h1>
      {prayerData.map((day, index) => (
        <div key={index} className="mb-8">
          <div
            key={index}
            className="mb-4 px-5 py-5 h-fit bg-green-500 text-white rounded-lg"
          >
            <p className="font-bold text-xl px-5 pb-3">{day.date.readable}</p>
            <div className="flex flex-col flex-wrap">
              <ul className="list-disc mx-5 my-5 flex flex-wrap gap-5 justify-center items-center">
                {Object.entries(day.timings).map(
                  ([prayer, { time, icon }], index) => (
                    <div key={index} className="flex">
                      <li className="mb-1 flex flex-col bg-green-600 rounded-md px-5 py-5 justify-center items-center">
                        <div className="mr-2 flex">{icon}</div>
                        <div>
                          <h1 className="font-bold text-center">{prayer}</h1>
                          <div>{time}</div>
                        </div>
                      </li>
                    </div>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrayerTimes;
