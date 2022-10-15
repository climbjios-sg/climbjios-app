import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAuthProvider from './useAuthProvider';
import useCheckAuth from './useCheckAuth';

/// helps you trigger checkauth on component mount
const useAutoLogin = () => {
  const checkAuth = useCheckAuth();
  const [searchParams] = useSearchParams();
  const authProvider = useAuthProvider();

  useEffect(() => {
    const callCheckAuth = async () => {
      const accessToken = searchParams.get('accessToken');
      const refreshToken = searchParams.get('refreshToken');

      if (accessToken === null || refreshToken === null) {
        return;
      }

      try {
        await authProvider.login({
          accessToken,
          refreshToken,
        });
      } catch {
        /// do nothing
      }
    };

    callCheckAuth();
  }, [authProvider, checkAuth, searchParams]);
};

export default useAutoLogin;
