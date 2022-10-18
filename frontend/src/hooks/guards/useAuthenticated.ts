import { useEffect } from 'react';
import useCheckAuth from './useCheckAuth';

const useAuthenticated = () => {
  const checkAuth = useCheckAuth();

  useEffect(() => {
    const callCheckAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {}
    };

    callCheckAuth();
  }, [checkAuth]);
};

export default useAuthenticated;
