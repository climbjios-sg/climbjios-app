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
        <Typography variant="subtitle1">Highest bouldering grade achieved</Typography>
        <FormHelperText error>{errors?.highestBoulderingGradeId?.message}</FormHelperText>
        <RHFSelect
          label="Grade"
          name="highestBoulderingGradeId"
          SelectProps={{
            native: true,
            // multiple: true,
          }}
          // defaultValue=""
          // helperText="Choose a gym that you frequently visit."
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
        <Typography variant="subtitle1">Highest Top Rope grade achieved</Typography>
        <FormHelperText error>{errors?.highestTopRopeGradeId?.message}</FormHelperText>
        <RHFSelect
          label="Grade"
          name="highestTopRopeGradeId"
          SelectProps={{
            native: true,
            // multiple: true,
          }}
          // defaultValue=""
          // helperText="Choose a gym that you frequently visit."
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
        <Typography variant="subtitle1">Highest Lead Climbing grade achieved</Typography>
        <FormHelperText error>{errors?.highestLeadClimbingGradeId?.message}</FormHelperText>
        <RHFSelect
          label="Grade"
          name="highestLeadClimbingGradeId"
          SelectProps={{
            native: true,
            // multiple: true,
          }}
          // defaultValue=""
          // helperText="Choose a gym that you frequently visit."
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
