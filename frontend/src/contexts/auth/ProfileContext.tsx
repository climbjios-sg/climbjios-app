import { createContext, useContext, useMemo, ReactNode, useState } from 'react';
import { AuthProvider } from 'src/@types/auth';
import { UserIdentity, UserRequest } from 'src/@types/user';
import { updateUser } from 'src/services/user';

export interface ProfileContextValue {
  authProvider: AuthProvider;
  userIdentity?: UserIdentity;
  updateUserIdentity: (user: UserRequest) => Promise<void>;
  setUserIdentity: React.Dispatch<React.SetStateAction<UserIdentity | undefined>>;
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

  const updateUserIdentity = async (user: UserRequest) => {
    console.log('debug: user is', user);
    const response = await updateUser(user);
    console.log('debug: response is', response);

    const userIdentity: UserIdentity = {
      ...response.data,
    };
    setUserIdentity(userIdentity);
  };

  const context = useMemo(
    () => ({
      authProvider,
      userIdentity,
      updateUserIdentity,
      setUserIdentity,
    }),
    [authProvider, userIdentity]
  );

  return <ProfileContext.Provider value={context}>{children}</ProfileContext.Provider>;
};

export const useProfile = () => useContext(ProfileContext);
