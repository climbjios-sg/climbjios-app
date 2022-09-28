import { useNavigate } from 'react-router-dom';
// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
// sections
import UserNewEditForm from '../../sections/@dashboard/user/UserNewEditForm';
import { PATH_ONBOARDING } from '../../routes/paths';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function Profile() {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <Page title="Onboarding: Fill in your details">
      <Container sx={{ mt: 3 }}>
        <Typography variant="subtitle2" gutterBottom sx={{ my: 1 }}>
          Fill in your details for us to create a QR Code name card for you.
        </Typography>
        <UserNewEditForm
          isEdit={false}
          currentUser={auth.user}
          onExit={() => {
            navigate(PATH_ONBOARDING.notionStepOne);
          }}
        />
      </Container>
    </Page>
  );
}
