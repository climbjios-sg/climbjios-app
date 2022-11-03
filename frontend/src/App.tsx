import TagManager from 'react-gtm-module';
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
import { ProfileProvider } from './contexts/auth/ProfileContext';
import { AuthProvider } from './@types/auth';
import ServiceWorker from './serviceWorker/ServiceWorker';

interface Props {
  authProvider: AuthProvider;
}

if (process.env.REACT_APP_GTM_ID) {
  TagManager.initialize({ gtmId: process.env.REACT_APP_GTM_ID });
}

export default function App({ authProvider }: Props) {
  return (
    <ProfileProvider authProvider={authProvider}>
      <MotionLazyContainer>
        <ThemeProvider>
          <NotistackProvider>
            <ProgressBarStyle />
            <ScrollToTop />
            <Router />
            <ServiceWorker />
          </NotistackProvider>
        </ThemeProvider>
      </MotionLazyContainer>
    </ProfileProvider>
  );
}
