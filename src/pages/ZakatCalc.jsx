import React, { useState, useRef } from "react";

const ZakatCalc = () => {
  const [income, setIncome] = useState("");
  const [formattedIncome, setFormattedIncome] = useState("");
  const [zakatAmount, setZakatAmount] = useState(null);
  const nisab = 7818000; // Nisab zakat profesi per tahun dalam Rupiah
  const zakatRate = 0.025; // Tarif zakat 2.5%
  const inputRef = useRef(null);

  const formatRupiah = (number) => {
    if (!number) return "";
    return new Intl.NumberFormat('id-ID').format(number).replace(/,/g, ".");
  };

  const handleIncomeChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setIncome(value);
    const formattedValue = formatRupiah(value);
    setFormattedIncome(formattedValue ? `Rp ${formattedValue}` : "");
  };

  const calculateZakat = () => {
    const numericIncome = parseFloat(income);
    if (isNaN(numericIncome) || numericIncome <= 0) {
      setZakatAmount("Silakan masukkan jumlah pendapatan yang valid.");
      return;
    }

    if (numericIncome < nisab) {
      setZakatAmount("Anda tidak wajib membayar zakat.");
      return;
    }

    const zakat = Math.round(numericIncome * zakatRate);
    setZakatAmount(`Jumlah zakat yang harus dibayarkan: Rp ${formatRupiah(zakat)}`);
  };

  const clearFields = () => {
    setIncome("");
    setFormattedIncome("");
    setZakatAmount(null);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 m-10 bg-gradient-to-r from-green-400 to-green-700 shadow-md rounded-lg text-white">
        <h1 className="text-4xl font-bold mb-6 text-center underline">Zakat Calculator</h1>
        <div className="flex flex-col lg:flex-row items-center mb-6">
          <img src="src/assets/__5064641.png" className="w-full h-80 mr-6" />
          <div className="flex flex-col justify-center">
            <p className="mb-5 text-center">
              "Ambillah zakat dari sebagian harta mereka, dengan zakat itu kamu membersihkan dan mensucikan mereka..." 
              <br />(QS. At-Taubah: 103).
            </p>
            <p>
              Jika pendapatan bersih bulanan mencapai atau melebihi nisab (setara dengan 85 gram emas), maka zakat sebesar 2,5% dari pendapatan bersih harus dikeluarkan. Misalnya, jika pendapatan bersih bulanan adalah Rp10.000.000, maka zakat yang harus dikeluarkan adalah Rp250.000.
            </p>
            <div className="mt-4">
              <label htmlFor="income" className="block mb-2 text-lg font-bold">
                Pendapatan Bulanan (dalam Rupiah):
              </label>
              <input
                type="text"
                id="income"
                value={formattedIncome}
                onChange={handleIncomeChange}
                className="w-full p-3 mb-4 text-black border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                ref={inputRef}
              />
              <div className="flex justify-center gap-4"> 
                <button
                  onClick={calculateZakat}
                  className="flex items-center bg-gold text-black px-4 py-2 rounded-md hover:font-bold focus:outline-none"
                >
                  Hitung Zakat
                </button>
                <button
                  onClick={clearFields}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
        {zakatAmount && (
          <p className="mt-6 text-center text-lg">
            {zakatAmount}
          </p>
        )}
      </div>
    </>
  );
};

export default ZakatCalc;
