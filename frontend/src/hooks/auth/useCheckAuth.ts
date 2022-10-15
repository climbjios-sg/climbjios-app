import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PATH_AUTH } from 'src/routes/paths';
import useAuthProvider from './useAuthProvider';
import useLogout from './useLogout';

/**
 * Checks that user is authenticated (has logged in)
 * Does not check the validity of the access token
 *
 * handle the navigation logic as well
 */
const useCheckAuth = (): CheckAuth => {
  const authProvider = useAuthProvider();
  const { enqueueSnackbar } = useSnackbar();
  const logout = useLogout();
  const [searchParams] = useSearchParams();

  // TODO: extract redirect url
  const checkAuth = useCallback(
    async (logoutOnError = true, disableNotification = false, redirectTo = PATH_AUTH.root) => {
      const callLogout = () => {
        if (logoutOnError) {
          logout(redirectTo);

          if (!disableNotification) {
            enqueueSnackbar('Please log in to continue', { variant: 'error' });
          }
        }
        // throw error;
      };

      try {
        await authProvider.checkAuth();
      } catch (error) {
        console.log('kw1');
        // TODO: extract out the logic, better way?
        // TODO: use const for token
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');
        console.log('kw2', accessToken, refreshToken, window.location.href);

        if (accessToken === null || refreshToken === null) {
          callLogout();
          throw error;
        }
        console.log('kw3');

        try {
          console.log('kw4');
          await authProvider.login({
            accessToken,
            refreshToken,
          });
          console.log('kw5');
        } catch {
          console.log('kw6');
          callLogout();
          throw error;
        }
      }
    },

    [authProvider, enqueueSnackbar, logout, searchParams]
  );

  return checkAuth;
};

type CheckAuth = (
  logoutOnError?: boolean,
  disableNotification?: boolean,
  redirectTo?: string
) => Promise<any>;

export default useCheckAuth;
