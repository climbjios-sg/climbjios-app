import { IconButton, TextField, styled, useTheme, useScrollTrigger, Slide } from '@mui/material';
import { Stack } from '@mui/system';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Jio } from 'src/@types/jio';
import Iconify from 'src/components/Iconify';
import { JIO_TYPE_BUY_SELL_OPTIONS } from 'src/config';
import useGetGymList from 'src/hooks/services/options/useGetGymList';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useDispatch } from 'src/store';
import { setJiosSearchForm } from 'src/store/reducers/jiosSearchForm';
import { ReactSelectWithIcon } from 'src/components/inputs/SelectWithIcon';
import SelectLabel from '../../../../../components/inputs/SelectLabel';
import FilterSelect from 'src/components/inputs/FilterSelect';
import { Gym } from 'src/@types/gym';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& fieldset': { border: 'solid 1px hsl(0, 0%, 80%) !important', borderRadius: '16px' },
  '& .MuiTextField-root': {
    padding: 0,
  },
}));

export default function JioSearch() {
  const gyms = useGetGymList();
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const [gym, setGym] = useState<Gym['id'] | undefined>(undefined);
  const [date, setDate] = useState<Date | null>(null);
  const [jioType, setJioType] = useState<string | null>(null);
  const trigger = useScrollTrigger({
    target: document.getElementById('root') || undefined,
  });

  // Update jio search form
  useEffect(() => {
    dispatch(
      setJiosSearchForm({
        gymId: gym ? gym : undefined,
        date: date ? date : undefined,
        type: jioType ? (jioType as Jio['type']) : undefined,
      })
    );
  }, [date, dispatch, gym, jioType]);

  return (
    <Stack direction="column" sx={{ pb: 1.5 }} spacing={1.5}>
      <Slide appear={false} direction="down" in={!trigger}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ width: '100%', display: trigger ? 'none' : 'flex', pt: 2 }}
        >
          <ReactSelectWithIcon
            sx={{ width: '90%' }}
            icon={<Iconify icon="eva:pin-outline" height={24} width={24} />}
            options={gyms.data}
            onChange={(option) => {
              setGym(option?.value);
            }}
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
      </Slide>
      <Stack direction="row" spacing={1}>
        <Stack sx={{ position: 'relative', cursor: 'pointer', '& input': { cursor: 'pointer' } }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              inputFormat="DD/MM/YYYY"
              disableOpenPicker
              value={date}
              onChange={(value) => {
                setDate(value);
              }}
              minDate={new Date()}
              renderInput={(props) => (
                <StyledTextField size="small" sx={{ width: date ? 130 : 100 }} {...props} />
              )}
            />
          </LocalizationProvider>
          {date && (
            <IconButton
              sx={{
                position: 'absolute',
                right: 2,
                top: 0.2,
              }}
              onClick={() => {
                setDate(null);
              }}
            >
              <Iconify icon="eva:close-outline" width={20} />
            </IconButton>
          )}
          {!date && <SelectLabel icon="eva:calendar-outline" text="Date" />}
        </Stack>
        <FilterSelect
          sx={{ width: 108 }}
          value={jioType}
          options={JIO_TYPE_BUY_SELL_OPTIONS}
          onChange={(e) => {
            setJioType(e.target.value);
          }}
          onClear={() => {
            setJioType(null);
          }}
          labelProps={{
            icon: 'mingcute:coupon-fill',
            iconColor: theme.palette.grey[700],
            text: 'Type',
          }}
        />
      </Stack>
    </Stack>
  );
}
