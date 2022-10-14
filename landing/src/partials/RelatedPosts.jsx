import React from 'react';
import { Link } from 'react-router-dom';

import RelatedImage01 from '../images/related-post-01.jpg';
import RelatedImage02 from '../images/related-post-02.jpg';
import Author01 from '../images/news-author-04.jpg';
import Author02 from '../images/news-author-03.jpg';

function RelatedPosts() {
  return (
    <aside>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <div className="max-w-3xl mx-auto">

            <h4 className="h4 font-red-hat-display mb-8">Related articles</h4>

            {/* Articles container */}
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2" data-aos-id-relposts>

              {/* 1st article */}
              <article className="relative group p-6 text-white" data-aos="fade-down" data-aos-anchor="[data-aos-id-relposts]">
                <figure>
                  <img className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-75 transition duration-700 ease-out" src={RelatedImage01} width="372" height="182" alt="Related post 01" />
                  <div className="absolute inset-0 bg-primary opacity-75 group-hover:opacity-50 transition duration-700 ease-out" aria-hidden="true"></div>
                </figure>
                <div className="relative flex flex-col h-full">
                  <header className="grow">
                    <Link className="hover:underline" to="/blog-post">
                      <h3 className="text-lg font-red-hat-display font-bold tracking-tight mb-2">
                        How to talk about yourself in the best possible way
                      </h3>
                    </Link>
                    <div className="text-sm opacity-80">Nov 16, 2020</div>
                  </header>
                  <footer>
                    {/* Author meta */}
                    <div className="flex items-center text-sm mt-5">
                      <a href="#0">
                        <img className="rounded-full shrink-0 mr-3" src={Author01} width="32" height="32" alt="Author 04" />
                      </a>
                      <div>
                        <span className="opacity-75">By </span>
                        <a className="font-medium hover:underline" href="#0">Mari Champ</a>
                      </div>
                    </div>
                  </footer>
                </div>
              </article>

              {/* 2nd article */}
              <article className="relative group p-6 text-white" data-aos="fade-down" data-aos-anchor="[data-aos-id-relposts]" data-aos-delay="200">
                <figure>
                  <img className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-75 transition duration-700 ease-out" src={RelatedImage02} width="372" height="182" alt="Related post 02" />
                  <div className="absolute inset-0 bg-purple-500 opacity-75 group-hover:opacity-50 transition duration-700 ease-out" aria-hidden="true"></div>
                </figure>
                <div className="relative flex flex-col h-full">
                  <header className="grow">
                    <Link className="hover:underline" to="/blog-post">
                      <h3 className="text-lg font-red-hat-display font-bold tracking-tight mb-2">
                        How I Park Inc make $5,000 every month by sellings gifts
                      </h3>
                    </Link>
                    <div className="text-sm opacity-80">Nov 12, 2020</div>
                  </header>
                  <footer>
                    {/* Author meta */}
                    <div className="flex items-center text-sm mt-5">
                      <a href="#0">
                        <img className="rounded-full shrink-0 mr-3" src={Author02} width="32" height="32" alt="Author 03" />
                      </a>
                      <div>
                        <span className="opacity-75">By </span>
                        <a className="font-medium hover:underline" href="#0">Lisa Allison Champ</a>
                      </div>
                    </div>
                  </footer>
                </div>
              </article>

            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default RelatedPosts;