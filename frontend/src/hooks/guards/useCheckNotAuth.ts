import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/routes/paths';
import useAuthProvider from '../auth/useAuthProvider';

type CheckNotAuth = (params: { redirectTo?: string }) => Promise<any>;

const useCheckNotAuth = (): CheckNotAuth => {
  const authProvider = useAuthProvider();
  const navigate = useNavigate();

  const checkNotAuth = useCallback(
    async ({ redirectTo = PATH_DASHBOARD.root }) => {
      await authProvider.checkAuth();
      navigate(redirectTo);
    },

    [authProvider, navigate]
  );

  return checkNotAuth;
};

export default useCheckNotAuth;
