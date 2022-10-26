import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'src/utils/jwt';
import useCustomSnackbar from '../useCustomSnackbar';
import useLogin from './useLogin';

/**
 * Tries to login using the access token and refresh token
 * found in the URL params.
 */
const useAutoLogin = () => {
  const login = useLogin();
  const [searchParams] = useSearchParams();
  const { enqueueError } = useCustomSnackbar();

  useEffect(() => {
    const callLogin = async () => {
      const accessToken = searchParams.get(ACCESS_TOKEN);
      const refreshToken = searchParams.get(REFRESH_TOKEN);

      if (accessToken === null || refreshToken === null) {
        return;
      }

      try {
        await login({
          accessToken,
          refreshToken,
        });
      } catch {
        enqueueError('Failed to login using the tokens in the url params.');
      }
    };

    callLogin();
  }, [enqueueError, login, searchParams]);
};

export default useAutoLogin;
