import { SUPPORT_EMAIL } from '../config';
import { useSnackbar } from 'notistack';

export default function useCustomSnackbar() {
  const { enqueueSnackbar } = useSnackbar();

  return {
    enqueueSnackbar,
    enqueueError: (message: string) => {
      enqueueSnackbar(
        `${message} If the problem doesn't go away, please contact us via ${SUPPORT_EMAIL}`,
        { variant: 'error', autoHideDuration: 10000 }
      );
    },
  };
}
