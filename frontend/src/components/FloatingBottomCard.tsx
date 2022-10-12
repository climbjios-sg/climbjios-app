import { Paper } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

export default function FloatingBottomCard({ children }: Props) {
  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        zIndex: 10000,
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 30px',
        borderRadiusTopLeft: '8px',
        borderRadiusTopRight: '8px',
        paddingBottom: '12px',
        '& button': {
            boxShadow: 'none',
            maxWidth: 580,
        }
      }}
    >
      {children}
    </Paper>
  );
}
