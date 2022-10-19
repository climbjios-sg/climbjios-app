import React from 'react';
import { Stack, FormGroup, Typography } from '@mui/material';
// components
import { RHFSelect } from '../../components/hook-form';
import { useFormContext } from 'react-hook-form';
import { UserRequest } from 'src/@types/user';
import { Gym } from 'src/@types/gym';
import useGetGyms from 'src/hooks/services/useGetGyms';
import { getGymList } from 'src/services/gyms';
import useSafeRequest from 'src/hooks/services/useSafeRequest';
import { useSnackbar } from 'notistack';

export const FavoriteGymsForm = () => {
  const { formState } = useFormContext<UserRequest>();
  const { errors } = formState;
  const { enqueueSnackbar } = useSnackbar();
  const { data: gyms } = useSafeRequest(getGymList, {
    // Caches successful data
    cacheKey: 'gyms',
    onError: () => {
      enqueueSnackbar('Failed to get gyms.', { variant: 'error' });
    },
  });

  return (
    <Stack spacing={2}>
      <FormGroup>
        <Typography variant="subtitle1" gutterBottom>
          Favourite Gyms
        </Typography>
        <RHFSelect
          name="favouriteGyms"
          label="Select Gym(s)"
          helperText={errors?.favouriteGyms?.message || 'Choose a gym that you frequently visit.'}
          FormHelperTextProps={{
            error: !!errors?.favouriteGyms,
          }}
        >
          <option value="" />
          {gyms?.data.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </RHFSelect>
      </FormGroup>
    </Stack>
  );
};
