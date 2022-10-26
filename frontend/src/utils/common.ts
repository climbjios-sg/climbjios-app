// @mui
import { styled } from '@mui/material/styles';
import Iconify from 'src/components/Iconify';

export const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

export const outgoingLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

export const getFormattedCamelCase = (camelCase: string) =>
  camelCase.replace(/([a-z])([A-Z])/g, '$1 $2');
