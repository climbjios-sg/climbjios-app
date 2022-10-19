import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/routes/paths';
import useAuthProvider from '../auth/useAuthProvider';

type CheckNotOnboarded = (
  redirectOnError?: boolean,
  disableNotification?: boolean,
  redirectTo?: string
) => Promise<any>;

const useCheckNotOnboarded = (): CheckNotOnboarded => {
  const authProvider = useAuthProvider();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const checkNotOnboarded = useCallback(
    async (
      redirectOnError = true,
      disableNotification = false,
      redirectTo = PATH_DASHBOARD.root
    ) => {
      try {
        await authProvider.checkOnboarded();

        if (redirectOnError) {
          navigate(redirectTo);

          if (!disableNotification) {
            enqueueSnackbar('You have already been onboarded', { variant: 'error' });
          }
        }
      } catch (error) {
        // Silences the error since NotOnboarded is the happy path in this case
      }
    },

    [authProvider, enqueueSnackbar, navigate]
  );

  return checkNotOnboarded;
};

export default useCheckNotOnboarded;
