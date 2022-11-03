import React from 'react';
import WorkTogetherImage from '../images/060-woman-man-phone-app.svg';
import { externalUrls } from '../constants';

function PublicBeta() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-200 dark:border-gray-800">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 font-red-hat-display mb-4">
              We are in public beta.
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              We need your help to make this work.
            </p>
            <div className="max-w-lg mx-auto">
              <ul className="list-decimal list-inside mb-8 text-left">
                <li className="mb-2">
                  <strong className="font-medium text-gray-900 dark:text-gray-100">
                    Try out our app
                  </strong>
                </li>
                <li className="mb-2">
                  <strong className="font-medium text-gray-900 dark:text-gray-100">
                    Give us feedback on the{' '}
                    <a
                      className="text-blue-600"
                      target="_blank"
                      rel="noopener"
                      href={externalUrls.climbJiosFeedbackTelegramUrl}
                    >
                      ClimbJios Feedback Telegram Group
                    </a>
                    .
                  </strong>
                </li>
              </ul>
            </div>
          </div>

          {/* Custom animation */}
          <div className="max-w-md mx-auto">
            <img src={WorkTogetherImage}></img>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PublicBeta;
