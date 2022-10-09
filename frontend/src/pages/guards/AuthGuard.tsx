import { ReactNode, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingScreen from '../../components/LoadingScreen';
import useAuth from '../../hooks/useAuth';
import { PATH_AUTH, PATH_ONBOARDING } from '../../routes/paths';
import { NewUserContext } from '../../contexts/NewUserContext';

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const auth = useAuth();
  const navigate = useNavigate();
  const newUserContext = useContext(NewUserContext);
  const location = useLocation();

  useEffect(() => {
    if (!auth.contextFinishedLoading) {
      auth.loginFromSession();
    }

    if (!auth.isLoggedIn) {
      console.log(`Redirected from current page ${location.pathname} to ${PATH_AUTH.root}`)
      navigate(PATH_AUTH.root);
      return;
    }

    if (!auth.hasUserData()) {
      if (!newUserContext.hasFilledProfile()) {
        // If name and/or telegram handle is empty, redirect users for them to fill in Name + Telegram handle
        console.log(`Redirected from current page ${location.pathname} to ${PATH_ONBOARDING.newuser}`)
        navigate(PATH_ONBOARDING.newuser);
        return;
      }

      // Either username is empty or all fields filled but user data not dispatched to JWTContext (e.g. in event of network error),
      // redirect users for them to fill in username and subsequently create user in BE
      console.log(`Redirected from current page ${location.pathname} to ${PATH_ONBOARDING.username}`)
      navigate(PATH_ONBOARDING.username);
      return;
    }
  }, [auth, location.pathname, navigate, newUserContext]);

  if (!auth.contextFinishedLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
