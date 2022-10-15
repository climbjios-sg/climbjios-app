import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import useAuthProvider from './useAuthProvider';
import { PATH_DASHBOARD } from '../../routes/paths';
import { JwtTokenSet } from 'src/@types/token';

type Login = (params: JwtTokenSet, redirectTo?: string) => Promise<any>;

const useLogin = (): Login => {
  const authProvider = useAuthProvider();
  const navigate = useNavigate();

  const login: Login = useCallback(
    async (params, redirectTo = PATH_DASHBOARD.root) => {
      const res = await authProvider.login(params);

      navigate(redirectTo);

      return res;
    },
    [authProvider, navigate]
  );

  return login;
};

export default useLogin;
