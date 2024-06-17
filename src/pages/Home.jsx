// Home.jsx
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Card from '../components/Card';
import Footer from '../components/Footer';
import PrayerTimes from '../module/PrayerTimes';
import ZakatCalc from './ZakatCalc';
import Kalender from '../module/Kalender';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <>
      <Navbar />
      <div className='__wrapper justify-center items-center min-h-screen bg-primary'>
        <section className='home' data-aos='fade-up'>
          <Hero />
        </section>
        <h1 className='text-6xl my-20 font-bold text-center mb-5'>Melihat Jadwal Salat</h1>
        <section className='__prayertime px-10 py-10 flex flex-col md:flex-row justify-center' data-aos='fade-up'>
          <div className='flex' data-aos="fade-right">
            <Kalender />
          </div>
          <div className='flex' data-aos="fade-left">
            <PrayerTimes />
          </div>
        </section>
        <h1 className='text-6xl my-20 font-bold text-center mb-10'>Menghitung Zakat</h1>
        <section className='zakatcalc' data-aos='fade-up'>
          <ZakatCalc />
        </section>
        <h1 className='text-6xl my-28 font-bold text-center mb-10'>Artikel yang informatif dan berguna</h1>
        <section className='__article flex flex-wrap px-10 py-10 gap-5 justify-center items-center' data-aos='fade-up'>
          <Card />
        </section>
        <section className='kalenderhijriah' data-aos='fade-up'></section>
        <section className='about' data-aos='fade-up'></section>
        <Footer />
      </div>
    </>
  );
};

export default Home;