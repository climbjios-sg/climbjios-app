import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Button, Card, Grid, Stack, Typography, Container } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { AvatarData, EditProfileFormValues, UserRequest, User } from 'src/@types/user';
// components
import Label from 'src/components/Label';
import { CustomFile } from 'src/components/upload';
import { FormProvider, RHFSelect, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
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
import useGetIdentity from 'src/hooks/auth/useGetIdentity';
import Page from 'src/components/Page';
import FloatingBottomCard from 'src/components/FloatingBottomCard';
import { UsernameForm } from 'src/pages/onboarding/UsernameForm';
import { DetailsForm } from 'src/pages/onboarding/DetailsForm';
import { FavoriteGymsForm } from 'src/pages/onboarding/FavoriteGymsForm';
import { ClimbingGradesForm } from 'src/pages/onboarding/ClimbingGradesForm';
import { ClimbingCertForm } from 'src/pages/onboarding/ClimbingCertForm';
import { AvatarForm } from 'src/pages/onboarding/AvatarForm';
import useDevWatchForm from 'src/hooks/dev/useDevWatchForm';
import useSafeRequest from 'src/hooks/services/useSafeRequest';
import { getUploadAvatarUrl, uploadAvatar } from 'src/services/avatar';
import { updateUser } from 'src/services/users';

// ----------------------------------------------------------------------

export default function EditProfileForm() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  let currentUser = useGetIdentity().identity;

  const UserSchema = Yup.object().shape({
    name: Yup.string()
      .min(MIN_NAME_LEN, NAME_LEN_ERROR)
      .max(MAX_NAME_LEN, NAME_LEN_ERROR)
      .matches(REGEX_NAME, NAME_REGEX_ERROR)
      .required('Name is required.'),
    height: Yup.number().positive().integer().min(MIN_HEIGHT).max(MAX_HEIGHT).optional(),
    reach: Yup.number().positive().integer().min(MIN_REACH).max(MAX_REACH).optional(),
    pronounId: Yup.number().optional(),
    highestBoulderingGradeId: Yup.number().optional(),
    highestTopRopeGradeId: Yup.number().optional(),
    highestLeadClimbingGradeId: Yup.number().optional(),
    favouriteGymIds: Yup.array().of(Yup.number()).optional(),
    sncsCertificationId: Yup.number().optional(),
    // avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
  });

  const defaultValues = {
    ...currentUser,
    favouriteGymIds: currentUser?.favouriteGyms.map((gym) => gym.id),
  };

  const methods = useForm<EditProfileFormValues>({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  //Debug purposes
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
      enqueueSnackbar('Successfully updated profile', {
        autoHideDuration: 5000,
      });
      navigate(PATH_DASHBOARD.general.jios.root);
    } catch {
      enqueueSnackbar('Failed to update user', { variant: 'error' });
    }
  };

  const _handleSubmit = async ({ avatar, ...rest }: EditProfileFormValues) => {
    try {
      await handleSubmitAvatar(avatar);
      await handleSubmitUpdateUser(rest);
    } catch {
      // Silences the error since error has been handled by each submit function
    }
  };

  const handleClickCancelButton = () => {
    navigate(PATH_DASHBOARD.general.profile);
  };

  // Return back to profile page if no user found.
  // Fix for the bug where if user refreshes the page or
  // tries to access the edit profile URL directly, currentUser will be undefined
  useEffect(() => {
    if (!currentUser) {
      navigate(PATH_DASHBOARD.general.profile);
    }
  }, [currentUser]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(_handleSubmit)}>
      <Page title="Edit Profile">
        <Container maxWidth="md" sx={{ my: 3 }}>
          <Stack spacing={1.5} justifyContent="center" alignItems="center">
            <Card sx={{ width: '100%', p: 3 }}>
              <AvatarForm />
            </Card>
            <Card sx={{ width: '100%', p: 3 }}>
              <Stack spacing={1.5}>
                <UsernameForm />
                <DetailsForm />
                <FavoriteGymsForm />
                <ClimbingGradesForm />
                <ClimbingCertForm />
              </Stack>
            </Card>
          </Stack>
        </Container>
        <FloatingBottomCard>
          <LoadingButton type="submit" variant="contained" fullWidth loading={isSubmitting}>
            Save Changes
          </LoadingButton>
          <Button size="medium" fullWidth onClick={handleClickCancelButton}>
            Cancel
          </Button>
        </FloatingBottomCard>
      </Page>
    </FormProvider>
  );
}
