import { useCallback } from 'react';
import { NavigateOptions, useNavigate } from 'react-router';
import useAuthProvider from './useAuthProvider';
import { PATH_ONBOARDING } from '../../routes/paths';
import { JwtTokenSet } from 'src/@types/token';

type Login = (
  tokens: JwtTokenSet,
  redirectTo?: string,
  redirectOptions?: NavigateOptions
) => Promise<any>;

const useLogin = (): Login => {
  const authProvider = useAuthProvider();
  const navigate = useNavigate();

  const callLogin: Login = useCallback(
    async (tokens, redirectTo = PATH_ONBOARDING.root, redirectOptions) => {
      await authProvider.login(tokens);

      navigate(redirectTo, redirectOptions);
    },
    [authProvider, navigate]
  );

  return callLogin;
};

export default useLogin;
