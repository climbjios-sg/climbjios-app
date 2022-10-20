import React from 'react';
import { Stack, InputAdornment, FormHelperText } from '@mui/material';
// components
import { RHFTextField, RHFSelect } from '../../components/hook-form';
import { useFormContext } from 'react-hook-form';
import { OnboardingFormValues } from './types';
import { getPronounList } from 'src/services/pronouns';
import useSafeRequest from 'src/hooks/services/useSafeRequest';
import { CacheKey, OPTIONS_CACHE_TIME, OPTIONS_STALE_TIME } from 'src/config';
import { useSnackbar } from 'notistack';

export const DetailsForm = () => {
  const { formState } = useFormContext<OnboardingFormValues>();
  const { errors } = formState;
  const { enqueueSnackbar } = useSnackbar();
  const { data: pronouns } = useSafeRequest(getPronounList, {
    // Caches successful data
    cacheTime: OPTIONS_CACHE_TIME,
    staleTime: OPTIONS_STALE_TIME,
    cacheKey: CacheKey.Pronouns,
    onError: () => {
      enqueueSnackbar('Failed to get pronouns.', { variant: 'error' });
    },
  });

  return (
    <Stack spacing={2}>
      <RHFTextField
        type="number"
        name="height"
        label="Height (Optional)"
        placeholder="173"
        InputProps={{
          endAdornment: <InputAdornment position="end">cm</InputAdornment>,
        }}
      />
      <RHFTextField
        type="number"
        name="reach"
        label="Reach (Optional)"
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
      />
      <RHFSelect name="pronounId" label="Pronoun (Optional)">
        <option value={undefined} />
        {pronouns?.data.map((option) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </RHFSelect>
    </Stack>
  );
};
