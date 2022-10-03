import { useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { PATH_AUTH, PATH_DASHBOARD, PATH_ONBOARDING } from '../routes/paths';
import { useSnackbar } from 'notistack';
import { SUPPORT_EMAIL } from '../config';
import LoadingScreen from '../components/LoadingScreen';
import useAuth from '../hooks/useAuth';

export default function AuthRedirect() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();

  const authGoogle = async (accessToken: string | null, refreshToken: string | null) => {
    try {
      if (!!accessToken && !!refreshToken) await auth.loginGoogle(accessToken, refreshToken);
    } catch (err) {
      console.error(err);
      enqueueSnackbar(
        `Failed to login. Try again. If the problem persists, contact support ${SUPPORT_EMAIL}.`,
        {
          variant: 'error',
          persist: true,
        }
      );
      navigate(PATH_AUTH.root);
    }
  };

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    if (!!accessToken && !!refreshToken) {
      authGoogle(accessToken, refreshToken);
      return;
    }
    console.log('Trying to login from session');
    auth.loginFromSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Wait if context is not yet initialized
  if (!auth.isInitialized) {
    return <LoadingScreen />;
  }

  if (!auth.isAuthenticated()) {
    return <Navigate to={PATH_AUTH.root} />;
  }

  if (!auth.isOnboarded()) {
    return <Navigate to={PATH_ONBOARDING.newuser} />;
  }

  return <Navigate to={PATH_DASHBOARD.general.app} />;
}
