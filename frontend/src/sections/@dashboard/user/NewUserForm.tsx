import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
// @types
import { User } from '../../../@types/user';
// components
import { FormProvider, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
import { useSnackbar } from 'notistack';
import { SUPPORT_EMAIL } from '../../../config';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

interface FormValuesProps extends User {}

type Props = {
  isEdit: boolean;
  onExit: () => void;
  currentUser?: User | null;
};

export default function NewUserForm({ isEdit, currentUser, onExit }: Props) {
  const auth = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      telegram: currentUser?.telegram || '',
      username: currentUser?.username || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const NewProfileSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    telegram: Yup.string().required('Telegram handle is required'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewProfileSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await auth.updateProfile(data);
      reset();
      onExit();
    } catch (error) {
      enqueueSnackbar(
        `Failed to update profile. Try again. If the problem persists, contact support ${SUPPORT_EMAIL}.`,
        {
          variant: 'error',
          persist: true,
        }
      );
      console.error(error);
      throw error;
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {/* {methods.getValues().avatarUrl && (
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 5, px: 3 }}>
              <Box sx={{ mb: 5 }}>
                <RHFUploadAvatar name="avatarUrl" maxSize={3145728} disabled />
              </Box>
            </Card>
          </Grid>
        )} */}

        <Grid item xs={12} md={12}>
          <Card sx={{ p: 2 }}>
            {/* <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            > */}
            <Stack spacing={2}>
              <RHFTextField
                name="Display name"
                label="Name (Required)"
                helperText="This name will be displayed on your profile. You can always change this later"
              />
              <RHFTextField name="telegram" label="Telegram Username" helperText="e.g. rizhaow" />
            </Stack>
            {/* </Box> */}

            <Stack alignItems="flex-end" sx={{ my: 4 }}>
              <LoadingButton
                sx={{ height: 50 }}
                fullWidth
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {!isEdit ? 'Next' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
