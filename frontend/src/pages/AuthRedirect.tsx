import { useEffect, ReactNode, useContext } from 'react';
import { Navigate, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { PATH_AUTH, PATH_DASHBOARD, PATH_ONBOARDING } from '../routes/paths';
import { useSnackbar } from 'notistack';
import { SUPPORT_EMAIL } from '../config';
import LoadingScreen from '../components/LoadingScreen';
import useAuth from '../hooks/useAuth';
import { NewUserContext } from '../contexts/NewUserContext';
import { LocationContext } from 'react-router/dist/lib/context';

type AuthRedirectProps = {
  children: ReactNode;
};

export default function AuthRedirect({ children }: AuthRedirectProps) {
  const auth = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const newUserContext = useContext(NewUserContext);

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
      navigate(PATH_AUTH.root);
      return;
    }

    if (!auth.hasUserData()) {
      // console.log(`Redirected by AuthRedirect`);
      if (!newUserContext.hasFilledProfile()) {
        // If name and/or telegram handle is empty, redirect users for them to fill in Name + Telegram handle

        /* Debug purposes */
        // enqueueSnackbar(`NewUserContext: ${newUserContext.user}`);

        navigate(PATH_ONBOARDING.newuser);
        return;
      }

      // Either username is empty or all fields filled but user data not dispatched to JWTContext (e.g. in event of network error),
      // redirect users for them to fill in username and subsequently create user in BE
      navigate(PATH_ONBOARDING.username);
      return;
    }

    navigate(PATH_DASHBOARD.general.jios.root);
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
