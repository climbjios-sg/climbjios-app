import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PATH_AUTH } from 'src/routes/paths';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'src/utils/jwt';
import useAuthProvider from '../auth/useAuthProvider';
import useLogout from '../auth/useLogout';

type CheckAuth = (params: {
  logoutOnError?: boolean;
  disableNotification?: boolean;
  redirectTo?: string;
}) => Promise<any>;

/**
 * Get a callback for calling the authProvider.checkAuth() method.
 * In case of rejection, redirects to the login page, displays a notification,
 * and throws an error.
 *
 * This is a low level hook. See those more specialized hooks
 * for common authentication tasks, based on useCheckAuth.
 *
 * @see useAuthenticated
 * @see useAuthState
 *
 * @returns {Function} checkAuth callback
 *
 * @example
 *
 * const MyProtectedPage = () => {
 *     const checkAuth = useCheckAuth();
 *     useEffect(() => {
 *         checkAuth().catch(() => {});
 *     }, []);
 *     return <p>Private content: EZAEZEZAET</p>
 * } // tip: use useAuthenticated() hook instead
 *
 * const MyPage = () => {
 *     const checkAuth = useCheckAuth();
 *     const [authenticated, setAuthenticated] = useState(true); // optimistic auth
 *     useEffect(() => {
 *         checkAuth({}, false)
 *              .then(() => setAuthenticated(true))
 *              .catch(() => setAuthenticated(false));
 *     }, []);
 *     return authenticated ? <Bar /> : <BarNotAuthenticated />;
 * } // tip: use useAuthState() hook instead
 */
const useCheckAuth = (): CheckAuth => {
  const authProvider = useAuthProvider();
  const { enqueueSnackbar } = useSnackbar();
  const logout = useLogout();
  const [searchParams] = useSearchParams();

  const checkAuth = useCallback(
    async ({ logoutOnError = true, disableNotification = false, redirectTo = PATH_AUTH.root }) => {
      const callLogout = () => {
        if (logoutOnError) {
          logout(redirectTo);

          if (!disableNotification) {
            enqueueSnackbar('Please log in to continue', { variant: 'error' });
          }
        }
      };

      try {
        await authProvider.checkAuth();
      } catch (error) {
        const accessToken = searchParams.get(ACCESS_TOKEN);
        const refreshToken = searchParams.get(REFRESH_TOKEN);

        if (accessToken === null || refreshToken === null) {
          callLogout();
          throw error;
        }

        try {
          await authProvider.login({
            accessToken,
            refreshToken,
          });
        } catch {
          callLogout();
          throw error;
        }
      }
    },

    [authProvider, enqueueSnackbar, logout, searchParams]
  );

  return checkAuth;
};

export default useCheckAuth;
