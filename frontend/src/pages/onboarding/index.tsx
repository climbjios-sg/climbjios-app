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
import { ClimbingCert } from './ClimbingCertForm';
import { AvatarForm } from './AvatarForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { UserRequest } from 'src/@types/user';
import { useSnackbar } from 'notistack';
import { FormProvider } from 'src/components/hook-form';

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
  const [activeStep, setActiveStep] = useState<number>(1);
  const isComplete = activeStep === STEPS.length;

  const initialFormValues: UserRequest = useMemo(() => ({}), []);
  const methods = useForm<UserRequest>({
    resolver: yupResolver(formSchema),
    defaultValues: initialFormValues,
    // Show error onChange, onBlur, onSubmit
    mode: 'all',
  });
  const {
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    // setFocus,
  } = methods;
  const formData = watch();
  const _handleSubmit = async (data: UserRequest) => {
    try {
      // await onSubmit(formatJioFormValues(data));
      // submit form here
    } catch (error) {
      enqueueSnackbar('Failed to submit form', { variant: 'error' });
    }
  };

  const handleClickButton = () => {
    if (!isComplete) {
      setActiveStep((currentStep) => currentStep + 1);
    } else {
      // TODO: submit
      // _handleSubmit()
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
      {activeStep === 5 && <ClimbingCert />}
      {activeStep === 6 && <AvatarForm />}
    </>
  );

  return (
    <FormProvider
      methods={methods}
      // onSubmit={handleSubmit(_handleSubmit)}
    >
      <Page title="Onboarding: Fill in your details">
        <Container
          maxWidth="md"
          sx={{
            my: 3,
          }}
        >
          <Stack spacing={1.5} justifyContent="center" alignItems="center">
            <Logo />
            <Typography variant="h4">Complete your profile</Typography>
            <Typography variant="subtitle1">
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
                <Button
                  // type="submit"
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
          </Stack>
        </Container>
      </Page>
    </FormProvider>
  );
}
