import { IconifyIcon } from '@iconify/react';
import {
  AppBar,
  Button,
  Collapse,
  LinearProgress,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import Iconify from './Iconify';

export type MessageBarProps = {
  show: boolean;
  icon: IconifyIcon | string;
  message: string;
  onClose?: () => void;
  loading?: boolean;
};

export default function MessageBar({
  show,
  icon,
  message,
  onClose,
  loading = false,
}: MessageBarProps) {
  const theme = useTheme();

  return (
    <Collapse in={show}>
      <AppBar
        position="static"
        sx={{
          background: 'white',
          width: '100vw',
          maxWidth: 600,
          mx: 'auto',
          color: 'text.primary',
          zIndex: theme.zIndex.snackbar,
        }}
      >
        {loading && <LinearProgress />}
        <Toolbar>
          {Boolean(icon) && <Iconify sx={{ mr: 2 }} color="text.primary" icon={icon} />}
          <Typography variant="subtitle2" component="div" sx={{ flexGrow: 1 }}>
            {message}
          </Typography>
          {Boolean(onClose) && <Button color="secondary" onClick={onClose}>Close</Button>}
        </Toolbar>
      </AppBar>
    </Collapse>
  );
}
