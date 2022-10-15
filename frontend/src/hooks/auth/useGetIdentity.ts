import { useEffect, useState } from 'react';
import { UserIdentity } from 'src/@types/user';
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

const useGetIdentity = () => {
  const [state, setState] = useState<State>({
    loading: true,
    loaded: false,
  });

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
    callAuthProvider();
  }, [authProvider]);

  return state;
};

export default useGetIdentity;
