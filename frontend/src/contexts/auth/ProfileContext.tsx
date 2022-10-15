import { createContext, useContext, useMemo, ReactNode, useState } from 'react';
import { AuthProvider } from 'src/@types/auth';
import { UserIdentity, UserRequest } from 'src/@types/user';
import { createUser, updateUser } from 'src/services/user';

export interface ProfileContextValue {
  authProvider: AuthProvider;
  userIdentity?: UserIdentity;
  createUserIdentity: (user: UserRequest) => () => Promise<void>;
  updateUserIdentity: (user: UserRequest) => () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextValue>({} as ProfileContextValue);

/**
 * Provider for ProfileContext
 *
 * authProvider and userIdentity can only be provided using context
 * since they are non-serializable
 * @see {@link https://redux-toolkit.js.org/api/serializabilityMiddleware}
 */
export const ProfileProvider = ({
  children,
  authProvider,
}: {
  children: ReactNode;
  authProvider: AuthProvider;
}) => {
  const [userIdentity, setUserIdentity] = useState<UserIdentity>();

  const createUserIdentity = (user: UserRequest) => async () => {
    const response = await createUser(user);
    const userIdentity: UserIdentity = {
      ...response.data,
      avatar: '',
    };
    setUserIdentity(userIdentity);
  };

  const updateUserIdentity = (user: UserRequest) => async () => {
    const response = await updateUser(user);
    const userIdentity: UserIdentity = {
      ...response.data,
      avatar: '',
    };
    setUserIdentity(userIdentity);
  };

  const context = useMemo(
    () => ({
      authProvider,
      userIdentity,
      createUserIdentity,
      updateUserIdentity,
    }),
    [authProvider, userIdentity]
  );

  return <ProfileContext.Provider value={context}>{children}</ProfileContext.Provider>;
};

export const useProfile = () => useContext(ProfileContext);
