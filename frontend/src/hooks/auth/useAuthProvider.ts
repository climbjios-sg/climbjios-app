import { useAuth } from 'src/contexts/auth/ProfileContext';

const useAuthProvider = () => {
  const { authProvider } = useAuth();

  return authProvider;
};

export default useAuthProvider;
