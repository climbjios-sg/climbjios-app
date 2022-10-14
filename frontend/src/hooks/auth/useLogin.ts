import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import useAuthProvider from './useAuthProvider';
import { PATH_ONBOARDING } from '../../routes/paths';

/// use this for BE custom auth;
const useLogin = (): Login => {
  const authProvider = useAuthProvider();
  const navigate = useNavigate();

  const login: Login = useCallback(
    async (params: any = {}, redirectTo = PATH_ONBOARDING.newuser) => {
      const res = await authProvider.login(params);

      navigate(redirectTo);

      return res;
    },
    [authProvider, navigate]
  );

  return login;
};

type Login = (params: any, redirectTo?: string) => Promise<any>;

export default useLogin;
