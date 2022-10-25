import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  AppBarProps,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Iconify from './Iconify';

interface BackBarProps {
  title?: string;
  position?: AppBarProps['position'];
  disableHideOnScroll?: boolean;
}

export default function BackBar({
  title,
  position = 'absolute',
  disableHideOnScroll,
}: BackBarProps) {
  const navigate = useNavigate();
  const trigger = useScrollTrigger({
    target: document.getElementById('root') || undefined,
    threshold: 200,
  });

  const appBarComponent = (
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
      position={position}
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

  if (disableHideOnScroll) {
    return appBarComponent;
  }

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {appBarComponent}
    </Slide>
  );
}
