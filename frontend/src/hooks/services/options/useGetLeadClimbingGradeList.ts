import useCustomSnackbar from 'src/hooks/useCustomSnackbar';
import { getLeadClimbingGradeList } from 'src/services/leadClimbingGrades';
import useGetOptions from './useGetOptions';
import { CacheKey } from 'src/config';

const useGetLeadClimbingGradeList = () => {
  const { enqueueError } = useCustomSnackbar();

  return useGetOptions(getLeadClimbingGradeList, {
    cacheKey: CacheKey.LeadClimbingGrades,
    onError: () => {
      enqueueError(`Failed to get lead climbing grades.`);
    },
  });
};

export default useGetLeadClimbingGradeList;
