import useCustomSnackbar from 'src/hooks/useCustomSnackbar';
import { getTopRopeGradeList } from 'src/services/topRopeGrades';
import useGetOptions from './useGetOptions';
import { CacheKey } from 'src/config';

const useGetTopRopeGradeList = () => {
  const { enqueueError } = useCustomSnackbar();

  return useGetOptions(getTopRopeGradeList, {
    cacheKey: CacheKey.TopRopeGrades,
    onError: () => {
      enqueueError(`Failed to get top rope grades.`);
    },
  });
};

export default useGetTopRopeGradeList;
