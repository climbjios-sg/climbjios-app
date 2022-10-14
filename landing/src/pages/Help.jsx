import React from 'react';

import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import HeroHelp from '../partials/HeroHelp';
import HelpList from '../partials/HelpList';
import RelatedLinks from '../partials/RelatedLinks';
import Footer from '../partials/Footer';

function Help() {

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

        {/*  Page sections */}
        <HeroHelp />
        <HelpList />
        <RelatedLinks />

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Help;