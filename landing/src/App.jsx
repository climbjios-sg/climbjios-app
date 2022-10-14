import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';

import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import Blog from './pages/Blog';
import OurStory from './pages/OurStory';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Header from './partials/Header';
import Footer from './partials/Footer';
import { paths } from './constants';

function App() {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 750,
      easing: 'ease-out-quart',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Header />
      <Routes>
        <Route exact path={paths.root} element={<Home />} />
        <Route exact path={paths.ourStory} element={<OurStory />} />
        <Route exact path={paths.privacyPolicy} element={<PrivacyPolicy />} />
        <Route exact path={paths.terms} element={<Terms />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
