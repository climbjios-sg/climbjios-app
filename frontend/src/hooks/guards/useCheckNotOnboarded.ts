import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/routes/paths';
import useAuthProvider from '../auth/useAuthProvider';

type CheckNotOnboarded = (params: {
  redirectOnSuccess?: boolean;
  disableNotification?: boolean;
  redirectTo?: string;
}) => Promise<any>;

/**
 * Get a callback for calling the authProvider.checkOnboarded() method.
 * In case of resolution, redirects to the dashboard page.
 *
 * This is a low level hook.
 *
 * @see useNotOnboarded
 *
 * @returns {Function} checkNotOnboarded callback
 */
const useCheckNotOnboarded = (): CheckNotOnboarded => {
  const authProvider = useAuthProvider();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const checkNotOnboarded: CheckNotOnboarded = useCallback(
    async ({
      redirectOnSuccess = true,
      disableNotification = false,
      redirectTo = PATH_DASHBOARD.root,
    }) => {
      await authProvider.checkOnboarded();

      if (redirectOnSuccess) {
        navigate(redirectTo);

        if (!disableNotification) {
          enqueueSnackbar('You have already been onboarded', { variant: 'error' });
        }
      }
    },

    [authProvider, enqueueSnackbar, navigate]
  );

  return checkNotOnboarded;
};

export default useCheckNotOnboarded;
