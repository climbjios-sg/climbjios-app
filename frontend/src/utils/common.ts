// @mui
import { styled } from '@mui/material/styles';
import Iconify from 'src/components/Iconify';
// components

export const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));
