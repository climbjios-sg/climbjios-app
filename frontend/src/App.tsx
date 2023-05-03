import { useEffect } from 'react';
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
import { useLocation, RouterProvider } from 'react-router-dom'; // version 5.2.0
//mixpanel
import mixpanel_actions from './mixpanel';
import { PAGE_VISIT_PREFIX } from './mixpanel/labels';

interface Props {
  authProvider: AuthProvider;
}

if (import.meta.env.VITE_GTM_ID) {
  TagManager.initialize({ gtmId: import.meta.env.VITE_GTM_ID });
}

function useLocationEffect(callback: (location?: any) => any) {
  const location = useLocation();
  useEffect(() => {
    callback(location);
  }, [location, callback]);
}
export default function App({ authProvider }: Props) {
  useLocationEffect((location: Location) => {
    mixpanel_actions.track(PAGE_VISIT_PREFIX + location.pathname);
  });
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
