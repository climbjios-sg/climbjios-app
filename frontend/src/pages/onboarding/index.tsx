import React, { useState } from 'react';

// @mui
import { Container, Typography, Button, Card, Stack } from '@mui/material';

// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import { UsernameForm } from './UsernameForm';
import { DetailsForm } from './DetailsForm';
import { FavoriteGyms } from './FavoriteGymsForm';
import { ClimbingGrades } from './ClimbingGradesForm';
import { ClimbingCert } from './ClimbingCertForm';
import { AvatarForm } from './AvatarForm';

// sections

// ----------------------------------------------------------------------

enum Steps {
  Username = 'Username',
  Details = 'Details',
  FavoriteGyms = 'Favorite Gyms',
  ClimbingGrades = 'Climbing Grades',
  ClimbingCert = 'Climbing Cert',
  Avatar = 'Avatar',
}

const STEPS = Object.values(Steps);

// TODO: back button

export default function Onboarding() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const isComplete = activeStep === STEPS.length;

  const handleClickButton = () => {
    if (!isComplete) {
      setActiveStep((currentStep) => currentStep + 1);
    } else {
      // TODO: submit
    }
  };

  const handleClickBackButton = () => {
    if (activeStep <= 1) {
      return;
    }
    setActiveStep((currentStep) => currentStep - 1);
  };

  const renderForm = () => (
    <>
      {activeStep === 1 && <UsernameForm />}
      {activeStep === 2 && <DetailsForm />}
      {activeStep === 3 && <FavoriteGyms />}
      {activeStep === 4 && <ClimbingGrades />}
      {activeStep === 5 && <ClimbingCert />}
      {activeStep === 6 && <AvatarForm />}
    </>
  );

  // TODO: fix css
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
        <Logo
          sx={{
            mb: 3,
          }}
        />
        <Typography variant="h4" gutterBottom>
          Complete your profile
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Fill in your details to be shown to other climbers
        </Typography>
        <Card
          sx={{
            width: '100%',
            mt: 3,
          }}
        >
          <Stack spacing={1.5} sx={{ px: 3, pb: 2, pt: 2 }}>
            {renderForm()}
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              fullWidth
              disableElevation
              onClick={handleClickButton}
            >
              <Typography variant="button">{'Next'}</Typography>
            </Button>
            {activeStep > 1 && (
              <Button size="medium" fullWidth onClick={handleClickBackButton} sx={{ mt: 1.5 }}>
                Back
              </Button>
            )}
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
