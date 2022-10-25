import { useEffect, useState } from 'react';
import useCheckAuth from '../guards/useCheckAuth';

interface State {
  loading: boolean;
  loaded: boolean;
  authenticated: boolean;
}

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
