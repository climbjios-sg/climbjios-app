import React from 'react';
import { Stack, InputAdornment, Typography } from '@mui/material';
// components
import { RHFTextField, RHFSelect } from '../../components/hook-form';
import { useFormContext } from 'react-hook-form';
import { OnboardingFormValues } from './types';
import { getPronounList } from 'src/services/pronouns';
import useSafeRequest from 'src/hooks/services/useSafeRequest';
import { CacheKey, OPTIONS_CACHE_TIME, OPTIONS_STALE_TIME } from 'src/config';
import useCustomSnackbar from '../../hooks/useCustomSnackbar';

export const DetailsForm = () => {
  const { formState } = useFormContext<OnboardingFormValues>();
  const { errors } = formState;
  const { enqueueError } = useCustomSnackbar();
  const { data: pronouns } = useSafeRequest(getPronounList, {
    // Caches successful data
    cacheTime: OPTIONS_CACHE_TIME,
    staleTime: OPTIONS_STALE_TIME,
    cacheKey: CacheKey.Pronouns,
    onError: () => {
      enqueueError('Failed to get pronouns.');
    },
  });

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Typography variant="subtitle1">Height (Optional)</Typography>
        <RHFTextField
          type="number"
          name="height"
          placeholder="173"
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
          shouldSanitizeEmptyValue
        />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="subtitle1" gutterBottom>
          Reach (Optional)
        </Typography>
        <RHFTextField
          type="number"
          name="reach"
          helperText={
            errors?.reach?.message ||
            'Leave this empty if you are unsure or do not know what reach is.'
          }
          FormHelperTextProps={{
            error: !!errors?.reach,
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
          shouldSanitizeEmptyValue
        />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="subtitle1" gutterBottom>
          Pronouns (Optional)
        </Typography>
        <RHFSelect name="pronounId" shouldSanitizeEmptyValue>
          <option value={''} />
          {pronouns?.data.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </RHFSelect>
      </Stack>
    </Stack>
  );
};
