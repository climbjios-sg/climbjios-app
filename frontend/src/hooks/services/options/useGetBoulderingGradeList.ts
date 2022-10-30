import { CacheKey } from 'src/config';
import useCustomSnackbar from 'src/hooks/useCustomSnackbar';
import { getBoulderingGradeList } from 'src/services/boulderingGrades';
import useGetOptions from './useGetOptions';

const useGetBoulderingGradeList = () => {
  const { enqueueError } = useCustomSnackbar();

  return useGetOptions(getBoulderingGradeList, {
    cacheKey: CacheKey.BoulderingGrades,
    onError: () => {
      enqueueError(`Failed to get bouldering grades.`);
    },
  });
};

export default useGetBoulderingGradeList;
