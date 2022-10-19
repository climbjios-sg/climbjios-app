import { SUPPORT_EMAIL } from '../config';
import { useSnackbar } from 'notistack';

export default function useErrorSnackbar() {
  const { enqueueSnackbar } = useSnackbar();

  return {
    enqueueWithSupport: (message: string) => {
      enqueueSnackbar(
        `${message}. If the problem persists, please contact us via ${SUPPORT_EMAIL}`,
        { variant: 'error' }
      );
    },
  };
}
