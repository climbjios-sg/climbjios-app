import React from 'react';
import { Stack, FormHelperText, FormGroup, FormLabel, Typography } from '@mui/material';
// components
import { RHFSelect } from '../../components/hook-form';
import { useFormContext } from 'react-hook-form';
import { UserRequest } from 'src/@types/user';
import { getSncsCertificationList } from 'src/services/sncsCertifications';
import useSafeRequest from 'src/hooks/services/useSafeRequest';
import { useSnackbar } from 'notistack';

export const ClimbingCertForm = () => {
  const { formState } = useFormContext<UserRequest>();
  const { errors } = formState;
  const { enqueueSnackbar } = useSnackbar();
  const { data: sncsCertifications } = useSafeRequest(getSncsCertificationList, {
    // Caches successful data
    cacheKey: 'sncsCertifications',
    onError: () => {
      enqueueSnackbar('Failed to get sncsCertifications.', { variant: 'error' });
    },
  });

  return (
    <Stack spacing={2}>
      <FormGroup>
        <Typography variant="subtitle1" gutterBottom>
          SNCS Certification
        </Typography>
        <RHFSelect name="sncsCertificationId" label="Level">
          <option value="" />
          {sncsCertifications?.data.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </RHFSelect>
      </FormGroup>
    </Stack>
  );
};
