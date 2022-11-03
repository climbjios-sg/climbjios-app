import { useEffect, useState } from "react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { useSnackbar } from 'notistack';
import LoadingScreen from "src/components/LoadingScreen";

const ServiceWorker: React.FC = () => {
  const { enqueueSnackbar, closeSnackbar, } = useSnackbar();
  const [isUpdating, setIsUpdating] = useState(false);

  // Notify if user is offline, and update them when they are back online
  useEffect(() => {
    let offlineSnackbarKey: string | number | undefined = undefined;

    const handleOffline= () => {
      offlineSnackbarKey = enqueueSnackbar('You are offline! Some functionalities might not work as expected...', {
        variant: 'error',
        persist: true
      });
    }
    const handleOnline = () => {
      if (offlineSnackbarKey !== undefined) {
        enqueueSnackbar('You are back online!');
        closeSnackbar(offlineSnackbarKey);
      }
    }

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Register service worker
  useEffect(() => {
    serviceWorkerRegistration.register({
      onUpdate: (registration) => {
        setIsUpdating(true);
        if (registration && registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
        window.location.reload();
        setIsUpdating(false);
      }
    });
  }, [closeSnackbar, enqueueSnackbar]);

  return isUpdating
    ? <LoadingScreen />
    : <></>;
}

export default ServiceWorker;
