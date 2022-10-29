import useCustomSnackbar from 'src/hooks/useCustomSnackbar';
import { getSncsCertificationList } from 'src/services/sncsCertifications';
import useGetOptions from './useGetOptions';

const useGetSncsCertificationList = () => {
  const { enqueueError } = useCustomSnackbar();

  return useGetOptions(getSncsCertificationList, {
    onError: () => {
      enqueueError(`Failed to get sncs certifications.`);
    },
  });
};

export default useGetSncsCertificationList;
