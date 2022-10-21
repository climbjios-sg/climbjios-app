import React from 'react';
import { Stack, FormGroup, Typography } from '@mui/material';
// components
import { RHFSelect } from '../../components/hook-form';
import { getSncsCertificationList } from 'src/services/sncsCertifications';
import useSafeRequest from 'src/hooks/services/useSafeRequest';
import { useSnackbar } from 'notistack';
import { CacheKey, OPTIONS_CACHE_TIME, OPTIONS_STALE_TIME } from 'src/config';
import { OPTIONAL_TRANSFORM } from 'src/utils/form';

export const ClimbingCertForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: sncsCertifications } = useSafeRequest(getSncsCertificationList, {
    // Caches successful data
    cacheTime: OPTIONS_CACHE_TIME,
    staleTime: OPTIONS_STALE_TIME,
    cacheKey: CacheKey.SncsCertifications,
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
        <RHFSelect
          name="sncsCertificationId"
          label="Level (Optional)"
          transform={OPTIONAL_TRANSFORM}
        >
          <option value={undefined} />
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
