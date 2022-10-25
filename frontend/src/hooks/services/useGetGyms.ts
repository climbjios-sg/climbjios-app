import { OPTIONS_CACHE_TIME, OPTIONS_STALE_TIME, CacheKey } from '../../config';
import { getGymList } from '../../services/gyms';
import useCustomSnackbar from '../useErrorSnackbar';
import useSafeRequest from './useSafeRequest';

const useGetGyms = () => {
  const snackbar = useCustomSnackbar();
  const { data } = useSafeRequest(getGymList, {
    // Caches successful data
    cacheTime: OPTIONS_CACHE_TIME,
    staleTime: OPTIONS_STALE_TIME,
    cacheKey: CacheKey.Gyms,
    onError: () => {
      snackbar.enqueueError('Failed to get gyms.');
    },
  });
  return data?.data || [];
};

export default useGetGyms;
