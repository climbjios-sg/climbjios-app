import { createContext, useContext, useMemo, ReactNode } from 'react';
import { AuthProvider } from 'src/@types/auth';

export interface ProfileContextValue {
  authProvider: AuthProvider;
}

const ProfileContext = createContext<ProfileContextValue>({} as ProfileContextValue);

/**
 * Provider for ProfileContext
 *
 * authProvider can only be provided using context
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
  const context = useMemo(
    () => ({
      authProvider,
    }),
    [authProvider]
  );

  return <ProfileContext.Provider value={context}>{children}</ProfileContext.Provider>;
};

export const useProfile = () => useContext(ProfileContext);
