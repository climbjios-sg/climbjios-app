import { CacheKey } from 'src/config';
import { getUser } from 'src/services/users';
import useSafeRequest from '../services/useSafeRequest';
import { User } from 'src/@types/user';
import { PronounName } from 'src/@types/pronoun';
import mixpanel_actions from 'src/mixpanel/index';

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

/**
 * Return the current user identity
 *
 * The return value updates according to the call state:
 *
 * - mount: { loading: true, loaded: false }
 * - success: { identity: Identity, loading: false, loaded: true }
 * - error: { error: Error, loading: false, loaded: true }
 *
 * @returns The current user identity. Destructure as { identity, error, loading, loaded }.
 */
const useGetIdentity = () => {
  const { data, loading, error } = useSafeRequest(getUser, {
    cacheKey: CacheKey.User,
  });

  if (data?.data) {
    mixpanel_actions.identify(data.data.userId);
    mixpanel_actions.people.set(data.data);
  }
  return {
    identity: data?.data ?? defaultUser,
    loading,
    loaded: !loading,
    error,
  };
};

export default useGetIdentity;
