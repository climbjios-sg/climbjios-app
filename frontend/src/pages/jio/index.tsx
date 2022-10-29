import { AppBar, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import { useRequest } from 'ahooks';
import { useParams } from 'react-router-dom';
import FloatingBottomCard from '../../components/FloatingBottomCard';
import LoadingScreen from '../../components/LoadingScreen';
import Logo from '../../components/Logo';
import Page from '../../components/Page';
import useCustomSnackbar from '../../hooks/useCustomSnackbar';
import { getJio } from '../../services/jios';
import LoginForm from '../auth/LoginForm';
import JioCard from '../dashboard/jios/list/allJios/JioCard';
import Page404 from '../error/Page404';

interface JioPageProps {
  id: string;
}

export default function JioPage() {
  const { id } = useParams();
  const snackbar = useCustomSnackbar();
  const jioId = id as string;

  const { data, loading } = useRequest(() => getJio(jioId), {
    onError: () => {
      snackbar.enqueueError('Failed to retrieve Jio.');
    },
  });

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
          <JioCard data={jioData} />
        </Stack>
      </Container>
      <FloatingBottomCard>
        <LoginForm />
      </FloatingBottomCard>
    </Page>
  );
}
