import React from 'react';
import { Stack, FormHelperText, FormGroup, FormLabel, Typography } from '@mui/material';
// components
import { RHFSelect } from '../../components/hook-form';
import { useFormContext } from 'react-hook-form';
import { UserRequest } from 'src/@types/user';

export const ClimbingCertForm = () => {
  const { formState } = useFormContext<UserRequest>();
  const { errors } = formState;

  return (
    <Stack spacing={2}>
      <FormGroup>
        <Typography variant="subtitle1" gutterBottom>
          SNCS Certification
        </Typography>
        <RHFSelect
          label="Level"
          name="sncsCertificationId"
          SelectProps={{
            native: true,
            // multiple: true,
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
      </FormGroup>
    </Stack>
  );
};