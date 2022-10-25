import React from 'react';
import { Stack, FormHelperText, FormGroup, FormLabel, Typography } from '@mui/material';
// components
import { RHFSelect } from '../../components/hook-form';
import { useFormContext } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { getBoulderingGradeList } from 'src/services/boulderingGrades';
import { getTopRopeGradeList } from 'src/services/topRopeGrades';
import { getLeadClimbingGradeList } from 'src/services/leadClimbingGrades';
import { OnboardingFormValues } from './types';
import useSafeRequest from 'src/hooks/services/useSafeRequest';

import { CacheKey, OPTIONS_CACHE_TIME, OPTIONS_STALE_TIME } from 'src/config';

export const ClimbingGradesForm = () => {
  const { formState } = useFormContext<OnboardingFormValues>();
  const { errors } = formState;
  const { enqueueSnackbar } = useSnackbar();

  const { data: boulderingGrades } = useSafeRequest(getBoulderingGradeList, {
    // Caches successful data
    cacheTime: OPTIONS_CACHE_TIME,
    staleTime: OPTIONS_STALE_TIME,
    cacheKey: CacheKey.BoulderingGrades,
    onError: () => {
      enqueueSnackbar('Failed to get boulderingGrades.', { variant: 'error' });
    },
  });
  const { data: topRopeGrades } = useSafeRequest(getTopRopeGradeList, {
    // Caches successful data
    cacheTime: OPTIONS_CACHE_TIME,
    staleTime: OPTIONS_STALE_TIME,
    cacheKey: CacheKey.TopRopeGrades,
    onError: () => {
      enqueueSnackbar('Failed to get topRopeGrades.', { variant: 'error' });
    },
  });
  const { data: leadClimbingGrades } = useSafeRequest(getLeadClimbingGradeList, {
    // Caches successful data
    cacheTime: OPTIONS_CACHE_TIME,
    staleTime: OPTIONS_STALE_TIME,
    cacheKey: CacheKey.LeadClimbingGrades,
    onError: () => {
      enqueueSnackbar('Failed to get leadClimbingGrades.', { variant: 'error' });
    },
  });

  return (
    <Stack spacing={2}>
      <FormGroup>
        <Typography variant="subtitle1" gutterBottom>
          Highest bouldering grade achieved
        </Typography>
        <RHFSelect
          name="highestBoulderingGradeId"
          label="Grade (Optional)"
          shouldSanitizeEmptyValue
        >
          <option value={undefined} />
          {boulderingGrades?.data.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </RHFSelect>
      </FormGroup>
      <FormGroup>
        <Typography variant="subtitle1" gutterBottom>
          Highest Top Rope grade achieved
        </Typography>
        <FormHelperText error>{errors?.highestTopRopeGradeId?.message}</FormHelperText>
        <RHFSelect name="highestTopRopeGradeId" label="Grade (Optional)" shouldSanitizeEmptyValue>
          <option value={undefined} />
          {topRopeGrades?.data.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </RHFSelect>
      </FormGroup>
      <FormGroup>
        <Typography variant="subtitle1" gutterBottom>
          Highest Lead Climbing grade achieved
        </Typography>
        <RHFSelect
          name="highestLeadClimbingGradeId"
          label="Grade (Optional)"
          shouldSanitizeEmptyValue
        >
          <option value={undefined} />
          {leadClimbingGrades?.data.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </RHFSelect>
      </FormGroup>
    </Stack>
  );
};
