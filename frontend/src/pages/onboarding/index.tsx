import React, { ReactElement, useState, useEffect } from 'react';

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
import { UsernameForm } from './UsernameForm';
import * as Yup from 'yup';
import { BaseSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserRequest } from 'src/@types/user';
import useDevWatchForm from 'src/hooks/dev/useDevWatchForm';
import { MAX_HEIGHT, MAX_NAME_LEN, MIN_NAME_LEN, REGEX_NAME } from 'src/config';

// ----------------------------------------------------------------------

type FormSchema = {
  [Property in keyof OnboardingFormValues]: BaseSchema;
};

interface OnboardingStep {
  title: string;
  subtitle: string;
  form: ReactElement;
  validate: FormSchema;
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: 'Fill in your profile',
    subtitle: 'Other climbers will use this to identify you',
    form: <UsernameForm />,
    validate: {
      name: Yup.string()
        .min(MIN_NAME_LEN)
        .max(MAX_NAME_LEN)
        .matches(REGEX_NAME)
        .required('Name is required.'),
    },
  },
  {
    title: 'Complete your profile',
    subtitle: 'Help other climbers know more about you',
    form: <DetailsForm />,
    validate: {
      height: Yup.number().positive().integer().max(MAX_HEIGHT).optional(),
      reach: Yup.number().positive().integer().optional(),
    },
  },
  {
    title: 'Complete your profile',
    subtitle: 'Fill in your details to be shown to other climbers',
    form: <FavoriteGymsForm />,
    validate: {},
  },
  {
    title: 'Your climbing experience',
    subtitle: 'This can help others to find the right climbing partner',
    form: <ClimbingGradesForm />,
    validate: {},
  },
  {
    title: 'Your climbing experience',
    subtitle: 'This can help others to find the right climbing partner',
    form: <ClimbingCertForm />,
    validate: {},
  },
  {
    title: 'Profile Photo',
    subtitle: 'Upload a profile photo (optional)',
    form: <AvatarForm />,
    validate: {},
  },
];
const getFormSchema = (onboardingSteps: OnboardingStep[]): FormSchema =>
  onboardingSteps.reduce((acc, curr) => ({ ...acc, ...curr.validate }), {});
const getValidateFields = (activeStep: number): (keyof OnboardingFormValues)[] =>
  Object.keys(onboardingSteps[activeStep - 1].validate) as (keyof OnboardingFormValues)[];

const formSchema = Yup.object().shape(getFormSchema(onboardingSteps));

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
  // Ranges from 1-N, where N is the number of steps
  const [activeStep, setActiveStep] = useState<number>(1);
  const isComplete = activeStep === onboardingSteps.length;

  const methods = useForm<OnboardingFormValues>({
    resolver: yupResolver(formSchema),
    mode: 'onSubmit',
  });
  const { handleSubmit, trigger, watch } = methods;

  // for debugging
  useDevWatchForm(watch);

  const { runAsync: submitUploadAvatar } = useSafeRequest(uploadAvatar, {
    manual: true,
  });
  const { runAsync: submitUpdateUser } = useSafeRequest(updateUser, {
    manual: true,
  });

  const handleSubmitAvatar = async (avatar?: AvatarData) => {
    if (avatar === undefined) {
      return;
    }

    try {
      const { data: uploadUrl } = await getUploadAvatarUrl();
      await submitUploadAvatar(uploadUrl, avatar);
    } catch (error) {
      enqueueSnackbar('Failed to upload profile picture', { variant: 'error' });
      throw error;
    }
  };
  const handleSubmitUpdateUser = async (data: UserRequest) => {
    try {
      await submitUpdateUser(data);
      enqueueSnackbar('Successfully completed onboarding.', {
        autoHideDuration: 5000,
      });
      navigate(PATH_DASHBOARD.general.jios.root);
    } catch {
      enqueueSnackbar('Failed to update user', { variant: 'error' });
    }
  };
  const _handleSubmit = async ({ avatar, ...rest }: OnboardingFormValues) => {
    try {
      await handleSubmitAvatar(avatar);
      await handleSubmitUpdateUser(rest);
    } catch {
      // Silences the error since error has been handled by each submit function
    }
  };

  const handleClickDoneButton = async () => {
    if (!isComplete) {
      const isValid = await trigger(getValidateFields(activeStep));
      if (!isValid) {
        return;
      }
      setActiveStep((currentStep) => currentStep + 1);
    } else {
      await handleSubmit(_handleSubmit)();
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
                  onClick={handleClickDoneButton}
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
