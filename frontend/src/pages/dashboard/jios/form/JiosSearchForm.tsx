import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Typography, Stack, InputAdornment, Paper, Button } from '@mui/material';
// components
import {
  FormProvider,
  RHFTextField,
  RHFRadioGroup,
  RHFSlider,
  RHFSelect,
  RHFDatePicker,
} from '../../../../components/hook-form';
// form
import { useForm } from 'react-hook-form';
// @types
import { Gym } from '../../../../@types/gym';
// dayjs
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { useSelector } from '../../../../store';
import { dateToTimeString, setDateTime } from '../../../../utils/formatTime';
import { JioSearchFormValues, JIOTYPE_OPTION } from './utils';
import { addHours } from 'date-fns';

type Props = {
  onSubmit: (data: JioSearchFormValues) => Promise<void>;
  submitIcon: React.ReactElement;
  submitLabel: string;
  defaultValues?: JioSearchFormValues;
};

export default function JiosSearchForm({
  onSubmit,
  defaultValues: currentJio,
  submitIcon,
  submitLabel,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const gyms = useSelector((state) => state.gyms.data);

  const NewJioSchema = Yup.object().shape({
    gymId: Yup.number().optional(),
    date: Yup.date().required(),
    startTiming: Yup.string().required(),
    endTiming: Yup.string().required(),
    type: Yup.string().optional(),
  });

  const initialFormValues = useMemo(
    () => ({
      gymId: currentJio?.gymId,
      date: currentJio?.date || new Date(),
      startTiming: currentJio?.startTiming || dateToTimeString(addHours(new Date(), 2)),
      endTiming: currentJio?.endTiming || '22:00',
      type: currentJio?.type,
    }),
    [currentJio]
  );

  const methods = useForm<JioSearchFormValues>({
    resolver: yupResolver(NewJioSchema),
    defaultValues: initialFormValues,
  });

  const { handleSubmit, setError } = methods;

  const submitForm = async (data: JioSearchFormValues) => {
    // TODO: Fix custom validation to run together with Yup validation
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
        px: '15px',
        maxWidth: 600,
        margin: '0 auto',
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(submitForm)}>
        <Stack spacing={3}>
          <Typography variant="subtitle1">Where are you climbing at?</Typography>
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
            What date are you climbing on?
          </Typography>
          <RHFDatePicker name="date" label="Date" />

          <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
            What time are you climbing at?
          </Typography>
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

          <Typography variant="subtitle1">Are you looking to buy or sell passes?</Typography>
          <RHFRadioGroup sx={{ mt: -1.5 }} name="type" options={JIOTYPE_OPTION} color="primary" />

          <Paper
            elevation={3}
            sx={{
              position: 'fixed',
              left: 0,
              bottom: 0,
              zIndex: 10000,
              width: '100vw',
              display: 'flex',
              justifyContent: 'center',
              padding: '20px 30px',
            }}
          >
            <Button
              sx={{
                maxWidth: 580,
              }}
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              startIcon={submitIcon}
              fullWidth
            >
              <Typography variant="button">{submitLabel}</Typography>
            </Button>
          </Paper>
        </Stack>
      </FormProvider>
    </Box>
  );
}
