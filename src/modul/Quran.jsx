import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Surah from './Surah';
import '../index.css';

const Quran = () => {
    const [surahs, setSurahs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSurah, setSelectedSurah] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/alquran/")
            .then((response) => {
                console.log('API response:', response.data);
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
        <div className="__wrapper flex justify-center p-5 m-5 rounded-md gap-5">
            <div className="__sidebar rounded-md bg-green-500 text-white p-5 overflow-y-scroll gap-5 h-[600px] w-[300px]">
                <ul className='space-y-2'>
                    {surahs.map((surah) => (
                        <li key={surah.id} onClick={() => setSelectedSurah(surah.number)}>
                            <button className={`bg-green-600 text-white w-full text-left p-5 rounded-md ${selectedSurah === surah.number ? 'bg-green-700' : ''}`}>
                                {surah.number}. {surah.name_en}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="__content px-5 py-5 bg-green-500 rounded-md shadow-lg">
                {selectedSurah ? (
                    <Surah numberSurah={selectedSurah} onSurahChange={handleSurahChange} allSurahs={surahs} />
                ) : (
                    <p>Unable to loads</p>
                )}
            </div>
        </div>
    );
}

export default Quran;
