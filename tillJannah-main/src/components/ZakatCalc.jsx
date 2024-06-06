import React, { useState } from "react";

const ZakatCalc = () => {
  const [income, setIncome] = useState("");
  const [zakatAmount, setZakatAmount] = useState(null);
  const nisab = 7818000; // Nisab zakat profesi per tahun dalam Rupiah
  const zakatRate = 0.025; // Tarif zakat 2.5%

  const calculateZakat = () => {
    if (isNaN(income) || income <= 0) {
      setZakatAmount("Silakan masukkan jumlah pendapatan yang valid.");
      return;
    }

    if (income < nisab) {
      setZakatAmount("Anda tidak wajib membayar zakat.");
      return;
    }

    const zakat = income * zakatRate;
    setZakatAmount(`Jumlah zakat yang harus dibayarkan: Rp ${zakat.toFixed(2)}`);
  };

  const clearFields = () => {
    setIncome("");
    setZakatAmount(null);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Zakat Calc</h1>
      <div className="mb-4">
        <label htmlFor="income" className="block mb-2">
          Pendapatan Bulanan (dalam Rupiah):
        </label>
        <input
          type="number"
          id="income"
          value={income}
          onChange={(e) => setIncome(parseFloat(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          min="0"
        />
      </div>
      <div className="flex gap-4">
        <button
          onClick={calculateZakat}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-blue-600"
        >
          Hitung Zakat
        </button>
        <button
          onClick={clearFields}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
        >
          Clear
        </button>
      </div>
      {zakatAmount && <p className="mt-4">{zakatAmount}</p>}
    </div>
  );
};

export default ZakatCalc;