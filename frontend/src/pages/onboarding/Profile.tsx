import { useNavigate } from 'react-router-dom';
// @mui
import { Container, Typography, Grid } from '@mui/material';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
// sections
import NewUserForm from '../../sections/@dashboard/user/NewUserForm';
import { PATH_ONBOARDING } from '../../routes/paths';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <Page title="Onboarding: Fill in your details">
      {/* <Container sx={{ mt: 3 }}> */}
      <Grid
        container
        direction="column"
        alignItems="center"
        alignSelf="center"
        display="flex"
        maxWidth="90%"
        sx={{ mt: 3, mx: 'auto' }}
      >
        <Logo />
        <Typography variant="subtitle2" gutterBottom sx={{ mt: 5, mb: 1 }}>
          Fill in your details for us to create a QR Code name card for you.
        </Typography>
        <NewUserForm
          isEdit={false}
          currentUser={auth.user}
          onExit={() => {
            navigate(PATH_ONBOARDING.notionStepOne);
          }}
        />
      </Grid>
      {/* </Container> */}
    </Page>
  );
}
