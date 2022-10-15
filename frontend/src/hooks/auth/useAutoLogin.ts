import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLogin from './useLogin';

/// observe url params, if has tokens, then try to login using that token;
/// if not, then do nothing; cos cannot assume not authenticated

const useAutoLogin = () => {
  const login = useLogin();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const callLogin = async () => {
      // TODO: use const
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

    callLogin();
  }, [login, searchParams]);
};

export default useAutoLogin;
