import { ReactNode, useEffect, useContext } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen';
import useAuth from '../../hooks/useAuth';
import { PATH_AUTH, PATH_DASHBOARD, PATH_ONBOARDING } from '../../routes/paths';
import { useSnackbar } from 'notistack';
import { NewUserContext } from '../../contexts/NewUserContext';

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const auth = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const newUserContext = useContext(NewUserContext);

  useEffect(() => {
    if (!auth.contextFinishedLoading) {
      auth.loginFromSession();
    }
  }, [auth]);

  // Disable auth guard for mobile testing in dev
  if (process.env.REACT_APP_DISABLE_AUTH_GUARD === 'true') {
    return <>{children}</>
  }

  // Step 1
  if (!auth.contextFinishedLoading) {
    return <LoadingScreen />;
  }

  // Step 2
  if (!auth.isLoggedIn) {
    navigate(PATH_AUTH.root);
    return null;
  }

  if (!auth.hasUserData()) {
    if (!newUserContext.hasFilledProfile()) {
      // If name and/or telegram handle is empty, redirect users for them to fill in Name + Telegram handle
      
      /* Debug purposes */
      // enqueueSnackbar(`NewUserContext: ${newUserContext.user}`);

      navigate(PATH_ONBOARDING.newuser);
      return null;
    } else {
      // Either username is empty or all fields filled but user data not dispatched to JWTContext (e.g. in event of network error),
      // redirect users for them to fill in username and subsequently create user in BE
      navigate(PATH_ONBOARDING.username);
      return null;
    }
  }

  return <>{children}</>;
}
