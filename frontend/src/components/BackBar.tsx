import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Iconify from './Iconify';

interface BackBarProps {
  title: string;
}

export default function BackBar({ title }: BackBarProps) {
  const navigate = useNavigate();

  return (
    <AppBar
      sx={{
        width: '100vw',
        maxWidth: 600,
        mx: 'auto',
        left: 0,
        right: 0,
        background: 'white',
        color: 'text.primary',
      }}
      position="absolute"
    >
      <Toolbar sx={{ pl: 1 }}>
        <IconButton
          sx={{ mr: 1 }}
          color="primary"
          onClick={() => {
            navigate(-1);
          }}
        >
          <Iconify icon="eva:arrow-back-fill" color="primary" />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
