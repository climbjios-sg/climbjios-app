import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import useAuthProvider from './useAuthProvider';
import { PATH_DASHBOARD, PATH_ONBOARDING } from '../../routes/paths';
import { JwtTokenSet } from 'src/@types/token';

/// use this for BE custom auth;
const useLogin = (): Login => {
  const authProvider = useAuthProvider();
  const navigate = useNavigate();

  const login: Login = useCallback(
    // TODO: type here is {refreshtoken, accesstoken}
    // change to path onboarding new user
    async (params, redirectTo = PATH_DASHBOARD.root) => {
      const res = await authProvider.login(params);

      navigate(redirectTo);

      return res;
    },
    [authProvider, navigate]
  );

  return login;
};

type Login = (params: JwtTokenSet, redirectTo?: string) => Promise<any>;

export default useLogin;
