import useCustomSnackbar from 'src/hooks/useCustomSnackbar';
import { getPronounList } from 'src/services/pronouns';
import useGetOptions from './useGetOptions';
import { CacheKey } from 'src/config';

const useGetPronounList = () => {
  const { enqueueError } = useCustomSnackbar();

  return useGetOptions(getPronounList, {
    cacheKey: CacheKey.Pronouns,
    onError: () => {
      enqueueError(`Failed to get pronouns.`);
    },
  });
};

export default useGetPronounList;
