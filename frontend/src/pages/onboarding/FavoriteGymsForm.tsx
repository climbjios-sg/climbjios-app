import React from 'react';
import { Stack, FormHelperText } from '@mui/material';
// components
import { RHFSelect } from '../../components/hook-form';
import { useFormContext } from 'react-hook-form';
import { UserRequest } from 'src/@types/user';

export const FavoriteGymsForm = () => {
  const { formState } = useFormContext<UserRequest>();
  const { errors } = formState;

  return (
    <Stack spacing={2}>
      <FormHelperText error>{errors?.favouriteGyms?.message}</FormHelperText>
      <RHFSelect
        label="Favorite Gyms"
        name="favouriteGyms"
        SelectProps={{ native: true }}
        defaultValue=""
        helperText="Choose a gym that you frequently visit."
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
