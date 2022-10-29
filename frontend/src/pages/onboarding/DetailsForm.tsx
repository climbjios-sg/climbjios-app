import React from 'react';
import { Stack, InputAdornment, Typography } from '@mui/material';
// components
import { RHFTextField, RHFSelect } from '../../components/hook-form';
import { useFormContext } from 'react-hook-form';
import { OnboardingFormValues } from './types';
import useGetPronounList from 'src/hooks/services/options/useGetPronounList';

export const DetailsForm = () => {
  const { formState } = useFormContext<OnboardingFormValues>();
  const { errors } = formState;

  const { data: pronouns } = useGetPronounList();

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
          {pronouns.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </RHFSelect>
      </Stack>
    </Stack>
  );
};
