import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_ONBOARDING } from 'src/routes/paths';
import useAuthProvider from './useAuthProvider';

type CheckOnboarded = (
  redirectOnError?: boolean,
  disableNotification?: boolean,
  redirectTo?: string
) => Promise<any>;

const useCheckOnboarded = (): CheckOnboarded => {
  const authProvider = useAuthProvider();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const checkOnboarded = useCallback(
    async (
      redirectOnError = true,
      disableNotification = false,
      redirectTo = PATH_ONBOARDING.root
    ) => {
      try {
        await authProvider.checkOnboarded();
      } catch (error) {
        if (redirectOnError) {
          navigate(redirectTo);

          if (!disableNotification) {
            enqueueSnackbar('Please complete onboarding to continue');
          }
        }
      }
    },

    [authProvider, enqueueSnackbar, navigate]
  );

  return checkOnboarded;
};

export default useCheckOnboarded;
