import useCustomSnackbar from 'src/hooks/useCustomSnackbar';
import { getPronounList } from 'src/services/pronouns';
import useGetOptions from './useGetOptions';

const useGetPronounList = () => {
  const { enqueueError } = useCustomSnackbar();

  return useGetOptions(getPronounList, {
    onError: () => {
      enqueueError(`Failed to get pronouns.`);
    },
  });
};

export default useGetPronounList;
