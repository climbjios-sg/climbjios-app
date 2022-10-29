import useCustomSnackbar from 'src/hooks/useCustomSnackbar';
import { getGymList } from 'src/services/gyms';
import useGetOptions from './useGetOptions';
import { CacheKey } from 'src/config';

const useGetGymList = () => {
  const { enqueueError } = useCustomSnackbar();

  return useGetOptions(getGymList, {
    cacheKey: CacheKey.Gyms,
    onError: () => {
      enqueueError(`Failed to get gyms.`);
    },
  });
};

export default useGetGymList;
