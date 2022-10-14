import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, FormHelperText } from '@mui/material';
// components
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { useSnackbar } from 'notistack';
import {
  REGEX_TELEGRAM,
  TELEGRAM_REGEX_ERROR,
} from '../../config';
import useAuth from '../../hooks/useAuth';

// context
import { NewUserContext } from '../../contexts/NewUserContext';

// ----------------------------------------------------------------------

interface FormValuesProps {
  username: string;
}

type Props = {
  onExit: () => void;
};

export default function UsernameForm({ onExit }: Props) {
  const auth = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const newUserContext = useContext(NewUserContext);

  const NewProfileSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required.')
      .matches(REGEX_TELEGRAM, TELEGRAM_REGEX_ERROR),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewProfileSchema),
    // To be fixed: Auto-populate username with telegram handle for now
    // In the future can just skip this form
    defaultValues: { username: auth.user?.telegramHandle },
  });

  const {
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

  // Temp fix to pass form if climber doesn't change their auto-filled username
  useEffect(() => {
    newUserContext.updateUsername(auth.user?.telegramHandle || '');
  }, [auth.user?.telegramHandle, newUserContext]);

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
