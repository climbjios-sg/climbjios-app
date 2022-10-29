import useCustomSnackbar from 'src/hooks/useCustomSnackbar';
import { getGymList } from 'src/services/gyms';
import useGetOptions from './useGetOptions';

const useGetGymList = () => {
  const { enqueueError } = useCustomSnackbar();

  return useGetOptions(getGymList, {
    onError: () => {
      enqueueError(`Failed to get gyms.`);
    },
  });
};

export default useGetGymList;
