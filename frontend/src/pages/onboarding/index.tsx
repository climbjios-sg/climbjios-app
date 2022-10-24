import React, { ReactElement, useState, useMemo } from 'react';

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
import { PATH_DASHBOARD, PATH_LANDING } from 'src/routes/paths';
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
import { isNumberArray } from 'src/utils/typeGuards';
import {
  MIN_HEIGHT,
  MAX_HEIGHT,
  MIN_REACH,
  MAX_REACH,
  MAX_NAME_LEN,
  MIN_NAME_LEN,
  NAME_LEN_ERROR,
  NAME_REGEX_ERROR,
  REGEX_NAME,
} from 'src/config';
import { outgoingLinkProps } from '../../utils/common';
import StyledA from '../../components/StyledA';

// ----------------------------------------------------------------------

type FormSchema = {
  [Property in keyof OnboardingFormValues]: BaseSchema;
};

type ButtonText = 'Skip' | 'Next' | 'Submit';

interface OnboardingStep {
  title: string;
  subtitle: string;
  form: ReactElement;
  pristineButtonText: ButtonText;
  dirtyButtonText: ButtonText;
  schema: FormSchema;
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: 'Fill in your profile',
    subtitle: 'Other climbers will use this to identify you',
    form: <UsernameForm />,
    pristineButtonText: 'Next',
    dirtyButtonText: 'Next',
    schema: {
      name: Yup.string()
        .min(MIN_NAME_LEN, NAME_LEN_ERROR)
        .max(MAX_NAME_LEN, NAME_LEN_ERROR)
        .matches(REGEX_NAME, NAME_REGEX_ERROR)
        .required('Name is required.'),
    },
  },
  {
    title: 'Complete your profile',
    subtitle: 'Help other climbers know more about you',
    form: <DetailsForm />,
    pristineButtonText: 'Skip',
    dirtyButtonText: 'Next',
    schema: {
      height: Yup.number().positive().integer().min(MIN_HEIGHT).max(MAX_HEIGHT).optional(),
      reach: Yup.number().positive().integer().min(MIN_REACH).max(MAX_REACH).optional(),
      pronounId: Yup.number().optional(),
    },
  },
  {
    title: 'Complete your profile',
    subtitle: 'Fill in your details to be shown to other climbers',
    form: <FavoriteGymsForm />,
    pristineButtonText: 'Skip',
    dirtyButtonText: 'Next',
    schema: {
      favouriteGymIds: Yup.array().of(Yup.number()).optional(),
    },
  },
  {
    title: 'Your climbing experience',
    subtitle: 'This can help others to find the right climbing partner',
    form: <ClimbingGradesForm />,
    pristineButtonText: 'Skip',
    dirtyButtonText: 'Next',
    schema: {
      highestBoulderingGradeId: Yup.number().optional(),
      highestTopRopeGradeId: Yup.number().optional(),
      highestLeadClimbingGradeId: Yup.number().optional(),
    },
  },
  {
    title: 'Your climbing experience',
    subtitle: 'This can help others to find the right climbing partner',
    form: <ClimbingCertForm />,
    pristineButtonText: 'Skip',
    dirtyButtonText: 'Next',
    schema: {
      sncsCertificationId: Yup.number().optional(),
    },
  },
  {
    title: 'Profile Photo',
    subtitle: 'Upload a profile photo (optional)',
    form: <AvatarForm />,
    pristineButtonText: 'Submit',
    dirtyButtonText: 'Submit',
    schema: {},
  },
];
const getFormSchema = (onboardingSteps: OnboardingStep[]): FormSchema =>
  onboardingSteps.reduce((acc, curr) => ({ ...acc, ...curr.schema }), {});
const getActiveSchema = (activeStep: number): (keyof OnboardingFormValues)[] =>
  Object.keys(onboardingSteps[activeStep - 1].schema) as (keyof OnboardingFormValues)[];
const isPristineValue = (value: OnboardingFormValues[keyof OnboardingFormValues]): boolean => {
  if (isNumberArray(value)) {
    return value.length === 0;
  }
  return value === undefined || value === '';
};
const getButtonText = (
  activeStep: number,
  values: OnboardingFormValues[keyof OnboardingFormValues][]
) => {
  const isPristine = values.every((value) => isPristineValue(value));

  return isPristine
    ? onboardingSteps[activeStep - 1].pristineButtonText
    : onboardingSteps[activeStep - 1].dirtyButtonText;
};

const formSchema = Yup.object().shape(getFormSchema(onboardingSteps));

const renderTitle = (activeStep: number) => {
  const { title, subtitle } = onboardingSteps[activeStep - 1];

  return (
    <Stack spacing={1.5} sx={{ px: 3 }}>
      <Typography variant="h4" align="center">
        {title}
      </Typography>
      <Typography variant="subtitle1" sx={{ color: 'text.secondary' }} align="center">
        {subtitle}
      </Typography>
    </Stack>
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
  const { handleSubmit, trigger, watch, getValues } = methods;
  const activeSchema = useMemo(() => getActiveSchema(activeStep), [activeStep]);
  const activeValues = getValues(activeSchema);

  // for debugging
  useDevWatchForm(watch);

  const { runAsync: submitUploadAvatar, loading: loadingUploadAvatar } = useSafeRequest(
    uploadAvatar,
    {
      manual: true,
    }
  );
  const { runAsync: submitUpdateUser, loading: loadingUpdateUser } = useSafeRequest(updateUser, {
    manual: true,
  });
  const loadingSubmit = loadingUploadAvatar || loadingUpdateUser;

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
    const isValid = await trigger(activeSchema);
    if (!isValid) {
      return;
    }
    if (!isComplete) {
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
        <Container maxWidth="sm" sx={{ my: 3 }}>
          <Stack spacing={1.5} justifyContent="center" alignItems="center">
            <Logo />
            {renderTitle(activeStep)}
            <Card sx={{ width: '100%', p: 3 }}>
              <Stack spacing={1.5}>
                {renderForm(activeStep)}
                <Separator />
                {isComplete && (
                  <Typography textAlign="center" sx={{ pb: 1 }}>
                    By clicking submit, you agree to our{' '}
                    <StyledA {...outgoingLinkProps} href={PATH_LANDING.general.terms}>
                      terms
                    </StyledA>{' '}
                    &{' '}
                    <StyledA {...outgoingLinkProps} href={PATH_LANDING.general.privacyPolicy}>
                      privacy policy
                    </StyledA>
                    .
                  </Typography>
                )}
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disableElevation
                  onClick={handleClickDoneButton}
                  disabled={loadingSubmit}
                >
                  <Typography variant="button">
                    {getButtonText(activeStep, activeValues)}
                  </Typography>
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
