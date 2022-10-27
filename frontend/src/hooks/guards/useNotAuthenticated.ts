import { useEffect } from 'react';
import useCheckNotAuth from './useCheckNotAuth';

const useNotAuthenticated = () => {
  const checkNotAuth = useCheckNotAuth();

  useEffect(() => {
    const callCheckNotAuth = async () => {
      try {
        await checkNotAuth({});
      } catch (error) {
        // Error has been handled by the guard
      }
    };

    callCheckNotAuth();
  }, [checkNotAuth]);
};

export default useNotAuthenticated;
