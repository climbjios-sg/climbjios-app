import { OPTIONS_CACHE_TIME, OPTIONS_STALE_TIME, CacheKey } from '../../config';
import { getGymList } from '../../services/gyms';
import useErrorSnackbar from '../useErrorSnackbar';
import useSafeRequest from './useSafeRequest';

const useGetGyms = () => {
  const snackbar = useErrorSnackbar();
  const { data } = useSafeRequest(getGymList, {
    // Caches successful data
    cacheTime: OPTIONS_CACHE_TIME,
    staleTime: OPTIONS_STALE_TIME,
    cacheKey: CacheKey.Gyms,
    onError: () => {
      snackbar.enqueueWithSupport('Failed to get gyms.');
    },
  });
  return data?.data;
};

export default useGetGyms;
