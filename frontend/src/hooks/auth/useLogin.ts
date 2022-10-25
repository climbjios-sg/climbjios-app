import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import useAuthProvider from './useAuthProvider';
import { PATH_ONBOARDING } from '../../routes/paths';
import { JwtTokenSet } from 'src/@types/token';

type Login = (params: JwtTokenSet, redirectTo?: string) => Promise<any>;

const useLogin = (): Login => {
  const authProvider = useAuthProvider();
  const navigate = useNavigate();

  const callLogin: Login = useCallback(
    async (params, redirectTo = PATH_ONBOARDING.root) => {
      await authProvider.login(params);

      navigate(redirectTo);
    },
    [authProvider, navigate]
  );

  return callLogin;
};

export default useLogin;
