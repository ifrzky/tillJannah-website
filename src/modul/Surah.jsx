import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Surah = ({ numberSurah, onSurahChange, allSurahs, handleSurahChange }) => {
    const [surah, setSurah] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [verses, setVerses] = useState([]);
    const [currentVerseIndex, setCurrentVerseIndex] = useState(0);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/api/alquran/${numberSurah}`)
            .then((response) => {
                console.log('Surah detail response:', response.data);
                setSurah(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('API error:', error);
                setError(error);
                setLoading(false);
            });
    }, [numberSurah]);

    useEffect(() => {
        if (numberSurah) {
            axios
                .get(`http://localhost:5000/api/alquran/ayat/${numberSurah}`)
                .then((response) => {
                    console.log('Surah verses response:', response.data);
                    setVerses(response.data);
                })
                .catch((error) => {
                    console.error('API error:', error);
                    setError(error);
                });
        }
    }, [numberSurah]);

    const handleNextVerse = () => {
        if (currentVerseIndex < verses.length - 1) {
            setCurrentVerseIndex((prevIndex) => (prevIndex + 1) % verses.length);
        } else {
            onSurahChange(numberSurah + 1);
        }
    };

    const handlePreviousVerse = () => {
        setCurrentVerseIndex((prevIndex) => (prevIndex - 1 + verses.length) % verses.length);
    };

    const handleVerseChange = (event) => {
        setCurrentVerseIndex(parseInt(event.target.value, 10));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='max-w-[1200px]'>
            {surah && (
                <div>
                    <div className='flex flex-row grow gap-2'>
                        <select 
                            className="flex grow rounded-md px-5 py-5 bg-green-700 text-white"
                            value={currentVerseIndex} 
                            onChange={handleVerseChange}
                        >
                            {verses.map((verse, index) => (
                                <option key={index} value={index}>
                                    {numberSurah}:{verse.ayah}
                                </option>
                            ))}
                        </select>
                        <select 
                                className="flex grow rounded-md p-5 bg-green-700 text-white"
                                value={numberSurah} 
                                onChange={handleSurahChange}
                            >
                                {allSurahs.map((surah) => (
                                    <option key={surah.number} value={surah.number}>
                                        {surah.number}. {surah.name_short} ({surah.name_en})
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className=''>
                        {verses.length > 0 && (
                            <div>
                                <div className='grid justify-items-end mx-5 my-5'>
                                    <p className='texl-xl'>{numberSurah}:{verses[currentVerseIndex].ayah}</p>
                                    <p className='my-5 text-3xl'>{verses[currentVerseIndex].arab}</p>
                                    <p>{verses[currentVerseIndex].text}</p>
                                    
                                </div>
                                <div className='flex flex-row-reverse gap-5'>
                                    <button className="rounded-md p-2 bg-green-600 hover:bg-green-700 text-white" 
                                        onClick={handleNextVerse} 
                                        disabled={currentVerseIndex === verses.length - 1}
                                    >
                                        {currentVerseIndex === verses.length - 1 ? 'Next Surah' : 'Next Ayat'}
                                    </button>
                                    <button className="rounded-md p-2 bg-green-600 hover:bg-green-700 text-white" 
                                        onClick={handlePreviousVerse} 
                                        disabled={currentVerseIndex === 0}
                                    >
                                        Previous Ayat
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='my-5 bg-white px-5 py-5 rounded-md'>
                        <h2 className='flex flex-row-reverse font-bold pb-5'>{surah.name_long} ({surah.translation_id})</h2>
                        <p>{surah.tafsir}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Surah;
