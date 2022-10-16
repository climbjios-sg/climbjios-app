import * as React from 'react';
import { useMemo } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Typography, Stack, Button } from '@mui/material';
// components
import {
  FormProvider,
  RHFTextField,
  RHFRadioGroup,
  RHFSelect,
  RHFDatePicker,
} from '../../../../components/hook-form';
// form
import { useForm } from 'react-hook-form';
// @types
import { Gym } from '../../../../@types/gym';
// dayjs
import { useSnackbar } from 'notistack';
import { useSelector } from '../../../../store';
import { setDateTime } from '../../../../utils/formatTime';
import { JioSearchFormValues, JIOTYPE_OPTION, yupStartEndDateTimingObject } from './utils';
import { addDays } from 'date-fns';
import FloatingBottomCard from '../../../../components/FloatingBottomCard';
import { IconStyle } from 'src/utils/common';

type Props = {
  onSubmit: (data: JioSearchFormValues) => Promise<void>;
  submitIcon: React.ReactElement;
  submitLabel: string;
  onClear: () => void;
  defaultValues?: JioSearchFormValues;
};

export default function JiosSearchForm({
  onSubmit,
  defaultValues: currentJio,
  submitIcon,
  onClear,
  submitLabel,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const gyms = useSelector((state) => state.gyms.data);

  const formSchema = Yup.object().shape({
    gymId: Yup.number().positive().integer(),
    ...yupStartEndDateTimingObject,
    type: Yup.string(),
  });

  const initialFormValues = useMemo(
    () => ({
      gymId: currentJio?.gymId,
      date: currentJio?.date || addDays(new Date(), 1),
      startTiming: currentJio?.startTiming || '09:00',
      endTiming: currentJio?.endTiming || '22:00',
      type: currentJio?.type,
    }),
    [currentJio]
  );

  const methods = useForm<JioSearchFormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: initialFormValues,
    // Show error onChange, onBlur, onSubmit
    mode: 'all',
  });

  const { handleSubmit, setError } = methods;

  const submitForm = async (data: JioSearchFormValues) => {
    // Currently yup side validates first, then we have to click submit again for our custom validation to run
    if (data.startTiming >= data.endTiming) {
      setError('startTiming', { type: 'custom', message: 'Start time must be before end time' });
      return;
    }

    if (setDateTime(data.date, data.startTiming) < new Date()) {
      setError('startTiming', {
        type: 'custom',
        message: 'Start date and time must be after current time',
      });
      return;
    }

    try {
      await onSubmit(data);
    } catch (error) {
      enqueueSnackbar('Failed to submit form', { variant: 'error' });
    }
  };

  return (
    <Box
      sx={{
        pt: 5,
        pb: 20,
        minHeight: '100vh',
        px: '15px',
        maxWidth: 600,
        margin: '0 auto',
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(submitForm)}>
        <Stack spacing={3}>
          <Typography variant="subtitle1">
            <IconStyle
              sx={{ transform: 'translateY(4px)', marginRight: '8px' }}
              icon={'eva:pin-outline'}
            />
            Gym
          </Typography>
          <RHFSelect
            label="Select Gym"
            fullWidth
            name="gymId"
            SelectProps={{ native: true }}
            defaultValue=""
          >
            {/* Disabled Option for first option to not auto-render */}
            <option value="" disabled />
            {gyms.map((gym: Gym) => (
              <option key={gym.id} value={gym.id}>
                {gym.name}
              </option>
            ))}
          </RHFSelect>

          <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
            <IconStyle
              sx={{ transform: 'translateY(4px)', marginRight: '8px' }}
              icon={'eva:calendar-outline'}
            />
            Time
          </Typography>
          <RHFDatePicker name="date" label="Date" />

          <Stack justifyContent="space-evenly" direction="row" spacing={2} sx={{ mt: 3 }}>
            <RHFTextField
              size="medium"
              type="time"
              name="startTiming"
              label="Start Time"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <RHFTextField
              size="medium"
              type="time"
              name="endTiming"
              label="End Time"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>

          <Typography variant="subtitle1">
            <IconStyle
              sx={{ transform: 'translateY(4px)', marginRight: '8px' }}
              icon={'mingcute:coupon-line'}
            />
            Are you buying or selling passes?
          </Typography>
          <RHFRadioGroup sx={{ mt: -1.5 }} name="type" options={JIOTYPE_OPTION} color="primary" />

          <FloatingBottomCard>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              startIcon={submitIcon}
              fullWidth
              disableElevation
            >
              <Typography variant="button">{submitLabel}</Typography>
            </Button>
            <Button size="medium" fullWidth onClick={onClear} sx={{ mt: 1.5 }}>
              Clear
            </Button>
          </FloatingBottomCard>
        </Stack>
      </FormProvider>
    </Box>
  );
}
