import { CacheKey } from 'src/config';
import { getUser } from 'src/services/users';
import useSafeRequest from '../services/useSafeRequest';
import { User } from 'src/@types/user';
import { PronounName } from 'src/@types/pronoun';

const defaultUser: User = {
  userId: '',
  bio: '',
  name: '',
  telegramHandle: '',
  height: 0,
  reach: 0,
  pronounId: 0,
  highestBoulderingGradeId: 0,
  highestTopRopeGradeId: 0,
  highestLeadClimbingGradeId: 0,
  sncsCertificationId: 0,
  profilePictureUrl: '',
  createdAt: '',
  updatedAt: '',
  sncsCertification: { id: 0, name: '' },
  pronoun: { id: 0, name: PronounName.PreferNotToSay },
  highestBoulderingGrade: { id: 0, name: '' },
  highestTopRopeGrade: { id: 0, name: '' },
  highestLeadClimbingGrade: { id: 0, name: '' },
  favouriteGyms: [],
};

const useGetIdentity = () => {
  const { data, ...rest } = useSafeRequest(getUser, {
    cacheKey: CacheKey.User,
  });

  return {
    identity: data?.data || defaultUser,
    ...rest,
  };
};

export default useGetIdentity;
