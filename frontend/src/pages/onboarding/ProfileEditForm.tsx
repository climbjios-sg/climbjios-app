import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, InputAdornment, FormHelperText } from '@mui/material';
// @types
import { UserRequest } from '../../@types/user';
// components
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { useSnackbar } from 'notistack';
import {
  MAX_NAME_LEN,
  MIN_NAME_LEN,
  NAME_LEN_ERROR,
  NAME_REGEX_ERROR,
  REGEX_NAME,
  REGEX_TELEGRAM,
  TELEGRAM_REGEX_ERROR,
} from '../../config';
import { useNavigate } from 'react-router-dom';
// context
// import { NewUserContext } from '../../contexts/NewUserContext';
// paths
import { PATH_DASHBOARD, PATH_ONBOARDING } from '../../routes/paths';
import useGetIdentity from 'src/hooks/auth/useGetIdentity';
import { useDispatch } from 'src/store';

// ----------------------------------------------------------------------

interface FormValuesProps extends UserRequest {}

type Props = {
  isExistingUser: boolean;
};

// TODO: redo the form
// TODO: REMOVE NEW USER CONTEXT
export default function ProfileEditForm({ isExistingUser }: Props) {
  const { identity } = useGetIdentity();
  const { enqueueSnackbar } = useSnackbar();
  // const newUserContext = useContext(NewUserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    defaultValues: {
      name: isExistingUser ? identity?.name : '',
      telegramHandle: isExistingUser ? identity?.telegramHandle : '',
    },
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    if (!data.name || !data.telegramHandle) return;

    // newUserContext.updateName(data.name);
    // newUserContext.updateTelegram(data.telegramHandle);

    if (isExistingUser) {
      try {
        // newUserContext.updateUsername(identity?.username as string);

        let user: UserRequest = {
          name: data.name,
          telegramHandle: data.telegramHandle,
          username: identity?.username,
        };

        // dispatch(updateUserIdentity(user));
        enqueueSnackbar(`Profile updated successfully!`);
        navigate(PATH_DASHBOARD.general.profile);
      } catch (error) {
        enqueueSnackbar(`Error when updating profile`, {
          variant: 'error',
          persist: true,
        });
        console.error(error);
        throw error;
      }
    } else {
      navigate(PATH_ONBOARDING.username);
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
                helperText="Your name will be displayed on your profile page. You can always change this later"
                onChange={(e) => {
                  // newUserContext.updateName(e.target.value);
                  // setValue('name', e.target.value);
                }}
              />
              <FormHelperText error>{errors?.telegramHandle?.message}</FormHelperText>
              <RHFTextField
                name="telegramHandle"
                label="Telegram Username"
                helperText="Other climbers will communicate with you over Telegram."
                InputProps={{
                  startAdornment: <InputAdornment position="start">@</InputAdornment>,
                }}
                onChange={(e) => {
                  // newUserContext.updateTelegram(e.target.value);
                  // setValue('telegramHandle', e.target.value);
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
                {isExistingUser ? `Save Changes` : `Next`}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}