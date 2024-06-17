import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBook } from 'react-icons/fa';

const Nav = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  
  useEffect(() => {
    const userInfo = sessionStorage.getItem("userInfo");
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      setUserName(parsedUserInfo.name);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${isAtTop ? 'p-10' : 'p-5'} bg-white shadow-md`}>
      <nav className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center text-2xl">
            <img src='src/assets/__mosaic.png' alt="Till Jannah Logo" className="w-10 h-10 mr-2" />
            <h1>Till Jannah</h1>
          </Link>
        </div>
        <div className="hidden lg:flex flex-1 justify-center space-x-6">
          <Link className="text-xl hover:text-green-700" to="/feeds">Feeds</Link>
          <Link className="text-xl hover:text-green-700" to="/about">About</Link>
          <Link className="text-xl hover:text-green-700" to="/zakat-page">Zakat Calc</Link>
        </div>
        <div className="hidden lg:flex items-center space-x-6">
          <Link className="text-xl hover:text-green-700 flex items-center" to="/quran">
            <FaBook className="text-2xl mr-2" />
            Quran
          </Link>
          {userName ? (
            <Link className="text-xl hover:text-green-700 flex items-center" to="/profile">
              <FaUserCircle className="text-2xl mr-2" />
              {userName}
            </Link>
          ) : (
            <Link className="text-xl hover:text-green-700" to="/login">Login</Link>
          )}
        </div>
        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="lg:hidden mt-3">
          <Link className="block text-xl py-2 hover:text-green-700" to="/feeds" onClick={() => setMenuOpen(false)}>Feeds</Link>
          <Link className="block text-xl py-2 hover:text-green-700" to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link className="block text-xl py-2 hover:text-green-700" to="/zakat-page" onClick={() => setMenuOpen(false)}>Zakat Calc</Link>
          <Link className="block text-xl py-2 hover:text-green-700 flex items-center" to="/quran" onClick={() => setMenuOpen(false)}>
            <FaBook className="text-2xl mr-2" />
            Quran
          </Link>
          {userName ? (
            <Link className="block text-xl py-2 hover:text-green-700 flex items-center" to="/profile" onClick={() => setMenuOpen(false)}>
              <FaUserCircle className="text-2xl mr-2" />
              {userName}
            </Link>
          ) : (
            <Link className="block text-xl py-2 hover:text-green-700" to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Nav;
