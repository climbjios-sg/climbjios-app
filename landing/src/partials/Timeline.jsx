import React, { useState } from 'react';

function Timeline() {

  const [year, setYear] = useState('2020');

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-200 dark:border-gray-800">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 font-red-hat-display mb-4">What we’ve achieved</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est.</p>
          </div>

          {/* Section content */}
          <div>
            <div className="flex items-start">

              {/* Timeline buttons */}
              <div className="relative mr-4 sm:mr-12 lg:mr-32">
                <div className="absolute inset-0 my-6 ml-16 pointer-events-none -z-1" aria-hidden="true">
                  <div className="absolute inset-0 w-0.5 h-full bg-gray-300 dark:bg-gray-700"></div>
                </div>
                <button className="flex items-center justify-between font-medium text-gray-500 dark:text-gray-400 w-20 py-3 pr-2 text-left" onClick={() => setYear('2020')}>
                  <span className="block w-12 truncate">2020</span>
                  <span className={`block w-3.5 h-3.5 bg-gray-400 dark:bg-gray-700 border-2 border-white dark:border-gray-900 rounded-full ${year === '2020' && 'bg-primary dark:bg-primary'}`}></span>
                </button>
                <button className="flex items-center justify-between font-medium text-gray-500 dark:text-gray-400 w-20 py-3 pr-2 text-left" onClick={() => setYear('2019')}>
                  <span className="block w-12 truncate">2019</span>
                  <span className={`block w-3.5 h-3.5 bg-gray-400 dark:bg-gray-700 border-2 border-white dark:border-gray-900 rounded-full ${year === '2019' && 'bg-primary dark:bg-primary'}`}></span>
                </button>
                <button className="flex items-center justify-between font-medium text-gray-500 dark:text-gray-400 w-20 py-3 pr-2 text-left" onClick={() => setYear('2018')}>
                  <span className="block w-12 truncate">2018</span>
                  <span className={`block w-3.5 h-3.5 bg-gray-400 dark:bg-gray-700 border-2 border-white dark:border-gray-900 rounded-full ${year === '2018' && 'bg-primary dark:bg-primary'}`}></span>
                </button>
                <button className="flex items-center justify-between font-medium text-gray-500 dark:text-gray-400 w-20 py-3 pr-2 text-left" onClick={() => setYear('2017')}>
                  <span className="block w-12 truncate">2017</span>
                  <span className={`block w-3.5 h-3.5 bg-gray-400 dark:bg-gray-700 border-2 border-white dark:border-gray-900 rounded-full ${year === '2017' && 'bg-primary dark:bg-primary'}`}></span>
                </button>
                <button className="flex items-center justify-between font-medium text-gray-500 dark:text-gray-400 w-20 py-3 pr-2 text-left" onClick={() => setYear('2016')}>
                  <span className="block w-12 truncate">2016</span>
                  <span className={`block w-3.5 h-3.5 bg-gray-400 dark:bg-gray-700 border-2 border-white dark:border-gray-900 rounded-full ${year === '2016' && 'bg-primary dark:bg-primary'}`}></span>
                </button>
              </div>

              {/* 2020's articles */}
              <div className={`grow ${year !== '2020' && 'hidden'}`}>
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <article className="p-6 bg-white dark:bg-gray-800 shadow-2xl flex flex-col">
                    <header>
                      <h3 className="h4 font-red-hat-display mb-1">
                        <a href="#0">Launched ClimbJios Business</a>
                      </h3>
                    </header>
                    <div className="text-gray-600 dark:text-gray-400 grow">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                    <a className="inline-flex items-center font-medium text-teal-500 hover:underline mt-2" href="#0">
                      <span>Learn more</span>
                      <svg className="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                      </svg>
                    </a>
                  </article>
                  <article className="p-6 bg-white dark:bg-gray-800 shadow-2xl flex flex-col">
                    <header>
                      <h3 className="h4 font-red-hat-display mb-1">
                        <a href="#0">Series B fundraising</a>
                      </h3>
                    </header>
                    <div className="text-gray-600 dark:text-gray-400 grow">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                    <a className="inline-flex items-center font-medium text-teal-500 hover:underline mt-2" href="#0">
                      <span>Learn more</span>
                      <svg className="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                      </svg>
                    </a>
                  </article>
                  <article className="p-6 bg-white dark:bg-gray-800 shadow-2xl flex flex-col">
                    <header>
                      <h3 className="h4 font-red-hat-display mb-1">
                        <a href="#0">1M Customers</a>
                      </h3>
                    </header>
                    <div className="text-gray-600 dark:text-gray-400 grow">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                    <a className="inline-flex items-center font-medium text-teal-500 hover:underline mt-2" href="#0">
                      <span>Learn more</span>
                      <svg className="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                      </svg>
                    </a>
                  </article>
                  <article className="p-6 bg-white dark:bg-gray-800 shadow-2xl flex flex-col">
                    <header>
                      <h3 className="h4 font-red-hat-display mb-1">
                        <a href="#0">Mobile builder enabled</a>
                      </h3>
                    </header>
                    <div className="text-gray-600 dark:text-gray-400 grow">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                    <a className="inline-flex items-center font-medium text-teal-500 hover:underline mt-2" href="#0">
                      <span>Learn more</span>
                      <svg className="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                      </svg>
                    </a>
                  </article>
                </div>
              </div>

              {/* 2019's articles */}
              <div className={`grow ${year !== '2019' && 'hidden'}`}>
                <div className="grid md:grid-cols-2 gap-6">
                  <article className="p-6 bg-white dark:bg-gray-800 shadow-2xl flex flex-col">
                    <header>
                      <h3 className="h4 font-red-hat-display mb-1">
                        <a href="#0">1M Customers</a>
                      </h3>
                    </header>
                    <div className="text-gray-600 dark:text-gray-400 grow">
                      <p>Sed do eiusmod tempor incididunt, Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <a className="inline-flex items-center font-medium text-teal-500 hover:underline mt-2" href="#0">
                      <span>Learn more</span>
                      <svg className="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                      </svg>
                    </a>
                  </article>
                  <article className="p-6 bg-white dark:bg-gray-800 shadow-2xl flex flex-col">
                    <header>
                      <h3 className="h4 font-red-hat-display mb-1">
                        <a href="#0">Mobile builder enabled</a>
                      </h3>
                    </header>
                    <div className="text-gray-600 dark:text-gray-400 grow">
                      <p>Sed do eiusmod tempor incididunt, Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <a className="inline-flex items-center font-medium text-teal-500 hover:underline mt-2" href="#0">
                      <span>Learn more</span>
                      <svg className="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                      </svg>
                    </a>
                  </article>
                </div>
              </div>

              {/* 2018's articles */}
              <div className={`grow ${year !== '2018' && 'hidden'}`}>
                <div className="grid md:grid-cols-2 gap-6">
                  <article className="p-6 bg-white dark:bg-gray-800 shadow-2xl flex flex-col">
                    <header>
                      <h3 className="h4 font-red-hat-display mb-1">
                        <a href="#0">Series B fundraising</a>
                      </h3>
                    </header>
                    <div className="text-gray-600 dark:text-gray-400 grow">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                    <a className="inline-flex items-center font-medium text-teal-500 hover:underline mt-2" href="#0">
                      <span>Learn more</span>
                      <svg className="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                      </svg>
                    </a>
                  </article>
                  <article className="p-6 bg-white dark:bg-gray-800 shadow-2xl flex flex-col">
                    <header>
                      <h3 className="h4 font-red-hat-display mb-1">
                        <a href="#0">Launched ClimbJios Business</a>
                      </h3>
                    </header>
                    <div className="text-gray-600 dark:text-gray-400 grow">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                    <a className="inline-flex items-center font-medium text-teal-500 hover:underline mt-2" href="#0">
                      <span>Learn more</span>
                      <svg className="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                      </svg>
                    </a>
                  </article>
                </div>
              </div>

              {/* 2017's articles */}
              <div className={`grow ${year !== '2017' && 'hidden'}`}>
                <div className="grid md:grid-cols-2 gap-6">
                  <article className="p-6 bg-white dark:bg-gray-800 shadow-2xl flex flex-col">
                    <header>
                      <h3 className="h4 font-red-hat-display mb-1">
                        <a href="#0">1M Customers</a>
                      </h3>
                    </header>
                    <div className="text-gray-600 dark:text-gray-400 grow">
                      <p>Sed do eiusmod tempor incididunt, Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <a className="inline-flex items-center font-medium text-teal-500 hover:underline mt-2" href="#0">
                      <span>Learn more</span>
                      <svg className="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                      </svg>
                    </a>
                  </article>
                  <article className="p-6 bg-white dark:bg-gray-800 shadow-2xl flex flex-col">
                    <header>
                      <h3 className="h4 font-red-hat-display mb-1">
                        <a href="#0">Mobile builder enabled</a>
                      </h3>
                    </header>
                    <div className="text-gray-600 dark:text-gray-400 grow">
                      <p>Sed do eiusmod tempor incididunt, Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <a className="inline-flex items-center font-medium text-teal-500 hover:underline mt-2" href="#0">
                      <span>Learn more</span>
                      <svg className="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                      </svg>
                    </a>
                  </article>
                </div>
              </div>

              {/* 2016's articles */}
              <div className={`grow ${year !== '2016' && 'hidden'}`}>
                <div className="grid md:grid-cols-2 gap-6">
                  <article className="md:col-span-2 p-6 bg-white dark:bg-gray-800 shadow-2xl flex flex-col">
                    <header>
                      <h3 className="h4 font-red-hat-display mb-1">
                        <a href="#0">Mobile builder enabled</a>
                      </h3>
                    </header>
                    <div className="text-gray-600 dark:text-gray-400 grow">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.</p>
                    </div>
                    <a className="inline-flex items-center font-medium text-teal-500 hover:underline mt-2" href="#0">
                      <span>Learn more</span>
                      <svg className="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                      </svg>
                    </a>
                  </article>
                  <article className="p-6 bg-white dark:bg-gray-800 shadow-2xl flex flex-col">
                    <header>
                      <h3 className="h4 font-red-hat-display mb-1">
                        <a href="#0">Series B fundraising</a>
                      </h3>
                    </header>
                    <div className="text-gray-600 dark:text-gray-400 grow">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                    <a className="inline-flex items-center font-medium text-teal-500 hover:underline mt-2" href="#0">
                      <span>Learn more</span>
                      <svg className="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                      </svg>
                    </a>
                  </article>
                  <article className="p-6 bg-white dark:bg-gray-800 shadow-2xl flex flex-col">
                    <header>
                      <h3 className="h4 font-red-hat-display mb-1">
                        <a href="#0">1M Customers</a>
                      </h3>
                    </header>
                    <div className="text-gray-600 dark:text-gray-400 grow">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    </div>
                    <a className="inline-flex items-center font-medium text-teal-500 hover:underline mt-2" href="#0">
                      <span>Learn more</span>
                      <svg className="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                      </svg>
                    </a>
                  </article>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Timeline;