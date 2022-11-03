import { Paper, useTheme } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

export default function FloatingBottomCard({ children }: Props) {
  const theme = useTheme();

  return (
    <Paper
      elevation={5}
      sx={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        zIndex: theme.zIndex.drawer,
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 30px',
        borderRadiusTopLeft: '8px',
        borderRadiusTopRight: '8px',
        paddingBottom: '12px',
        '& .MuiButton-root': {
          boxShadow: 'none',
          maxWidth: 580,
        },
      }}
    >
      {children}
    </Paper>
  );
}
