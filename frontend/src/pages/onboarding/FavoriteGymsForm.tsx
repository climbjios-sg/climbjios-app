import React from 'react';
import { Stack, FormGroup, Typography } from '@mui/material';
// components
import { RHFSelect } from '../../components/hook-form';
import { useFormContext } from 'react-hook-form';
import { UserRequest } from 'src/@types/user';
import { Gym } from 'src/@types/gym';
import useGetGyms from 'src/hooks/services/useGetGyms';

// TODO: multi select
export const FavoriteGymsForm = () => {
  const { formState } = useFormContext<UserRequest>();
  const { errors } = formState;
  const { data } = useGetGyms();
  // const [personName, setPersonName] = React.useState<string[]>([]);

  return (
    <Stack spacing={2}>
      <FormGroup>
        <Typography variant="subtitle1" gutterBottom>
          Favourite Gyms
        </Typography>
        <RHFSelect
          label="Select Gym(s)"
          name="favouriteGyms"
          // value={[]}
          SelectProps={{
            native: true,
            // multiple: true,
          }}
          helperText={errors?.favouriteGyms?.message || 'Choose a gym that you frequently visit.'}
          FormHelperTextProps={{
            error: !!errors?.favouriteGyms?.message,
          }}
        >
          {/* Disabled Option for first option to not auto-render */}
          {/* <option value={''} disabled /> */}
          {data?.map((gym: Gym) => (
            <option key={gym.id} value={gym.id}>
              {gym.name}
            </option>
          ))}
        </RHFSelect>
      </FormGroup>
    </Stack>
  );
};
