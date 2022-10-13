import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Footer from '../partials/Footer';

import NotFoundImage from '../images/404.jpg';

function PageNotFound() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">

        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none -z-1" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center">
                <div className="relative inline-flex justify-center items-center">
                  <img className="hidden sm:block opacity-50 md:opacity-80" src={NotFoundImage} width="768" height="432" alt="404" />
                  <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900" aria-hidden="true"></div>
                  <div className="sm:absolute w-full">
                    <h1 className="h3 font-red-hat-display mb-8">Hm, the page you were looking for doesn't exist anymore.</h1>
                    <Link className="btn text-white bg-primary inline-flex items-center" to="/">
                      <span>Back to ClimbJios</span>
                      <svg className="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default PageNotFound;