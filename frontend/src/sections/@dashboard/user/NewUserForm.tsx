import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useContext } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, InputAdornment, FormHelperText } from '@mui/material';
// @types
import { User } from '../../../@types/user';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { useSnackbar } from 'notistack';
import {
  MAX_NAME_LEN,
  MIN_NAME_LEN,
  NAME_LEN_ERROR,
  NAME_REGEX_ERROR,
  REGEX_NAME,
  REGEX_TELEGRAM,
  SUPPORT_EMAIL,
  TELEGRAM_REGEX_ERROR,
} from '../../../config';
import useAuth from '../../../hooks/useAuth';
// context
import { NewUserContext } from '../../../contexts/NewUserContext';

// ----------------------------------------------------------------------

interface FormValuesProps extends User {}

type Props = {
  onExit: () => void;
};

export default function NewUserForm({ onExit }: Props) {
  const auth = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const newUserContext = useContext(NewUserContext);
  const jwtContext = useContext(JWTContext);

  const NewProfileSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(MIN_NAME_LEN, NAME_LEN_ERROR)
      .max(MAX_NAME_LEN, NAME_LEN_ERROR)
      .matches(REGEX_NAME, NAME_REGEX_ERROR),
    telegramHandle: Yup.string()
      .required('Telegram handle is required')
      .matches(REGEX_TELEGRAM, TELEGRAM_REGEX_ERROR),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewProfileSchema),
    defaultValues: { name: '', telegramHandle: '' },
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      // enqueueSnackbar(`User info in NewUserContext is: ${JSON.stringify(newUserContext.user)}`);
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
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 2 }}>
            <Stack spacing={2}>
              <FormHelperText error>{errors?.name?.message}</FormHelperText>
              <RHFTextField
                name="name"
                label="Name"
                defaultValue={auth.user?.name}
                helperText="Your name will be displayed on your profile page. You can always change this later"
                onChange={(e) => {
                  newUserContext.updateName(e.target.value);
                  setValue('name', e.target.value);
                }}
              />
              <FormHelperText error>{errors?.telegramHandle?.message}</FormHelperText>
              <RHFTextField
                name="telegram"
                label="Telegram Username"
                helperText="Other climbers will communicate with you over Telegram."
                InputProps={{
                  startAdornment: <InputAdornment position="start">@</InputAdornment>,
                }}
                onChange={(e) => {
                  newUserContext.updateTelegram(e.target.value);
                  setValue('telegramHandle', e.target.value);
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
                Next
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
