import { useEffect } from 'react';
import ReactGA from 'react-ga4';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
// context
// import { NewUserProvider } from './contexts/NewUserContext';
import { useDispatch } from './store';
import { setAuthProvider } from './store/reducers/auth';
import { DEFAULT_AUTH_PROVIDER } from './config';
import { authProviderFactory } from './authProviders';

// ----------------------------------------------------------------------

if (process.env.REACT_APP_GA_TRACKING_ID) {
  ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
}

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuthProvider = async () => {
      const customAuthProvider = await authProviderFactory(DEFAULT_AUTH_PROVIDER);
      dispatch(setAuthProvider(customAuthProvider));
    };

    initAuthProvider();
  });

  useEffect(() => {
    if (process.env.REACT_APP_GA_TRACKING_ID) {
      ReactGA.send({
        hitType: 'pageview',
        page: window.location.pathname + window.location.search,
      });
    }
  }, []);

  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <NotistackProvider>
          <ProgressBarStyle />
          <ScrollToTop />
          <Router />
        </NotistackProvider>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
