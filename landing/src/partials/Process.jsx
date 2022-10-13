import React from 'react';

import Namecard1 from '../images/namecard1.png';
import Namecard2 from '../images/namecard2.png';
import Namecard3 from '../images/namecard3.png';
import IphoneMockup from '../images/iphone-mockup.png';



function Process({ title, description }) {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-200 dark:border-gray-800">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 font-red-hat-display mb-4">{title}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">{description}</p>
          </div>

          {/* Glow illustration */}
          <svg className="absolute left-1/2 transform -translate-x-1/2 mt-20 lg:mt-40 pointer-events-none -z-1 dark:opacity-20 hidden md:block" aria-hidden="true" width="854" height="509" viewBox="0 0 854 509" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient cx="50%" cy="50%" fx="50%" fy="50%" r="39.386%" id="iphonesill__a">
                <stop stopColor="#BCABCD" offset="0%" />
                <stop stopColor="#BCABCD" stopOpacity="0" offset="100%" />
              </radialGradient>
              <radialGradient cx="50%" cy="50%" fx="50%" fy="50%" r="39.386%" id="iphonesill__b">
                <stop stopColor="#9F7AEA" offset="0%" />
                <stop stopColor="#9F7AEA" stopOpacity="0" offset="100%" />
              </radialGradient>
            </defs>
            <g transform="translate(-64 -64)" fill="none" fillRule="evenodd">
              <circle fillOpacity=".64" fill="url(#iphonesill__a)" cx="300" cy="300" r="300" />
              <circle fillOpacity=".72" fill="url(#iphonesill__b)" cx="729" cy="384" r="240" />
            </g>
          </svg>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-12 md:gap-x-6 lg:gap-x-12 md:grid-cols-3 items-start md:max-w-none">

            {/* 1st item */}
            <div className="relative flex flex-col items-center">
              {/* Line connecting (1) and (2) */}
              <div aria-hidden="true" className="absolute h-px opacity-50 bg-gradient-to-r from-white via-teal-400 to-white dark:from-gray-900 dark:via-teal-400 dark:to-gray-900 hidden md:block" style={{ width: 'calc(100% - 48px)', left: 'calc(50% + 48px)', top: '24px' }}>
                <div className="absolute inset-0 border-t border-dashed border-white dark:border-gray-900"></div>
              </div>
              {/* Number */}
              <div className="w-12 h-12 rounded-full bg-teal-400 dark:bg-teal-600 dark:bg-opacity-25 flex justify-center items-center text-white dark:text-teal-400 font-medium mb-8 lg:mb-12">1</div>
              {/* Mobile mockup */}
              <div className="inline-flex relative justify-center items-center">
                {/* Image inside mockup size: 290x624px (or 580x1248px for Retina devices) */}
                <img className="absolute" src={Namecard1} width="290" height="624" style={{ maxWidth: '84.33%' }} alt="App screen 02" />
                {/* iPhone mockup */}
                <img className="relative max-w-full mx-auto h-auto pointer-events-none" src={IphoneMockup} width="344" height="674" alt="iPhone mockup" aria-hidden="true" />
              </div>
            </div>

            {/* 2nd item */}
            <div className="relative flex flex-col items-center">
              {/* Line connecting (2) and (3) */}
              <div aria-hidden="true" className="absolute h-px opacity-50 bg-gradient-to-r from-white via-teal-400 to-white dark:from-gray-900 dark:via-teal-400 dark:to-gray-900 hidden md:block" style={{ width: 'calc(100% - 48px)', left: 'calc(50% + 48px)', top: '24px' }}>
                <div className="absolute inset-0 border-t border-dashed border-white dark:border-gray-900"></div>
              </div>
              {/* Number */}
              <div className="w-12 h-12 rounded-full bg-teal-400 dark:bg-teal-600 dark:bg-opacity-25 flex justify-center items-center text-white dark:text-teal-400 font-medium mb-8 lg:mb-12">2</div>
              {/* Mobile mockup */}
              <div className="inline-flex relative justify-center items-center">
                {/* Image inside mockup size: 290x624px (or 580x1248px for Retina devices) */}
                <img className="absolute" src={Namecard2} width="290" height="624" style={{ maxWidth: '84.33%' }} alt="App screen 03" />
                {/* iPhone mockup */}
                <img className="relative max-w-full mx-auto h-auto pointer-events-none" src={IphoneMockup} width="344" height="674" alt="iPhone mockup" aria-hidden="true" />
              </div>
            </div>

            {/* 3rd item */}
            <div className="relative flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-teal-400 dark:bg-teal-600 dark:bg-opacity-25 flex justify-center items-center text-white dark:text-teal-400 font-medium mb-8 lg:mb-12">3</div>
              {/* Mobile mockup */}
              <div className="inline-flex relative justify-center items-center">
                {/* Image inside mockup size: 290x624px (or 580x1248px for Retina devices) */}
                <img className="absolute" src={Namecard3} width="290" height="624" style={{ maxWidth: '84.33%' }} alt="App screen 04" />
                {/* iPhone mockup */}
                <img className="relative max-w-full mx-auto h-auto pointer-events-none" src={IphoneMockup} width="344" height="674" alt="iPhone mockup" aria-hidden="true" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Process;
