import { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen';
import useAuth from '../../hooks/useAuth';
import { PATH_AUTH, PATH_DASHBOARD, PATH_ONBOARDING } from '../../routes/paths';

type AuthGuardProps = {
  children: ReactNode;
  // Redirect to onboarding page if not onboarded
  isOnboardRedirect?: boolean;
};

export default function AuthGuard({ children, isOnboardRedirect = false }: AuthGuardProps) {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isInitialized) {
      auth.loginFromSession();
    }
  }, [auth]);

  // Step 1
  if (!auth.isInitialized) {
    return <LoadingScreen />;
  }

  // Step 2
  if (!auth.isAuthenticated()) {
    return <Navigate to={PATH_AUTH.root} />;
  }

  return <>{children}</>;
}
