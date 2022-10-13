import React from 'react';

import Header from '../partials/Header';
import HeroAbout from '../partials/HeroAbout';
import FeaturesGallery from '../partials/FeaturesGallery';
import Timeline from '../partials/Timeline';
import Career from '../partials/Career';
import FeaturesAnimation from '../partials/FeaturesAnimation';
import Team from '../partials/Team';
import CtaContact from '../partials/CtaContact';
import Footer from '../partials/Footer';

function About() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">

        {/*  Page sections */}
        <HeroAbout />
        <FeaturesGallery />
        <Timeline />
        <Career />
        <FeaturesAnimation />
        <Team />
        <CtaContact />

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default About;