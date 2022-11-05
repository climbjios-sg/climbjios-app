import { Autocomplete, IconButton, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Option } from '../../../../../@types';
import { Jio } from '../../../../../@types/jio';
import Iconify from '../../../../../components/Iconify';
import { JIO_TYPE_BUY_SELL_OPTIONS } from '../../../../../config';
import useGetGymList from '../../../../../hooks/services/options/useGetGymList';
import { PATH_DASHBOARD } from '../../../../../routes/paths';
import { useDispatch } from '../../../../../store';
import { setJiosSearchForm } from '../../../../../store/reducers/jiosSearchForm';

function Label({ icon = '', text = '' }) {
  return (
    <Stack direction="row" alignItems="center" spacing={0.6}>
      <Iconify icon={icon} width={24} height={24} />
      <span>{text}</span>
    </Stack>
  );
}

export default function JioSearch() {
  const gyms = useGetGymList();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [gym, setGym] = useState<Option | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [jioType, setJioType] = useState<Option<string> | null>(null);

  // Update jio search form
  useEffect(() => {
    dispatch(
      setJiosSearchForm({
        gymId: gym ? (gym?.value as Jio['gymId']) : undefined,
        date: date ? date : undefined,
        type: jioType ? (jioType.value as Jio['type']) : undefined,
      })
    );
  }, [date, dispatch, gym, jioType]);

  return (
    <Stack direction="column" sx={{ pb: 2, pt: 3 }} spacing={2}>
      <Stack direction="row" alignItems="center">
        <Autocomplete
          options={gyms.data}
          getOptionLabel={(gym) => gym.label}
          filterSelectedOptions
          fullWidth
          value={gym}
          isOptionEqualToValue={(option, v) => option.value === v.value}
          onChange={(_e, value) => {
            setGym(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={<Label icon="eva:pin-outline" text="Select Gym" />}
              fullWidth
            />
          )}
        />
        <IconButton
          sx={{ ml: '10px', mr: '-7px' }}
          onClick={() => {
            navigate(PATH_DASHBOARD.general.jios.create);
          }}
        >
          <Iconify icon="eva:plus-outline" width={24} height={24} />
        </IconButton>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Stack sx={{ position: 'relative' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              inputFormat="DD/MM/YYYY"
              disableOpenPicker
              label={<Label icon="eva:calendar-outline" text="Date" />}
              value={date}
              onChange={(value) => {
                setDate(value);
              }}
              minDate={new Date()}
              renderInput={(params) => (
                <TextField sx={{ width: 150 }} InputProps={{}} {...params} />
              )}
            />
          </LocalizationProvider>
          {date && (
            <IconButton
              sx={{
                position: 'absolute',
                right: 2,
                top: 8,
              }}
              onClick={() => {
                setDate(null);
              }}
            >
              <Iconify icon="eva:close-outline" />
            </IconButton>
          )}
        </Stack>
        <Autocomplete
          options={JIO_TYPE_BUY_SELL_OPTIONS}
          getOptionLabel={(jioType) => jioType.label}
          filterSelectedOptions
          value={jioType}
          onChange={(_e, value) => {
            setJioType(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ width: 150 }}
              label={<Label icon="mingcute:coupon-fill" text="Buy/Sell" />}
            />
          )}
        />
      </Stack>
    </Stack>
  );
}
