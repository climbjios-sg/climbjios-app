import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import Iconify from 'src/components/Iconify';

export interface TextInputProps {
  icon?: string;
  iconColor?: string;
  text?: string;
  // sx?: SxProps;
}

export default function TextInput({
  icon = '',
  text = '',
  iconColor = '',
  ...other
}: TextInputProps & TextFieldProps) {
  return (
    // <Stack
    //   sx={{
    //     position: 'absolute',
    //     left: 10,
    //     top: 8,
    //     pointerEvents: 'none',
    //     userSelect: 'none',
    //     cursor: 'pointer',
    //     ...sx,
    //   }}
    //   direction="row"
    //   alignItems="center"
    //   spacing={0.8}
    // >
    <TextField
      fullWidth
      label={text}
      // helperText={text}
      // placeholder={text}
      {...other}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon={icon} width={25} height={25} color={iconColor} />
          </InputAdornment>
        ),
      }}
      //https://github.com/mui/material-ui/issues/13570#issuecomment-1127952241
      sx={{
        '& fieldset': { borderRadius: '30px' },
      }}
    />
    // </Stack>
  );
}
