import React from 'react';

import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Footer from '../partials/Footer';

function Contact() {
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                <h1 className="h1 font-red-hat-display mb-4">Get started with ClimbJios in seconds</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">We'll send you a text with a link to download the app.</p>
              </div>

              {/* Contact form */}
              <form className="max-w-xl mx-auto">
                <div className="flex flex-wrap -mx-3 mb-5">
                  <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <label className="block text-gray-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="first-name">First Name <span className="text-red-600">*</span></label>
                    <input id="first-name" type="text" className="form-input w-full" placeholder="Enter your first name" required />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block text-gray-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="last-name">Last Name <span className="text-red-600">*</span></label>
                    <input id="last-name" type="text" className="form-input w-full" placeholder="Enter your last name" required />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-5">
                  <div className="w-full px-3">
                    <label className="block text-gray-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="company">Company <span className="text-red-600">*</span></label>
                    <input id="company" type="text" className="form-input w-full" placeholder="Enter your company name" required />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-5">
                  <div className="w-full px-3">
                    <label className="block text-gray-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="phone">Phone Number <span className="text-red-600">*</span></label>
                    <input id="phone" type="tel" className="form-input w-full" placeholder="Enter your phone number" required />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-5">
                  <div className="w-full px-3">
                    <label className="block text-gray-800 dark:text-gray-300 text-sm font-medium mb-1" htmlFor="country">Country <span className="text-red-600">*</span></label>
                    <select id="country" className="form-select w-full" required>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Germany</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-5">
                  <div className="w-full px-3">
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-gray-800 dark:text-gray-300 text-sm font-medium" htmlFor="message">Details</label>
                      <span className="text-sm text-gray-500">Optional</span>
                    </div>
                    <textarea id="message" rows="4" className="form-textarea w-full" placeholder="What do you want to build with ClimbJios?"></textarea>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-5">
                  <div className="w-full px-3">
                    <div className="block text-gray-800 dark:text-gray-300 text-sm font-medium mb-3">Tell us about your role</div>
                    <label className="flex items-center mb-2">
                      <input type="radio" className="form-radio" name="role" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-3">CO-founder</span>
                    </label>
                    <label className="flex items-center mb-2">
                      <input type="radio" className="form-radio" name="role" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-3">Developer</span>
                    </label>
                    <label className="flex items-center mb-2">
                      <input type="radio" className="form-radio" name="role" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-3">Design / Marketing</span>
                    </label>
                    <label className="flex items-center mb-2">
                      <input type="radio" className="form-radio" name="role" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-3">Other</span>
                    </label>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button className="btn text-white bg-primary hover:bg-teal-400 w-full flex items-center">
                      <span>Request code</span>
                      <svg className="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </section>

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Contact;