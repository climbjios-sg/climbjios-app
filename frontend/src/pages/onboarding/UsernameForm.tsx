import React from 'react';
import { Stack, InputAdornment, FormHelperText } from '@mui/material';
// components
import { RHFTextField } from '../../components/hook-form';
import { useFormContext } from 'react-hook-form';
import { UserRequest } from 'src/@types/user';

export const UsernameForm = () => {
  const { formState } = useFormContext<UserRequest>();
  const { errors } = formState;

  return (
    <Stack spacing={2}>
      <RHFTextField
        name="name"
        label="Name"
        helperText={
          errors?.name?.message ||
          'Your name will be displayed on your profile page. You can always change this later.'
        }
        FormHelperTextProps={{
          error: !!errors?.name,
        }}
      />
      <FormHelperText error>{errors?.telegramHandle?.message}</FormHelperText>
      <RHFTextField
        name="telegramHandle"
        label="Telegram Username"
        helperText={
          errors?.telegramHandle?.message ||
          'Other climbers will communicate with you over Telegram.'
        }
        FormHelperTextProps={{
          error: !!errors?.telegramHandle,
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>,
        }}
      />
    </Stack>
  );
};
