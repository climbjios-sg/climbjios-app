import React, { useCallback } from 'react';
import { FormHelperText, Stack, Typography } from '@mui/material';
// components
import { RHFUploadAvatar } from '../../components/hook-form';
import { useFormContext } from 'react-hook-form';
import { UserRequest } from 'src/@types/user';
import { fData } from 'src/utils/formatNumber';

export const AvatarForm = () => {
  const { formState, setValue } = useFormContext<UserRequest>();
  const { errors } = formState;
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'profilePictureUrl',
          // Object.assign(file, {
          //   preview: URL.createObjectURL(file),
          // })
          ''
        );
      }
    },
    [setValue]
  );

  return (
    <Stack spacing={2}>
      <RHFUploadAvatar
        name="profilePictureUrl"
        maxSize={3145728}
        onDrop={handleDrop}
        helperText={
          <Typography
            variant="caption"
            sx={{
              mt: 2,
              mx: 'auto',
              display: 'block',
              textAlign: 'center',
              color: 'text.secondary',
            }}
          >
            Allowed *.jpeg, *.jpg, *.png, *.gif
            <br /> max size of {fData(3145728)}
          </Typography>
        }
      />
    </Stack>
  );
};
