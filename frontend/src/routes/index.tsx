import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useLocation, createBrowserRouter } from 'react-router-dom';
// components
import LoadingScreen from '../components/LoadingScreen';
import CustomGuard from 'src/components/guards/CustomGuard';
import NoTelegramUsernamePage from 'src/pages/error/NoTelegramUsernameError';
import { isDebug } from 'src/config';
import { gymDetailsLoader } from '../pages/gymDetailsPage/GymDetailsPage';
import ScrollToTop from 'src/components/ScrollToTop';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname, search, state } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  //from DebugRouter
  if (isDebug) {
    console.log(`Route: ${pathname}${search}, State: ${JSON.stringify(state)}`);
  }

  return (
    <Suspense fallback={<LoadingScreen isDashboard={isDashboard} />}>
      <ScrollToTop />
      <Component {...props} />
    </Suspense>
  );
};

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const AutoLogin = Loadable(lazy(() => import('../pages/auth/AutoLogin')));

// ONBOARDING
const Onboarding = Loadable(lazy(() => import('../pages/onboarding')));

// APP
const Dashboard = Loadable(lazy(() => import('../pages/dashboard')));

// USER PUBLIC PROFILE
const UserPublicProfile = Loadable(lazy(() => import('../pages/publicProfile')));

// GYM PUBLIC PROFILE
const GymDetailsPage = Loadable(lazy(() => import('../pages/gymDetailsPage/GymDetailsPage')));

// LANDING
const Page404 = Loadable(lazy(() => import('../pages/error/Page404')));

const JioPage = Loadable(lazy(() => import('../pages/jio')));

export default createBrowserRouter([
  {
    path: 'login',
    element: (
      <CustomGuard notAuthenticated>
        <Login />
      </CustomGuard>
    ),
  },
  // Onboarding Routes
  {
    path: 'onboarding',
    element: (
      <CustomGuard authenticated notOnboarded>
        <Onboarding />
      </CustomGuard>
    ),
  },
  // Dashboard Routes
  {
    path: 'dashboard/*',
    element: (
      <CustomGuard authenticated onboarded>
        <Dashboard />
      </CustomGuard>
    ),
  },
  // Public Profile Routes
  {
    path: 'climber/:userId',
    element: <UserPublicProfile />,
  },
  {
    path: 'gyms/:gymId',
    element: <GymDetailsPage />,
    loader: gymDetailsLoader,
  },
  {
    path: '404',
    element: <Page404 />,
  },
  {
    path: '/updateTelegramUsername',
    element: <NoTelegramUsernamePage />,
  },
  {
    path: 'jios/:id',
    element: <JioPage />,
  },
  {
    path: 'authRedirect',
    element: <AutoLogin />,
  },
  { path: '*', element: <Navigate to="/login" replace /> },
]);
