// @mui
import { Radio, FormControlLabel } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  value: string;
};

export default function BoxMask({ value }: Props) {
  return (
    <FormControlLabel
      label=""
      value={value}
      control={<Radio sx={{ display: 'none' }} />}
      sx={{
        m: 0,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: 'absolute',
      }}
    />
  );
}
