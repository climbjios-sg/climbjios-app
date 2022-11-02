import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import useAutoLogin from 'src/hooks/auth/useAutoLogin';
// components
import LoadingScreen from '../components/LoadingScreen';
import CommonGuard from 'src/components/guards/CommonGuard';
import NoTelegramUsernamePage from 'src/pages/error/NoTelegramUsernameError';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense fallback={<LoadingScreen isDashboard={isDashboard} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  useAutoLogin();

  return useRoutes([
    {
      path: 'login',
      element: (
        <CommonGuard notAuthenticated>
          <Login />
        </CommonGuard>
      ),
    },
    // Onboarding Routes
    {
      path: 'onboarding',
      element: (
        <CommonGuard authenticated notOnboarded>
          <Onboarding />
        </CommonGuard>
      ),
    },
    // Dashboard Routes
    {
      path: 'dashboard/*',
      element: (
        <CommonGuard authenticated onboarded>
          <Dashboard />
        </CommonGuard>
      ),
    },
    // Public Profile Routes
    {
      path: 'climber/:userId',
      element: <UserPublicProfile />,
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
    { path: '*', element: <Navigate to="/login" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));

// ONBOARDING
const Onboarding = Loadable(lazy(() => import('../pages/onboarding')));

// APP
const Dashboard = Loadable(lazy(() => import('../pages/dashboard')));

// USER PUBLIC PROFILE
const UserPublicProfile = Loadable(lazy(() => import('../pages/publicProfile')));

// LANDING
const Page404 = Loadable(lazy(() => import('../pages/error/Page404')));

const JioPage = Loadable(lazy(() => import('../pages/jio')));
