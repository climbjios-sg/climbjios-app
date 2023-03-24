import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useTallyUserResearchPopup from 'src/components/TallyUserResearchPopup';
import { PATH_DASHBOARD } from 'src/routes/paths';
import useAuthProvider from '../auth/useAuthProvider';
import useLocalStorage from '../useLocalStorage';

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

  const { value: justLoggedIn, setValueInLocalStorage: setJustLoggedIn } = useLocalStorage(
    'justLoggedIn',
    false
  );
  const openPopup = useTallyUserResearchPopup();

  const checkNotOnboarded: CheckNotOnboarded = useCallback(
    async ({
      redirectOnSuccess = true,
      disableNotification = false,
      redirectTo = PATH_DASHBOARD.root,
    }) => {
      await authProvider.checkOnboarded();

      //for tally user research:
      //If user is not onboarded, error would be thrown in checkOnBoarded and code doesn't
      //reach here. If user is onboarded, check if he only just logged in, if yes, show popup.
      //This works as all logins will be redirected to Onboarding (from what I can see) which
      //will first go through this guard.
      if (justLoggedIn) {
        setJustLoggedIn(false);
        openPopup();
      }

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
