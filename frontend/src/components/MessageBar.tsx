
import {
  AppBar,
  Button,
  Collapse,
  LinearProgress,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';

export type MessageBarProps = {
  show: boolean;
  message: string;
  onClose?: () => void;
  icon?: React.ReactElement;
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
        {loading && <LinearProgress color="secondary" />}
        <Toolbar>
          {icon}
          <Typography variant="subtitle2" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            {message}
          </Typography>
          {Boolean(onClose) && (
            <Button color="secondary" onClick={onClose}>
              Close
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Collapse>
  );
}
