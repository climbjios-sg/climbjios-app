import React from 'react';

import HeroBg from '../images/hero-bg-03.jpg';
import HeroImage from '../images/about-hero.jpg';

function HeroAbout() {
  return (
    <section className="relative">

      {/* Background image */}
      <div className="absolute inset-0 h-128 pt-16 box-content -z-1">
        <img className="absolute inset-0 w-full h-full object-cover opacity-25" src={HeroBg} width="1440" height="577" alt="About" />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900" aria-hidden="true"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="text-center">
            <div className="relative flex justify-center items-center">
              <div className="relative inline-flex items-start" data-aos="fade-up">
                  <img className="opacity-50" src={HeroImage} width="768" height="432" alt="About hero" />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900" aria-hidden="true"></div>
              </div>
              <div className="absolute" data-aos="fade-down">
                <h1 className="h1 lg:text-6xl font-red-hat-display">Make your own <span className="text-teal-500">way</span></h1>
              </div>
              <div className="absolute bottom-0 -mb-8 w-0.5 h-16 bg-gray-300 dark:bg-gray-700" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default HeroAbout;