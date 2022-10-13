import React, { useState } from 'react';

import AuthorImage01 from '../images/news-author-01.jpg';
import AuthorImage02 from '../images/news-author-02.jpg';
import AuthorImage03 from '../images/news-author-03.jpg';
import AuthorImage04 from '../images/news-author-04.jpg';
import AuthorImage05 from '../images/news-author-05.jpg';

function HelpList() {

  const [category, setCategory] = useState('');

  return (
    <section className="relative border-t border-transparent dark:border-gray-800">
      {/* Background gradient (dark version only) */}
      <div
        className="absolute inset-0 opacity-25 bg-gradient-to-b from-gray-800 to-gray-900 pointer-events-none hidden dark:block"
        aria-hidden="true"
      ></div>
      {/* End background gradient (dark version only) */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div data-aos="fade-up" data-aos-delay="450">
            {/* Category buttons */}
            <div className="mb-10">
              <div className="flex flex-wrap justify-center -m-1">
                <button
                  className="font-medium px-4 py-2 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 shadow transition duration-150 ease-in-out rounded-full inline-flex items-center justify-center m-1"
                  onClick={() => setCategory('')}
                >
                  <svg className="w-4 h-4 shrink-0 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path
                      className="fill-current text-gray-400"
                      d="M11 7H1a1 1 0 000 2h10v3l5-4-5-4v3zM8 3H1a1 1 0 010-2h7a1 1 0 010 2zM8 15H1a1 1 0 010-2h7a1 1 0 010 2z"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300 transition duration-150 ease-in-out">View All</span>
                </button>
                <button
                  className={`font-medium px-4 py-2 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 shadow transition duration-150 ease-in-out rounded-full inline-flex items-center justify-center m-1 ${
                    category === '1' &&
                    'bg-primary hover:bg-primary dark:bg-teal-600 dark:hover:bg-teal-600 dark:bg-opacity-25 dark:hover:bg-opacity-25'
                  }`}
                  onClick={() => setCategory('1')}
                >
                  <svg className="w-4 h-4 shrink-0 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path
                      className={`fill-current ${category === '1' ? 'text-teal-200 dark:text-teal-400' : 'text-teal-500'}`}
                      d="M5 16H4a4 4 0 01-4-4v-1h2v1a2 2 0 002 2h1v2zM13 10h-1.686l-1.207-1.207L14.37 4.63a2.121 2.121 0 00-3-3L7.207 5.793 5.99 4.576 5.98 3.02 3.038.079 0 3.117 3 6h1.586l1.207 1.207L4 9l3 3 1.793-1.793L10 11.414V13l3.01 3.01 2.98-2.979L13 10z"
                    />
                  </svg>
                  <span
                    className={`transition duration-150 ease-in-out ${
                      category === '1' ? 'text-white dark:text-teal-400' : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    Getting Started
                  </span>
                </button>
                <button
                  className={`font-medium px-4 py-2 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 shadow transition duration-150 ease-in-out rounded-full inline-flex items-center justify-center m-1 ${
                    category === '2' &&
                    'bg-purple-500 hover:bg-purple-500 dark:bg-purple-600 dark:hover:bg-purple-600 dark:bg-opacity-25 dark:hover:bg-opacity-25'
                  }`}
                  onClick={() => setCategory('2')}
                >
                  <svg className="w-4 h-4 shrink-0 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path
                      className={`fill-current ${category === '2' ? 'text-purple-200 dark:text-purple-400' : 'text-purple-500'}`}
                      d="M12.071 0L15 2.929v4.142L12.071 10H12V7.101L7.9 3H5v-.071L7.929 0h4.142zm-5 5L10 7.929v4.142L7.071 15H2.929L0 12.071V7.929L2.929 5h4.142z"
                    />
                  </svg>
                  <span
                    className={`transition duration-150 ease-in-out ${
                      category === '2' ? 'text-white dark:text-purple-400' : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    Layout & Design
                  </span>
                </button>
                <button
                  className={`font-medium px-4 py-2 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 shadow transition duration-150 ease-in-out rounded-full inline-flex items-center justify-center m-1 ${
                    category === '3' &&
                    'bg-indigo-500 hover:bg-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-600 dark:bg-opacity-25 dark:hover:bg-opacity-25'
                  }`}
                  onClick={() => setCategory('3')}
                >
                  <svg className="w-4 h-4 shrink-0 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path
                      className={`fill-current ${category === '3' ? 'text-indigo-200 dark:text-indigo-400' : 'text-indigo-500'}`}
                      d="M1 0h8a1 1 0 011 1v10a1 1 0 01-1 1H1a1 1 0 01-1-1V1a1 1 0 011-1zm14.124 4.085v-.001a1 1 0 01.868 1.116l-1.243 9.932a1 1 0 01-1.117.868l-7.938-1 .248-1.988 6.946.871.995-7.938-2.007-.251.248-1.984 3 .375z"
                    />
                  </svg>
                  <span
                    className={`transition duration-150 ease-in-out ${
                      category === '3' ? 'text-white dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    Templates
                  </span>
                </button>
                <button
                  className={`font-medium px-4 py-2 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 shadow transition duration-150 ease-in-out rounded-full inline-flex items-center justify-center m-1 ${
                    category === '4' &&
                    'bg-pink-500 hover:bg-pink-500 dark:bg-pink-600 dark:hover:bg-pink-600 dark:bg-opacity-25 dark:hover:bg-opacity-25'
                  }`}
                  onClick={() => setCategory('4')}
                >
                  <svg className="w-4 h-4 shrink-0 mr-2" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path
                      className={`fill-current ${category === '4' ? 'text-pink-200 dark:text-pink-400' : 'text-pink-500'}`}
                      d="M13.172 5.178l-2.39-2.39 2.39-2.39C12.674.1 12.076 0 11.479 0a4.462 4.462 0 00-4.481 4.48c0 .499.1.897.199 1.395l-6.572 4.88c-.797.597-.797 1.692-.2 2.389l2.291 2.39c.697.697 1.792.597 2.39-.2l4.88-6.571c.497.1.995.199 1.493.199 2.49 0 4.48-1.992 4.48-4.481 0-.598-.099-1.195-.298-1.693l-2.49 2.39z"
                    />
                  </svg>
                  <span
                    className={`transition duration-150 ease-in-out ${
                      category === '4' ? 'text-white dark:text-pink-400' : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    Project Settings
                  </span>
                </button>
              </div>
            </div>

            {/* Articles */}
            <div className="-mb-2">
              {/* 1st Article */}
              <article className={`mb-2 ${!['', '1'].includes(category) && 'hidden'}`}>
                <div className="flex pr-6 py-5 bg-white dark:bg-gray-800 divide-x divide-gray-200 dark:divide-gray-700 shadow-2xl">
                  {/* Category icon */}
                  <div className="flex items-center px-4 sm:px-8">
                    <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <circle className="fill-current text-teal-100 dark:hidden" cx="16" cy="16" r="16" />
                      <path
                        className="fill-current text-teal-500"
                        d="M19 18.414l-4 4L9.586 17l.707-.707L12 14.586V8.414l-5-5L4.414 6l6.293 6.293-1.414 1.414L1.586 6 7 .586l7 7v5l8.463-8.463a3.828 3.828 0 115.414 5.414L21 16.414v6.172l5 5L28.586 25l-6.293-6.293 1.414-1.414L31.414 25 26 30.414l-7-7v-5zm-4 1.172L26.463 8.123a1.828 1.828 0 10-2.586-2.586L12.414 17 15 19.586zM11 30v2C4.925 32 0 27.075 0 21h2a9 9 0 009 9zm0-5v2a6 6 0 01-6-6h2a4 4 0 004 4z"
                      />
                    </svg>
                  </div>
                  {/* Content */}
                  <div className="pl-6">
                    <header>
                      <h3 className="font-red-hat-display text-xl font-extrabold tracking-tighter mb-1">
                        <a href="#0">Intro to the CMS Editor</a>
                      </h3>
                    </header>
                    <p className="text-gray-600 dark:text-gray-400">
                      Et leo duis ut diam quam nulla porttitor porttitor lacus luctus accumsan tortor, lorem dolor sed viverra ipsum nunc aliquet
                      bibendum enim eu. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.
                    </p>
                    <a className="inline-flex items-center font-medium text-teal-500 hover:underline mt-2" href="#0">
                      <span>Learn more</span>
                      <svg className="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                      </svg>
                    </a>
                    <footer className="text-sm flex items-center mt-3">
                      <div className="flex shrink-0 mr-3">
                        <a className="relative" href="#0">
                          <span className="absolute inset-0 -m-px" aria-hidden="true">
                            <span className="absolute inset-0 -m-px bg-white dark:bg-gray-800 rounded-full"></span>
                          </span>
                          <img className="relative rounded-full" src={AuthorImage01} width="32" height="32" alt="Author 01" />
                        </a>
                      </div>
                      <div className="text-gray-500">
                        <span>Written by </span>
                        <a className="font-medium text-gray-800 dark:text-gray-400 hover:underline" href="#0">
                          Mark Varsano
                        </a>
                      </div>
                    </footer>
                  </div>
                </div>
              </article>

              {/* 2nd Article */}
              <article className={`mb-2 ${!['', '2'].includes(category) && 'hidden'}`}>
                <div className="flex pr-6 py-5 bg-white dark:bg-gray-800 divide-x divide-gray-200 dark:divide-gray-700 shadow-2xl">
                  {/* Category icon */}
                  <div className="flex items-center px-4 sm:px-8">
                    <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <circle className="fill-current text-purple-100 dark:hidden" cx="16" cy="16" r="16" />
                      <path
                        className="fill-current text-purple-500"
                        d="M12.033 20.182a10.027 10.027 0 01-5.622-6.334A8 8 0 1014.5 27.615a9.962 9.962 0 01-2.467-7.433zm1.97.618A7.97 7.97 0 0016 26.291a7.97 7.97 0 001.997-5.49 10.046 10.046 0 01-3.996 0zm11.964-8.982A10.003 10.003 0 0132 21c0 5.523-4.477 10-10 10a9.956 9.956 0 01-6-2 9.956 9.956 0 01-6 2C4.477 31 0 26.523 0 21c0-4.113 2.484-7.647 6.033-9.182C6.011 11.548 6 11.275 6 11 6 5.477 10.477 1 16 1s10 4.477 10 10c0 .275-.011.548-.033.818zm-.378 2.03a10.027 10.027 0 01-5.622 6.334 9.962 9.962 0 01-2.467 7.433 8 8 0 108.089-13.767zM12.41 18.152a9.982 9.982 0 012.09-3.767 8.03 8.03 0 00-6.2-1.204 8.02 8.02 0 004.11 4.97zm1.89.667a8.03 8.03 0 003.398 0A7.984 7.984 0 0016 15.71a7.984 7.984 0 00-1.7 3.11zm9.697-7.62L24 11a8 8 0 10-15.998.2c.646-.131 1.314-.2 1.998-.2 2.251 0 4.329.744 6 2a9.956 9.956 0 016-2c.684 0 1.352.069 1.998.2zm-.299 1.982a8.03 8.03 0 00-6.2 1.204 9.982 9.982 0 012.09 3.767 8.02 8.02 0 004.11-4.971z"
                      />
                    </svg>
                  </div>
                  {/* Content */}
                  <div className="pl-6">
                    <header>
                      <h3 className="font-red-hat-display text-xl font-extrabold tracking-tighter mb-1">
                        <a href="#0">Overview dynamic content</a>
                      </h3>
                    </header>
                    <p className="text-gray-600 dark:text-gray-400">
                      Et leo duis ut diam quam nulla porttitor porttitor lacus luctus accumsan tortor, lorem dolor sed viverra ipsum nunc aliquet
                      bibendum enim eu. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.
                    </p>
                    <a className="inline-flex items-center font-medium text-teal-500 hover:underline mt-2" href="#0">
                      <span>Learn more</span>
                      <svg className="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                      </svg>
                    </a>
                    <footer className="text-sm flex items-center mt-3">
                      <div className="flex shrink-0 mr-3">
                        <a className="relative" href="#0">
                          <span className="absolute inset-0 -m-px" aria-hidden="true">
                            <span className="absolute inset-0 -m-px bg-white dark:bg-gray-800 rounded-full"></span>
                          </span>
                          <img className="relative rounded-full" src={AuthorImage01} width="32" height="32" alt="Author 01" />
                        </a>
                        <a className="relative -ml-2" href="#0">
                          <span className="absolute inset-0 -m-px" aria-hidden="true">
                            <span className="absolute inset-0 -m-px bg-white dark:bg-gray-800 rounded-full"></span>
                          </span>
                          <img className="relative rounded-full" src={AuthorImage02} width="32" height="32" alt="Author 02" />
                        </a>
                      </div>
                      <div className="text-gray-500">
                        <span>Written by </span>
                        <a className="font-medium text-gray-800 dark:text-gray-400 hover:underline" href="#0">
                          Mark Varsano
                        </a>{' '}
                        and{' '}
                        <a className="font-medium text-gray-800 dark:text-gray-400 hover:underline" href="#0">
                          Elly Taylor
                        </a>
                      </div>
                    </footer>
                  </div>
                </div>
              </article>

              {/* 3rd Article */}
              <article className={`mb-2 ${!['', '3'].includes(category) && 'hidden'}`}>
                <div className="flex pr-6 py-5 bg-white dark:bg-gray-800 divide-x divide-gray-200 dark:divide-gray-700 shadow-2xl">
                  {/* Category icon */}
                  <div className="flex items-center px-4 sm:px-8">
                    <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <circle className="fill-current text-indigo-100 dark:hidden" cx="16" cy="16" r="16" />
                      <path
                        className="fill-current text-indigo-500"
                        d="M2 2v19h16V2H2zm18-2v23H0V0h20zm9.201 11.03l-7.425-1.987.518-1.932 9.357 2.505-5.948 22.218-19.32-5.172.518-1.932 17.388 4.654L29.2 11.03z"
                      />
                    </svg>
                  </div>
                  {/* Content */}
                  <div className="pl-6">
                    <header>
                      <h3 className="font-red-hat-display text-xl font-extrabold tracking-tighter mb-1">
                        <a href="#0">Import collection items</a>
                      </h3>
                    </header>
                    <p className="text-gray-600 dark:text-gray-400">
                      Et leo duis ut diam quam nulla porttitor porttitor lacus luctus accumsan tortor, lorem dolor sed viverra ipsum nunc aliquet
                      bibendum enim eu. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.
                    </p>
                    <a className="inline-flex items-center font-medium text-teal-500 hover:underline mt-2" href="#0">
                      <span>Learn more</span>
                      <svg className="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                      </svg>
                    </a>
                    <footer className="text-sm flex items-center mt-3">
                      <div className="flex shrink-0 mr-3">
                        <a className="relative" href="#0">
                          <span className="absolute inset-0 -m-px" aria-hidden="true">
                            <span className="absolute inset-0 -m-px bg-white dark:bg-gray-800 rounded-full"></span>
                          </span>
                          <img className="relative rounded-full" src={AuthorImage03} width="32" height="32" alt="Author 03" />
                        </a>
                      </div>
                      <div className="text-gray-500">
                        <span>Written by </span>
                        <a className="font-medium text-gray-800 dark:text-gray-400 hover:underline" href="#0">
                          Lisa Allison
                        </a>
                      </div>
                    </footer>
                  </div>
                </div>
              </article>

              {/* 4th Article */}
              <article className={`mb-2 ${!['', '4'].includes(category) && 'hidden'}`}>
                <div className="flex pr-6 py-5 bg-white dark:bg-gray-800 divide-x divide-gray-200 dark:divide-gray-700 shadow-2xl">
                  {/* Category icon */}
                  <div className="flex items-center px-4 sm:px-8">
                    <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <circle className="fill-current text-pink-100 dark:hidden" cx="16" cy="16" r="16" />
                      <path
                        className="fill-current text-pink-500"
                        d="M14.515 11.398l-1.918-1.75.178-.601A5.487 5.487 0 007.415 2l3 2.999L5 10.414 2.002 7.416a5.49 5.49 0 007.046 5.359l.6-.177 1.615 1.767 3.252-2.967zm-4.73 4.315l-.79-.865A7.49 7.49 0 01.421 5.036l.526-1.502L5 7.586 7.586 5 3.535.949l1.5-.527a7.487 7.487 0 019.813 8.572L16 10.045l1.153-1.051A7.49 7.49 0 0126.964.422l1.502.526L24.414 5 27 7.586l4.051-4.051.527 1.5a7.487 7.487 0 01-8.572 9.813L8.255 31.022a3 3 0 01-4.338.1L.879 28.082a3 3 0 01.1-4.338l8.806-8.032zm7.444 8.166l1.477-1.349.675.739 5.842 6.4a1 1 0 001.446.033l3.038-3.038a1 1 0 00-.033-1.446l-7.487-6.828 1.348-1.478.739.674 6.748 6.154a3 3 0 01.1 4.338l-3.039 3.038a3 3 0 01-4.338-.099L17.23 23.88zM27 10.414L21.586 5l2.998-2.998a5.49 5.49 0 00-5.359 7.046l.177.6-.462.422L2.326 25.223a1 1 0 00-.033 1.446l3.038 3.038a1 1 0 001.446-.033l15.575-17.077.601.178A5.487 5.487 0 0030 7.415l-2.999 3z"
                      />
                    </svg>
                  </div>
                  {/* Content */}
                  <div className="pl-6">
                    <header>
                      <h3 className="font-red-hat-display text-xl font-extrabold tracking-tighter mb-1">
                        <a href="#0">Connect a custom domain on ClimbJios</a>
                      </h3>
                    </header>
                    <p className="text-gray-600 dark:text-gray-400">
                      Et leo duis ut diam quam nulla porttitor porttitor lacus luctus accumsan tortor, lorem dolor sed viverra ipsum nunc aliquet
                      bibendum enim eu. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.
                    </p>
                    <a className="inline-flex items-center font-medium text-teal-500 hover:underline mt-2" href="#0">
                      <span>Learn more</span>
                      <svg className="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                      </svg>
                    </a>
                    <footer className="text-sm flex items-center mt-3">
                      <div className="flex shrink-0 mr-3">
                        <a className="relative" href="#0">
                          <span className="absolute inset-0 -m-px" aria-hidden="true">
                            <span className="absolute inset-0 -m-px bg-white dark:bg-gray-800 rounded-full"></span>
                          </span>
                          <img className="relative rounded-full" src={AuthorImage04} width="32" height="32" alt="Author 04" />
                        </a>
                      </div>
                      <div className="text-gray-500">
                        <span>Written by </span>
                        <a className="font-medium text-gray-800 dark:text-gray-400 hover:underline" href="#0">
                          Mary Champ
                        </a>
                      </div>
                    </footer>
                  </div>
                </div>
              </article>

              {/* 5th Article */}
              <article className={`mb-2 ${!['', '1'].includes(category) && 'hidden'}`}>
                <div className="flex pr-6 py-5 bg-white dark:bg-gray-800 divide-x divide-gray-200 dark:divide-gray-700 shadow-2xl">
                  {/* Category icon */}
                  <div className="flex items-center px-4 sm:px-8">
                    <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <circle className="fill-current text-teal-100 dark:hidden" cx="16" cy="16" r="16" />
                      <path
                        className="fill-current text-teal-500"
                        d="M19 18.414l-4 4L9.586 17l.707-.707L12 14.586V8.414l-5-5L4.414 6l6.293 6.293-1.414 1.414L1.586 6 7 .586l7 7v5l8.463-8.463a3.828 3.828 0 115.414 5.414L21 16.414v6.172l5 5L28.586 25l-6.293-6.293 1.414-1.414L31.414 25 26 30.414l-7-7v-5zm-4 1.172L26.463 8.123a1.828 1.828 0 10-2.586-2.586L12.414 17 15 19.586zM11 30v2C4.925 32 0 27.075 0 21h2a9 9 0 009 9zm0-5v2a6 6 0 01-6-6h2a4 4 0 004 4z"
                      />
                    </svg>
                  </div>
                  {/* Content */}
                  <div className="pl-6">
                    <header>
                      <h3 className="font-red-hat-display text-xl font-extrabold tracking-tighter mb-1">
                        <a href="#0">Project and page passwords</a>
                      </h3>
                    </header>
                    <p className="text-gray-600 dark:text-gray-400">
                      Et leo duis ut diam quam nulla porttitor porttitor lacus luctus accumsan tortor, lorem dolor sed viverra ipsum nunc aliquet
                      bibendum enim eu. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.
                    </p>
                    <a className="inline-flex items-center font-medium text-teal-500 hover:underline mt-2" href="#0">
                      <span>Learn more</span>
                      <svg className="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                      </svg>
                    </a>
                    <footer className="text-sm flex items-center mt-3">
                      <div className="flex shrink-0 mr-3">
                        <a className="relative" href="#0">
                          <span className="absolute inset-0 -m-px" aria-hidden="true">
                            <span className="absolute inset-0 -m-px bg-white dark:bg-gray-800 rounded-full"></span>
                          </span>
                          <img className="relative rounded-full" src={AuthorImage01} width="32" height="32" alt="Author 01" />
                        </a>
                      </div>
                      <div className="text-gray-500">
                        <span>Written by </span>
                        <a className="font-medium text-gray-800 dark:text-gray-400 hover:underline" href="#0">
                          Mark Varsano
                        </a>
                      </div>
                    </footer>
                  </div>
                </div>
              </article>

              {/* 6th Article */}
              <article className={`mb-2 ${!['', '4'].includes(category) && 'hidden'}`}>
                <div className="flex pr-6 py-5 bg-white dark:bg-gray-800 divide-x divide-gray-200 dark:divide-gray-700 shadow-2xl">
                  {/* Category icon */}
                  <div className="flex items-center px-4 sm:px-8">
                    <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <circle className="fill-current text-pink-100 dark:hidden" cx="16" cy="16" r="16" />
                      <path
                        className="fill-current text-pink-500"
                        d="M14.515 11.398l-1.918-1.75.178-.601A5.487 5.487 0 007.415 2l3 2.999L5 10.414 2.002 7.416a5.49 5.49 0 007.046 5.359l.6-.177 1.615 1.767 3.252-2.967zm-4.73 4.315l-.79-.865A7.49 7.49 0 01.421 5.036l.526-1.502L5 7.586 7.586 5 3.535.949l1.5-.527a7.487 7.487 0 019.813 8.572L16 10.045l1.153-1.051A7.49 7.49 0 0126.964.422l1.502.526L24.414 5 27 7.586l4.051-4.051.527 1.5a7.487 7.487 0 01-8.572 9.813L8.255 31.022a3 3 0 01-4.338.1L.879 28.082a3 3 0 01.1-4.338l8.806-8.032zm7.444 8.166l1.477-1.349.675.739 5.842 6.4a1 1 0 001.446.033l3.038-3.038a1 1 0 00-.033-1.446l-7.487-6.828 1.348-1.478.739.674 6.748 6.154a3 3 0 01.1 4.338l-3.039 3.038a3 3 0 01-4.338-.099L17.23 23.88zM27 10.414L21.586 5l2.998-2.998a5.49 5.49 0 00-5.359 7.046l.177.6-.462.422L2.326 25.223a1 1 0 00-.033 1.446l3.038 3.038a1 1 0 001.446-.033l15.575-17.077.601.178A5.487 5.487 0 0030 7.415l-2.999 3z"
                      />
                    </svg>
                  </div>
                  {/* Content */}
                  <div className="pl-6">
                    <header>
                      <h3 className="font-red-hat-display text-xl font-extrabold tracking-tighter mb-1">
                        <a href="#0">Content-driven design</a>
                      </h3>
                    </header>
                    <p className="text-gray-600 dark:text-gray-400">
                      Et leo duis ut diam quam nulla porttitor porttitor lacus luctus accumsan tortor, lorem dolor sed viverra ipsum nunc aliquet
                      bibendum enim eu.
                    </p>
                    <footer className="text-sm flex items-center mt-3">
                      <div className="flex shrink-0 mr-3">
                        <a className="relative" href="#0">
                          <span className="absolute inset-0 -m-px" aria-hidden="true">
                            <span className="absolute inset-0 -m-px bg-white dark:bg-gray-800 rounded-full"></span>
                          </span>
                          <img className="relative rounded-full" src={AuthorImage05} width="32" height="32" alt="Author 05" />
                        </a>
                      </div>
                      <div className="text-gray-500">
                        <span>Written by </span>
                        <a className="font-medium text-gray-800 dark:text-gray-400 hover:underline" href="#0">
                          Yuri Lapko
                        </a>
                      </div>
                    </footer>
                  </div>
                </div>
              </article>
            </div>

            {/* Pagination */}
            <nav className="flex justify-center sm:justify-between mt-12">
              <span className="hidden sm:inline-flex items-center font-medium text-gray-400 dark:text-gray-500" href="#0">
                <svg className="w-3 h-3 shrink-0 mt-px mr-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path className="fill-current" d="M5.091 11L0 5.909 5.091.818l.875.875-3.602 3.591h9.329v1.25H2.364l3.602 3.602z" />
                </svg>
                <span>Previous</span>
              </span>
              <ul className="flex">
                <li className="mx-1">
                  <a className="inline-flex text-teal-500 px-1 border-b border-teal-500 transition duration-150 ease-in-out" href="#0">
                    1
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    className="inline-flex text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 px-1 transition duration-150 ease-in-out"
                    href="#0"
                  >
                    2
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    className="inline-flex text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 px-1 transition duration-150 ease-in-out"
                    href="#0"
                  >
                    3
                  </a>
                </li>
                <li className="mx-1">
                  <span className="inline-flex text-gray-600 dark:text-gray-400" href="#0">
                    …
                  </span>
                </li>
                <li className="mx-1">
                  <a
                    className="inline-flex text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 px-1 transition duration-150 ease-in-out"
                    href="#0"
                  >
                    7
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    className="inline-flex text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 px-1 transition duration-150 ease-in-out"
                    href="#0"
                  >
                    8
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    className="inline-flex text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 px-1 transition duration-150 ease-in-out"
                    href="#0"
                  >
                    9
                  </a>
                </li>
              </ul>
              <a className="hidden sm:inline-flex items-center font-medium text-teal-500 hover:underline" href="#0">
                <span>Next</span>
                <svg className="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HelpList;