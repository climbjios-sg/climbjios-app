import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Dropdown from '../utils/Dropdown';
import Transition from '../utils/Transition';
import LogoWithText from '../images/logo-with-text.svg';
import { externalUrls, paths } from '../constants';

function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();

  const trigger = useRef(null);
  const mobileNav = useRef(null);

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!mobileNav.current || !trigger.current) return;
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setMobileNavOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-5 w-40 h-10 md:w-48 translate-x-[-1rem]">
            {/* Logo */}
            <Link to="/" className="block" aria-label="ClimbJios">
              <img src={LogoWithText}></img>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow mt-[3.2rem] mr-20">
            {/* Desktop menu links */}
            <ul className="flex grow flex-wrap items-center font-medium">
              <li>
                <Link
                  to={paths.ourStory}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 px-5 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <a
                  href={externalUrls.github}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 px-5 py-2 flex items-center transition duration-150 ease-in-out"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </nav>

          {/* Hamburger button */}
          <button
            ref={trigger}
            className={`md:hidden hamburger mt-8 mr-2 ${
              mobileNavOpen && 'active'
            }`}
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
              ref={mobileNav}
              className="fixed top-0 h-screen z-20 left-0 w-full max-w-sm -ml-16 overflow-scroll bg-white dark:bg-gray-900 shadow-lg no-scrollbar"
            >
              <div className="py-6 pr-4 pl-20 font-bold text-lg">
                {/* Logo */}
                <Link
                  onClick={() => {
                    setMobileNavOpen(false);
                  }}
                  to="/"
                  className="block w-40 translate-x-[-1rem]"
                  aria-label="ClimbJios"
                >
                  <img src={LogoWithText}></img>
                </Link>
                {/* Links */}
                <ul>
                  <li>
                    <Link
                      onClick={() => {
                        setMobileNavOpen(false);
                      }}
                      to={paths.ourStory}
                      className="flex text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 py-3"
                    >
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <a
                      href={externalUrls.github}
                      className="flex text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 py-3"
                    >
                      GitHub
                    </a>
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
