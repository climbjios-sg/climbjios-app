import { styled } from '@mui/system';
import { TypographyProps, Typography } from '@mui/material';

export default styled((props: TypographyProps) => (
  <Typography {...props} variant="h5" />
))({
  gridColumn: 'span 2',
  textAlign: 'center',
  justifySelf: 'center',
});
