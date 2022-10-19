import React, { useMemo, useState } from 'react';

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
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { UserRequest } from 'src/@types/user';
import { useSnackbar } from 'notistack';
import { FormProvider } from 'src/components/hook-form';
import { useProfile } from 'src/contexts/auth/ProfileContext';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useNavigate } from 'react-router';
import Separator from 'src/components/Separator';

// ----------------------------------------------------------------------

const formSchema = Yup.object().shape({});
const onboardingSteps: {
  title: string;
  subtitle: string;
  form: JSX.Element;
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
  const { updateUserIdentity } = useProfile();

  const initialFormValues: UserRequest = useMemo(() => ({}), []);
  const methods = useForm<UserRequest>({
    resolver: yupResolver(formSchema),
    defaultValues: initialFormValues,
    mode: 'onSubmit',
  });
  const { handleSubmit } = methods;

  const _handleSubmit = async (data: UserRequest) => {
    try {
      await updateUserIdentity(data);
      enqueueSnackbar('Successfully completed onboarding!');
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
