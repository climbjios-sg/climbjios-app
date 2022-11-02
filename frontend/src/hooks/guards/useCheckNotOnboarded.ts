import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { NavigateOptions, useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/routes/paths';
import useAuthProvider from '../auth/useAuthProvider';

type CheckNotOnboarded = (params: {
  redirectOnSuccess?: boolean;
  disableNotification?: boolean;
  redirectTo?: string;
  redirectOptions?: NavigateOptions;
}) => Promise<any>;

const useCheckNotOnboarded = (): CheckNotOnboarded => {
  const authProvider = useAuthProvider();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const checkNotOnboarded: CheckNotOnboarded = useCallback(
    async ({
      redirectOnSuccess = true,
      disableNotification = false,
      redirectTo = PATH_DASHBOARD.root,
      redirectOptions,
    }) => {
      await authProvider.checkOnboarded();

      if (redirectOnSuccess) {
        navigate(redirectTo, redirectOptions);

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
