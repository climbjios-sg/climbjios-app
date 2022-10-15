import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'src/utils/jwt';
import useLogin from './useLogin';

const useAutoLogin = () => {
  const login = useLogin();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const callLogin = async () => {
      const accessToken = searchParams.get(ACCESS_TOKEN);
      const refreshToken = searchParams.get(REFRESH_TOKEN);

      if (accessToken === null || refreshToken === null) {
        return;
      }

      try {
        await login({
          accessToken,
          refreshToken,
        });
      } catch {}
    };

    callLogin();
  }, [login, searchParams]);
};

export default useAutoLogin;
