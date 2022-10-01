import { useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { PATH_AUTH, PATH_DASHBOARD, PATH_ONBOARDING } from '../routes/paths';
import { BE_API } from '../utils/api';
import { useSnackbar } from 'notistack';
import { SUPPORT_EMAIL } from '../config';
import authorizedAxios from '../utils/authorizedAxios';
import LoadingScreen from '../components/LoadingScreen';
import useAuth from '../hooks/useAuth';

export default function AuthRedirect() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const linkedinCode = searchParams.get('code');

  const authLinkedin = async () => {
    try {
      const { data: authData } = await authorizedAxios.post(BE_API.auth.linkedin, {
        oAuthToken: linkedinCode,
      });
      const { jwtToken } = authData;
      await auth.loginLinkedin(jwtToken);
    } catch (err) {
      console.error(err);
      enqueueSnackbar(
        `Failed to login. Try again. If the problem persists, contact support ${SUPPORT_EMAIL}.`,
        {
          variant: 'error',
          persist: true,
        }
      );
      navigate(PATH_AUTH.login);
    }
  };

  useEffect(() => {
    if (linkedinCode) {
      authLinkedin();
      return;
    }

    auth.loginFromSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Wait if context is not yet initialized
  if (!auth.isInitialized) {
    return <LoadingScreen />;
  }

  if (!auth.isAuthenticated()) {
    return <Navigate to={PATH_AUTH.login} />;
  }

  if (!auth.isOnboarded()) {
    return <Navigate to={PATH_ONBOARDING.profile} />;
  }

  return <Navigate to={PATH_DASHBOARD.general.app} />;
}
