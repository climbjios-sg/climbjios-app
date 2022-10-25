import { Stack, FormHelperText, Typography } from '@mui/material';
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
      <Stack spacing={1}>
        <Typography variant="subtitle1" gutterBottom>
          Highest bouldering grade (Optional)
        </Typography>
        <RHFSelect name="highestBoulderingGradeId" shouldSanitizeEmptyValue>
          <option value={''} />
          {boulderingGrades?.data.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </RHFSelect>
      </Stack>
      <Stack>
        <Typography variant="subtitle1" gutterBottom>
          Highest top rope grade (Optional)
        </Typography>
        <FormHelperText error>{errors?.highestTopRopeGradeId?.message}</FormHelperText>
        <RHFSelect name="highestTopRopeGradeId" shouldSanitizeEmptyValue>
          <option value={''} />
          {topRopeGrades?.data.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </RHFSelect>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="subtitle1" gutterBottom>
          Highest lead grade (Optional)
        </Typography>
        <RHFSelect name="highestLeadClimbingGradeId" shouldSanitizeEmptyValue>
          <option value={''} />
          {leadClimbingGrades?.data.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </RHFSelect>
      </Stack>
    </Stack>
  );
};
