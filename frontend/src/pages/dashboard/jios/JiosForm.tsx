import * as React from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
// @mui
import { Box, Button, Typography, MenuItem, Stack, InputAdornment } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import {
  FormProvider,
  RHFCheckbox,
  RHFTextField,
  RHFRadioGroup,
  RHFSlider,
  RHFSelect,
  RHFDatePicker,
  RHFTimePicker,
} from '../../../components/hook-form';
// form
import { useForm } from 'react-hook-form';
// @types
import { Jio } from '../../../@types/jio';
import { Gym } from '../../../@types/gym';
// dayjs
import dayjs from 'dayjs';
//
import authorizedAxios from 'src/utils/authorizedAxios';
import { BE_API } from 'src/utils/api';
import { SUPPORT_EMAIL } from '../../../config';
import { isStartTimeEarlier } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

const JIOTYPE_OPTION = [
  { label: "I'm buying", value: 'buyer' },
  { label: "I'm selling", value: 'seller' },
  { label: 'None, just looking for friends to climb with', value: 'other' },
];

// ----------------------------------------------------------------------

interface IFormValuesProps
  extends Omit<
    Jio,
    | 'id'
    | 'isBuy'
    | 'startDateTime'
    | 'endDateTime'
    | 'optionalNote'
    | 'createdAt'
    | 'updatedAt'
    | 'isClosed'
    | 'user'
    | 'gym'
  > {}

interface FormValuesProps extends IFormValuesProps {
  date: Date;
  startTiming: Date;
  endTiming: Date;
}

type Props = {
  isSearch?: boolean;
  currentJio?: FormValuesProps;
};

export default function JiosForm({ isSearch, currentJio }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [gyms, setGyms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    authorizedAxios
      .get(BE_API.gyms)
      .then(({ data }) => {
        console.log(data);
        setGyms(data);
      })
      .catch(console.error);
  }, []);

  const NewJioSchema = Yup.object().shape({
    type: Yup.string().required('Type is required'),
    numPasses: Yup.number().required('Number of passes is required').positive().integer(),
    price: Yup.number().required('Price is required').positive(),
    gymId: Yup.number().required('Location is required').positive().integer(),
    date: Yup.date().required('Date is required'),
    startTiming: Yup.date().required('Date is required'),
    endTiming: Yup.date().required('Date is required'),
    openToClimbTogether: Yup.boolean().required('Open to climb together is required'),
  });

  const defaultValues = useMemo(
    () => ({
      type: currentJio?.type || 'buyer', // Change to enum
      numPasses: currentJio?.numPasses || 1,
      price: currentJio?.price || 10,
      gymId: currentJio?.gymId || 1,
      date: currentJio?.date || new Date(),
      startTiming: currentJio?.startTiming || new Date(),
      endTiming: currentJio?.endTiming || new Date(),
      openToClimbTogether: currentJio?.openToClimbTogether || false,
    }),
    [currentJio]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewJioSchema),
    defaultValues,
  });

  const { reset, watch, handleSubmit, setError } = methods;

  const values = watch();
  console.log('values', values);

  const onSubmit = async (data: FormValuesProps) => {
    try {
      console.log('DATA: ', data);
      if (!isStartTimeEarlier(data.startTiming, data.endTiming)) {
        setError('startTiming', { type: 'custom', message: 'Please enter a valid start time' });
        throw new Error('Start time must be after end time');
      }
      data?.date?.setHours(data.startTiming?.getHours());
      data?.date?.setMinutes(data.startTiming.getMinutes());
      const startDateTime = data?.date?.toISOString();
      console.log('startDateTime', startDateTime);
      data?.date?.setHours(data.endTiming.getHours());
      data?.date?.setMinutes(data.endTiming.getMinutes());
      const endDateTime = data?.date?.toISOString();
      console.log('endDateTime', endDateTime);
      authorizedAxios.post(BE_API.posts.create, {
        type: data.type,
        numPasses: data.numPasses,
        price: data.price,
        gymId: data.gymId,
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        openToClimbTogether: data.openToClimbTogether,
      });
      reset();
      enqueueSnackbar('Your Jio has been posted!');
      navigate(-1);
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
    <Box
      sx={{
        pt: 5,
        pb: 20,
        px: '15px',
        maxWidth: 500,
      }}
    >
      <FormProvider methods={methods}>
        <Stack spacing={3}>
          <Typography variant="subtitle1">Are you looking to buy or sell passes?</Typography>
          <RHFRadioGroup name="type" options={JIOTYPE_OPTION} />

          <Typography variant="subtitle1" gutterBottom>
            How many passes are you looking to buy?
          </Typography>
          <RHFSlider
            name="numPasses"
            step={1}
            min={1}
            max={8}
            valueLabelDisplay="on"
            color="secondary"
            sx={{ alignSelf: 'center', width: `calc(100% - 20px)` }}
          />

          <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
            How much are you willing to pay for a pass?
          </Typography>
          <RHFTextField
            size="small"
            type="number"
            name={'price'}
            label="Price"
            placeholder="0"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            sx={{ maxWidth: { md: 96 } }}
          />

          <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
            Where are you climbing at?
          </Typography>
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

          <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
            What date are you climbing on?
          </Typography>
          <RHFDatePicker name="date" label="Date" />

          <Typography variant="subtitle1" gutterBottom sx={{ mb: 2 }}>
            What time are you climbing at?
          </Typography>
          <Stack justifyContent="space-evenly" direction="row" spacing={2} sx={{ mt: 3 }}>
            <RHFTimePicker name="startTiming" label="Start Time" />
            <RHFTimePicker name="endTiming" label="End Time" />
          </Stack>

          <RHFCheckbox name="openToClimbTogether" label="I am open to climbing with others!" />

          <Button
            fullWidth
            size="large"
            variant="contained"
            color="secondary"
            startIcon={
              isSearch
                ? <Iconify icon={'ant-design:search-outlined'} width={24} height={24} />
                : <Iconify icon={'carbon:add'} width={24} height={24} />
            }
            onClick={handleSubmit(onSubmit)}
          >
            <Typography variant="button">{isSearch ? "Search" : "Create"}</Typography>
          </Button>
        </Stack>
      </FormProvider>
    </Box>
  );
}
