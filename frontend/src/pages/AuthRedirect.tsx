import { useEffect, ReactNode, useContext } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { PATH_AUTH, PATH_DASHBOARD, PATH_ONBOARDING } from '../routes/paths';
import { useSnackbar } from 'notistack';
import { SUPPORT_EMAIL } from '../config';
import LoadingScreen from '../components/LoadingScreen';
import useAuth from '../hooks/useAuth';
import { NewUserContext } from '../contexts/NewUserContext';

type AuthRedirectProps = {
  children?: ReactNode;
};

export default function AuthRedirect({ children }: AuthRedirectProps) {
  const auth = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const newUserContext = useContext(NewUserContext);
  const location = useLocation();

  const authGoogle = async (accessToken: string | null, refreshToken: string | null) => {
    try {
      if (!!accessToken && !!refreshToken)
        await auth.storeTokenAndFetchUserData(accessToken, refreshToken);
    } catch (err) {
      console.error(err);
      enqueueSnackbar(
        `Failed to login. Try again. If the problem persists, contact support ${SUPPORT_EMAIL}.`,
        {
          variant: 'error',
          persist: true,
        }
      );
      navigate(PATH_AUTH.root);
    }
  };

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    if (!!accessToken && !!refreshToken) {
      authGoogle(accessToken, refreshToken);
    }

    if (!auth.contextFinishedLoading) {
      auth.loginFromSession();
    }
    /* eslint-disable no-restricted-globals */
    // eslint-disable-next-line react-hooks/exhaustive-deps

    if (!auth.isLoggedIn) {
      console.log(`Redirected from current page ${location.pathname} to ${PATH_AUTH.root}`);
      navigate(PATH_AUTH.root);
      return;
    }

    // if (!auth.hasUserData()) {
      // if (!newUserContext.hasFilledProfile()) {
      //   // If name and/or telegram handle is empty, redirect users for them to fill in Name + Telegram handle
      //   console.log(
      //     `Redirected from current page ${location.pathname} to ${PATH_ONBOARDING.newuser}`
      //   );
      //   navigate(PATH_ONBOARDING.newuser);
      //   return;
      // }

      // Either username is empty or all fields filled but user data not dispatched to JWTContext (e.g. in event of network error),
      // redirect users for them to fill in username and subsequently create user in BE
      // console.log(
      //   `Redirected from current page ${location.pathname} to ${PATH_ONBOARDING.username}`
      // );
      // navigate(PATH_ONBOARDING.username);
      // return;
    // }
    //User has logged in and all user data filled in, then we redirect from login to main page.
    if (location.pathname === PATH_AUTH.root) {
      console.log(
        `Redirected from current page ${location.pathname} to ${PATH_DASHBOARD.general.jios.root}`
      );
      navigate(PATH_DASHBOARD.general.jios.root);
    }
  }, [auth]);

  // Wait if context is not yet initialized
  if (!auth.contextFinishedLoading) {
    return <LoadingScreen />;
  }

  // if (!auth.isLoggedIn) {
  //   navigate(PATH_AUTH.root);
  //   return null;
  // }

  // if (!auth.hasUserData()) {
  //   if (!newUserContext.hasFilledProfile()) {
  //     // If name and/or telegram handle is empty, redirect users for them to fill in Name + Telegram handle

  //     /* Debug purposes */
  //     // enqueueSnackbar(`NewUserContext: ${newUserContext.user}`);

  //     navigate(PATH_ONBOARDING.newuser);
  //     return null;
  //   } else {
  //     // Either username is empty or all fields filled but user data not dispatched to JWTContext (e.g. in event of network error),
  //     // redirect users for them to fill in username and subsequently create user in BE
  //     navigate(PATH_ONBOARDING.username);
  //     return null;
  //   }
  // }

  // navigate(PATH_DASHBOARD.general.jios.root);
  // return <>{children}</>;
  return <>{children}</>;
}
