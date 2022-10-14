import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
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

  const checkAuth = useCallback(
    (logoutOnError = true, disableNotification = false) =>
      authProvider.checkAuth().catch((error) => {
        if (logoutOnError) {
          logout();

          if (!disableNotification) {
            enqueueSnackbar('Please log in to continue', { variant: 'error' });
          }
        }
        throw error;
      }),
    [authProvider, enqueueSnackbar, logout]
  );

  return checkAuth;
};

type CheckAuth = (logoutOnError?: boolean, disableNotification?: boolean) => Promise<any>;

export default useCheckAuth;
