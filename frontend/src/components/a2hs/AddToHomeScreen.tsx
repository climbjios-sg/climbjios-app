import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Button, Typography } from '@mui/material';
import { InlineIcon } from '@iconify/react';
import { isiOS } from 'src/utils/device';

// Note that BeforeInstallPromptEvent is still a non-standard experimental feature, and may not work for every user.
interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function AddToHomeScreen() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    let deferredPrompt: IBeforeInstallPromptEvent | null;

    const promptUserToInstall = (e: IBeforeInstallPromptEvent) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI to notify the user they can install the PWA
      if (isiOS()) {
        enqueueSnackbar(
          <div>
            <Typography>
              Install the ClimbJios app on your device for easy access anytime.
            </Typography>
            <br />
            <Typography>
              1. Tap on <InlineIcon icon="uil:upload-alt" />
            </Typography>
            <Typography>2. Select Add to Home Screen</Typography>
          </div>,
          {
            variant: 'info',
            persist: true,
          }
        );
      } else {
        enqueueSnackbar(`Install the ClimbJios app on your device for easy access anytime.`, {
          variant: 'info',
          persist: true,
          action: (snackbarId) => (
            <>
              <Button
                variant="outlined"
                onClick={() => {
                  if (deferredPrompt) {
                    deferredPrompt.prompt();
                    deferredPrompt = null;
                  }
                  closeSnackbar(snackbarId);
                }}
              >
                Install
              </Button>
              <Button
                onClick={() => {
                  deferredPrompt = null;
                  closeSnackbar(snackbarId);
                }}
              >
                Cancel
              </Button>
            </>
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
  }, []);
  return <></>;
}
