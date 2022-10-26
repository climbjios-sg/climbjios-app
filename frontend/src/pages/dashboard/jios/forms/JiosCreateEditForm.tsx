import * as React from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Typography, Stack, InputAdornment, Button } from '@mui/material';
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
import { useSelector } from '../../../../store';
import {
  formatJioFormValues,
  JioCreateEditFormValues,
  JIOTYPE_OPTION,
  yupStartEndDateTimingObject,
} from './utils';
import { addDays } from 'date-fns';
import useRHFScrollToInputOnError from '../../../../hooks/useRHFScrollToInputOnError';
import useDevWatchForm from 'src/hooks/dev/useDevWatchForm';
import BackBar from '../../../../components/BackBar';
import useCustomSnackbar from '../../../../hooks/useCustomSnackbar';

type Props = {
  onSubmit: (data: JioCreateEditFormValues) => Promise<void>;
  submitIcon: React.ReactElement;
  submitLabel: string;
  title: string;
  onCancel: () => void;
  defaultValues?: Partial<JioCreateEditFormValues>;
};

export default function JiosCreateEditForm({
  onSubmit,
  onCancel,
  defaultValues: currentJio,
  submitIcon,
  submitLabel,
  title,
}: Props) {
  const { enqueueError } = useCustomSnackbar();
  const gyms = useSelector((state) => state.gyms.data);

  const formSchema = Yup.object().shape({
    gymId: Yup.number().positive().integer().required('Gym is required.'),
    ...yupStartEndDateTimingObject,
    type: Yup.string().required('Looking to buy or sell passes is required.'),
    price: Yup.number().when('type', {
      is: (jioType: JioCreateEditFormValues['type']) => jioType === 'other',
      then: (schema) => schema.optional(),
      otherwise: (schema) =>
        schema
          .positive('Price must be a positive number.')
          .typeError('Price is required.') // Triggered when price is an empty string. Overwrites default unfriendly error message.
          .required('Price is required.'),
    }),
    openToClimbTogether: Yup.boolean().when('type', {
      is: (jioType: JioCreateEditFormValues['type']) => jioType === 'other',
      then: (schema) => schema.optional(),
      otherwise: (schema) => schema.required('Open to climb together is required.'),
    }),
  });

  const initialFormValues = React.useMemo(
    () => ({
      gymId: currentJio?.gymId,
      date: currentJio?.date || addDays(new Date(), 1),
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
    resolver: yupResolver(formSchema),
    defaultValues: initialFormValues,
    // Show error onChange, onBlur, onSubmit
    mode: 'all',
  });
  const {
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setFocus,
  } = methods;
  const formData = watch();

  useDevWatchForm(watch);

  const submitForm = async (data: JioCreateEditFormValues) => {
    try {
      await onSubmit(formatJioFormValues(data));
    } catch (error) {
      enqueueError('Failed to submit form.');
    }
  };

  // Scroll to input on error
  useRHFScrollToInputOnError({ errors, setFocus, isSubmitting });

  return (
    <Box
      sx={{
        pb: 25,
        maxWidth: 600,
        margin: '0 auto',
      }}
    >
      <BackBar title={title} />
      <FormProvider methods={methods} onSubmit={handleSubmit(submitForm)}>
        <Stack spacing={3} sx={{ px: '15px', mt: 11 }}>
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

          {/* Display passes related data iff climber is buying or selling */}
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
                max={10}
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
                sx={{ mt: -1.5 }}
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
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            startIcon={submitIcon}
            sx={{ mt: '35px !important' }}
            fullWidth
            disableElevation
          >
            <Typography variant="button">{submitLabel}</Typography>
          </Button>
        </Stack>
      </FormProvider>
    </Box>
  );
}
