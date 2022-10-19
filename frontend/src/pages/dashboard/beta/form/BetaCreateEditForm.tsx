import * as Yup from 'yup';
import * as React from 'react';
import { Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  RHFUploadSingleFileVideo,
  FormProvider,
  RHFSelect,
} from '../../../../components/hook-form';
import { CustomFile } from '../../../../components/upload';
import { useSelector } from '../../../../store';
import { useRequest } from 'ahooks';
import { getGymGrades } from '../../../../services/gyms';
import useErrorSnackbar from '../../../../hooks/useErrorSnackbar';

export type BetaFormValueProps = {
  video: CustomFile | undefined | string;
  gymId: string;
  colorId: string;
  wallId: string;
  gradeId: string;
};

type BetaCreateEditFormProps = {
  onSubmit: (data: BetaFormValueProps) => void;
};

export default function BetaCreateEditForm({ onSubmit }: BetaCreateEditFormProps) {
  const gyms = useSelector((state) => state.gyms.data);
  const colors = useSelector((state) => state.colors.data);
  const walls = useSelector((state) => state.walls.data);
  const methods = useForm<BetaFormValueProps>({
    mode: 'all',
  });
  const errorSnackbar = useErrorSnackbar();

  const { handleSubmit, setValue, watch } = methods;

  const { gymId } = watch();

  const { data } = useRequest(() => getGymGrades(gymId), {
    ready: Boolean(gymId),
    refreshDeps: [gymId],
    onError: () => {
      errorSnackbar.enqueueWithSupport('Failed to get Gym Grades.');
    },
  });

  const grades = data?.data || [];

  const handleDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'video',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFUploadSingleFileVideo
        name="video"
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
            Max length of 1 min
          </Typography>
        }
      />
      <RHFSelect
        label="Select Gym"
        fullWidth
        name="gymId"
        SelectProps={{ native: true }}
        defaultValue=""
      >
        {/* Disabled Option for first option to not auto-render */}
        <option value="" disabled />
        {gyms.map((gym) => (
          <option key={gym.id} value={gym.id}>
            {gym.name}
          </option>
        ))}
      </RHFSelect>
      <RHFSelect
        label="Select Colour"
        fullWidth
        name="colorId"
        SelectProps={{ native: true }}
        defaultValue=""
      >
        {/* Disabled Option for first option to not auto-render */}
        <option value="" disabled />
        {colors.map((color) => (
          <option key={color.id} value={color.id}>
            {color.name}
          </option>
        ))}
      </RHFSelect>
      <RHFSelect
        label="Select Wall"
        fullWidth
        name="wallId"
        SelectProps={{ native: true }}
        defaultValue=""
      >
        {/* Disabled Option for first option to not auto-render */}
        <option value="" disabled />
        {walls.map((wall) => (
          <option key={wall.id} value={wall.id}>
            {wall.name}
          </option>
        ))}
      </RHFSelect>
      <RHFSelect
        label="Select Grade"
        fullWidth
        name="gradeId"
        SelectProps={{ native: true }}
        defaultValue=""
      >
        {/* Disabled Option for first option to not auto-render */}
        <option value="" disabled />
        {grades.map((grade) => (
          <option key={grade.id} value={grade.id}>
            {grade.name}
          </option>
        ))}
      </RHFSelect>
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </FormProvider>
  );
}
