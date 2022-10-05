// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';
import { MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// ----------------------------------------------------------------------

type IProps = {
  name: string;
  label: string;
};

type Props = IProps;

export default function RHFDatePicker({ name, label }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileTimePicker
            {...field}
            label={label}
            inputFormat="hh:mm a"
            minutesStep={5}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
      )}
    />
  );
}