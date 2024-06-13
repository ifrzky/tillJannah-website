import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook } from 'react-icons/fa';

const Hero = () => {
    return (
        <div className="__wrapper">
            <section className="relative flex flex-wrap justify-center items-center shadow-md bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 lg:rounded-md sm:m-0 lg:m-10 h-[650px] text-white overflow-hidden">
                <div className="__content_wrapper flex flex-row items-center gap-5 p-20 z-10">
                    <div>
                        <h1 className="text-6xl font-bold">Till Jannah</h1>
                        <p className="text-2xl mt-4">The best app for muslims</p>
                        <p className="text-xl mt-4">Sudahkah Anda membaca Al-Quran hari ini?</p>
                        <Link className="text-xl hover:text-green-900 mt-5 text-[#057D2B] flex items-center" to="/quran">
                            <FaBook className="text-2xl mr-2" />
                            Mulai Membaca Quran
                        </Link>
                    </div>
                </div>
                <img
                    src="src/assets/10337577.png"
                    alt="Islamic Decoration"
                    className="w-full sm:h-full lg:h-[900px] top-0 absolute z-0 object-cover"
                />
            </section>
        </div>
    );
}

export default Hero;