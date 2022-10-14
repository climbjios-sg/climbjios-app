import React from 'react';
import { Icon } from '@iconify/react';

function FeaturesBlocks() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-200 dark:border-gray-800">
          {/* Items */}
          <div
            className="max-w-xs mx-auto sm:max-w-none md:max-w-xl lg:max-w-none grid sm:grid-cols-2 gap-4 lg:gap-6 lg:grid-cols-3"
            data-aos-id-featbl
          >
            {/* 1st item */}
            <div
              className="flex flex-col p-5 group text-white bg-gradient-to-tr from-teal-500 to-teal-400 dark:to-teal-500 shadow-2xl"
              data-aos="fade-down"
              data-aos-anchor="[data-aos-id-featbl]"
            >
              <Icon className="w-8 h-8 mb-3" icon="mingcute:coupon-line" />
              <div className="font-red-hat-display text-xl font-extrabold tracking-tighter mb-1">
                Swap passes
              </div>
              <div className="grow opacity-80 mb-4">
                Buy & sell passes on the go. Search for specific gyms.
              </div>
            </div>

            {/* 2nd item */}
            <div
              className="flex flex-col p-5 group text-white bg-gradient-to-tr from-purple-500 to-purple-400 dark:to-purple-500 shadow-2xl"
              data-aos="fade-down"
              data-aos-anchor="[data-aos-id-featbl]"
              data-aos-delay="100"
            >
              <Icon className="w-8 h-8 mb-3" icon="eva:people-outline" />
              <div className="font-red-hat-display text-xl font-extrabold tracking-tighter mb-1">
                Make new friends
              </div>
              <div className="grow opacity-80 mb-4">
                Dedicated profile page. Find your climbing buddies.
              </div>
            </div>

            {/* 3rd item */}
            <div
              className="flex flex-col p-5 group text-white bg-gradient-to-tr from-pink-500 to-pink-400 dark:to-pink-500 shadow-2xl"
              data-aos="fade-down"
              data-aos-anchor="[data-aos-id-featbl]"
              data-aos-delay="300"
            >
              <Icon className="w-8 h-8 mb-3" icon="akar-icons:video" />
              <div className="font-red-hat-display text-xl font-extrabold tracking-tighter mb-1">
                Share Beta (Coming soon)
              </div>
              <div className="grow opacity-80 mb-4">
                Watch and share Beta videos for climbing routes in each gym.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesBlocks;
