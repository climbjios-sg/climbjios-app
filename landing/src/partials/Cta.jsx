import React from 'react';
import { externalUrls } from "../constants";


function Cta({title}) {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* CTA box */}
        <div className="relative bg-purple-400 py-10 px-8 md:py-16 md:px-12">
          {/* Background illustration */}
          <div
            className="absolute inset-0 left-auto  pointer-events-none"
            aria-hidden="true"
          >
            <svg
              className="h-full"
              width="400"
              height="232"
              viewBox="0 0 400 232"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient
                  cx="50%"
                  cy="50%"
                  fx="50%"
                  fy="50%"
                  r="39.386%"
                  id="box-gr-a"
                >
                  <stop stopColor="#BCABCD" offset="0%" />
                  <stop stopColor="#BCABCD" stopOpacity="0" offset="100%" />
                </radialGradient>
                <radialGradient
                  cx="50%"
                  cy="50%"
                  fx="50%"
                  fy="50%"
                  r="39.386%"
                  id="box-gr-b"
                >
                  <stop stopColor="#3ABAB4" offset="0%" />
                  <stop stopColor="#3ABAB4" stopOpacity="0" offset="100%" />
                </radialGradient>
              </defs>
              <g transform="translate(-85 -369)" fill="none" fillRule="evenodd">
                <circle
                  fillOpacity=".16"
                  fill="url(#box-gr-a)"
                  cx="413"
                  cy="688"
                  r="240"
                />
                <circle
                  fillOpacity=".24"
                  fill="url(#box-gr-b)"
                  cx="400"
                  cy="400"
                  r="400"
                />
              </g>
            </svg>
          </div>

          <div className="relative flex flex-col lg:flex-row justify-between items-center">
            {/* CTA content */}
            <div className="mb-6 lg:mr-16 lg:mb-0 text-center lg:text-left lg:w-1/2">
              <h3 className="h3 font-red-hat-display text-gray-100">
                {title}
              </h3>
            </div>

            <a
              className="btn text-white bg-primary shrink-0 font-bold"
              href={externalUrls.appUrl}
            >
              Sign Up Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
