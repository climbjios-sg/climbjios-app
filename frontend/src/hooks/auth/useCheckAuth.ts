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
const useCheckAuth = () => {
  const authProvider = useAuthProvider();
  const { enqueueSnackbar } = useSnackbar();
  const logout = useLogout();

  const checkAuth = useCallback(
    () =>
      authProvider.checkAuth().catch((error) => {
        logout();

        enqueueSnackbar('Please log in to continue', { variant: 'error' });
        throw error;
      }),
    [authProvider, enqueueSnackbar, logout]
  );

  return checkAuth;
};

export default useCheckAuth;
