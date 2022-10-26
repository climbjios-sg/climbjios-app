import { styled } from '@mui/material';

const StyledA = styled('a')(({ theme }) => ({
  color: theme.palette.secondary.main,
  textDecoration: 'none',
}));

export default StyledA;
