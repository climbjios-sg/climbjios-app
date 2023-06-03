import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Stack, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { AvatarData, EditProfileFormValues, UserRequest } from 'src/@types/user';
// components
import { FormProvider } from 'src/components/hook-form';
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
import useSafeRequest from 'src/hooks/services/useSafeRequest';
import { getUploadAvatarUrl, uploadAvatar } from 'src/services/avatar';
import { updateUser } from 'src/services/users';
import LoadingScreen from 'src/components/LoadingScreen';
import useDevWatchForm from '../../../hooks/dev/useDevWatchForm';
import useCustomSnackbar from '../../../hooks/useCustomSnackbar';
import BackBar from '../../../components/BackBar';
import mixpanel_actions from 'src/mixpanel';

// ----------------------------------------------------------------------

export default function EditProfileForm() {
  const navigate = useNavigate();

  const snackbar = useCustomSnackbar();

  const { identity: currentUser, loading, error: getIdentityError } = useGetIdentity();

  const UserSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required.')
      .min(MIN_NAME_LEN, NAME_LEN_ERROR)
      .max(MAX_NAME_LEN, NAME_LEN_ERROR)
      .matches(REGEX_NAME, NAME_REGEX_ERROR),
    height: Yup.number().positive().integer().min(MIN_HEIGHT).max(MAX_HEIGHT).optional(),
    reach: Yup.number().positive().integer().min(MIN_REACH).max(MAX_REACH).optional(),
    pronounId: Yup.number().optional(),
    highestBoulderingGradeId: Yup.number().optional(),
    highestTopRopeGradeId: Yup.number().optional(),
    highestLeadClimbingGradeId: Yup.number().optional(),
    favouriteGymIds: Yup.array().of(Yup.number()).optional(),
    sncsCertificationId: Yup.number().optional(),
  });

  const emptyFile = useMemo(() => ({} as File), []);

  const defaultValues: EditProfileFormValues = useMemo(
    () => ({
      name: currentUser.name ? currentUser.name : undefined,
      height: currentUser.height ? currentUser.height : undefined,
      reach: currentUser.reach ? currentUser.reach : undefined,
      pronounId: currentUser.pronounId ? currentUser.pronounId : undefined,
      highestBoulderingGradeId: currentUser.highestBoulderingGradeId
        ? currentUser.highestBoulderingGradeId
        : undefined,
      highestTopRopeGradeId: currentUser.highestTopRopeGradeId
        ? currentUser.highestTopRopeGradeId
        : undefined,
      highestLeadClimbingGradeId: currentUser.highestLeadClimbingGradeId
        ? currentUser.highestLeadClimbingGradeId
        : undefined,
      favouriteGymIds:
        currentUser.favouriteGyms && currentUser.favouriteGyms.length > 0
          ? currentUser.favouriteGyms?.map((gym) => gym.id)
          : undefined,
      sncsCertificationId: currentUser.sncsCertificationId
        ? currentUser.sncsCertificationId
        : undefined,
      avatar: currentUser?.profilePictureUrl
        ? {
            ...emptyFile,
            preview: currentUser?.profilePictureUrl,
          }
        : undefined,
    }),
    [currentUser, emptyFile]
  );

  const methods = useForm<EditProfileFormValues>({
    resolver: yupResolver(UserSchema),
    mode: 'onChange',
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  useDevWatchForm(methods.watch);

  const { runAsync: submitUploadAvatar } = useSafeRequest(uploadAvatar, {
    manual: true,
  });
  const { runAsync: submitUpdateUser } = useSafeRequest(updateUser, {
    manual: true,
  });

  const handleSubmitAvatar = async (avatar?: AvatarData) => {
    if (avatar === undefined || avatar.size === undefined) {
      return;
    }

    try {
      const { data: uploadUrl } = await getUploadAvatarUrl();
      await submitUploadAvatar(uploadUrl, avatar);
      await submitUpdateUser({ hasProfilePicture: true });
    } catch (error) {
      snackbar.enqueueError('Failed to upload profile picture');
      throw error;
    }
  };
  const handleSubmitUpdateUser = async (data: UserRequest) => {
    try {
      await submitUpdateUser(data);
      snackbar.enqueueSnackbar('Successfully updated profile', {
        autoHideDuration: 5000,
      });
      navigateToProfile();
    } catch {
      snackbar.enqueueError('Failed to update your profile');
    }
  };

  const _handleSubmit = async ({ avatar, ...rest }: EditProfileFormValues) => {
    try {
      await handleSubmitAvatar(avatar);
      await handleSubmitUpdateUser(rest);
      mixpanel_actions.people.set(rest);
    } catch {
      // Error has been handled by each submit function
    }
  };

  const navigateToProfile = useCallback(() => {
    navigate(PATH_DASHBOARD.general.profile.root);
  }, [navigate]);

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  useEffect(() => {
    if (getIdentityError) {
      snackbar.enqueueError('Failed to retrieve your profile');
      navigateToProfile();
    }
  }, [getIdentityError, navigateToProfile, snackbar]);

  return (
    <>
      {!loading ? (
        <FormProvider methods={methods} onSubmit={handleSubmit(_handleSubmit)}>
          <Page title="Edit Profile">
            <BackBar title="Edit Profile" />
            <Container maxWidth="md" sx={{ mt: 5, px: 0 }}>
              <Stack spacing={1.5} justifyContent="center" alignItems="center">
                <Card sx={{ width: '100%', p: 3 }}>
                  <AvatarForm />
                </Card>
                <Card sx={{ width: '100%', p: 3 }}>
                  <Stack spacing={3}>
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
              <LoadingButton
                sx={{ mb: 2 }}
                type="submit"
                size="large"
                variant="contained"
                fullWidth
                loading={isSubmitting}
              >
                Save Changes
              </LoadingButton>
            </FloatingBottomCard>
          </Page>
        </FormProvider>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
