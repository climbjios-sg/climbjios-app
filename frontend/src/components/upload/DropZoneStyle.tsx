import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[50032]}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
}));
