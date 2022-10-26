import { useEffect } from 'react';
import useCheckAuth from './useCheckAuth';

const useAuthenticated = () => {
  const checkAuth = useCheckAuth();

  useEffect(() => {
    const callCheckAuth = async () => {
      try {
        await checkAuth({});
      } catch (error) {
        // Silences the error since error handling
        // is already taken care of by the guard hook
      }
    };

    callCheckAuth();
  }, [checkAuth]);
};

export default useAuthenticated;
