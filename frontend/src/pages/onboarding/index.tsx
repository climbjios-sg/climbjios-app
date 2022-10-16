import React, { useState } from 'react';

// @mui
import { Container, Typography, Button } from '@mui/material';
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
        {renderForm()}
        <Button
          type="submit"
          size="large"
          variant="contained"
          color="primary"
          // startIcon={submitIcon}
          fullWidth
          disableElevation
          onClick={handleClickButton}
        >
          <Typography variant="button">{'Next'}</Typography>
        </Button>
      </Container>
    </Page>
  );
}
