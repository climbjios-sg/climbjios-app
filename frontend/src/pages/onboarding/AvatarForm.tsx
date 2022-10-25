import React, { useCallback } from 'react';
import { Stack, Typography } from '@mui/material';
// components
import { RHFUploadAvatar } from '../../components/hook-form';
import { useFormContext } from 'react-hook-form';
import Compressor from 'compressorjs';
import { fData } from 'src/utils/formatNumber';
import { MAX_AVATAR_UPLOAD_SIZE_IN_BYTES } from 'src/config';
import { OnboardingFormValues } from './types';

export const AvatarForm = () => {
  const { setValue } = useFormContext<OnboardingFormValues>();
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      let file = acceptedFiles[0];

      if (file) {
        new Compressor(file, {      
          quality: 0.4,
          success: (compressedResult: File) => {
            setValue(
              'avatar',
              Object.assign(compressedResult, {
                preview: URL.createObjectURL(compressedResult),
              })
            );
          },
        });
      }
    },
    [setValue]
  );

  // TODO: button to clear upload
  return (
    <Stack spacing={2}>
      <RHFUploadAvatar
        name="avatar"
        maxSize={MAX_AVATAR_UPLOAD_SIZE_IN_BYTES}
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
            <br /> max size of {fData(MAX_AVATAR_UPLOAD_SIZE_IN_BYTES)}
          </Typography>
        }
      />
    </Stack>
  );
};
