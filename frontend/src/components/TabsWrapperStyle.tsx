import { styled } from '@mui/material/styles';

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  backgroundColor: theme.palette.background.paper,
  justifyContent: 'flex-start',
  [theme.breakpoints.up('sm')]: {},
  [theme.breakpoints.up('md')]: {},
}));

export default TabsWrapperStyle;
