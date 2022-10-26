import React from 'react';
import { Stack, FormGroup, Typography } from '@mui/material';
// components
import { useFormContext } from 'react-hook-form';
import { OnboardingFormValues } from './types';
import RHFAutoMultiSelect from 'src/components/hook-form/RHFAutoMultiSelect';
import useGetGyms from '../../hooks/services/useGetGyms';

export const FavoriteGymsForm = () => {
  const { formState } = useFormContext<OnboardingFormValues>();
  const { errors } = formState;
  const gyms = useGetGyms();

  return (
    <Stack spacing={2}>
      <FormGroup>
        <Typography variant="subtitle1" gutterBottom>
          Favourite Gyms (Optional)
        </Typography>
        <RHFAutoMultiSelect
          name="favouriteGymIds"
          options={gyms.map((option) => ({
            value: option.id,
            label: option.name,
          }))}
          helperText={errors?.favouriteGymIds?.message || 'Choose the gyms that you frequent.'}
          FormHelperTextProps={{
            error: !!errors?.favouriteGymIds,
          }}
        />
      </FormGroup>
    </Stack>
  );
};
