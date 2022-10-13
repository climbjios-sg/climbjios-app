import React from 'react';
import { Link } from 'react-router-dom';

import HeroBg from '../images/hero-bg-02.jpg';

function HeroTestimonials() {
  return (
    <section className="relative">

      {/* Background image */}
      <div className="absolute inset-0 h-128 pt-16 box-content -z-1">
        <img className="absolute inset-0 w-full h-full object-cover opacity-25" src={HeroBg} width="1440" height="577" alt="Testimonials" />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900" aria-hidden="true"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="h1 font-red-hat-display mb-4" data-aos="fade-down">Smart teams trust ClimbJios to build killer websites</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400" data-aos="fade-down" data-aos-delay="150">Our customers are building some of the world's most original, useful and
                loved products.</p>
            <div className="mt-8" data-aos="fade-down" data-aos-delay="300">
              <Link className="btn text-white bg-primary hover:bg-teal-400 ml-3" to="/contact">Request code</Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default HeroTestimonials;