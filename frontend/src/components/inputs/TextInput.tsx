import { InputAdornment, InputProps, TextField, TextFieldProps } from '@mui/material';
import Iconify from 'src/components/Iconify';

export interface TextInputProps {
  icon?: string;
  iconColor?: string;
  text?: string;
  onClear?: () => void;
  // sx?: SxProps;
}

export default function TextInput({
  icon = '',
  iconColor = '',
  text = '',
  onClear,
  ...other
}: TextInputProps & TextFieldProps) {
  const inputProps: InputProps = {
    startAdornment: (
      <InputAdornment position="start">
        <Iconify icon={icon} width={25} height={25} color={iconColor} />
      </InputAdornment>
    ),
  };
  if (onClear) {
    inputProps.endAdornment = (
      <InputAdornment position="end">
        <Iconify
          icon={'eva:close-outline'}
          width={25}
          height={25}
          color={iconColor}
          onClick={onClear}
        />
      </InputAdornment>
    );
  }
  return (
    <TextField
      fullWidth
      label={text}
      // helperText={text}
      // placeholder={text}
      {...other}
      InputProps={inputProps}
      //https://github.com/mui/material-ui/issues/13570#issuecomment-1127952241
      sx={{
        '& fieldset': { borderRadius: '30px' },
      }}
    />
  );
}
