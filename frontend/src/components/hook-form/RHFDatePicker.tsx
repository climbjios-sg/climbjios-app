// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { IconButton, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Iconify from 'src/components/Iconify';

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
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <Stack sx={{ position: 'relative' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              inputRef={ref}
              disableOpenPicker
              minDate={new Date()}
              label={label}
              value={field.value}
              onChange={(newValue) => {
                field.onChange(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
              )}
              inputFormat="DD/MM/YYYY"
            />
          </LocalizationProvider>
          {/* Button to clear date */}
          {field.value && (
            <IconButton
              sx={{
                position: 'absolute',
                right: 2,
                top: 8,
              }}
              onClick={() => {
                field.onChange(null);
              }}
            >
              <Iconify icon="eva:close-outline" width={32} />
            </IconButton>
          )}
        </Stack>
      )}
    />
  );
}
