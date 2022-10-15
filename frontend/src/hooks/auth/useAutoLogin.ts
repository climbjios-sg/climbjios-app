import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLogin from './useLogin';

/// helps you trigger checkauth on component mount
const useAutoLogin = () => {
  const login = useLogin();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const callCheckAuth = async () => {
      const accessToken = searchParams.get('accessToken');
      const refreshToken = searchParams.get('refreshToken');

      if (accessToken === null || refreshToken === null) {
        return;
      }

      try {
        await login({
          accessToken,
          refreshToken,
        });
      } catch {
        /// do nothing
      }
    };

    callCheckAuth();
  }, [login, searchParams]);
};

export default useAutoLogin;
