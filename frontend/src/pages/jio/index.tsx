import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import { useRequest } from 'ahooks';
import { useNavigate, useParams } from 'react-router-dom';
import FloatingBottomCard from '../../components/FloatingBottomCard';
import LoadingScreen from '../../components/LoadingScreen';
import useCustomSnackbar from '../../hooks/useCustomSnackbar';
import Logo from '../../components/Logo';
import Page from '../../components/Page';
import { getJio } from '../../services/jios';
import LoginForm from '../auth/LoginForm';
import JioCard from '../dashboard/jios/list/allJios/JioCard';
import Page404 from '../error/Page404';
import { useDispatch } from '../../store';
import { PATH_DASHBOARD, PATH_USER } from '../../routes/paths';
import { UserProfileLocationState } from '../publicProfile';
import useAuthState from '../../hooks/auth/useAuthState';
import useRedirectPath from '../../hooks/useRedirectPath';

export default function JioPage() {
  const { authenticated } = useAuthState();
  const { id } = useParams();
  const snackbar = useCustomSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setRedirectPath } = useRedirectPath();
  const jioId = id as string;

  const { data, loading } = useRequest(() => getJio(jioId), {
    onError: () => {
      snackbar.enqueueError('Failed to retrieve Jio.');
    },
  });

  useEffect(() => {
    if (data && !data.data.isClosed) {
      const redirectPathTo = PATH_USER.general.user(data.data.creatorId);
      const redirectPathOptions = {
        state: {
          user: data.data.creatorProfile,
          isShowFloatingButton: true,
          backTo: PATH_DASHBOARD.general.jios.root,
        } as UserProfileLocationState,
      };

      if (authenticated) {
        navigate(redirectPathTo, redirectPathOptions);
        return;
      }

      setRedirectPath({ to: redirectPathTo, options: redirectPathOptions });
    }
  }, [authenticated, data, dispatch, navigate, setRedirectPath]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!data || !data.data) {
    return <Page404 />;
  }

  const jioData = data.data;
  return (
    <Page title={`Jio at ${jioData.gym.name} by ${jioData.creatorProfile.name}`}>
      <Container maxWidth="sm" sx={{ my: 3 }}>
        <Stack spacing={5}>
          <Stack alignItems="center">
            <Logo />
          </Stack>
          {jioData.isClosed ? (
            <Typography textAlign="center" variant="h4">
              This Jio is closed.
            </Typography>
          ) : (
            <JioCard data={jioData} isButtonDisabled />
          )}
        </Stack>
      </Container>
      <FloatingBottomCard>
        <Stack spacing={1}>
          <Typography variant="h5" gutterBottom sx={{ color: 'text.secondary' }}>
            Sign in to message climber
          </Typography>
          <LoginForm />
        </Stack>
      </FloatingBottomCard>
    </Page>
  );
}
