import useCustomSnackbar from 'src/hooks/useCustomSnackbar';
import { getSncsCertificationList } from 'src/services/sncsCertifications';
import useGetOptions from './useGetOptions';
import { CacheKey } from 'src/config';

const useGetSncsCertificationList = () => {
  const { enqueueError } = useCustomSnackbar();

  return useGetOptions(getSncsCertificationList, {
    cacheKey: CacheKey.SncsCertifications,
    onError: () => {
      enqueueError(`Failed to get sncs certifications.`);
    },
  });
};

export default useGetSncsCertificationList;
