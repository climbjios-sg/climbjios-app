import React from 'react';

import CareerImage01 from '../images/career-01.jpg';
import CareerImage02 from '../images/career-02.jpg';
import CareerImage03 from '../images/career-03.jpg';
import CareerImage04 from '../images/career-04.jpg';
import CareerImage05 from '../images/career-05.jpg';
import CareerImage06 from '../images/career-06.jpg';

function Career() {
  return (
    <section className="relative border-t border-gray-200 dark:border-gray-800">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-25 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 pointer-events-none" aria-hidden="true"></div>
      {/* End background gradient */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 font-red-hat-display mb-4">Explore roles at ClimbJios’s offices around the world</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est.</p>
          </div>

          {/* Section content */}
          <div className="lg:flex lg:items-start lg:justify-between">

            {/* Job categories */}
            <div className="grow max-w-xs mx-auto sm:max-w-lg md:max-w-3xl lg:mx-0 lg:order-1">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {/* 1st job item */}
                <a className="block group" href="#0">
                  <div className="relative h-0 pb-9/16 sm:pb-1/1">
                    <img className="absolute inset-0 w-full h-full object-cover" src={CareerImage01} width="240" height="240" alt="Career 01" />
                    <div className="absolute inset-0 opacity-75 bg-gradient-to-t from-gray-900" aria-hidden="true"></div>
                    <div className="absolute bottom-0 left-0 right-0 m-4 text-center text-white">
                      <h4 className="text-lg font-red-hat-display font-bold tracking-tight break-words">Development</h4>
                      <div className="italic text-sm opacity-70">4 Positions</div>
                    </div>
                  </div>
                </a>
                {/* 2nd job item */}
                <a className="block group" href="#0">
                  <div className="relative h-0 pb-9/16 sm:pb-1/1">
                    <img className="absolute inset-0 w-full h-full object-cover" src={CareerImage02} width="240" height="240" alt="Career 02" />
                    <div className="absolute inset-0 opacity-75 bg-gradient-to-t from-gray-900" aria-hidden="true"></div>
                    <div className="absolute bottom-0 left-0 right-0 m-4 text-center text-white">
                      <h4 className="text-lg font-red-hat-display font-bold tracking-tight break-words">Product & Design</h4>
                      <div className="italic text-sm opacity-70">10 Positions</div>
                    </div>
                  </div>
                </a>
                {/* 3rd job item */}
                <a className="block group" href="#0">
                  <div className="relative h-0 pb-9/16 sm:pb-1/1">
                    <img className="absolute inset-0 w-full h-full object-cover" src={CareerImage03} width="240" height="240" alt="Career 03" />
                    <div className="absolute inset-0 opacity-75 bg-gradient-to-t from-gray-900" aria-hidden="true"></div>
                    <div className="absolute bottom-0 left-0 right-0 m-4 text-center text-white">
                      <h4 className="text-lg font-red-hat-display font-bold tracking-tight break-words">Marketing</h4>
                      <div className="italic text-sm opacity-70">2 Positions</div>
                    </div>
                  </div>
                </a>
                {/* 4th job item */}
                <a className="block group" href="#0">
                  <div className="relative h-0 pb-9/16 sm:pb-1/1">
                    <img className="absolute inset-0 w-full h-full object-cover" src={CareerImage04} width="240" height="240" alt="Career 04" />
                    <div className="absolute inset-0 opacity-75 bg-gradient-to-t from-gray-900" aria-hidden="true"></div>
                    <div className="absolute bottom-0 left-0 right-0 m-4 text-center text-white">
                      <h4 className="text-lg font-red-hat-display font-bold tracking-tight break-words">Data Science</h4>
                      <div className="italic text-sm opacity-70">4 Positions</div>
                    </div>
                  </div>
                </a>
                {/* 5th job item */}
                <a className="block group" href="#0">
                  <div className="relative h-0 pb-9/16 sm:pb-1/1">
                    <img className="absolute inset-0 w-full h-full object-cover" src={CareerImage05} width="240" height="240" alt="Career 05" />
                    <div className="absolute inset-0 opacity-75 bg-gradient-to-t from-gray-900" aria-hidden="true"></div>
                    <div className="absolute bottom-0 left-0 right-0 m-4 text-center text-white">
                      <h4 className="text-lg font-red-hat-display font-bold tracking-tight break-words">Internal Systems</h4>
                      <div className="italic text-sm opacity-70">0 Positions</div>
                    </div>
                  </div>
                </a>
                {/* 6th job item */}
                <a className="block group" href="#0">
                  <div className="relative h-0 pb-9/16 sm:pb-1/1">
                    <img className="absolute inset-0 w-full h-full object-cover" src={CareerImage06} width="240" height="240" alt="Career 06" />
                    <div className="absolute inset-0 opacity-75 bg-gradient-to-t from-gray-900" aria-hidden="true"></div>
                    <div className="absolute bottom-0 left-0 right-0 m-4 text-center text-white">
                      <h4 className="text-lg font-red-hat-display font-bold tracking-tight break-words">Administrative</h4>
                      <div className="italic text-sm opacity-70">0 Positions</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Locations links */}
            <div className="max-w-lg mx-auto lg:w-64 mt-8 lg:mt-0 lg:ml-0 lg:mr-6">
              <h3 className="text-lg font-bold tracking-tight text-center lg:text-left mb-4">Locations</h3>
              <ul className="flex flex-wrap justify-center lg:flex-col lg:justify-start font-medium -mx-3 -my-1 lg:mx-0">
                <li className="px-3 py-1 lg:px-0">
                  <a className="flex items-center text-teal-500" href="#0">
                    <svg className="w-4 h-4 shrink-0 fill-current text-gray-400 dark:text-gray-500 mr-3" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.3 8.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0zM7.3 14.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0zM.3 9.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0z" />
                    </svg>
                    <span>All locations (44)</span>
                  </a>
                </li>
                <li className="px-3 py-1 lg:px-0">
                  <a className="flex items-center text-gray-600 dark:text-gray-400 hover:text-teal-500" href="#0">
                    <svg className="w-4 h-4 shrink-0 fill-current text-gray-400 dark:text-gray-500 mr-3" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.3 8.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0zM7.3 14.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0zM.3 9.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0z" />
                    </svg>
                    <span>London, UK (14)</span>
                  </a>
                </li>
                <li className="px-3 py-1 lg:px-0">
                  <a className="flex items-center text-gray-600 dark:text-gray-400 hover:text-teal-500" href="#0">
                    <svg className="w-4 h-4 shrink-0 fill-current text-gray-400 dark:text-gray-500 mr-3" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.3 8.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0zM7.3 14.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0zM.3 9.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0z" />
                    </svg>
                    <span>Milan, Italy (22)</span>
                  </a>
                </li>
                <li className="px-3 py-1 lg:px-0">
                  <a className="flex items-center text-gray-600 dark:text-gray-400 hover:text-teal-500" href="#0">
                    <svg className="w-4 h-4 shrink-0 fill-current text-gray-400 dark:text-gray-500 mr-3" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.3 8.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0zM7.3 14.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0zM.3 9.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0z" />
                    </svg>
                    <span>New York, NYC (4)</span>
                  </a>
                </li>
                <li className="px-3 py-1 lg:px-0">
                  <a className="flex items-center text-gray-600 dark:text-gray-400 hover:text-teal-500" href="#0">
                    <svg className="w-4 h-4 shrink-0 fill-current text-gray-400 dark:text-gray-500 mr-3" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.3 8.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0zM7.3 14.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0zM.3 9.7c-.4-.4-.4-1 0-1.4l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.4.4-1 .4-1.4 0z" />
                    </svg>
                    <span>Berlin, DE (12)</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Career;