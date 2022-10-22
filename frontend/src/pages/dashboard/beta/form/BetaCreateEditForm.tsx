import * as Yup from 'yup';
import * as React from 'react';
import { capitalize, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  RHFUploadSingleFileVideo,
  FormProvider,
  RHFSelect,
} from '../../../../components/hook-form';
import { useSelector } from '../../../../store';
import { yupResolver } from '@hookform/resolvers/yup';
import useRHFScrollToInputOnError from '../../../../hooks/useRHFScrollToInputOnError';
import { LoadingButton } from '@mui/lab';
import { BetaCreateEditFormValues } from '../../../../@types/beta';
import useGetGymGrades from '../../../../hooks/services/useGetGymGrades';
import { useSearchParams } from 'react-router-dom';

type BetaCreateEditFormProps = {
  onSubmit: (data: BetaCreateEditFormValues) => Promise<void>;
  defaultValues?: Partial<BetaCreateEditFormValues>;
};

const formSchema = Yup.object().shape({
  video: Yup.mixed().required('Oopsy! You forgot about your climbing video.'),
  gymId: Yup.number().required('Oopsy! Gym is required for other climbers to find your Beta.'),
  colorId: Yup.number().required('Oopsy! Color is required for other climbers to find your Beta.'),
  wallId: Yup.number().required('Oopsy! Wall is required for other climbers to find your Beta.'),
  gymGradeId: Yup.number().required(
    'Oopsy! Grade is required for other climbers to find your Beta.'
  ),
});

export default function BetaCreateEditForm({
  onSubmit,
  defaultValues = {},
}: BetaCreateEditFormProps) {
  // Populate gymId default value with search param data
  const [searchParams] = useSearchParams();
  const searchParamsGymId = searchParams.get('gymId');
  defaultValues.gymId = searchParamsGymId ? parseInt(searchParamsGymId, 10) : defaultValues.gymId;

  const gyms = useSelector((state) => state.gyms.data);
  const colors = useSelector((state) => state.colors.data);
  const walls = useSelector((state) => state.walls.data);
  const methods = useForm<BetaCreateEditFormValues>({
    resolver: yupResolver(formSchema),
    defaultValues,
    mode: 'all',
  });
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    setFocus,
  } = methods;

  const { gymId } = watch();

  const gymGrades = useGetGymGrades(gymId);

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

  useRHFScrollToInputOnError({ errors, setFocus, isSubmitting });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" alignItems="center" spacing={3}>
        <RHFUploadSingleFileVideo name="video" onDrop={handleDrop} />
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
              {capitalize(color.name)}
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
              {capitalize(wall.name)}
            </option>
          ))}
        </RHFSelect>
        <RHFSelect
          label="Select Grade"
          fullWidth
          name="gymGradeId"
          SelectProps={{ native: true }}
          defaultValue=""
        >
          {/* Disabled Option for first option to not auto-render */}
          <option value="" disabled />
          {gymGrades.map((grade) => (
            <option key={grade.id} value={grade.id}>
              {capitalize(grade.name)}
            </option>
          ))}
        </RHFSelect>
        <LoadingButton
          loading={isSubmitting}
          variant="contained"
          type="submit"
          fullWidth
          size="large"
        >
          Submit
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
