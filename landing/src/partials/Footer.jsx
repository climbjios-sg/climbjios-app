import React from 'react';
import { Link } from 'react-router-dom';
import { externalUrls, paths } from '../constants';
import LogoWithText from '../images/logo-with-text.svg';

function Footer() {
  return (
    <footer className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-16 border-t border-gray-200 dark:border-gray-800 -mt-px">
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
              {/* ·{' '}
              <a
                className="text-gray-600 dark:text-gray-400 hover:underline transition duration-150 ease-in-out"
                href={externalUrls.climbJiosTelegramUrl}
              >
                Telegram
              </a>{' '} */}
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
            <div className="hidden md:block text-gray-600 dark:text-gray-400 text-sm pr-4">
              &copy; ClimbJios. All rights reserved.
            </div>
          </div>

          {/* Copyrights note */}
          <div className="md:hidden text-gray-600 dark:text-gray-400 text-sm mt-8">
            &copy; ClimbJios. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
