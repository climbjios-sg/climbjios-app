import React from 'react';

import HeroBg from '../images/hero-bg.jpg';
import AuthorImage from '../images/news-author-01.jpg';
import NewsImage01 from '../images/news-inner-image.jpg';
import NewsImage02 from '../images/news-inner-image-left.jpg';
import Header from '../partials/Header';
import Cta from '../partials/Cta';

function OurStory() {
  return (
    <>
      <section className="relative">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            <div className="max-w-3xl mx-auto">
              <article>
                {/* Article header */}
                <header className="mb-14">
                  {/* Title and excerpt */}
                  <div className="text-center md:text-left">
                    <h1
                      className="h1 font-red-hat-display mb-4"
                      data-aos="fade-down"
                    >
                      Our Story
                    </h1>
                  </div>
                </header>

                {/* Article content */}
                <div
                  className="text-lg text-gray-600 dark:text-gray-400"
                  data-aos="fade-up"
                  data-aos-delay="450"
                >
                  <p className="mb-8">
                    <strong className="font-medium text-gray-900 dark:text-gray-100">
                      I started climbing back in 2021. I was hooked right after
                      my first session.
                    </strong>
                  </p>
                  <p className="mb-8">
                    The adrenaline rush, the sense of accomplishment when you
                    finally grabbed the last hold with both hands, the
                    incredible community and countless fist bumps. There's no
                    other sport that brings me more joy than climbing.
                  </p>
                  <p className="mb-8">
                    <strong className="font-medium text-gray-900 dark:text-gray-100">
                      It's not just about individual achievement.
                    </strong>{' '}
                    It's the community that brings me back. We climb together,
                    solve problems together, regardless of our nationality, race
                    or gender. I remember the long conversations with friends
                    met in the climbing gym in Sweden. I remember the friendly
                    lead climbers giving us advice at the outdoor routes in
                    Krabi. I remember the Allez and fist bumps from strangers at
                    FitBloc and B+.
                  </p>
                  <p className="mb-8">
                    <strong className="font-medium text-gray-900 dark:text-gray-100">
                      Climbing is social.
                    </strong>{' '}
                    But there hasn't been a way to connect with each other
                    beyond our brief time at the wall.
                  </p>
                  <p className="mb-8">
                    We built ClimbJios to build long lasting connections among
                    Climbers. And create opportunities for Climbers to give back
                    to the community.
                  </p>
                  <p className="mb-8">
                    <strong className="font-medium text-gray-900 dark:text-gray-100">
                      ClimbJios is open-sourced from design to code.
                    </strong>{' '}
                    You can contribute by sharing your sends, writing code, and
                    helping us Beta test our app 😊
                  </p>
                  <p className="mb-8">
                    Your contribution will impact thousands of Climbers in the
                    future. With ClimbJios, climbing will be more friendly, more
                    social and more affordable.
                  </p>
                  <p className="mb-8">
                    For our v1 private Beta, we built the features to share
                    multi-passes, climb with new friends, and a dedicated
                    climbing profile.
                  </p>
                  <p className="mb-8">
                    <strong className="font-medium text-gray-900 dark:text-gray-100">
                      We can't wait to hear from what you have to say.
                    </strong>
                  </p>
                  <p className="mb-8">- Rizhao, ClimbJios Contributor</p>
                </div>
              </article>
            </div>
          </div>
        </div>
        <Cta title="Let's make climbing better together" />
      </section>
    </>
  );
}

export default OurStory;
