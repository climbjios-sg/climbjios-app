import { InputAdornment, SxProps, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import Iconify from 'src/components/Iconify';

export interface TextInputProps {
  icon?: string;
  text?: string;
  iconColor?: string;
  sx?: SxProps;
  // children: never[]
}

export default function TextInput({ icon = '', text = '', iconColor = '', sx }: TextInputProps) {
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
      helperText={text}
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
