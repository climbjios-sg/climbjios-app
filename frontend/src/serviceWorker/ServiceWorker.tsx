import { useEffect } from "react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { useSnackbar } from 'notistack';
import { Button } from "@mui/material";

const ServiceWorker: React.FC = () => {
  const { enqueueSnackbar, closeSnackbar, } = useSnackbar();

  useEffect(() => {
    serviceWorkerRegistration.register({
      onUpdate: (registration) => {
        enqueueSnackbar(
          `A new version of ClimbJios is available!`,
          {
            variant: 'warning',
            persist: true,
            action: snackbarId => (
              <>
                <Button variant="outlined" onClick={() => {
                  if (registration && registration.waiting) {
                    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                  }
                  closeSnackbar(snackbarId)
                }}>
                  Update now
                </Button>
              </>
            )
          }
        )
      },
      onActivate: (registration) => {
        // Custom notistack countdown logic before force refreshing the page upon successful SW activation
        const id = new Date().getTime().toString();
        let countdownSeconds = 3;
        const getSnackbarText = (seconds: number) => `Update installed successfully! Serving the new version in ${seconds}`;

        enqueueSnackbar(
          <div id={id}>{getSnackbarText(countdownSeconds)}</div>,
          {
            variant: 'info',
            persist: true,
          }
        );
        const interval = setInterval(() => {
          countdownSeconds--;
          if (countdownSeconds === 0) {
            clearInterval(interval);
            window.location.reload();
            return;
          }
          const countdownSecondsRef = document.getElementById(id);
          if (countdownSecondsRef) {
            countdownSecondsRef.innerText = getSnackbarText(countdownSeconds);
          }
        }, 1000);
      }
    });
  }, []);

  return <></>;
}

export default ServiceWorker;
