import { useEffect } from "react";
import { registerSW } from 'virtual:pwa-register';
import { useSnackbar } from 'notistack';

const ServiceWorker: React.FC = () => {
  const { enqueueSnackbar, closeSnackbar, } = useSnackbar();

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
    registerSW();
  })

  return <></>;
}

export default ServiceWorker;
