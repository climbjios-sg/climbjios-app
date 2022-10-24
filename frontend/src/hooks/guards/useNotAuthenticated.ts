import { useEffect } from 'react';
import useCheckNotAuth from './useCheckNotAuth';

const useNotAuthenticated = () => {
  const checkNotAuth = useCheckNotAuth();

  useEffect(() => {
    const callCheckNotAuth = async () => {
      try {
        await checkNotAuth();
      } catch (error) {
        // Silences the error since error handling
        // is already taken care of by the guard hook
      }
    };

    callCheckNotAuth();
  }, [checkNotAuth]);
};

export default useNotAuthenticated;
