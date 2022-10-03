import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useContext } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, FormHelperText, Typography } from '@mui/material';
// @types
import { User } from '../../../@types/user';
// components
import { FormProvider, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
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
import { NewUserContext, NewUserActionEnum } from '../../../contexts/NewUserContext';

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
  const { state, dispatch } = useContext(NewUserContext);

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

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await auth.setProfile(state);
      // enqueueSnackbar(`User info in state is: ${JSON.stringify(state)}`);
      reset();
      // onExit();
    } catch (error) {
      enqueueSnackbar(
        `Failed to create profile. Try again. If the problem persists, contact support ${SUPPORT_EMAIL}.`,
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
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 2 }}>
            <Stack spacing={2}>
              <FormHelperText error>{errors?.username?.message}</FormHelperText>
              <RHFTextField
                name="username"
                label="Username"
                helperText="Other climbers will identify you by your unique username. You can't change this later"
                onChange={(e) => {
                  dispatch({
                    type: NewUserActionEnum.EDIT,
                    field: 'username', //Note: This "username" refers to the "username" field in the User type
                    payload: e.target.value,
                  });
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
