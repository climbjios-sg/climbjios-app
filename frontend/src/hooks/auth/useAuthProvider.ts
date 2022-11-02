import { useProfile } from 'src/contexts/auth/ProfileContext';

/**
 * Get the authProvider stored in the context
 */
const useAuthProvider = () => {
  const { authProvider } = useProfile();

  return authProvider;
};

export default useAuthProvider;
