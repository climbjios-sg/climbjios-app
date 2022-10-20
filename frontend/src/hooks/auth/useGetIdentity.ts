import { CacheKey } from 'src/config';
import { getUser } from 'src/services/users';
import useSafeRequest from '../services/useSafeRequest';

const useGetIdentity = () => {
  const { data, ...rest } = useSafeRequest(getUser, {
    cacheKey: CacheKey.User,
  });

  return {
    identity: data?.data,
    ...rest,
  };
};

export default useGetIdentity;
