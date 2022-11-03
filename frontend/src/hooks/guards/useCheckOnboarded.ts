import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_ONBOARDING } from 'src/routes/paths';
import useAuthProvider from '../auth/useAuthProvider';

type CheckOnboarded = (params: {
  redirectOnError?: boolean;
  disableNotification?: boolean;
  redirectTo?: string;
}) => Promise<any>;

/**
 * Get a callback for calling the authProvider.checkOnboarded() method.
 * In case of rejection, redirects to the onboarding page.
 *
 * This is a low level hook.
 *
 * @see useOnboarded
 *
 * @returns {Function} checkOnboarded callback
 */
const useCheckOnboarded = (): CheckOnboarded => {
  const authProvider = useAuthProvider();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const checkOnboarded = useCallback(
    async ({
      redirectOnError = true,
      disableNotification = false,
      redirectTo = PATH_ONBOARDING.root,
    }) => {
      try {
        await authProvider.checkOnboarded();
      } catch (error) {
        if (redirectOnError) {
          navigate(redirectTo);

          if (!disableNotification) {
            enqueueSnackbar('Please complete onboarding to continue', { variant: 'warning' });
          }
        }

        throw error;
      }
    },

    [authProvider, enqueueSnackbar, navigate]
  );

  return checkOnboarded;
};

export default useCheckOnboarded;
