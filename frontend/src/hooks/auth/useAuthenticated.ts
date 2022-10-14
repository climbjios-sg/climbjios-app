import { useEffect } from 'react';
import useCheckAuth from './useCheckAuth';

/// helps you trigger checkauth on component mount
const useAuthenticated = () => {
  const checkAuth = useCheckAuth();

  useEffect(() => {
    const callCheckAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        /// do nothing
      }
    };

    callCheckAuth();
  }, [checkAuth]);
};

export default useAuthenticated;
