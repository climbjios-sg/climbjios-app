import TagManager from 'react-gtm-module';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
// context
import { ProfileProvider } from './contexts/auth/ProfileContext';
import { AuthProvider } from './@types/auth';
import ServiceWorker from './serviceWorker/ServiceWorker';
import { RouterProvider } from 'react-router-dom'; // version 5.2.0
//mixpanel

interface Props {
  authProvider: AuthProvider;
}

if (import.meta.env.VITE_GTM_ID) {
  TagManager.initialize({ gtmId: import.meta.env.VITE_GTM_ID });
}

export default function App({ authProvider }: Props) {
  return (
    <ProfileProvider authProvider={authProvider}>
      <MotionLazyContainer>
        <ThemeProvider>
          <NotistackProvider>
            <ProgressBarStyle />
            <RouterProvider router={Router} />
            <ServiceWorker />
          </NotistackProvider>
        </ThemeProvider>
      </MotionLazyContainer>
    </ProfileProvider>
  );
}
