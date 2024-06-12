import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const isLoggedIn = !!sessionStorage.getItem("userInfo");

  return (
    <div className="p-5">
      <nav className="flex flex-wrap justify-between items-center p-4">
        <div className="logo text-2xl">
          <h1>Till Jannah</h1>
        </div>
        <div className="menu">
          <input type="checkbox" id="menu-toggle" className="hidden" />
          <label
            htmlFor="menu-toggle"
            className="cursor-pointer lg:hidden block"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </label>
          <ul className="lg:flex lg:flex-row lg:justify-between lg:gap-5 lg:items-center lg:pt-0 lg:w-auto hidden">
            <li className="mx-2 text-2xl">
              <Link to="/">Home</Link>
            </li>
            {isLoggedIn ? (
              <li className="mx-2 text-2xl">
                <Link to="/profile">Profile</Link>
              </li>
            ) : (
              <li className="mx-2 text-2xl">
                <Link to="/login">Login</Link>
              </li>
            )}
            <li className="mx-2 text-2xl">
              <button>About</button>
            </li>
            <li className="mx-2 text-2xl">
              <button>Zakat Calc</button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
