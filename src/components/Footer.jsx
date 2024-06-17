import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-r from-green-400 to-green-700 text-white">
      <div className="flex justify-between items-center w-full max-w-4xl mb-6">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-bold">Till Jannah</h2>
          <p className="mt-2">Your trusted source for Zakat calculation and Islamic financial guidance.</p>
        </div>
        <div className="flex space-x-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook size={24} className="hover:text-blue-500 transition-colors" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter size={24} className="hover:text-blue-400 transition-colors" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram size={24} className="hover:text-pink-500 transition-colors" />
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="/about" className="hover:underline">About Us</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/feeds" className="hover:underline">Feeds</a>
          <a href="/zakat-page" className="hover:underline">Zakat Calculator</a>
        </div>
        <p>&copy; {year} Till Jannah. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
