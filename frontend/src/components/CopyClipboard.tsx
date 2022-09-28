import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// @mui
import { Tooltip, Stack, Typography, Button } from '@mui/material';
// components
import Iconify from './Iconify';
import palette from '../theme/palette';

// ----------------------------------------------------------------------

type Props = {
  value: string;
  label: string;
};

export default function CopyClipboard({ value, label, ...other }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const onCopy = () => {
    enqueueSnackbar('Copied!');
  };

  return (
    <Stack direction="row" alignItems="center">
      <CopyToClipboard text={value} onCopy={onCopy}>
        <Button
          fullWidth
          variant="text"
          sx={{ color: palette.light.primary.dark, borderColor: palette.light.primary.dark }}
        >
          <Tooltip title="Copy">
            <Iconify icon={'eva:copy-fill'} width={24} height={24} sx={{ mr: 0.5 }} />
          </Tooltip>
          <Typography variant="button">{label}</Typography>
        </Button>
      </CopyToClipboard>
    </Stack>
  );
}
