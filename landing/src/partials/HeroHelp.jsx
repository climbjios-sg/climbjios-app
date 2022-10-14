import React from 'react';

function HeroHelp() {
  return (
    <section className="relative">
      {/* Background gradient (light version only) */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-100 to-white pointer-events-none dark:hidden" aria-hidden="true"></div>
      {/* End background gradient (light version only) */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="h1 font-red-hat-display mb-4" data-aos="fade-down">How can we help you today?</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400" data-aos="fade-down" data-aos-delay="150">Bite sized guides and tutorials to help you get the most out of ClimbJios.</p>
            <div className="max-w-2xl mx-auto md:px-4">
              <form className="relative flex items-center mt-8" data-aos="fade-down" data-aos-delay="300">
                <input type="search" className="form-input w-full pl-12" placeholder="Search anything…" aria-label="Search anything" />
                <button type="submit" className="absolute inset-0 right-auto" aria-label="Search">
                  <svg className="w-4 h-4 shrink-0 ml-4 mr-3" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path className="fill-current text-gray-400" d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm8.707 12.293a.999.999 0 11-1.414 1.414L11.9 13.314a8.019 8.019 0 001.414-1.414l2.393 2.393z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroHelp;