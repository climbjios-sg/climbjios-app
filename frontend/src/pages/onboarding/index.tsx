// @mui
import { Container, Typography, Button } from '@mui/material';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';

// sections

// ----------------------------------------------------------------------

enum Steps {
  Username = 'Username',
  Details = 'Details',
  FavoriteGyms = 'Favorite Gyms',
  ClimbingGrades = 'Climbing Grades',
  ClimbingCert = 'Climbing Cert',
}

const STEPS = Object.values(Steps);

export default function Onboarding() {
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
        <Button
          type="submit"
          size="large"
          variant="contained"
          color="primary"
          // startIcon={submitIcon}
          fullWidth
          disableElevation
        >
          <Typography variant="button">{'Next'}</Typography>
        </Button>
      </Container>
    </Page>
  );
}
