import * as React from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useSnackbar } from 'notistack';
// @mui
import { Box, Grid, Button, Container, Typography, MenuItem, InputAdornment } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import { FormProvider, RHFCheckbox, RHFTextField, RHFRadioGroup, RHFSlider, RHFSelect, RHFDatePicker, RHFTimePicker } from '../../components/hook-form';
// form
import { useForm, Controller } from 'react-hook-form';
// @types
import { Jio } from '../../@types/jio';
import { Gym } from '../../@types/gym';
//
import authorizedAxios from 'src/utils/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { SUPPORT_EMAIL } from '../../config';
import { getHoursFromUtcDateString, getMinutesFromUtcDateString } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

const JIOTYPE_OPTION = [
  { label: 'I\'m buying', value: 'buyer' },
  { label: 'I\'m selling', value: 'seller' },
  { label: 'None, just looking for friends to climb with', value: 'other' },
];

// ----------------------------------------------------------------------

interface IFormValuesProps extends Omit<Jio, 'id' | 'isBuy' | 'startDateTime' | 'endDateTime' | 'optionalNote' | 'createdAt' | 'updatedAt' | 'isClosed' | 'user' | 'gym'> {}

interface FormValuesProps extends IFormValuesProps {
  date: Date | null;
  startTiming: string;
  endTiming: string;
}

type Props = {
  isEdit?: boolean;
  currentJio?: FormValuesProps;
  setIsSearching?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function JiosForm({ isEdit, currentJio, setIsSearching }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [gyms, setGyms] = useState([]);

  useEffect(() => {
    authorizedAxios.get(BE_API.gyms)
    .then(({ data }) => {
      console.log(data);
      setGyms(data);
    })
    .catch(console.error);
  }, [])

  const NewJioSchema = Yup.object().shape({
    jioType: Yup.string().required('Type is required'),
    numPasses: Yup.number().required('Number of passes is required').positive().integer(),
    price: Yup.number().required('Price is required').positive(),
    gymId: Yup.number().required('Location is required').positive().integer(),
    date: Yup.date().required('Date is required'),
    startTiming: Yup.string().required('Start time is required'),
    endTiming: Yup.string().required('End time is required'),
    openToClimbTogether: Yup.boolean().required('Open to climb together is required')
  });

  const defaultValues = useMemo(
    () => ({
      jioType: currentJio?.jioType || 'buyer',  // Change to enum
      numPasses: currentJio?.numPasses || 1,
      price: currentJio?.price || 10,
      gymId: currentJio?.gymId || 1,
      date: currentJio?.date || new Date(),
      startTiming: currentJio?.startTiming || '',
      endTiming: currentJio?.endTiming || '',
      openToClimbTogether: currentJio?.openToClimbTogether || false,
    }),
    [currentJio]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewJioSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = methods;

  const values = watch();
  console.log('values', values);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      console.log("Submitting form");
      console.log("DATA: ", data);
      data?.date?.setHours(getHoursFromUtcDateString(data.startTiming));
      data?.date?.setMinutes(getMinutesFromUtcDateString(data.startTiming));
      const startDateTime = data?.date?.toISOString();
      console.log("startDateTime", startDateTime);
      data?.date?.setHours(getHoursFromUtcDateString(data.endTiming));
      data?.date?.setMinutes(getMinutesFromUtcDateString(data.endTiming));
      const endDateTime = data?.date?.toISOString();
      console.log("endDateTime", endDateTime);
      authorizedAxios.post(BE_API.posts.create, {
        "type": data.jioType,
        "numPasses": data.numPasses,
        "price": data.price,
        "gymId": data.gymId,
        "startDateTime": startDateTime,
        "endDateTime": endDateTime,
        "openToClimbTogether": data.openToClimbTogether
    });
      reset();
      enqueueSnackbar('Your Jio has been posted!');
      !!setIsSearching && setIsSearching(false);
    } catch (error) {
      enqueueSnackbar(
        `Failed to post your jio, try again. If the problem persists, contact support ${SUPPORT_EMAIL}.`,
        {
          variant: 'error',
          persist: true,
        }
      );
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: '15px', backgroundColor: "white", width: 400, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }}>
      <FormProvider
        methods={methods}
      >
          <Typography variant="subtitle2" gutterBottom sx={{ mb: 2 }}>
            Are you looking to buy or sell passes?
          </Typography>
          <RHFRadioGroup
            name="jioType"
            options={JIOTYPE_OPTION}
            sx={{
              '& .MuiFormControlLabel-root': { mr: 4 },
            }}
          />

          <RHFSlider
            name="numPasses"
            step={1}
            min={1}
            max={8}
            // getAriaValueText={(value) => `$${value}`}
            // valueLabelFormat={(value) => `$${value}`}
            sx={{ alignSelf: 'center', width: `calc(100% - 20px)` }}
          />

          <Typography variant="subtitle2" gutterBottom sx={{ mb: 2 }}>
            How much are you willing to pay for a pass?
          </Typography>
          <RHFTextField
            size="small"
            type="number"
            name={"price"}
            label="Price"
            placeholder="0"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            sx={{ maxWidth: { md: 96 } }}
          />

          <RHFSelect
            fullWidth
            name="gymId"
            label="Location"
            InputLabelProps={{ shrink: true }}
            SelectProps={{ sx: { textTransform: 'capitalize' } }}
          >
            {gyms.map((gym: Gym) => (
              <MenuItem
                key={gym.id}
                value={gym.id}
                sx={{
                  mx: 1,
                  my: 0.5,
                  borderRadius: 0.75,
                  typography: 'body2',
                  textTransform: 'capitalize',
                }}
              >
                {gym.name}
              </MenuItem>
            ))}
          </RHFSelect>

          <RHFDatePicker name="date" label="Date" />

          <RHFTimePicker name="startTiming" label="Start Time" />

          <RHFTimePicker name="endTiming" label="End Time" />

          <RHFCheckbox name="openToClimbTogether" label="I am open to climbing with others" />

          <Button
            fullWidth
            size="large"
            variant="contained"
            startIcon={<Iconify icon={'ant-design:search-outlined'} width={24} height={24} sx={{ mx: 1 }} />}
            onClick={handleSubmit(onSubmit)}
          >
            <Typography variant="button">Search</Typography>
          </Button>
      </FormProvider>
    </Box>
  );
}