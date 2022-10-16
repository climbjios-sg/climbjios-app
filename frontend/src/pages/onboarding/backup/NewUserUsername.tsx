import { useNavigate } from 'react-router-dom';
// @mui
import { Container, Typography, Grid } from '@mui/material';
// components
import Page from '../../../components/Page';
import Logo from '../../../components/Logo';
// sections

// ----------------------------------------------------------------------

export default function NewUserUsername() {
  const navigate = useNavigate();
  return (
    <Page title="Onboarding: Choose username">
      <Container
        maxWidth="md"
        sx={{
          py: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Logo />
        <Typography variant="subtitle1" gutterBottom sx={{ mt: 5, mb: 1 }}>
          Set a username for others to identify you
        </Typography>
        {/* <UsernameForm
          onExit={() => {
            navigate(PATH_DASHBOARD.general.jios.root);
          }}
        /> */}
      </Container>
    </Page>
  );
}
