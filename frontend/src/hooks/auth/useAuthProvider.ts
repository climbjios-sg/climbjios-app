import { useProfile } from 'src/contexts/auth/ProfileContext';

const useAuthProvider = () => {
  const { authProvider } = useProfile();

  return authProvider;
};

export default useAuthProvider;
