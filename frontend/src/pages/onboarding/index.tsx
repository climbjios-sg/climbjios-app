import React, { ReactElement, useMemo, useState } from 'react';

// @mui
import { Container, Typography, Button, Card, Stack } from '@mui/material';

// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import { DetailsForm } from './DetailsForm';
import { FavoriteGymsForm } from './FavoriteGymsForm';
import { ClimbingGradesForm } from './ClimbingGradesForm';
import { ClimbingCertForm } from './ClimbingCertForm';
import { AvatarForm } from './AvatarForm';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { FormProvider } from 'src/components/hook-form';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useNavigate } from 'react-router';
import Separator from 'src/components/Separator';
import { AvatarData, OnboardingFormValues } from './types';
import { updateUser } from 'src/services/users';
import useSafeRequest from 'src/hooks/services/useSafeRequest';
import { getUploadAvatarUrl, uploadAvatar } from 'src/services/avatar';

// ----------------------------------------------------------------------

const onboardingSteps: {
  title: string;
  subtitle: string;
  form: ReactElement;
}[] = [
  {
    title: 'Complete your profile',
    subtitle: 'Help other climbers know more about you',
    form: <DetailsForm />,
  },
  {
    title: 'Complete your profile',
    subtitle: 'Fill in your details to be shown to other climbers',
    form: <FavoriteGymsForm />,
  },
  {
    title: 'Your climbing experience',
    subtitle: 'This can help others to find the right climbing partner',
    form: <ClimbingGradesForm />,
  },
  {
    title: 'Your climbing experience',
    subtitle: 'This can help others to find the right climbing partner',
    form: <ClimbingCertForm />,
  },
  {
    title: 'Profile Photo',
    subtitle: 'Upload a profile photo (optional)',
    form: <AvatarForm />,
  },
];

const renderTitle = (activeStep: number) => {
  const { title, subtitle } = onboardingSteps[activeStep - 1];

  return (
    <>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
        {subtitle}
      </Typography>
    </>
  );
};
const renderForm = (activeStep: number) => onboardingSteps[activeStep - 1].form;

export default function Onboarding() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<number>(1);
  const isComplete = activeStep === onboardingSteps.length;

  const methods = useForm<OnboardingFormValues>({
    mode: 'onSubmit',
  });
  const { handleSubmit } = methods;

  const { run: submitUploadAvatar } = useSafeRequest(uploadAvatar, {
    manual: true,
    onError: (error) => {
      enqueueSnackbar('Failed to upload profile picture.', { variant: 'error' });
    },
  });
  const { run: submitUpdateUser } = useSafeRequest(updateUser, {
    manual: true,
    onSuccess: () => {
      enqueueSnackbar('Successfully completed onboarding.', {
        autoHideDuration: 5000,
      });
      navigate(PATH_DASHBOARD.general.jios.root);
    },
    onError: (error) => {
      enqueueSnackbar('Failed to update user', { variant: 'error' });
    },
  });

  const _handleSubmitAvatar = async (avatar?: AvatarData) => {
    if (avatar === undefined) {
      return;
    }

    const { data: uploadUrl } = await getUploadAvatarUrl();
    submitUploadAvatar(uploadUrl, avatar);
  };
  const _handleSubmit = async ({ avatar, ...rest }: OnboardingFormValues) => {
    await _handleSubmitAvatar(avatar);

    submitUpdateUser(rest);
  };

  const handleClickButton = async () => {
    try {
      if (!isComplete) {
        setActiveStep((currentStep) => currentStep + 1);
      } else {
        await handleSubmit(_handleSubmit)();
      }
    } catch {
      enqueueSnackbar('Failed to submit form', { variant: 'error' });
    }
  };
  const handleClickBackButton = () => {
    if (activeStep <= 1) {
      return;
    }
    setActiveStep((currentStep) => currentStep - 1);
  };

  return (
    <FormProvider methods={methods}>
      <Page title="Onboarding: Fill in your details">
        <Container maxWidth="md" sx={{ my: 3 }}>
          <Stack spacing={1.5} justifyContent="center" alignItems="center">
            <Logo />
            {renderTitle(activeStep)}
            <Card sx={{ width: '100%', p: 3 }}>
              <Stack spacing={1.5}>
                {renderForm(activeStep)}
                <Separator />
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disableElevation
                  onClick={handleClickButton}
                >
                  <Typography variant="button">{isComplete ? 'Submit' : 'Next'}</Typography>
                </Button>
                {activeStep > 1 && (
                  <Button size="medium" fullWidth onClick={handleClickBackButton}>
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
