import React from 'react';

import Header from '../partials/Header';
import HeroTestimonials from '../partials/HeroTestimonials';
import Clients from '../partials/Clients';
import VideoTestimonial from '../partials/VideoTestimonial';
import TestimonialsCarousel from '../partials/TestimonialsCarousel';
import TestimonialsCircles from '../partials/TestimonialsCircles';
import Cta from '../partials/Cta';
import Footer from '../partials/Footer';

function Testimonials() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">

        {/*  Page sections */}
        <HeroTestimonials />
        <Clients />
        <VideoTestimonial />
        <TestimonialsCarousel />
        <TestimonialsCircles />
        <Cta />

      </main>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Testimonials;