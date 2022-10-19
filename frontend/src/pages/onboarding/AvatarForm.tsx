import React, { useCallback } from 'react';
import { Stack, Typography } from '@mui/material';
// components
import { RHFUploadAvatar } from '../../components/hook-form';
import { useFormContext } from 'react-hook-form';
import { fData } from 'src/utils/formatNumber';
import { MAX_UPLOAD_SIZE } from 'src/config';
import { AvatarFormValues } from './types';

export const AvatarForm = () => {
  const { setValue } = useFormContext<AvatarFormValues>();
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'avatar',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <Stack spacing={2}>
      <RHFUploadAvatar
        name="avatar"
        maxSize={MAX_UPLOAD_SIZE}
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
            <br /> max size of {fData(MAX_UPLOAD_SIZE)}
          </Typography>
        }
      />
    </Stack>
  );
};
