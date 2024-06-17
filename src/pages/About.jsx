// About.jsx
import React from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Navbar';
import '../index.css';
import { useEffect } from 'react';
import AOS from 'aos';

const About = () => {
    useEffect(() => {
        AOS.init({ duration: 1500 });
    }, []);

    return (
        <>
        <Nav />
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold m-10 text-center">Tentang Pengembang</h2>
            <div className="flex flex-wrap justify-center" data-aos="fade-up">
                <div className="w-full md:w-1/3 flex flex-col items-center p-4">
                    <div className="bg-gray-300 w-60 h-60 mb-4 rounded-lg overflow-hidden flex items-center justify-center developer-img">
                        <img src="src/assets/AkbarKeren.png" alt="caboel" className="w-full h-full object-cover" />
                    </div>
                    <h2 className='font-bold text-2xl m-3'>M. Akbar Muzaky Nur</h2>
                    <p className="text-center font-bold m-2">Pemuka Agama</p>
                    <p className="text-center italic">"... Saya memastikan setiap fitur memiliki nilai Islami yang kuat."</p>
                </div>
                <div className="w-full md:w-1/3 flex flex-col items-center p-4">
                    <div className="bg-gray-300 w-60 h-60 mb-4 rounded-lg overflow-hidden flex items-center justify-center developer-img">
                        <img src="src/assets/HarySlebew.png" alt="backend" className="w-full h-full object-cover" />
                    </div>
                    <h2 className='font-bold text-2xl m-3'>Hary Capri</h2>
                    <p className="text-center font-bold m-2">Back-End Developer</p>
                    <p className="text-center italic">"... Keutamaan web adalah performa yang optimal dan keamanan sistem."</p>
                </div>
                <div className="w-full md:w-1/3 flex flex-col items-center p-4">
                    <div className="bg-gray-300 w-60 h-60 mb-4 rounded-lg overflow-hidden flex items-center justify-center developer-img">
                        <img src="src/assets/m.png" alt="frontend" className="w-full h-[320px] mb-[75px] object-cover brightness-150" />
                    </div>
                    <h2 className='font-bold text-2xl m-3'>Miftah Rizky Aulia</h2>
                    <p className="text-center font-bold m-2">Front-End Developer</p>
                    <p className="text-center italic">"...Memastikan antarmuka yang ramah pengguna dan responsif."</p>
                </div>
            </div>
            <div className="my-10 rounded-lg p-10 text-white border-b-2 bg-gradient-to-r from-green-400 to-green-700" data-aos="fade-up">
                <h1 className="text-3xl font-bold mb-6 text-center">Tentang Till Jannah</h1>
                <p className="mb-6 text-center text-xl items-center justify-center">
                    Till Jannah adalah sebuah platform digital yang bertujuan untuk mendukung kebangkitan dan modernisasi Islam. Dengan menggunakan teknologi web terkini, Till Jannah menyediakan berbagai informasi dan sumber daya Islami yang dapat diakses oleh jutaan orang di seluruh dunia tanpa batasan geografis.
                </p>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default About;
