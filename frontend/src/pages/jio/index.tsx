import { useEffect } from 'react';
import { Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import { useRequest } from 'ahooks';
import { useNavigate, useParams } from 'react-router-dom';
import FloatingBottomCard from 'src/components/FloatingBottomCard';
import Logo from 'src/components/Logo';
import Page from 'src/components/Page';
import { getJio } from 'src/services/jios';
import LoginForm from '../auth/LoginForm';
import JioCard from 'src/components/jios/JioCard';
import { useDispatch } from 'src/store';
import { PATH_DASHBOARD, PATH_USER } from 'src/routes/paths';
import PublicProfile from '../publicProfile';
import useAuthState from 'src/hooks/auth/useAuthState';
import useRedirectPath from 'src/hooks/useRedirectPath';
import { User } from 'src/@types/user';
import JioCardLoader from 'src/components/jios/JioCardLoader';
import Page404 from '../error/Page404';

const makePublicProfileState = (creatorProfile: User) => ({
  user: creatorProfile,
  isShowFloatingButton: true,
  backTo: PATH_DASHBOARD.general.jios.root,
});

type JioPageWrapperProps = {
  title: string;
  children: React.ReactNode;
  hideLogin?: boolean;
};

function JioPageWrapper({ title, children, hideLogin = false }: JioPageWrapperProps) {
  return (
    <Page title={title}>
      <Container maxWidth="sm" sx={{ my: 3 }}>
        <Stack spacing={5}>
          <Stack alignItems="center">
            <Logo />
          </Stack>
          {children}
        </Stack>
      </Container>
      {!hideLogin && (
        <FloatingBottomCard>
          <Stack spacing={1}>
            <Typography variant="h5" gutterBottom sx={{ color: 'text.secondary' }}>
              Sign in to message climber
            </Typography>
            <LoginForm />
          </Stack>
        </FloatingBottomCard>
      )}
    </Page>
  );
}

export default function JioPage() {
  const { authenticated } = useAuthState();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setRedirectPath } = useRedirectPath();
  const jioId = id as string;

  const { data, loading } = useRequest(() => getJio(jioId));

  useEffect(() => {
    if (data && !data.data.isClosed && !authenticated) {
      setRedirectPath({
        to: PATH_USER.general.user(data.data.creatorId),
        options: {
          state: makePublicProfileState(data.data.creatorProfile),
        },
      });
    }
  }, [authenticated, data, dispatch, navigate, setRedirectPath]);

  // If loading
  if (loading) {
    return (
      <JioPageWrapper title="Loading Jio..." hideLogin>
        <JioCardLoader />
      </JioPageWrapper>
    );
  }

  // If can't find data
  if (!data || !data.data) {
    return <Page404 />;
  }

  const title = `Jio at ${data.data.gym.name} by ${data.data.creatorProfile.name}`;

  // If isClosed
  if (data.data.isClosed) {
    return (
      <JioPageWrapper title={title}>
        <Typography textAlign="center" variant="h4">
        This Jio is closed.
        </Typography>
      </JioPageWrapper>
    );
  }

  // If authenticated
  if (authenticated) {
    return <PublicProfile data={makePublicProfileState(data.data.creatorProfile)} />;
  }

  // If not authenticated
  return (
    <JioPageWrapper title={title}>
      <JioCard data={data.data} isButtonDisabled isHeaderLinkDisabled isUsernameHidden />
    </JioPageWrapper>
  );
}
