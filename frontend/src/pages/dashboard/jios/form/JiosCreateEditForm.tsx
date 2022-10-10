import * as React from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Typography, Stack, InputAdornment } from '@mui/material';
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
import { setDateTime } from '../../../../utils/formatTime';
import { formatJioFormValues, JioCreateEditFormValues, JIOTYPE_OPTION } from './utils';

type Props = {
  onSubmit: (data: JioCreateEditFormValues) => Promise<void>;
  submitIcon: React.ReactElement;
  submitLabel: string;
  isSearch?: boolean;
  defaultValues?: Partial<JioCreateEditFormValues>;
};

export default function JiosCreateEditForm({
  onSubmit,
  defaultValues: currentJio,
  isSearch,
  submitIcon,
  submitLabel,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const gyms = useSelector((state) => state.gyms.data);

  const NewJioSchema = Yup.object().shape({
    gymId: Yup.number().required('Gym is required.').positive().integer(),
    date: Yup.date().required('Date is required.'),
    startTiming: Yup.string().required('Start timing is required.'),
    endTiming: Yup.string().required('End timing is required.'),
    type: Yup.string().required('Looking to buy or sell passes is required.'),
    price: Yup.number().positive('Price must be more than $0').optional(),
  });

  const initialFormValues = React.useMemo(
    () => ({
      gymId: currentJio?.gymId,
      date: currentJio?.date || new Date(),
      startTiming: currentJio?.startTiming || '09:00',
      endTiming: currentJio?.endTiming || '22:00',
      type: currentJio?.type,
      numPasses: currentJio?.numPasses || 1,
      price: currentJio?.price,
      openToClimbTogether: currentJio?.openToClimbTogether,
    }),
    [currentJio]
  );

  const methods = useForm<JioCreateEditFormValues>({
    resolver: yupResolver(NewJioSchema),
    defaultValues: initialFormValues,
  });
  const { handleSubmit, setFocus, setError, watch } = methods;
  const formData = watch();

  const submitForm = async (data: JioCreateEditFormValues) => {
    // TODO: Fix custom validation to run together with Yup validation
    // Currently yup side validates first, then we have to click submit again for our custom validation to run
    if (data.startTiming >= data.endTiming) {
      setError('startTiming', { type: 'custom', message: 'Start time must be before end time' });
      setFocus('startTiming');
      return;
    }

    if (setDateTime(data.date, data.startTiming) < new Date()) {
      setError('startTiming', {
        type: 'custom',
        message: 'Start date and time must be after current time',
      });
      setFocus('startTiming');
      return;
    }

    try {
      await onSubmit(formatJioFormValues(data));
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

          {/* Display passes related data iif climber is buying or selling */}
          {formData.type && formData.type !== 'other' && (
            <>
              <Typography variant="subtitle1" sx={{ pb: 1 }}>
                {`How many passes are you looking to ${
                  formData.type === 'buyer' ? 'buy' : 'sell'
                }?`}
              </Typography>
              <RHFSlider
                name="numPasses"
                step={1}
                min={1}
                max={8}
                valueLabelDisplay="on"
                color="primary"
                sx={{ alignSelf: 'center', width: `calc(100% - 20px)` }}
              />
              <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
                {`How much are you ${formData.type === 'buyer' ? 'buying' : 'selling'} a pass for?`}
              </Typography>
              <RHFTextField
                size="medium"
                type="number"
                name="price"
                label="Price"
                fullWidth
                placeholder="0"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
              <Typography sx={{ mb: -8 }} variant="subtitle1">
                Are you open to climbing with others?
              </Typography>
              <RHFRadioGroup
                name="openToClimbTogether"
                options={[
                  { label: 'Yes', value: true },
                  { label: 'No', value: false },
                ]}
                color="primary"
              />
            </>
          )}

          <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
            Anything else you want to mention? (Optional)
          </Typography>
          <RHFTextField
            size="medium"
            multiline
            rows={3}
            name="optionalNote"
            label=""
            placeholder=""
            fullWidth
          />

          <LoadingButton
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            startIcon={submitIcon}
          >
            <Typography variant="button">{submitLabel}</Typography>
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
}
