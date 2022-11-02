import { useEffect, useState } from 'react';
import useCheckAuth from '../guards/useCheckAuth';

interface State {
  loading: boolean;
  loaded: boolean;
  authenticated: boolean;
}

/**
 * Hook for getting the authentication status
 *
 * Calls the authProvider.checkAuth() method asynchronously.
 *
 * The return value updates according to the authProvider request state:
 *
 * - loading: true just after mount, while the authProvider is being called. false once the authProvider has answered.
 * - loaded: the opposite of loading.
 * - authenticated: true while loading. then true or false depending on the authProvider response.
 *
 * To avoid rendering a component and force waiting for the authProvider response, use the useAuthState() hook
 * instead of the useAuthenticated() hook.
 *
 * You can render different content depending on the authenticated status.
 *
 * @see useAuthenticated()
 *
 * @param {Object} params Any params you want to pass to the authProvider
 *
 * @returns The current auth check state. Destructure as { authenticated, error, loading, loaded }.
 *
 * @example
 *
 * const MyPage = () => {
 *     const { loading, authenticated } = useAuthState();
 *     if (loading) {
 *         return <Loading />;
 *     }
 *     if (authenticated) {
 *        return <AuthenticatedContent />;
 *     }
 *     return <AnonymousContent />;
 * };
 */
const useAuthState = () => {
  const [state, setState] = useState<State>({
    loading: true,
    loaded: false,
    authenticated: true,
  });
  const checkAuth = useCheckAuth();

  useEffect(() => {
    const callCheckAuth = async () => {
      try {
        await checkAuth({ logoutOnError: false });

        setState({ loading: false, loaded: true, authenticated: true });
      } catch (error) {
        setState({ loading: false, loaded: true, authenticated: false });
      }
    };

    callCheckAuth();
  }, [checkAuth]);

  return state;
};

export default useAuthState;
