import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Button, Stack, Typography } from '@mui/material';
import { InlineIcon } from '@iconify/react';
import { isiOS, isMobile, isPWA } from 'src/utils/device';
import useLocalStorage from './useLocalStorage';

// Note that BeforeInstallPromptEvent is still a non-standard experimental feature, and may not work for every user.
interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function useAddToHomeScreen() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [dontShow, setDontShow] = useLocalStorage<boolean>('dontShowSnackbar', false);

  useEffect(() => {
    if (isMobile()) {
      let deferredPrompt: IBeforeInstallPromptEvent | null;

      const promptUserToInstall = (e: IBeforeInstallPromptEvent) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI to notify the user they can install the PWA
        if (!isiOS() && !dontShow) {
          enqueueSnackbar(`Install the ClimbJios app on your device for easy access anytime.`, {
            variant: 'info',
            persist: true,
            action: (snackbarId) => (
              <Stack direction="row" sx={{ mt: 2 }}>
                <Button
                  onClick={() => {
                    deferredPrompt = null;
                    closeSnackbar(snackbarId);
                    setDontShow(true);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (deferredPrompt) {
                      deferredPrompt.prompt();
                      deferredPrompt = null;
                    }
                    closeSnackbar(snackbarId);
                    setDontShow(true);
                  }}
                >
                  Install
                </Button>
              </Stack>
            ),
          });
        }
        // Optionally, send analytics event that PWA install promo was shown.
      };

      window.addEventListener('beforeinstallprompt', promptUserToInstall as any);

      window.addEventListener('appinstalled', () => {
        // Clear the deferredPrompt so it can be garbage collected
        deferredPrompt = null;
        // Optionally, send analytics event to indicate successful install
      });

      if (isiOS() && !isPWA() && !dontShow) {
        enqueueSnackbar(
          <Stack>
            <Typography>
              Install the ClimbJios app on your device for easy access anytime.
            </Typography>
            <Typography>
              1. Tap on <InlineIcon icon="uil:upload-alt" />
            </Typography>
            <Typography>2. Select Add to Home Screen</Typography>
          </Stack>,
          {
            action: (snackbarId) => (
              <Stack direction="row" sx={{ mt: 2 }}>
                <Button
                  onClick={() => {
                    closeSnackbar(snackbarId);
                    setDontShow(true);
                  }}
                >
                  Close
                </Button>
              </Stack>
            ),
            variant: 'info',
            persist: true,
          }
        );
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
