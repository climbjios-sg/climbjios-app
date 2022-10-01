import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// components
import LoadingScreen from '../components/LoadingScreen';
import AuthRedirect from '../pages/AuthRedirect';
import AuthGuard from '../pages/guards/AuthGuard';
import { PATH_ONBOARDING } from './paths';

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
      element: <AuthRedirect />,
    },
    {
      path: 'login',
      element: <Login />
    },

    // Onboarding Routes
    {
      path: 'onboarding',
      children: [
        {
          path: 'profile',
          element: (
            <AuthGuard>
              <OnboardingProfile />
            </AuthGuard>
          ),
        },
        {
          path: 'notionstepone',
          element: (
            <AuthGuard>
              <OnboardingNotionStepOne />
            </AuthGuard>
          ),
        },
        {
          path: 'notion',
          element: (
            <AuthGuard>
              <OnboardingNotionStepTwo />
            </AuthGuard>
          ),
        },
        { path: '*', element: <Navigate to={PATH_ONBOARDING.profile} replace /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard/app',
      element: (
        <AuthGuard isOnboardRedirect>
          <MainApp />
        </AuthGuard>
      ),
    },
    {
      path: 'profile',
      element: <UserPublicProfile />,
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));

// ONBOARDING
const OnboardingProfile = Loadable(lazy(() => import('../pages/onboarding/Profile')));
const OnboardingNotionStepOne = Loadable(lazy(() => import('../pages/onboarding/NotionStepOne')));
const OnboardingNotionStepTwo = Loadable(lazy(() => import('../pages/onboarding/NotionStepTwo')));

// APP
const MainApp = Loadable(lazy(() => import('../pages/dashboard/MainApp')));

// USER PUBLIC PROFILE
const UserPublicProfile = Loadable(lazy(() => import('../pages/UserPublicProfile')));

// LANDING
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
