import useCustomSnackbar from 'src/hooks/useCustomSnackbar';
import { getTopRopeGradeList } from 'src/services/topRopeGrades';
import useGetOptions from './useGetOptions';

const useGetTopRopeGradeList = () => {
  const { enqueueError } = useCustomSnackbar();

  return useGetOptions(getTopRopeGradeList, {
    onError: () => {
      enqueueError(`Failed to get top rope grades.`);
    },
  });
};

export default useGetTopRopeGradeList;
