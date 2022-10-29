import useCustomSnackbar from 'src/hooks/useCustomSnackbar';
import { getLeadClimbingGradeList } from 'src/services/leadClimbingGrades';
import useGetOptions from './useGetOptions';

const useGetLeadClimbingGradeList = () => {
  const { enqueueError } = useCustomSnackbar();

  return useGetOptions(getLeadClimbingGradeList, {
    onError: () => {
      enqueueError(`Failed to get lead climbing grades.`);
    },
  });
};

export default useGetLeadClimbingGradeList;
