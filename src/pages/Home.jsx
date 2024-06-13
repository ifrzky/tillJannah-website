import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Card from '../components/Card'
import Footer from '../components/Footer'
import PrayerTimes from '../module/PrayerTimes'
import ZakatCalc from '../components/ZakatCalc'
import Kalender from '../module/Kalender'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className='__wrappper justify-center items-center min-h-screen bg-primary'>
        <section className='home'>
          <Hero />
        </section>
        <h1 className='text-6xl my-20 font-bold text-center mb-5'>Melihat Jadwal Salat</h1>
        <section className='__prayertime px-10 py-10 flex flex-col md:flex-row justify-center'>
          <div className='flex'>
            {/* <Kalender /> */}
            <ZakatCalc />
          </div>
          <div className='flex'>
            <PrayerTimes />
          </div>
        </section>
        <h1 className='text-6xl my-20 font-bold text-center mb-5'>Artikel yang informatif dan berguna</h1>
        <section className='__article flex flex-wrap px-10 py-10 gap-5 justify-center items-center'>
          <Card />
        </section>
        <section className='zakatcalc'></section>
        <section className='kalenderhijriah'></section>
        <section className='about'></section>
        <Footer />
      </div>
    </>
  )
}

export default Home
