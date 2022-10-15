import { useEffect, useState } from 'react';
import { UserIdentity } from 'src/@types/user';
import { useAuth } from 'src/contexts/auth/ProfileContext';
import useAuthProvider from './useAuthProvider';

const defaultIdentity: UserIdentity = {
  id: '',
};

interface State {
  loading: boolean;
  loaded: boolean;
  identity?: UserIdentity;
  error?: any;
}

// TODO: better way?
const useGetIdentity = () => {
  const [state, setState] = useState<State>({
    loading: true,
    loaded: false,
  });

  const { userIdentity } = useAuth();
  const authProvider = useAuthProvider();

  useEffect(() => {
    const callAuthProvider = async () => {
      try {
        const identity = await authProvider.getIdentity?.();
        setState({
          loading: false,
          loaded: true,
          identity: identity || defaultIdentity,
        });
      } catch (error) {
        setState({
          loading: false,
          loaded: true,
          error,
        });
      }
    };

    if (userIdentity) {
      setState({
        loading: false,
        loaded: true,
        identity: userIdentity,
      });
    } else {
      callAuthProvider();
    }
  }, [authProvider, userIdentity]);

  return state;
};

export default useGetIdentity;
