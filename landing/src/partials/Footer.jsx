import React from 'react';
import { Link } from 'react-router-dom';
import { externalUrls, paths } from '../constants';
import LogoWithText from '../images/logo-with-text.svg';

function Footer() {
  return (
    <footer className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-16 border-t border-gray-200 dark:border-gray-800 -mt-px">
          {/* Footer illustration */}
          <div className="pointer-events-none -z-1" aria-hidden="true">
            <svg
              className="absolute bottom-0 left-0 transform -translate-x-1/2 ml-24 dark:opacity-40"
              width="800"
              height="264"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="400"
                cy="400"
                r="400"
                fill="url(#footerglow_paint0_radial)"
                fillOpacity=".4"
              />
              <defs>
                <radialGradient
                  id="footerglow_paint0_radial"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="rotate(90 0 400) scale(315.089)"
                >
                  <stop stopColor="#3ABAB4" />
                  <stop offset="1" stopColor="#3ABAB4" stopOpacity=".01" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Top area: Blocks */}
          <div className="grid md:grid-cols-12 gap-8 lg:gap-20 mb-8 md:mb-12">
            {/* 1st block */}
            <div className="md:col-span-2 lg:col-span-3">
              {/* Logo */}
              <Link
                className="inline-block w-40 h-10 translate-y-[-1rem] translate-x-[-1rem]"
                to="/"
                aria-label="ClimbJios"
              >
                <img src={LogoWithText} />
              </Link>
            </div>
          </div>

          {/* Bottom area */}
          <div className="flex flex-wrap items-center justify-between">
            {/* Middle links */}
            <div className="text-sm md:order-1 text-gray-700 mb-2 md:mb-0">
              <Link
                className="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out"
                to={paths.ourStory}
              >
                Our Story
              </Link>{' '}
              ·{' '}
              <a
                className="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out"
                href={externalUrls.github}
              >
                GitHub
              </a>
            </div>

            {/* Right links */}
            <div className="text-sm md:order-1 text-gray-700 mb-2 md:mb-0 ">
              <Link
                className="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out"
                to={paths.terms}
              >
                Terms
              </Link>{' '}
              ·{' '}
              <Link
                className="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out"
                to={paths.privacyPolicy}
              >
                Privacy Policy
              </Link>
            </div>

            {/* Copyrights note */}
            <div className="hidden md:block text-gray-600 dark:text-gray-400 text-sm mr-4">
              &copy; ClimbJios. All rights reserved.
            </div>
          </div>

          {/* Copyrights note */}
          <div className="md:hidden text-gray-600 dark:text-gray-400 text-sm mr-4 mt-8">
            &copy; ClimbJios. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
