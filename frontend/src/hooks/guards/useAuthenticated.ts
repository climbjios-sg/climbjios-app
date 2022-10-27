import { useEffect } from 'react';
import useCheckAuth from './useCheckAuth';

const useAuthenticated = () => {
  const checkAuth = useCheckAuth();

  useEffect(() => {
    const callCheckAuth = async () => {
      try {
        await checkAuth({});
      } catch (error) {
        // Error has been handled by the guard
      }
    };

    callCheckAuth();
  }, [checkAuth]);
};

export default useAuthenticated;
