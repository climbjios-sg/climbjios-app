import React from 'react';
import { Stack, FormHelperText, FormGroup, FormLabel, Typography } from '@mui/material';
// components
import { RHFSelect } from '../../components/hook-form';
import { useFormContext } from 'react-hook-form';
import { UserRequest } from 'src/@types/user';
import useSafeRequest from 'src/hooks/services/useSafeRequest';
import { useSnackbar } from 'notistack';
import { getBoulderingGradeList } from 'src/services/boulderingGrades';
import { getTopRopeGradeList } from 'src/services/topRopeGrades';
import { getLeadClimbingGradeList } from 'src/services/leadClimbingGrades';

export const ClimbingGradesForm = () => {
  const { formState } = useFormContext<UserRequest>();
  const { errors } = formState;
  const { enqueueSnackbar } = useSnackbar();
  const { data: boulderingGrades } = useSafeRequest(getBoulderingGradeList, {
    // Caches successful data
    cacheKey: 'boulderingGrades',
    onError: () => {
      enqueueSnackbar('Failed to get boulderingGrades.', { variant: 'error' });
    },
  });
  const { data: topRopeGrades } = useSafeRequest(getTopRopeGradeList, {
    // Caches successful data
    cacheKey: 'topRopeGrades',
    onError: () => {
      enqueueSnackbar('Failed to get topRopeGrades.', { variant: 'error' });
    },
  });
  const { data: leadClimbingGrades } = useSafeRequest(getLeadClimbingGradeList, {
    // Caches successful data
    cacheKey: 'leadClimbingGrades',
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
        <RHFSelect name="highestBoulderingGradeId" label="Grade">
          <option value="" />
          {boulderingGrades?.data.map((option) => (
            <option key={option.id} value={option.name}>
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
        <RHFSelect name="highestTopRopeGradeId" label="Grade">
          <option value="" />
          {topRopeGrades?.data.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </RHFSelect>
      </FormGroup>
      <FormGroup>
        <Typography variant="subtitle1" gutterBottom>
          Highest Lead Climbing grade achieved
        </Typography>
        <RHFSelect name="highestLeadClimbingGradeId" label="Grade">
          <option value="" />
          {leadClimbingGrades?.data.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </RHFSelect>
      </FormGroup>
    </Stack>
  );
};
