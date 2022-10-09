import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useContext } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, FormHelperText } from '@mui/material';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { useSnackbar } from 'notistack';
import {
  SUPPORT_EMAIL,
  MIN_USERNAME_LEN,
  MAX_USERNAME_LEN,
  REGEX_USERNAME,
  USERNAME_LEN_ERROR,
  USERNAME_REGEX_ERROR,
} from '../../../config';
import useAuth from '../../../hooks/useAuth';

// context
import { NewUserContext } from '../../../contexts/NewUserContext';

// ----------------------------------------------------------------------

interface FormValuesProps {
  username: string;
}

type Props = {
  onExit: () => void;
};

export default function NewUserForm({ onExit }: Props) {
  const auth = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const newUserContext = useContext(NewUserContext);

  const NewProfileSchema = Yup.object().shape({
    username: Yup.string()
      .min(MIN_USERNAME_LEN, USERNAME_LEN_ERROR)
      .max(MAX_USERNAME_LEN, USERNAME_LEN_ERROR)
      .matches(REGEX_USERNAME, USERNAME_REGEX_ERROR)
      .required('Username is required'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewProfileSchema),
    defaultValues: { username: '' },
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async () => {
    try {
      // enqueueSnackbar(`User info in state is: ${JSON.stringify(newUserContext.user)}`);
      await auth.createUser(newUserContext.user);
      onExit();
    } catch (error) {
      enqueueSnackbar(`${JSON.stringify(error)}`, {
        variant: 'error',
        persist: true,
      });
      console.error(error);
      throw error;
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 2 }}>
            <Stack spacing={2}>
              <FormHelperText error>{errors?.username?.message}</FormHelperText>
              <RHFTextField
                name="username"
                label="Username"
                helperText="Other climbers will identify you by your unique username. You can't change this later"
                onChange={(e) => {
                  newUserContext.updateUsername(e.target.value);
                  setValue('username', e.target.value);
                }}
              />
            </Stack>

            <Stack alignItems="flex-end" sx={{ my: 4 }}>
              <LoadingButton
                sx={{ height: 50 }}
                fullWidth
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Complete Profile
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
