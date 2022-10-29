import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import { useRequest } from 'ahooks';
import { useParams } from 'react-router-dom';
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
import { setRedirectPath } from '../../store/reducers/redirectPath';
import { PATH_USER } from '../../routes/paths';

export default function JioPage() {
  const { id } = useParams();
  const snackbar = useCustomSnackbar();
  const dispatch = useDispatch();
  const jioId = id as string;

  const { data, loading } = useRequest(() => getJio(jioId), {
    onError: () => {
      snackbar.enqueueError('Failed to retrieve Jio.');
    },
  });

  useEffect(() => {
    if (data) {
      dispatch(
        setRedirectPath(PATH_USER.general.user(data.data.creatorId), {
          state: data.data.creatorProfile,
        })
      );
    }
  }, [data, dispatch]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!data) {
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
            <Typography variant="h4">This Jio is closed.</Typography>
          ) : (
            <JioCard data={jioData} isDisableButton />
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
