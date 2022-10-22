import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import useAutoLogin from 'src/hooks/auth/useAutoLogin';
// components
import LoadingScreen from '../components/LoadingScreen';
import CommonGuard from 'src/components/guards/CommonGuard';
import { isDevelopment } from 'src/config';

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
      element: <Login />,
    },
    // Onboarding Routes
    {
      path: 'onboarding',
      element: (
        <CommonGuard authenticated notOnboarded={!isDevelopment}>
          <Onboarding />
        </CommonGuard>
      ),
    },
    // Dashboard Routes
    {
      path: 'dashboard/*',
      element: (
        <CommonGuard authenticated onboarded={!isDevelopment}>
          <Dashboard />
        </CommonGuard>
      ),
    },
    // Public Profile Routes
    {
      path: 'user/:userId',
      element: (
        <UserPublicProfile />
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    { path: '*', element: <Navigate to="/dashboard" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));

// ONBOARDING
const Onboarding = Loadable(lazy(() => import('../pages/onboarding')));

// APP
const Dashboard = Loadable(lazy(() => import('../pages/dashboard')));

// USER PUBLIC PROFILE
const UserPublicProfile = Loadable(lazy(() => import('../pages/profile/UserPublicProfile')));

// LANDING
const Page404 = Loadable(lazy(() => import('../pages/error/Page404')));
