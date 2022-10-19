import { getUser } from 'src/services/users';
import useSafeRequest from '../services/useSafeRequest';

const useGetIdentity = () => {
  const { data, ...rest } = useSafeRequest(getUser, {
    cacheKey: 'user',
  });

  return {
    identity: data?.data,
    ...rest,
  };
};

export default useGetIdentity;
