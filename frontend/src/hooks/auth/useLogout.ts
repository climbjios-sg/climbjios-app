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
  const authProvider = useAuthProvider();

  const callLogout = useCallback(
    async (redirectTo = PATH_AUTH.root) => {
      await authProvider.logout();
      dispatch(clearState());
      navigate(redirectTo);
    },
    [authProvider, dispatch, navigate]
  );

  return callLogout;
};

export default useLogout;
