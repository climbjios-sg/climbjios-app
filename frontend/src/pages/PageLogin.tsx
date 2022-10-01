// @mui
import { Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import useAuth from 'src/hooks/useAuth';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';

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

export default function PageLogin() {
  const { onLogin } = useAuth();

  return (
    <Page title="Page Login">
      <Container>
        <ContentStyle>
          <Typography variant="h3" component="h1" paragraph gutterBottom>
            Sign in to ClimbJios
          </Typography>
          <Typography mb={3}>
            The social network for climbers.
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Iconify icon="ant-design:google-outlined" />}
            onClick={onLogin}>
            Continue with Google
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}
