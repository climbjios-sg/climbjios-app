import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { PATH_AUTH } from 'src/routes/paths';
import useAuthProvider from './useAuthProvider';

const useLogout = (): Logout => {
  // TODO: clear redux store here
  const authProvider = useAuthProvider();

  const navigate = useNavigate();

  const logout = useCallback(
    async (redirectTo = PATH_AUTH.root) => {
      await authProvider.logout();

      navigate(redirectTo);
    },
    [authProvider, navigate]
  );

  return logout;
};

type Logout = (redirectTo?: string) => Promise<any>;

export default useLogout;
