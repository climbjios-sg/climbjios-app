import React, { useMemo, useState } from 'react';

// @mui
import { Container, Typography, Button, Card, Stack } from '@mui/material';

// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import { UsernameForm } from './UsernameForm';
import { DetailsForm } from './DetailsForm';
import { FavoriteGymsForm } from './FavoriteGymsForm';
import { ClimbingGradesForm } from './ClimbingGradesForm';
import { ClimbingCertForm } from './ClimbingCertForm';
import { AvatarForm } from './AvatarForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { UserRequest } from 'src/@types/user';
import { useSnackbar } from 'notistack';
import { FormProvider } from 'src/components/hook-form';
import { useProfile } from 'src/contexts/auth/ProfileContext';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useNavigate } from 'react-router';
import Separator from 'src/components/Separator';

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
const formSchema = Yup.object().shape({});

// TODO: back button
// TODO: fix css

export default function Onboarding() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<number>(1);
  const isComplete = activeStep === STEPS.length;
  const { updateUserIdentity } = useProfile();

  const initialFormValues: UserRequest = useMemo(() => ({}), []);
  const methods = useForm<UserRequest>({
    resolver: yupResolver(formSchema),
    defaultValues: initialFormValues,
    // Show error onChange, onBlur, onSubmit
    mode: 'onSubmit',
  });
  const { handleSubmit } = methods;

  const _handleSubmit = async (data: UserRequest) => {
    try {
      await updateUserIdentity(data);
      navigate(PATH_DASHBOARD.general.jios.root);
    } catch (error) {
      enqueueSnackbar('Failed to submit form', { variant: 'error' });
    }
  };

  const handleClickButton = () => {
    if (!isComplete) {
      setActiveStep((currentStep) => currentStep + 1);
    } else {
      handleSubmit(_handleSubmit)();
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
      {activeStep === 3 && <FavoriteGymsForm />}
      {activeStep === 4 && <ClimbingGradesForm />}
      {activeStep === 5 && <ClimbingCertForm />}
      {activeStep === 6 && <AvatarForm />}
    </>
  );

  return (
    <FormProvider methods={methods}>
      <Page title="Onboarding: Fill in your details">
        <Container maxWidth="md" sx={{ my: 3 }}>
          <Stack spacing={1.5} justifyContent="center" alignItems="center">
            <Logo />
            <Typography variant="h4">Complete your profile</Typography>
            <Typography variant="subtitle1" color="secondary">
              Fill in your details to be shown to other climbers
            </Typography>
            <Card
              sx={{
                width: '100%',
                p: 3,
              }}
            >
              <Stack spacing={1.5}>
                {renderForm()}
                <Separator />
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disableElevation
                  onClick={handleClickButton}
                >
                  <Typography variant="button">Next</Typography>
                </Button>
                {activeStep > 1 && (
                  <Button size="medium" fullWidth onClick={handleClickBackButton} sx={{ mt: 1.5 }}>
                    Back
                  </Button>
                )}
              </Stack>
            </Card>
          </Stack>
        </Container>
      </Page>
    </FormProvider>
  );
}
