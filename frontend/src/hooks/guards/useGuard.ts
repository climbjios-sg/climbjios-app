import { useEffect, useState, ReactNode } from 'react';

interface State {
  loading: boolean;
  loaded: boolean;
  error?: any;
  ward?: ReactNode;
}

/**
 * TODO: create a common interface for guards but
 * will require some changes in the implementation
 * of current guards
 * (onError, disableNotification) => Promise<void>
 */
const useGuard = (guards: Function[], ward?: ReactNode) => {
  const [state, setState] = useState<State>({
    loading: true,
    loaded: false,
  });

  useEffect(() => {
    const callGuards = async () => {
      try {
        for (const guard of guards) {
          await guard({});
        }

        setState({
          loading: false,
          loaded: true,
          ward,
        });
      } catch (error) {
        setState({
          loading: false,
          loaded: true,
          error,
        });
      }
    };

    setState({
      loading: true,
      loaded: false,
    });

    callGuards();
  }, [guards, ward]);

  return state;
};

export default useGuard;
