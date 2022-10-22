// @mui
import { styled } from '@mui/material/styles';
import { Typography, Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(3, 3),
}));

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function EmptyContent({ title, description, children, ...other }: Props) {
  return (
    <RootStyle {...other}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary', pb: 3 }}>
          {description}
        </Typography>
      )}

      {children}
    </RootStyle>
  );
}
