import { useCallback } from 'react';
import { NavigateOptions, useNavigate } from 'react-router';
import useAuthProvider from './useAuthProvider';
import { PATH_ONBOARDING } from '../../routes/paths';
import { JwtTokenSet } from 'src/@types/token';
import { useMixpanel } from 'src/contexts/mixpanel/MixpanelContext';

type Login = (
  tokens: JwtTokenSet,
  redirectTo?: string,
  redirectOptions?: NavigateOptions
) => Promise<any>;

/**
 * Get a callback for calling the authProvider.login() method
 * and redirect to the previous authenticated page (or the home page) on success.
 *
 * @see useAuthProvider
 *
 * @returns {Function} login callback
 *
 * @example
 *
 * const LoginButton = () => {
 *     const [loading, setLoading] = useState(false);
 *     const login = useLogin();
 *     const handleClick = {
 *         setLoading(true);
 *         login({ username: 'john', password: 'p@ssw0rd' }, '/posts')
 *             .then(() => setLoading(false));
 *     }
 *     return <button onClick={handleClick}>Login</button>;
 * }
 */
const useLogin = (): Login => {
  const authProvider = useAuthProvider();
  const navigate = useNavigate();
  const mixpanel = useMixpanel();

  const callLogin: Login = useCallback(
    async (tokens, redirectTo = PATH_ONBOARDING.root, redirectOptions) => {
      const authProviderId = await authProvider.login(tokens);
      mixpanel.identify(authProviderId);

      navigate(redirectTo, redirectOptions);
    },
    [authProvider, navigate, mixpanel]
  );

  return callLogin;
};

export default useLogin;
