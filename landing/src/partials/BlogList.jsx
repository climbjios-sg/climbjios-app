import React from 'react';
import { Link } from 'react-router-dom';

import NewsImage01 from '../images/news-01.jpg';
import NewsImage02 from '../images/news-02.jpg';
import NewsImage03 from '../images/news-03.jpg';
import NewsImage04 from '../images/news-04.jpg';
import NewsImage05 from '../images/news-05.jpg';
import NewsImage06 from '../images/news-06.jpg';
import NewsAuthor01 from '../images/news-author-01.jpg';
import NewsAuthor03 from '../images/news-author-03.jpg';
import NewsAuthor04 from '../images/news-author-04.jpg';
import NewsAuthor05 from '../images/news-author-05.jpg';
import NewsAuthor06 from '../images/news-author-06.jpg';

function BlogList() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <div className="lg:flex lg:justify-between">

            {/* Main content */}
            <div className="lg:grow" data-aos="fade-down" data-aos-delay="200">

              {/* Section title */}
              <h4 className="h3 font-red-hat-display mb-8">Latest</h4>

              {/* Articles container */}
              <div className="grid gap-12 sm:grid-cols-2 sm:gap-x-6 md:gap-y-8 items-start">

                {/* 1st article */}
                <article className="flex flex-col h-full">
                  <header>
                    <Link className="block mb-4" to="/blog-post">
                      <figure className="relative h-0 pb-9/16">
                        <img className="absolute inset-0 w-full h-full object-cover" src={NewsImage01} width="352" height="198" alt="News 01" />
                      </figure>
                    </Link>
                    <Link className="hover:underline" to="/blog-post">
                      <h3 className="h4 font-red-hat-display mb-2">
                        How to create a profile page using ClimbJios
                      </h3>
                    </Link>
                  </header>
                  <p className="text-gray-600 dark:text-gray-400 grow">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <footer className="flex items-center mt-4">
                    <a href="#0">
                      <img className="rounded-full shrink-0 mr-3" src={NewsAuthor03} width="32" height="32" alt="Author 03" />
                    </a>
                    <div className="text-sm text-gray-500">
                      By <a className="font-medium text-gray-800 dark:text-gray-400 hover:underline" href="#0">Lisa Allison</a> · <span className="text-gray-500">Oct 22, 2020</span>
                    </div>
                  </footer>
                </article>

                {/* 2nd article */}
                <article className="flex flex-col h-full">
                  <header>
                    <Link className="block mb-4" to="/blog-post">
                      <figure className="relative h-0 pb-9/16">
                        <img className="absolute inset-0 w-full h-full object-cover" src={NewsImage02} width="352" height="198" alt="News 02" />
                      </figure>
                    </Link>
                    <Link className="hover:underline" to="/blog-post">
                      <h3 className="h4 font-red-hat-display mb-2">
                        20+ elements of a modern website design
                      </h3>
                    </Link>
                  </header>
                  <p className="text-gray-600 dark:text-gray-400 grow">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <footer className="flex items-center mt-4">
                    <a href="#0">
                      <img className="rounded-full shrink-0 mr-3" src={NewsAuthor06} width="32" height="32" alt="Author 06" />
                    </a>
                    <div className="text-sm text-gray-500">
                      By <a className="font-medium text-gray-800 dark:text-gray-400 hover:underline" href="#0">Greg Gilev</a> · <span className="text-gray-500">Oct 22, 2020</span>
                    </div>
                  </footer>
                </article>

                {/* 3rd article */}
                <article className="flex flex-col h-full">
                  <header>
                    <Link className="block mb-4" to="/blog-post">
                      <figure className="relative h-0 pb-9/16">
                        <img className="absolute inset-0 w-full h-full object-cover" src={NewsImage03} width="352" height="198" alt="News 03" />
                      </figure>
                    </Link>
                    <Link className="hover:underline" to="/blog-post">
                      <h3 className="h4 font-red-hat-display mb-2">
                        20 unique places to find web design inspiration
                      </h3>
                    </Link>
                  </header>
                  <p className="text-gray-600 dark:text-gray-400 grow">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <footer className="flex items-center mt-4">
                    <a href="#0">
                      <img className="rounded-full shrink-0 mr-3" src={NewsAuthor01} width="32" height="32" alt="Author 01" />
                    </a>
                    <div className="text-sm text-gray-500">
                      By <a className="font-medium text-gray-800 dark:text-gray-400 hover:underline" href="#0">Mark Varsano</a> · <span className="text-gray-500">Oct 22, 2020</span>
                    </div>
                  </footer>
                </article>

                {/* 4th article */}
                <article className="flex flex-col h-full">
                  <header>
                    <Link className="block mb-4" to="/blog-post">
                      <figure className="relative h-0 pb-9/16">
                        <img className="absolute inset-0 w-full h-full object-cover" src={NewsImage04} width="352" height="198" alt="News 04" />
                      </figure>
                    </Link>
                    <Link className="hover:underline" to="/blog-post">
                      <h3 className="h4 font-red-hat-display mb-2">
                        What to look for in a digital portfolio
                      </h3>
                    </Link>
                  </header>
                  <p className="text-gray-600 dark:text-gray-400 grow">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <footer className="flex items-center mt-4">
                    <a href="#0">
                      <img className="rounded-full shrink-0 mr-3" src={NewsAuthor03} width="32" height="32" alt="Author 03" />
                    </a>
                    <div className="text-sm text-gray-500">
                      By <a className="font-medium text-gray-800 dark:text-gray-400 hover:underline" href="#0">Lisa Allison</a> · <span className="text-gray-500">Oct 22, 2020</span>
                    </div>
                  </footer>
                </article>

                {/* 5th article */}
                <article className="flex flex-col h-full">
                  <header>
                    <Link className="block mb-4" to="/blog-post">
                      <figure className="relative h-0 pb-9/16">
                        <img className="absolute inset-0 w-full h-full object-cover" src={NewsImage05} width="352" height="198" alt="News 05" />
                      </figure>
                    </Link>
                    <Link className="hover:underline" to="/blog-post">
                      <h3 className="h4 font-red-hat-display mb-2">
                        Why your customers needs a responsive website
                      </h3>
                    </Link>
                  </header>
                  <p className="text-gray-600 dark:text-gray-400 grow">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <footer className="flex items-center mt-4">
                    <a href="#0">
                      <img className="rounded-full shrink-0 mr-3" src={NewsAuthor04} width="32" height="32" alt="Author 04" />
                    </a>
                    <div className="text-sm text-gray-500">
                      By <a className="font-medium text-gray-800 dark:text-gray-400 hover:underline" href="#0">Mary Champ</a> · <span className="text-gray-500">Oct 22, 2020</span>
                    </div>
                  </footer>
                </article>

                {/* 6th article */}
                <article className="flex flex-col h-full">
                  <header>
                    <Link className="block mb-4" to="/blog-post">
                      <figure className="relative h-0 pb-9/16">
                        <img className="absolute inset-0 w-full h-full object-cover" src={NewsImage06} width="352" height="198" alt="News 06" />
                      </figure>
                    </Link>
                    <Link className="hover:underline" to="/blog-post">
                      <h3 className="h4 font-red-hat-display mb-2">
                        Launch lessons: the creators of Intrusive Inc.
                      </h3>
                    </Link>
                  </header>
                  <p className="text-gray-600 dark:text-gray-400 grow">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <footer className="flex items-center mt-4">
                    <a href="#0">
                      <img className="rounded-full shrink-0 mr-3" src={NewsAuthor05} width="32" height="32" alt="Author 05" />
                    </a>
                    <div className="text-sm text-gray-500">
                      By <a className="font-medium text-gray-800 dark:text-gray-400 hover:underline" href="#0">Yuri Lapko</a> · <span className="text-gray-500">Oct 22, 2020</span>
                    </div>
                  </footer>
                </article>

              </div>

              {/* Load more button */}
              <div className="flex justify-center mt-12 md:mt-16">
                <a className="btn-sm text-gray-300 hover:text-gray-100 bg-gray-800 flex items-center" href="#0">
                  <span>See previous articles</span>
                  <svg className="w-4 h-4 shrink-0 ml-3" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path className="fill-current text-gray-500" d="M14.7 9.3l-1.4-1.4L9 12.2V0H7v12.2L2.7 7.9 1.3 9.3 8 16z" />
                  </svg>
                </a>
              </div>

            </div>

            {/* Sidebar */}
            <aside className="relative mt-12 lg:mt-0 lg:w-64 lg:ml-16 lg:shrink-0" data-aos="fade-down" data-aos-delay="400">

              {/* Popular posts */}
              <div className="mb-8">
                <h4 className="h4 font-red-hat-display mb-5">Popular on Simple</h4>
                <ul className="-my-3">
                  <li className="flex py-3 border-b border-gray-200 dark:border-gray-800">
                    <div className="h4 w-12 font-red-hat-display text-gray-400 dark:text-gray-600 shrink-0 mt-1">01</div>
                    <article>
                      <Link className="hover:underline" to="/blog-post">
                        <h3 className="font-red-hat-display font-bold tracking-tight mb-1">
                          How to get creative using geometric patterns
                        </h3>
                      </Link>
                      <div className="text-sm text-gray-500">
                        By <a className="font-medium text-gray-800 dark:text-gray-400 hover:underline" href="#0">Mary Champ</a> · <span className="text-gray-500">Oct 22, 2020</span>
                      </div>
                    </article>
                  </li>
                  <li className="flex py-3 border-b border-gray-200 dark:border-gray-800">
                    <div className="h4 w-12 font-red-hat-display text-gray-400 dark:text-gray-600 shrink-0 mt-1">02</div>
                    <article>
                      <Link className="hover:underline" to="/blog-post">
                        <h3 className="font-red-hat-display font-bold tracking-tight mb-1">
                          Create your branding strategy in 4 simple steps
                        </h3>
                      </Link>
                      <div className="text-sm text-gray-500">
                        By <a className="font-medium text-gray-800 dark:text-gray-400 hover:underline" href="#0">Lisa Allison</a> · <span className="text-gray-500">Oct 17, 2020</span>
                      </div>
                    </article>
                  </li>
                  <li className="flex py-3 border-b border-gray-200 dark:border-gray-800">
                    <div className="h4 w-12 font-red-hat-display text-gray-400 dark:text-gray-600 shrink-0 mt-1">03</div>
                    <article>
                      <Link className="hover:underline" to="/blog-post">
                        <h3 className="font-red-hat-display font-bold tracking-tight mb-1">
                          Don’t miss ClimbJios’s exclusive workshop with our CEO
                        </h3>
                      </Link>
                      <div className="text-sm text-gray-500">
                        By <a className="font-medium text-gray-800 dark:text-gray-400 hover:underline" href="#0">Lisa Allison</a> · <span className="text-gray-500">Oct 2, 2020</span>
                      </div>
                    </article>
                  </li>
                  <li className="flex py-3 border-b border-gray-200 dark:border-gray-800">
                    <div className="h4 w-12 font-red-hat-display text-gray-400 dark:text-gray-600 shrink-0 mt-1">04</div>
                    <article>
                      <Link className="hover:underline" to="/blog-post">
                        <h3 className="font-red-hat-display font-bold tracking-tight mb-1">
                          How to optimize your website to convert more leads
                        </h3>
                      </Link>
                      <div className="text-sm text-gray-500">
                        By <a className="font-medium text-gray-800 dark:text-gray-400 hover:underline" href="#0">Greg Gilev</a> · <span className="text-gray-500">Sep 24, 2020</span>
                      </div>
                    </article>
                  </li>
                  <li className="flex py-3 border-b border-gray-200 dark:border-gray-800">
                    <div className="h4 w-12 font-red-hat-display text-gray-400 dark:text-gray-600 shrink-0 mt-1">05</div>
                    <article>
                      <Link className="hover:underline" to="/blog-post">
                        <h3 className="font-red-hat-display font-bold tracking-tight mb-1">
                          What to do if your product idea is stolen
                        </h3>
                      </Link>
                      <div className="text-sm text-gray-500">
                        By <a className="font-medium text-gray-800 dark:text-gray-400 hover:underline" href="#0">Yuri Lapko</a> · <span className="text-gray-500">Sep 22, 2020</span>
                      </div>
                    </article>
                  </li>
                </ul>
              </div>

            </aside>

          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogList;