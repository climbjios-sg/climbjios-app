import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'src/utils/jwt';
import useCustomSnackbar from '../useCustomSnackbar';
import useLocalStorage from '../useLocalStorage';
import useRedirectPath from '../useRedirectPath';
import useLogin from './useLogin';

/**
 * Tries to login using the session tokens found in the URL params.
 */
const useAutoLogin = () => {
  const login = useLogin();
  const [searchParams] = useSearchParams();
  const { enqueueError, enqueueSnackbar } = useCustomSnackbar();
  const { redirectPath, clearRedirectPath } = useRedirectPath();

  //for tally user research
  const { setValueInLocalStorage: setJustLoggedIn } = useLocalStorage('justLoggedIn', false);

  useEffect(() => {
    const callLogin = async () => {
      const accessToken = searchParams.get(ACCESS_TOKEN);
      const refreshToken = searchParams.get(REFRESH_TOKEN);
      const updatedTelegramUsername = searchParams.get('updatedTelegramUsername');

      if (accessToken === null || refreshToken === null) {
        return;
      }

      if (updatedTelegramUsername) {
        JSON.parse(updatedTelegramUsername)
          ? enqueueSnackbar('Telegram username updated!')
          : enqueueError('Error updating Telegram username!');
      }
      
      try {
        await login(
          {
            accessToken,
            refreshToken,
          },
          redirectPath?.to,
          redirectPath?.options
        );
        clearRedirectPath();
      } catch {
        enqueueError('Failed to login using the tokens in the url params.');
      }
    };

    callLogin();
    setJustLoggedIn(true);
  }, [
    clearRedirectPath,
    enqueueError,
    enqueueSnackbar,
    login,
    setJustLoggedIn,
    redirectPath?.options,
    redirectPath?.to,
    searchParams,
  ]);
};

export default useAutoLogin;
