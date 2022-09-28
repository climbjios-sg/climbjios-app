// @mui
import { styled } from '@mui/material/styles';
import { OutlinedInputProps, TextField } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends OutlinedInputProps {
  stretchStart?: number;
}

const InputStyle = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'stretchStart',
})<Props>(({ stretchStart, theme }) => ({
  '& .MuiOutlinedInput-root': {
    transition: theme.transitions.create(['box-shadow', 'width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    '&.Mui-focused': {
      boxShadow: theme.customShadows.z12,
    },
    ...(stretchStart && {
      width: stretchStart,
      '&.Mui-focused': {
        boxShadow: theme.customShadows.z12,
        [theme.breakpoints.up('sm')]: {
          width: stretchStart + 60,
        },
      },
    }),
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

export default InputStyle;
