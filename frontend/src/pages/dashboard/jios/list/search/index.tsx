import {
  IconButton,
  TextField,
  styled,
  MenuItem,
  useTheme,
  useScrollTrigger,
  Slide,
  Box,
} from '@mui/material';
import { Stack } from '@mui/system';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Option } from 'src/@types';
import { Jio } from 'src/@types/jio';
import Iconify from 'src/components/Iconify';
import { JIO_TYPE_BUY_SELL_OPTIONS } from 'src/config';
import useGetGymList from 'src/hooks/services/options/useGetGymList';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useDispatch } from 'src/store';
import { setJiosSearchForm } from 'src/store/reducers/jiosSearchForm';
import { SelectWithIcon } from 'src/components/SelectWithIcon';

interface LabelProps {
  icon?: string;
  text?: string;
  iconColor?: string;
}

function Label({ icon = '', text = '', iconColor = '' }: LabelProps) {
  return (
    <Stack
      sx={{ position: 'absolute', left: 10, top: 8 }}
      direction="row"
      alignItems="center"
      spacing={0.6}
    >
      <Iconify icon={icon} width={20} height={20} color={iconColor} />
      <span style={{ color: 'gray', marginLeft: 11 }}>{text}</span>
    </Stack>
  );
}

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
  const [gym, setGym] = useState<Option | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [jioType, setJioType] = useState<string | null>(null);
  const trigger = useScrollTrigger({
    target: document.getElementById('root') || undefined,
  });

  // Update jio search form
  useEffect(() => {
    dispatch(
      setJiosSearchForm({
        gymId: gym ? (gym?.value as Jio['gymId']) : undefined,
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
          <SelectWithIcon
            sx={{ width: '90%' }}
            icon={<Iconify icon="eva:pin-outline" height={24} width={24} />}
            options={gyms.data}
            onChange={(option) => {
              setGym(option);
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
        <Stack sx={{ position: 'relative' }}>
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
          {!date && <Label icon="eva:calendar-outline" text="Date" />}
        </Stack>
        <Stack sx={{ position: 'relative' }}>
          <StyledTextField
            select
            size="small"
            sx={{ width: 110 }}
            value={jioType}
            SelectProps={{
              // Hide icon if jiotype is present
              // Box is a placeholder
              IconComponent: jioType ? Box : undefined,
            }}
            onChange={(e) => {
              setJioType(e.target.value);
            }}
          >
            {JIO_TYPE_BUY_SELL_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </StyledTextField>
          {jioType && (
            <IconButton
              sx={{
                position: 'absolute',
                right: 2,
                height: '32px',
                top: '4px',
                background: 'white',
              }}
              onClick={() => {
                setJioType(null);
              }}
            >
              <Iconify icon="eva:close-outline" width={20} />
            </IconButton>
          )}
          {!jioType && (
            <Label icon="mingcute:coupon-fill" iconColor={theme.palette.grey[700]} text="Type" />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
