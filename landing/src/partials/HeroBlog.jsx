import React from 'react';
import { Link } from 'react-router-dom';

import HeroBg from '../images/hero-bg.jpg';
import AuthorImage01 from '../images/news-author-01.jpg';

function HeroBlog() {
  return (
    <section className="relative">

      {/* Background image */}
      <div className="absolute inset-0 h-128 pt-16 box-content -z-1">
        <img className="absolute inset-0 w-full h-full object-cover opacity-25" src={HeroBg} width="1440" height="577" alt="About" />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900" aria-hidden="true"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-16">

          {/* Featured article */}
          <div className="max-w-3xl" data-aos="fade-down">
            <article>
              <header>
                {/* Title and excerpt */}
                <div className="text-center md:text-left">
                  <Link to="/blog-post">
                    <h1 className="h1 font-red-hat-display mb-4">ClimbJios launches new thematic solutions</h1>
                  </Link>
                  <p className="text-xl text-gray-600 dark:text-gray-400">Curious about how your favorite product was created? Hear from the team about how it was built, and how continued improvements are made.</p>
                </div>
                {/* Article meta */}
                <div className="md:flex md:items-center md:justify-between mt-5">
                  {/* Author meta */}
                  <div className="flex items-center justify-center">
                    <a href="#0">
                      <img className="rounded-full shrink-0 mr-3" src={AuthorImage01} width="32" height="32" alt="Author 04" />
                    </a>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">By </span>
                      <a className="font-medium text-gray-800 dark:text-gray-300 hover:underline" href="#0">Micheal Osman</a>
                      <span className="text-gray-600 dark:text-gray-400"> · Nov 2, 2020</span>
                    </div>
                  </div>
                </div>
              </header>
            </article>
          </div>

        </div>
      </div>

    </section>
  );
}

export default HeroBlog;