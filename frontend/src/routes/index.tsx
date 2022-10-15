import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import Authenticated from 'src/components/auth/Authenticated';
import Public from 'src/components/auth/Public';
// components
import LoadingScreen from '../components/LoadingScreen';

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
  return useRoutes([
    // Main Routes
    {
      path: '/',
      element: <Public />,
    },
    {
      path: 'login',
      element: (
        <Public>
          <Login />
        </Public>
      ),
    },

    // Onboarding Routes
    {
      path: 'onboarding',
      children: [
        {
          path: 'newuser',
          element: (
            <Authenticated>
              <OnboardingNewUserProfile />
            </Authenticated>
          ),
        },
        {
          path: 'username',
          element: (
            <Authenticated>
              <OnboardingNewUserUsername />
            </Authenticated>
          ),
        },
        { path: '*', element: <Navigate to="/newuser" replace /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard/*',
      element: (
        <Authenticated>
          <MainApp />
        </Authenticated>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));

// ONBOARDING
const OnboardingNewUserProfile = Loadable(lazy(() => import('../pages/onboarding/NewUserProfile')));
// const OnboardingNotionStepOne = Loadable(lazy(() => import('../pages/onboarding/NotionStepOne')));
// const OnboardingNotionStepTwo = Loadable(lazy(() => import('../pages/onboarding/NotionStepTwo')));
const OnboardingNewUserUsername = Loadable(
  lazy(() => import('../pages/onboarding/NewUserUsername'))
);

// APP
const MainApp = Loadable(lazy(() => import('../pages/dashboard/MainApp')));

// LANDING
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
