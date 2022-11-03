import { styled } from '@mui/material/styles';
import { Box, Stack, Container, Typography } from '@mui/material';
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import LoginForm from './LoginForm';
import { VERSION } from '../../config';

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />
        </HeaderStyle>

        <Container maxWidth="sm" sx={{ mt: -5 }}>
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 3 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Sign in to ClimbJios
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  The social network for climbers.
                </Typography>
              </Box>
            </Stack>
            <LoginForm />
          </ContentStyle>
        </Container>
      </RootStyle>

      <Typography variant="body2" sx={{ textAlign: 'center', margin: '0 auto', color: 'text.secondary' }}>
        {`v${VERSION}`}
      </Typography>
    </Page>
  );
}
