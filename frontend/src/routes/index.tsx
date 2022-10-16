import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import Authenticated from 'src/components/auth/Authenticated';
import Public from 'src/components/auth/Public';
import useAutoLogin from 'src/hooks/auth/useAutoLogin';
// components
import LoadingScreen from '../components/LoadingScreen';
import Onboarding from '../pages/onboarding';

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
        <Authenticated>
          <Onboarding />
        </Authenticated>
      ),
    },
    // Dashboard Routes
    {
      path: 'dashboard/*',
      element: (
        <Authenticated>
          <Dashboard />
        </Authenticated>
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

// LANDING
const Page404 = Loadable(lazy(() => import('../pages/error/Page404')));
