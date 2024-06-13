import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Surah from '../module/Surah';
import '../index.css';
import Nav from '../components/Navbar';

const Quran = () => {
    const [surahs, setSurahs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSurah, setSelectedSurah] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/alquran/")
            .then((response) => {
                const sortedSurahs = response.data.sort((a, b) => a.number - b.number);
                setSurahs(sortedSurahs);
                if (sortedSurahs.length > 0) {
                    setSelectedSurah(sortedSurahs[0].number);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('API error:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleSurahChange = (newSurah) => {
        setSelectedSurah(newSurah);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Nav />
            <div className="__wrapper flex flex-col sm:flex-row justify-center p-5 m-5 rounded-md gap-5">
                <div className="__sidebar custom-scrollbar rounded-xl text-black p-5 overflow-y-scroll gap-5 h-[600px] w-full sm:w-[300px] sm:block hidden">
                    <ul className="space-y-2">
                        {surahs.map((surah) => (
                            <li key={surah.id} onClick={() => setSelectedSurah(surah.number)}>
                                <button className={`w-full text-left p-5 rounded-md ${selectedSurah === surah.number ? 'bg-green-700' : 'bg-green-500'}`}>
                                    {surah.number}. {surah.name_en}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="__content px-5 py-5 rounded-md shadow-lg w-full sm:w-auto">
                    {selectedSurah ? (
                        <Surah numberSurah={selectedSurah} onSurahChange={handleSurahChange} allSurahs={surahs} />
                    ) : (
                        <p>Unable to load</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Quran;