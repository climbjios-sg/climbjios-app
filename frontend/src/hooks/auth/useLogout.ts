import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { PATH_AUTH } from 'src/routes/paths';
import useAuthProvider from './useAuthProvider';

const useLogout = () => {
  // TODO: clear redux store here
  const authProvider = useAuthProvider();

  const navigate = useNavigate();

  const logout = useCallback(async () => {
    await authProvider.logout();

    navigate(PATH_AUTH.root);
  }, [authProvider, navigate]);

  return logout;
};

export default useLogout;
