import React from 'react';
import { Stack, InputAdornment, FormHelperText } from '@mui/material';
// components
import { RHFTextField, RHFSelect } from '../../components/hook-form';
import { useFormContext } from 'react-hook-form';
import { UserRequest } from 'src/@types/user';

export const DetailsForm = () => {
  const { formState } = useFormContext<UserRequest>();
  const { errors } = formState;

  return (
    <Stack spacing={2}>
      <RHFTextField
        type="number"
        name="height"
        label="Height"
        placeholder="173"
        InputProps={{
          endAdornment: <InputAdornment position="end">cm</InputAdornment>,
        }}
      />
      <RHFSelect
        label="Reach"
        name="reach"
        SelectProps={{ native: true }}
        defaultValue=""
        helperText={
          errors?.reach?.message ||
          'Leave this empty if you are unsure or do not know what reach is.'
        }
        FormHelperTextProps={{
          error: !!errors?.reach,
        }}
      >
        {/* Disabled Option for first option to not auto-render */}
        {/* <option value="" disabled />
            {gyms.map((gym: Gym) => (
              <option key={gym.id} value={gym.id}>
                {gym.name}
              </option>
            ))} */}
      </RHFSelect>
      <RHFSelect
        label="Pronoun"
        // fullWidth
        name="pronounId"
        SelectProps={{ native: true }}
        defaultValue=""
      >
        {/* Disabled Option for first option to not auto-render */}
        {/* <option value="" disabled />
            {gyms.map((gym: Gym) => (
              <option key={gym.id} value={gym.id}>
                {gym.name}
              </option>
            ))} */}
      </RHFSelect>
    </Stack>
  );
};
