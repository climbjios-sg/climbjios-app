import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Link(theme: Theme) {
  return {
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
  };
}
