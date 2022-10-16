import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { PATH_AUTH } from 'src/routes/paths';
import { clearState } from 'src/store/actions/clearActions';
import useAuthProvider from './useAuthProvider';

type Logout = (redirectTo?: string) => Promise<any>;

const useLogout = (): Logout => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useAuthProvider();

  const callLogout = useCallback(
    async (redirectTo = PATH_AUTH.root) => {
      await logout();
      dispatch(clearState());
      navigate(redirectTo);
    },
    [dispatch, logout, navigate]
  );

  return callLogout;
};

export default useLogout;
