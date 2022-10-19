import React from 'react';
import { Stack, FormHelperText, FormGroup, FormLabel, Typography } from '@mui/material';
// components
import { RHFSelect } from '../../components/hook-form';
import { useFormContext } from 'react-hook-form';
import { UserRequest } from 'src/@types/user';

export const ClimbingGradesForm = () => {
  const { formState } = useFormContext<UserRequest>();
  const { errors } = formState;

  return (
    <Stack spacing={2}>
      <FormGroup>
        <Typography variant="subtitle1" gutterBottom>
          Highest bouldering grade achieved
        </Typography>
        <RHFSelect
          label="Grade"
          name="highestBoulderingGradeId"
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
      <FormGroup>
        <Typography variant="subtitle1" gutterBottom>
          Highest Top Rope grade achieved
        </Typography>
        <FormHelperText error>{errors?.highestTopRopeGradeId?.message}</FormHelperText>
        <RHFSelect
          label="Grade"
          name="highestTopRopeGradeId"
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
      <FormGroup>
        <Typography variant="subtitle1" gutterBottom>
          Highest Lead Climbing grade achieved
        </Typography>
        <RHFSelect
          label="Grade"
          name="highestLeadClimbingGradeId"
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
