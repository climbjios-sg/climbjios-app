import React from 'react';
import { Stack, FormGroup, Typography } from '@mui/material';
// components
import { useFormContext } from 'react-hook-form';
import { OnboardingFormValues } from './types';
import RHFAutoMultiSelect from 'src/components/hook-form/RHFAutoMultiSelect';
import useGetOptions from 'src/hooks/services/useGetOptions';
import { getGymList } from 'src/services/gyms';

export const FavoriteGymsForm = () => {
  const { formState } = useFormContext<OnboardingFormValues>();
  const { errors } = formState;
  const { data: gyms } = useGetOptions(getGymList);

  return (
    <Stack spacing={2}>
      <FormGroup>
        <Typography variant="subtitle1" gutterBottom>
          Favourite Gyms (Optional)
        </Typography>
        <RHFAutoMultiSelect
          name="favouriteGymIds"
          options={gyms}
          helperText={errors?.favouriteGymIds?.message || 'Choose the gyms that you frequent.'}
          FormHelperTextProps={{
            error: !!errors?.favouriteGymIds,
          }}
        />
      </FormGroup>
    </Stack>
  );
};
