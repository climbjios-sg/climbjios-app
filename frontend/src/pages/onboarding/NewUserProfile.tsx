import { useNavigate } from 'react-router-dom';
// @mui
import { Container, Typography, Grid } from '@mui/material';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
// sections
import ProfileEditForm from '../../sections/profile/ProfileEditForm';
import { PATH_ONBOARDING } from '../../routes/paths';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <Page title="Onboarding: Fill in your details">
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
          Fill in your details to be shown to other climbers
        </Typography>
        <ProfileEditForm isExistingUser={false} />
      </Container>
    </Page>
  );
}
