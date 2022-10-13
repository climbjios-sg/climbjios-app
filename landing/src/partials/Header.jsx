import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../utils/Dropdown';
import Transition from '../utils/Transition';
import LogoWithText from '../images/logo-with-text.svg';

function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-5 w-40 h-10 md:w-48 translate-x-[-1rem]">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Cruip">
              <img src={LogoWithText}></img>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow mt-[3.2rem] mr-20">
            {/* Desktop menu links */}
            <ul className="flex grow flex-wrap items-center font-medium">
              <li>
                <Link
                  to=""
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 px-5 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to=""
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 px-5 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </nav>

          {/* Hamburger button */}
          <button
            className={`md:hidden hamburger mt-8 mr-2 ${mobileNavOpen && 'active'}`}
            aria-controls="mobile-nav"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="w-6 h-6 fill-current text-gray-900 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition duration-150 ease-in-out"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="4" width="24" height="2" rx="1" />
              <rect y="11" width="24" height="2" rx="1" />
              <rect y="18" width="24" height="2" rx="1" />
            </svg>
          </button>

          {/*Mobile navigation */}
          <Transition
            show={mobileNavOpen}
            tag="ul"
            className="fixed top-0 h-screen z-20 left-0 w-full max-w-sm -ml-16 overflow-scroll bg-white dark:bg-gray-900 shadow-lg"
            enter="transition ease-out duration-200 transform"
            enterStart="opacity-0 -translate-x-full"
            enterEnd="opacity-100 translate-x-0"
            leave="transition ease-out duration-200"
            leaveStart="opacity-100"
            leaveEnd="opacity-0"
          >
            <nav
              id="mobile-nav"
              className="fixed top-0 h-screen z-20 left-0 w-full max-w-sm -ml-16 overflow-scroll bg-white dark:bg-gray-900 shadow-lg no-scrollbar"
            >
              <div className="py-10 pr-4 pl-20 font-bold text-lg">
                {/* Links */}
                <ul>
                  <li>
                    <Link
                      to="/about"
                      className="flex text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 py-3"
                    >
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className="flex text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 py-3"
                    >
                      GitHub
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </Transition>
        </div>
      </div>
    </header>
  );
}

export default Header;
