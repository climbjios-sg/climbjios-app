import { MAIL_TO_SUPPORT_EMAIL, SUPPORT_TELEGRAM } from '../config';
import { useSnackbar } from 'notistack';
import { Stack, Button } from '@mui/material';
import { outgoingLinkProps } from '../utils/common';
import Iconify from '../components/Iconify';

export default function useCustomSnackbar() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return {
    enqueueSnackbar,
    enqueueError: (message: string) => {
      enqueueSnackbar(`${message} If the problem doesn't go away, please contact us.`, {
        variant: 'error',
        persist: true,
        action: (snackbarId) => (
          <Stack direction="row" sx={{ mt: 2 }} spacing={1}>
            <Button
              startIcon={<Iconify icon={'eva:email-outline'} />}
              href={MAIL_TO_SUPPORT_EMAIL}
              {...outgoingLinkProps}

            >
              Email Us
            </Button>
            <Button
              startIcon={<Iconify icon={'jam:telegram'} />}
              href={SUPPORT_TELEGRAM}
              {...outgoingLinkProps}
            >
              Telegram Us
            </Button>
            <Button
              onClick={() => {
                closeSnackbar(snackbarId);
              }}
            >
              Close
            </Button>
          </Stack>
        ),
      });
    },
  };
}
