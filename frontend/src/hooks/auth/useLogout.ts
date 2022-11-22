import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useMixpanel } from 'src/contexts/mixpanel/MixpanelContext';
import { PATH_AUTH } from 'src/routes/paths';
import { clearState } from 'src/store/actions/clearActions';
import useAuthProvider from './useAuthProvider';

type Logout = (redirectTo?: string) => Promise<any>;

/**
 * Get a callback for calling the authProvider.logout() method,
 * redirect to the login page, and clear the Redux state.
 *
 * @see useAuthProvider
 *
 * @returns {Function} logout callback
 *
 * @example
 *
 * const LogoutButton = () => {
 *     const logout = useLogout();
 *     const handleClick = () => logout();
 *     return <button onClick={handleClick}>Logout</button>;
 * }
 */
const useLogout = (): Logout => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authProvider = useAuthProvider();
  const mixpanel = useMixpanel();

  const callLogout = useCallback(
    async (redirectTo = PATH_AUTH.root) => {
      await authProvider.logout();
      mixpanel.reset();
      dispatch(clearState());
      navigate(redirectTo);
    },
    [authProvider, dispatch, navigate, mixpanel]
  );

  return callLogout;
};

export default useLogout;
